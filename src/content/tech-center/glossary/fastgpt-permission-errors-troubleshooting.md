---
title: FastGPT中权限相关报错的排查与说明
slug: /zh/glossary/fastgpt-permission-errors-troubleshooting
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/1059
source_type: 官方文档
---

# FastGPT中权限相关报错的排查与说明

## 一句话定义
FastGPT中的权限指管控资源访问、模型调用的规则，不符合对应规则时会触发权限相关报错，阻断模型调用或文件操作等对应操作。

## 在FastGPT里怎么用
在FastGPT中配置模型调用密钥时，需确保密钥对应权限符合FastGPT的模型调用规则，避免出现模型调用类权限报错；私有部署docker compose版本时，需确认系统对临时文件目录的访问权限，确保可正常读取、写入临时文件，避免触发文件操作类权限报错。

## 容易搞错的地方
配置模型密钥时，仅确认密钥本身可用，未关注模型类型与FastGPT的匹配性，导致出现not found the model或permission denied报错。私有部署docker compose版本v4.8.11-fix时，未正确配置临时文件目录的挂载或访问权限，触发EACCES: permission denied, open '/tmp/aIQs6kGiQMUG.docx'类文件操作报错。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1059)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
