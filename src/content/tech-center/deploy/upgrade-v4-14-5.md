---
title: FastGPT V4.14.5版本升级操作与适配指南
slug: /zh/deploy/upgrade-v4-14-5
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/4145
source_type: 官方文档
---

# FastGPT V4.14.5版本升级操作与适配指南

## 这个版本改了什么
本版本新增原生OSS、COS对象存储支持，优化工作流画布样式、嵌套应用跳转与导出功能，对话记录改为软删除并支持从日志管理删除。新增门户页单个应用运行可见度配置、邮箱安全模式与端口配置，升级MongoDB至5.0.32版本修复CVE-2025-14847漏洞，更新FastGPT、商业版、fastgpt-plugin镜像tag分别为v4.14.5-fix、v4.14.5、v0.4.0。优化Redis key获取、数据库与MQ重连逻辑，修复工作流并行合并后重复运行、MCP工具自定义鉴权头报错等12项问题。

## 升级前要确认的事
需替换原有S3相关环境变量为新的存储变量，移除S3_EXTERNAL_BASE_URL、S3_ENDPOINT、S3_PORT、S3_USE_SSL、S3_ACCESS_KEY、S3_SECRET_KEY、S3_PUBLIC_BUCKET、S3_PRIVATE_BUCKET共8个旧变量，配置STORAGE_VENDOR等新存储变量。确认MongoDB镜像tag准备修改为5.0.32，提前获取环境变量中的rootkey与FastGPT域名。

## 升级步骤（照做）
1. 修改存储桶环境变量：新增STORAGE_VENDOR=minio、STORAGE_REGION=us-east-1、STORAGE_ACCESS_KEY_ID=minioadmin、STORAGE_SECRET_ACCESS_KEY=minioadmin、STORAGE_PUBLIC_BUCKET=fastgpt-public、STORAGE_PRIVATE_BUCKET=fastgpt-private、STORAGE_EXTERNAL_ENDPOINT=http://192.168.0.2:9000、STORAGE_S3_ENDPOINT=http://fastgpt-minio:9000变量，移除上述8个旧S3变量。
2. 更新镜像：将FastGPT镜像tag改为v4.14.5-fix，商业版镜像tag改为v4.14.5，fastgpt-plugin镜像tag改为v0.4.0，MongoDB镜像tag改为5.0.32，mcp_server、Sandbox、AIProxy无需更新。
3. 执行升级脚本：通过终端发起POST请求，命令如下：
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv4145' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
其中{{rootkey}}替换为环境变量rootkey，{{host}}替换为FastGPT域名。

## 升级后怎么验证
检查存储配置是否生效，可发起测试文件上传与删除操作。确认MongoDB版本为5.0.32。测试工作流、对话记录、门户配置等新增功能是否正常运行，查看系统日志无相关报错。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/4145)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
