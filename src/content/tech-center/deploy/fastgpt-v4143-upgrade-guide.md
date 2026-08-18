---
title: FastGPT V4.14.3版本升级步骤及更新说明
slug: /zh/deploy/fastgpt-v4143-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/4143
source_type: 官方文档
---

# FastGPT V4.14.3版本升级步骤及更新说明

FastGPT V4.14.3版本核心更新围绕知识库存储、功能控件扩展与系统稳定性展开。本次更新将原系统MongoDB GridFS中的知识库文件（包含文本数据集和图片数据集，但不包括文档解析出的图片）迁移至S3存储；新增全局变量文件上传能力，表单输入节点支持密码、开关、时间点、时间范围、文件上传、对话模型选择控件，插件输入支持多选、时间点、时间范围、内部变量，系统插件市场新增版本提示与更新按钮，同时新增工作流运行QPM限制功能。

### 升级操作步骤
1. 更新镜像：将FastGPT官方镜像tag更新为`v4.14.3`，商业版镜像同样使用`v4.14.3`，fastgpt-plugin镜像tag更新为`v0.3.3`，mcp_server、Sandbox、AIProxy无需执行更新操作。
2. 执行升级脚本：在任意终端发起以下HTTP请求，将`{{rootkey}}`替换为环境变量中的rootkey，`{{host}}`替换为FastGPT域名：
```bash
curl --location --request POST https://{{host}}/api/admin/initv4143 \
--header rootkey: {{rootkey}} \
--header Content-Type: application/json
```
该请求会自动完成知识库文件的迁移工作。

### 优化与修复内容
本次更新优化了工作流工具文件上传的用户体验，添加权限表校验中间件以增强系统鲁棒性。修复内容包括：工作流调试预览窗口重新渲染导致输入丢失的问题；S3服务与主服务相同Origin域名时，文件请求URL被错误替换引发的404报错；插件工具缓存未正确刷新的问题；开发模式下刷新缓存导致静态文件重复上传的问题；上传pkg后图片未正确上传的问题。此外，微信公众号工具集新增支持同时上传多篇文档到草稿箱的功能。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/4143)
