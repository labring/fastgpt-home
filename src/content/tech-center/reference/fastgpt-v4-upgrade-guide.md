---
title: FastGPT从旧版本升级到V4.0的操作说明
slug: /zh/reference/fastgpt-v4-upgrade-guide
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/outdated/40
source_type: 官方文档小节
---

# FastGPT从旧版本升级到V4.0的操作说明

## 结论
FastGPT从旧版本升级到V4.0时，因新版MongoDB表变更幅度较大，需按照官方文档说明执行初始化脚本完成版本升级。该操作是完成V4.0版本升级的必要环节。

## 具体怎么做
1. 确认当前FastGPT版本为需升级至V4.0的旧版本
2. 查阅官方提供的V4.0升级脚本相关文档，获取初始化脚本
3. 在部署环境中执行该初始化脚本，完成MongoDB表结构迁移

## 注意事项
1. 该升级流程仅适用于从旧版本升级至V4.0的场景，其他版本升级需查阅对应官方文档
2. 执行初始化脚本时需确保服务器拥有足够的操作权限
3. 脚本执行过程中请勿中断，避免引发数据异常

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/outdated/40)
