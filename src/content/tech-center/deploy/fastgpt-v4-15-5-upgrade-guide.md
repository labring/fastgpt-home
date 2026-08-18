---
title: FastGPT V4.15.5版本更新内容与升级操作指南
slug: /zh/deploy/fastgpt-v4-15-5-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/4155
source_type: 官方文档
---

# FastGPT V4.15.5版本更新内容与升级操作指南

### 镜像更新操作
本次升级需更新三个服务的镜像标签：将fastgpt-app（主服务）、fastgpt-pro（商业版）的镜像tag修改为v4.15.5，fastgpt-plugin镜像tag修改为v1.0.3。需根据自身部署方式完成对应镜像的更新操作。

### 新增功能与优化修复
本次更新新增Cloudflare R2对象存储支持，兼容R2 S3 API、预签名访问和公开bucket自定义域名。新增SoMark PDF增强解析提供商，需通过SOMARK_API_KEY环境变量配置访问密钥；当同时配置多个PDF解析服务时，调用优先级为自定义PDF解析服务、SoMark、TextIn、Doc2x。优化内容包括统一工作区依赖版本管理，将更多子项目依赖迁移到pnpm catalog并刷新锁定文件，补充Agent Sandbox镜像的中英文运行时字体以改善文本和图像任务的字体可用性，优化OSS适配器与COS适配器的适配逻辑。修复内容包括阿里云OSS getObjectMetadata从错误字段读取ETag导致的元数据校验失败问题、S3/MinIO源文件不存在时API返回Unknown的问题（改为返回文件找不到并使用HTTP 404）、旧插件节点升级后输入框消失的问题，以及头像URL被重复编码的问题。

### 快速配置示例
以配置SoMark PDF解析服务为例，在部署的环境变量中添加以下配置项：
```
SOMARK_API_KEY=your_access_key
```
若需使用Cloudflare R2对象存储，需配置对应兼容S3 API的环境变量。完成镜像更新与环境变量配置后，重启服务即可应用本次升级的全部内容。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/4155)
