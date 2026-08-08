---
title: FastGPT V4.14.5版本升级步骤与环境变量变更说明
slug: /zh/deploy/fastgpt-v4-14-5-upgrade-steps
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/4145
source_type: 官方文档
---

# FastGPT V4.14.5版本升级步骤与环境变量变更说明

## 版本核心变更说明
FastGPT V4.14.5版本新增对原生OSS和COS存储的支持，因此调整了存储桶相关的环境变量命名，同时升级了Mongo数据库版本以修复安全漏洞，部分字段名也进行了重命名，且需要执行专属升级脚本完成数据初始化。该版本的存储配置需避免使用127.0.0.1或localhost作为外部访问地址，否则容器内无法正常连接存储桶。

## 升级操作步骤
1.  **修改存储桶环境变量**：替换原有S3相关环境变量为新格式，保留Minio配置的示例参数如下，其他厂商配置可参考官方对象存储说明。新增必填变量包括`STORAGE_VENDOR=minio`、`STORAGE_REGION=us-east-1`、`STORAGE_ACCESS_KEY_ID=minioadmin`、`STORAGE_SECRET_ACCESS_KEY=minioadmin`、`STORAGE_PUBLIC_BUCKET=fastgpt-public`、`STORAGE_PRIVATE_BUCKET=fastgpt-private`、`STORAGE_EXTERNAL_ENDPOINT=http://192.168.0.2:9000`（需使用服务器和客户端均可访问的IP或域名）、`STORAGE_S3_ENDPOINT=http://fastgpt-minio:9000`。需移除的旧变量包括`S3_EXTERNAL_BASE_URL`、`S3_ENDPOINT`、`S3_PORT`、`S3_USE_SSL`、`S3_ACCESS_KEY`、`S3_SECRET_KEY`、`S3_PUBLIC_BUCKET`、`S3_PRIVATE_BUCKET`。
2.  **更新镜像版本**：将FastGPT社区版镜像tag改为`v4.14.5-fix`，商业版镜像tag改为`v4.14.5`，`fastgpt-plugin`镜像tag改为`v0.4.0`；Mongo数据库需升级到`5.0.32`版本以修复CVE-2025-14847漏洞，直接修改镜像tag即可。Sandbox、AIProxy、mcp_server无需更新。
3.  **执行升级脚本**：在任意终端发起以下HTTP请求，将`{{rootkey}}`替换为环境变量中的rootkey，`{{host}}`替换为FastGPT的访问域名：
    ```bash
    curl --location --request POST https://{{host}}/api/admin/initv4145 \
    --header rootkey: {{rootkey}} \
    --header Content-Type: application/json
    ```
    该脚本会自动重试失败的S3删除任务、为share类型的OutLink记录添加`showFullText`字段，并完成字段重命名操作。

## 新增优化与注意事项
该版本新增了工作流画布演示模式、嵌套应用快速跳转按钮，支持工作流导出时选择是否过滤敏感信息，对话记录改为软删除并新增日志管理删除功能，门户页支持配置单个应用的运行可见度。优化内容包括调整Redis全量key获取逻辑避免阻塞、优化Mongo/Redis/MQ的重连逻辑、增大文件解析接口请求限制到10MB等。修复的重要问题包括工作流并行合并后重复运行、MCP工具自定义鉴权头报错、对话日志列表头像为空抛错等。此外还调整了部分字段名：`showNodeStatus`改为`showRunningStatus`、`responseDetail`改为`showCite`、`showRawSource`改为`canDownloadSource`。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/4145
