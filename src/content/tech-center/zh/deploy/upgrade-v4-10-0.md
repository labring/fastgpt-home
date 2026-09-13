---
title: FastGPT V4.10.0版本升级操作与新增内容说明
slug: /zh/deploy/upgrade-v4-10-0
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4100
source_type: 官方文档
---

# FastGPT V4.10.0版本升级操作与新增内容说明

## 这个版本改了什么
本版本新增独立系统工具服务，支持系统工具独立开发和调试。同步更新系统工具开发指南与插件系统说明文档。

## 升级前要确认的事
使用Docker部署的用户，需参考最新docker-compose.yml文件配置fastgpt-plugin和minio服务。使用Sealos部署的用户，需提前在对象存储中新建存储桶，设置publicRead权限并获取相关密钥。需将fastgpt-plugin的AUTH_TOKEN环境变量设置为复杂度较高的值，并确认fastgpt用户可访问MINIO_CUSTOM_ENDPOINT对应的地址。

## 升级步骤（照做）
### Docker版本
1. 参考最新的docker-compose.yml文件，加入fastgpt-plugin和minio服务。
2. 修改fastgpt-plugin环境变量AUTH_TOKEN为较复杂的值。
3. 修改fastgpt-plugin环境变量MINIO_CUSTOM_ENDPOINT为http://ip:port或相关域名，要求fastgpt用户可访问。
4. 更新fastgpt和fastgpt-pro容器的环境变量：
```
PLUGIN_BASE_URL=http://fastgpt-plugin:3000
PLUGIN_TOKEN=刚修改的AUTH_TOKEN值
```
5. 更新fastgpt和fastgpt-pro镜像tag: v4.10.0-fix。
6. 执行docker-compose up -d启动/更新所有服务。

### Sealos版本
1. 在Sealos桌面的对象存储中，新建一个存储桶，设置publicRead权限，并获取相关密钥。
2. 部署fastgpt-plugin服务，镜像registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt-plugin:v0.1.0，内网暴露端口3000，设置环境变量：
```
AUTH_TOKEN=鉴权 token

# 日志等级: debug,info,warn,error
LOG_LEVEL=info

# S3 配置
MINIO_CUSTOM_ENDPOINT=External
MINIO_ENDPOINT=Internal地址
MINIO_PORT=80
MINIO_USE_SSL=false
MINIO_ACCESS_KEY=Access Key
MINIO_SECRET_KEY=Secret Key
MINIO_BUCKET=存储桶名
```
3. 更新fastgpt和fastgpt-pro容器的环境变量以及镜像tag: v4.10.0-fix：
```
PLUGIN_BASE_URL=fastgpt-plugin 服务的内网地址
PLUGIN_TOKEN=刚修改的AUTH_TOKEN值
```

## 升级后怎么验证
升级完成后，可通过查看服务运行状态确认各组件是否正常启动。可尝试使用系统工具功能，验证相关功能是否正常生效，同时确认存储相关功能可正常调用。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4100)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
