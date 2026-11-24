---
title: Sealos环境下FastGPT 4.10.0版本更新操作指南
slug: /zh/reference/fastgpt-sealos-4100-upgrade
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/outdated/4100
source_type: 官方文档小节
---

# Sealos环境下FastGPT 4.10.0版本更新操作指南

## 结论
本操作指南用于Sealos环境下FastGPT 4.10.0版本的更新，需完成对象存储配置、plugin服务部署及核心容器更新三步。操作完成后即可完成版本升级适配。

## 具体怎么做
1. 在Sealos桌面的对象存储中新建存储桶，设置publicRead权限，记录Access Key、Secret Key及存储桶名。
2. 部署fastgpt-plugin服务，使用镜像`registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt-plugin:v0.1.0`，内网暴露端口3000，配置以下环境变量：
   - AUTH_TOKEN=鉴权token
   - LOG_LEVEL=info（可选值：debug,info,warn,error）
   - MINIO_CUSTOM_ENDPOINT=External
   - MINIO_ENDPOINT=Internal地址
   - MINIO_PORT=80
   - MINIO_USE_SSL=false
   - MINIO_ACCESS_KEY=Access Key
   - MINIO_SECRET_KEY=Secret Key
   - MINIO_BUCKET=存储桶名
3. 更新fastgpt和fastgpt-pro容器的环境变量与镜像tag为v4.10.0-fix，配置以下变量：
   - PLUGIN_BASE_URL=fastgpt-plugin服务的内网地址
   - PLUGIN_TOKEN=配置的AUTH_TOKEN值

## 注意事项
1. fastgpt-plugin服务仅需内网暴露，无需公网访问。
2. MINIO相关配置需与Sealos对象存储的实际参数一致，避免连接失败。
3. 需确保AUTH_TOKEN与PLUGIN_TOKEN的取值完全一致，否则会导致服务鉴权失败。
4. 镜像tag必须使用v4.10.0-fix，不可替换为其他版本标识。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/outdated/4100)
