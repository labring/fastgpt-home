---
title: FastGPT V4.14.5版本升级操作与环境配置说明
slug: /zh/deploy/fastgpt-v4145-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/4145
source_type: 官方文档
---

# FastGPT V4.14.5版本升级操作与环境配置说明

## 版本核心变更
本版本新增支持OSS、COS存储，需替换原有S3相关环境变量为新存储变量；同时更新核心镜像版本，将Mongo升级至5.0.32以修复CVE-2025-14847漏洞，需执行专属升级脚本完成数据处理。

## 升级操作步骤
1.  修改存储桶环境变量：
    新增以下环境变量配置（以Minio为例）：
    ```
    STORAGE_VENDOR=minio
    STORAGE_REGION=us-east-1
    STORAGE_ACCESS_KEY_ID=minioadmin
    STORAGE_SECRET_ACCESS_KEY=minioadmin
    STORAGE_PUBLIC_BUCKET=fastgpt-public
    STORAGE_PRIVATE_BUCKET=fastgpt-private
    STORAGE_EXTERNAL_ENDPOINT=http://192.168.0.2:9000
    STORAGE_S3_ENDPOINT=http://fastgpt-minio:9000
    ```
    注意：`STORAGE_EXTERNAL_ENDPOINT`需使用服务器和客户端均可访问的地址，请勿填写127.0.0.1或localhost。同时移除旧环境变量：`S3_EXTERNAL_BASE_URL`、`S3_ENDPOINT`、`S3_PORT`、`S3_USE_SSL`、`S3_ACCESS_KEY`、`S3_SECRET_KEY`、`S3_PUBLIC_BUCKET`、`S3_PRIVATE_BUCKET`。
2.  更新镜像：
    FastGPT社区版镜像tag设为`v4.14.5-fix`，商业版镜像tag设为`v4.14.5`，插件镜像tag设为`v0.4.0`；`mcp_server`、`Sandbox`、`AIProxy`无需更新；Mongo镜像tag修改为`5.0.32`。
3.  执行升级脚本：
    在任意终端执行以下命令，替换`{{rootkey}}`为环境变量中的rootkey，`{{host}}`为FastGPT域名：
    ```bash
    curl --location --request POST https://{{host}}/api/admin/initv4145 \
    --header rootkey: {{rootkey}} \
    --header Content-Type: application/json
    ```
    该脚本会自动重试失败的S3删除任务、为share类型OutLink添加`showFullText`字段，并完成字段重命名：`showNodeStatus`改为`showRunningStatus`、`responseDetail`改为`showCite`、`showRawSource`改为`canDownloadSource`。

## 新增、优化与修复内容
新增内容包括工作流画布演示模式、嵌套应用快速跳转按钮、工作流导出敏感信息过滤选项、对话记录软删除与日志管理删除功能、门户页应用可见度配置等；优化了Redis key获取逻辑、Mongo/Redis/MQ重连逻辑、变量输入框复制功能、LLM空响应判断等；修复了工作流并行合并后重复运行、MCP工具自定义鉴权报错、对话日志列表头像为空抛错等多个问题。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/4145
