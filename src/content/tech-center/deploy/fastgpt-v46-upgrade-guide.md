---
title: FastGPT V4.6版本升级操作与功能说明
slug: /zh/deploy/fastgpt-v46-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/46
source_type: 官方文档
---

# FastGPT V4.6版本升级操作与功能说明

FastGPT V4.6版本新增团队管理功能，支持邀请其他用户管理部署资源。该版本升级后无法执行旧版升级脚本，且不支持回退操作。旧版config.json配置说明已不再维护，当前版本需参考官方的模型配置方案和环境变量说明；商业版镜像需更新至V0.2.1版本。

### 升级操作步骤
1.  将服务镜像更新至`latest`或`v4.6`版本，商业版镜像需更新至V0.2.1。
2.  执行初始化API请求，需替换`{{rootkey}}`为环境变量中的rootkey，`{{host}}`为自身部署的域名，且必须确保`initv46`执行成功后，再执行`initv46-2`请求：
```bash
curl --location --request POST https://{{host}}/api/admin/initv46 \
--header rootkey: {{rootkey}} \
--header Content-Type: application/json
```
```bash
curl --location --request POST https://{{host}}/api/admin/initv46-2 \
--header rootkey: {{rootkey}} \
--header Content-Type: application/json
```
初始化接口可能执行速度较慢，返回超时无需特殊处理，只需关注服务运行日志即可。本次初始化包含四项内容：创建默认团队、初始化MongoDB所有资源的团队字段、初始化Pg数据库字段、初始化Mongo Data。
若旧版V4.6出现文件导入后知识库数据无法显示的问题，可执行修复脚本：
```bash
curl --location --request POST https://{{host}}/api/admin/initv46-fix \
--header rootkey: {{rootkey}} \
--header Content-Type: application/json
```

### 功能与优化说明
V4.6版本新增多项核心功能：团队空间管理、多路向量（多向量映射一组数据）、TTS语音功能、支持知识库配置文本预处理模型；线上环境新增ReRank向量召回机制，可提升召回精度。同时优化了知识库导出功能，支持直接触发流下载，无需等待转换完成。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/46
