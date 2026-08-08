---
title: FastGPT 从旧版本升级到 V4.3 的操作指南
slug: /zh/deploy/fastgpt-upgrade-v43
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/43
source_type: 官方文档
---

# FastGPT 从旧版本升级到 V4.3 的操作指南

## 升级前置说明
FastGPT V4.3版本升级针对所有早于该版本的自部署实例，包含两项核心变更：一是数据库结构更新，二是新增环境变量配置项。执行初始化API会向PG数据库的`modeldata`表插入新列`file_id`，用于存储文件ID，为后续文件相关功能提供数据支持；同时需要新增`FILE_TOKEN_KEY`环境变量，该变量用于生成有效期为30分钟的文件预览链接，未配置将导致文件预览功能无法正常使用。

## 可执行升级步骤
按照以下步骤完成数据库初始化操作：
1.  确认你的部署域名`{{host}}`和环境变量中的`rootkey`值，其中`rootkey`为部署时配置的系统根密钥。
2.  在终端中执行以下POST请求，调用初始化API：
    ```bash
    curl --location --request POST https://{{host}}/api/admin/initv43 \
    --header rootkey: {{rootkey}} \
    --header Content-Type: application/json
    ```
该请求会自动完成数据库表结构的更新，执行后无需额外手动操作数据库。

## 环境变量配置
在你的FastGPT部署环境中添加`FILE_TOKEN_KEY`环境变量，基础配置示例为：
```env
FILE_TOKEN_KEY=filetokenkey
```
请根据实际业务安全需求，将示例中的`filetokenkey`替换为自定义的高强度密钥值，确保文件预览链接的安全性。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/43
