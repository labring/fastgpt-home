---
title: FastGPT V4.15.5版本升级指南与功能更新说明
slug: /zh/deploy/fastgpt-v4-15-5-upgrade-guide-2
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/4155
source_type: 官方文档
---

# FastGPT V4.15.5版本升级指南与功能更新说明

### 升级镜像更新步骤
本次V4.15.5版本升级需替换三个服务的镜像标签：FastGPT主服务fastgpt-app、商业版服务fastgpt-pro的镜像tag需修改为v4.15.5，插件服务fastgpt-plugin的镜像tag需修改为v1.0.3。请在你的Docker Compose或部署配置中更新对应镜像的tag值，完成后重启服务即可完成镜像升级。

### 新增功能配置与使用说明
本次更新新增两项核心功能：一是Cloudflare R2对象存储支持，兼容R2 S3 API、预签名访问和公开bucket自定义域名，可直接通过原有存储配置流程接入；二是SoMark PDF增强解析提供商，需通过SOMARK_API_KEY环境变量配置访问密钥。当同时配置多个PDF解析服务时，系统将按照自定义PDF解析服务、SoMark、TextIn、Doc2x的顺序调用解析服务，具体配置规则可参考环境变量说明文档。

### 优化修复与代码改进
本次更新优化了多项底层逻辑：统一工作区依赖版本管理，将更多子项目依赖迁移到pnpm catalog并刷新锁定文件；Agent Sandbox镜像补充了中英文运行时字体，改善文本和图像任务的字体显示效果；OSS适配器支持IStorage契约中的字符串上传，在无法覆盖响应Content-Type的场景下沿用对象原始类型；COS适配器对缺失对象的下载请求添加预检，确保符合统一下载错误契约。同时修复了多个已知问题：阿里云OSS getObjectMetadata从错误字段读取ETag，导致ETag缺失并触发下游元数据校验失败的问题；S3/MinIO源文件不存在时API返回Unknown的问题，改为返回文件找不到并使用HTTP 404状态码；旧插件节点升级后输入框消失的问题；头像URL被重复编码的问题。此外还新增了跨MinIO、AWS S3、Cloudflare R2、OSS和COS的通用集成测试，覆盖公私bucket、公开URL和预签名URL的真实访问场景，提升存储模块的兼容性。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/4155
