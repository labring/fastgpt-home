---
title: FastGPT从旧版本升级至V4.3的操作指南
slug: /zh/deploy/fastgpt-v43-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/43
source_type: 官方文档
---

# FastGPT从旧版本升级至V4.3的操作指南

FastGPT V4.3版本升级包含数据库结构调整与环境变量新增两项核心变更。在执行升级前，你需确认当前运行的FastGPT版本早于V4.3，并已获取部署时配置的`rootkey`环境变量值，该值将作为后续API请求的鉴权凭证。本次升级仅针对V4.3版本的必要调整，不会影响原有业务的核心功能运行，但需严格按照步骤执行以避免配置遗漏。

### 升级操作具体步骤
1.  **获取鉴权凭证**：登录部署服务器或查看当前环境变量，提取`rootkey`的实际值，该值用于验证管理员操作权限。
2.  **执行数据库初始化API**：使用以下curl命令发起请求，将`{{host}}`替换为你的FastGPT服务访问地址（如域名或IP加端口），`{{rootkey}}`替换为实际提取的鉴权值：
    ```bash
    curl --location --request POST https://{{host}}/api/admin/initv43 \
    --header rootkey: {{rootkey}} \
    --header Content-Type: application/json
    ```
    该请求会向PG数据库的`modeldata`表插入新列`file_id`，用于存储文件关联ID，完成数据库结构更新。
3.  **新增环境变量配置**：在你的FastGPT部署配置中添加`FILE_TOKEN_KEY`环境变量，该变量用于生成有效期为30分钟的文件预览链接，示例配置格式为：
    ```env
    FILE_TOKEN_KEY=filetokenkey
    ```
    请将`filetokenkey`替换为你自定义的安全字符串，避免使用默认值或弱密码。

需要注意的是，数据库初始化API仅需在首次升级到V4.3时执行一次，重复执行不会对数据库造成额外影响，但无需多次操作。若请求未携带正确的`rootkey`，将无法完成数据库结构更新，此时请检查鉴权凭证是否正确。此外，未正确新增`FILE_TOKEN_KEY`环境变量将无法正常生成文件预览链接，影响文件相关功能的使用。升级完成后，建议重启FastGPT服务以加载新的环境变量配置。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/43)
