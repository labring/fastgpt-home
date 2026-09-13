---
title: FastGPT V4.15.5版本升级内容解读与操作指引
slug: /zh/deploy/upgrade-v4-15-5
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/4155
source_type: 官方文档
---

# FastGPT V4.15.5版本升级内容解读与操作指引

## 这个版本改了什么
本次版本更新包含新增功能、体验优化、问题修复及代码优化。新增Cloudflare R2对象存储支持，兼容R2 S3 API、预签名访问和公开bucket自定义域名；新增SoMark PDF增强解析提供商，支持通过SOMARK_API_KEY配置，多PDF服务同时配置时调用优先级为自定义PDF解析服务、SoMark、TextIn、Doc2x，具体配置见环境变量配置文档。优化内容包括统一工作区依赖版本管理，将更多子项目依赖迁移到pnpm catalog并刷新锁定文件；Agent Sandbox镜像补充中英文运行时字体，改善文本和图像相关任务的字体可用性；OSS适配器支持IStorage契约中的字符串上传，无法覆盖响应Content-Type的OSS场景下沿用对象原始类型；COS适配器对缺失对象下载进行预检，确保符合统一下载错误契约。修复问题包括阿里云OSS getObjectMetadata读取ETag错误导致的元数据校验失败，S3/MinIO源文件不存在时API返回Unknown的问题，旧插件节点升级后输入框消失的问题，以及头像URL被重复编码的问题。代码优化为S3 SDK增加跨MinIO、AWS S3、Cloudflare R2、OSS和COS的通用集成测试，覆盖private/public bucket、公开URL和预签名URL的真实访问。

## 升级前要确认的事
确认当前部署的FastGPT相关镜像版本，如需启用新增的Cloudflare R2对象存储或SoMark PDF解析服务，需提前配置对应环境变量。

## 升级步骤（照做）
1. 更新fastgpt-app镜像tag为v4.15.5。
2. 更新fastgpt-pro镜像tag为v4.15.5。
3. 更新fastgpt-plugin镜像tag为v1.0.3。
4. 重启相关服务使镜像更新生效。

## 升级后怎么验证
配置Cloudflare R2对象存储并完成文件上传下载，确认功能正常。配置SOMARK_API_KEY并上传PDF文件，确认解析正常。上传文件至阿里云OSS，确认ETag正常读取。上传不存在的S3/MinIO源文件，确认返回文件找不到及HTTP 404。升级旧插件节点，确认输入框正常显示。上传头像，确认URL未被重复编码。检查服务运行状态，确认无异常报错。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/4155)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
