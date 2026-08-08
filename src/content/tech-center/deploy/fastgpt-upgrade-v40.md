---
title: FastGPT自部署版本从旧版本升级至V4.0的操作指南
slug: /zh/deploy/fastgpt-upgrade-v40
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/40
source_type: 官方文档
---

# FastGPT自部署版本从旧版本升级至V4.0的操作指南

## 升级背景说明
FastGPT从旧版本升级至V4.0时，因新版MongoDB表结构变更幅度较大，需执行指定初始化操作完成数据迁移，整体流程分为表重命名、字段初始化、API初始化三个核心环节，操作前需提前连接MongoDB数据库，并准备好环境变量中的`rootkey`值。

## 具体操作步骤
1.  **重命名表名**：先连接MongoDB数据库，手动删除系统自动创建的空表`apps`与`outlinks`，再执行以下两条重命名命令：
    ```bash
    db.models.renameCollection(apps);
    db.sharechats.renameCollection(outlinks);
    ```
2.  **初始化表字段**：依次执行以下3条命令，单条命令执行时间较长，若执行失败可重复执行（会自动跳过已完成初始化的数据），直至所有数据更新完成：
    ```bash
    db.chats.find({ "appId": { $exists: false } }).forEach(function(item) { db.chats.updateOne({ _id: item._id }, { $set: { "appId": item.modelId } }); });
    db.collections.find({ "appId": { $exists: false } }).forEach(function(item) { db.collections.updateOne({ _id: item._id }, { $set: { "appId": item.modelId } }); });
    db.outlinks.find({ "shareId": { $exists: false } }).forEach(function(item) { db.outlinks.updateOne({ _id: item._id }, { $set: { "shareId": item._id.toString(), "appId": item.modelId } }); });
    ```
3.  **初始化API**：完成MongoDB相关操作后，部署新版FastGPT项目，携带`headers.rootkey`（即环境变量中配置的`rootkey`值）发起3个HTTP请求：
    ```
    https://xxxxx/api/admin/initv4
    https://xxxxx/api/admin/initChat
    https://xxxxx/api/admin/initOutlink
    ```
    注意：前两个API请求可能因内存不足导致执行失败，可重复发起请求重试。

## 操作注意事项
本次升级仅适用于从旧版本升级至V4.0的场景，请勿在其他版本升级中直接套用本流程。操作前建议完整备份MongoDB数据库，避免因误操作导致数据丢失。执行MongoDB字段初始化命令时，请勿中断操作，否则可能导致部分数据未完成更新。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/40
