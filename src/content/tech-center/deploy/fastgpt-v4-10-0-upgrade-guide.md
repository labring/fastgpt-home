---
title: FastGPT V4.10.0版本环境变量变更升级操作指南
slug: /zh/deploy/fastgpt-v4-10-0-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4100
source_type: 官方文档
---

# FastGPT V4.10.0版本环境变量变更升级操作指南

FastGPT V4.10.0版本包含环境变量变更与独立系统工具服务新增两大核心更新，本次升级涉及fastgpt-plugin、fastgpt及商业版fastgpt-pro三个核心服务的配置调整，若未正确执行配置变更，可能导致系统工具无法正常调用、存储连接异常等问题，升级前需提前备份现有配置与业务数据。

### 部署升级步骤
#### Docker 版本
1. 参考最新docker-compose.yml文件，新增fastgpt-plugin和minio服务。
2. 修改fastgpt-plugin的环境变量`AUTH_TOKEN`为复杂鉴权值，设置`MINIO_CUSTOM_ENDPOINT`为`http://ip:port`或可访问的域名，确保fastgpt用户可正常访问该地址。
3. 更新fastgpt与fastgpt-pro容器的环境变量：`PLUGIN_BASE_URL=http://fastgpt-plugin:3000`，`PLUGIN_TOKEN`为刚修改的`AUTH_TOKEN`值。
4. 将fastgpt和fastgpt-pro的镜像tag更新为`v4.10.0-fix`，执行`docker-compose up -d`启动或更新所有服务。

#### Sealos 版本
1. 在Sealos桌面的对象存储中新建存储桶，设置`publicRead`权限，获取`MINIO_ACCESS_KEY`、`MINIO_SECRET_KEY`等密钥信息。
2. 部署fastgpt-plugin服务，使用镜像`registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt-plugin:v0.1.0`，内网暴露端口3000，配置以下环境变量：
```
AUTH_TOKEN=自定义鉴权token
LOG_LEVEL=info
MINIO_CUSTOM_ENDPOINT=External
MINIO_ENDPOINT=Internal地址
MINIO_PORT=80
MINIO_USE_SSL=false
MINIO_ACCESS_KEY=你的Access Key
MINIO_SECRET_KEY=你的Secret Key
MINIO_BUCKET=存储桶名
```
3. 更新fastgpt与fastgpt-pro容器的环境变量：`PLUGIN_BASE_URL`为fastgpt-plugin服务的内网地址，`PLUGIN_TOKEN`为刚设置的`AUTH_TOKEN`值，将镜像tag更新为`v4.10.0-fix`。

本次升级新增独立系统工具服务，支持系统工具的独立开发与调试，官方同时更新了系统工具开发指南与插件系统说明文档，开发者可通过对应文档获取最新开发规范。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4100)
