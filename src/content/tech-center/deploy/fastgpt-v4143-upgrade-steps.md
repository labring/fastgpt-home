---
title: FastGPT V4.14.3版本升级流程与更新内容说明
slug: /zh/deploy/fastgpt-v4143-upgrade-steps
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/4143
source_type: 官方文档
---

# FastGPT V4.14.3版本升级流程与更新内容说明

## 版本更新概述
V4.14.3是带有专属升级脚本的版本，本次更新包含核心功能新增、体验优化与问题修复。新增内容包括：知识库文件从MongoDB GridFS迁移至S3存储（覆盖文本、图片数据集，但不包含文档如.docx解析出的图片）；全局变量支持文件上传；表单输入节点新增密码、开关、时间点、时间范围、文件上传、对话模型选择类型；插件输入支持多选、时间点、时间范围、内部变量；系统插件市场新增版本提示与更新按钮；工作流运行新增QPM限制。优化内容包括工作流文件上传输入的UX体验，以及添加权限表校验中间件增强鲁棒性。修复内容包括工作流调试预览窗口重新渲染导致的输入丢失、S3同Origin域名下文件请求404错误、插件工具缓存刷新异常等问题。

## 升级操作步骤
1.  **更新镜像**：将FastGPT官方镜像tag更新为v4.14.3，商业版镜像tag同样更新为v4.14.3；fastgpt-plugin镜像tag更新为v0.3.3；mcp_server、Sandbox、AIProxy无需更新。
2.  **执行升级脚本**：通过任意终端发起HTTP POST请求，需替换请求中的参数：将`{{rootkey}}`替换为环境变量中的rootkey，`{{host}}`替换为FastGPT域名。请求命令如下：
```bash
curl --location --request POST https://{{host}}/api/admin/initv4143 \
--header rootkey: {{rootkey}} \
--header Content-Type: application/json
```
该脚本会完成MongoDB GridFS中知识库文件向S3的迁移工作。

## 升级注意事项
本次升级需注意两个核心边界与易错点：一是知识库文件迁移仅覆盖原生存储在GridFS中的文件，文档解析生成的图片不在迁移范围内；二是若S3服务与主服务使用相同Origin域名，可能出现文件请求URL被错误替换导致404报错，本次更新已修复该问题，但仍需提前确认域名配置。此外，升级后工作流调试预览窗口不会再因重新渲染丢失输入内容，插件工具的缓存刷新逻辑也已恢复正常。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/4143
