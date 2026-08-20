---
title: FastGPT V4.14.4版本升级步骤与更新内容说明
slug: /zh/deploy/fastgpt-v4144-upgrade-steps
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/4144
source_type: 官方文档
---

# FastGPT V4.14.4版本升级步骤与更新内容说明

## 版本更新概览
FastGPT V4.14.4版本包含多项功能新增、优化与bug修复。新增内容包括工具调用支持流输出、AI积分告警通知，对话日志新增IP归属地展示、应用版本名展示与按点赞点踩过滤功能；支持通过API上传本地文件至知识库并存储至S3，移除了旧版Gridfs代码；新增订阅套餐逻辑、对话文件白名单配置，支持S3的pathStyle与region配置，以及通过Sealos配置多租户自定义域名；工作流中工具调用的文件输入支持手动填写，新增网络代理配置支持。优化项包括延长S3上传文件超时时长至5分钟，采用边际收益公式优化检索词获取，优化用户通知模板与多语言支持，将知识库与应用删除改为异步队列模式，修复LLM请求时的图片无效报错等。

## 升级操作步骤
1. 更新镜像：将FastGPT官方镜像与商业版镜像的tag更新为v4.14.4，fastgpt-plugin镜像tag更新为v0.3.4，mcp_server、Sandbox、AIProxy无需更新。
2. 执行升级脚本：在任意终端发起HTTP POST请求，替换`{{rootkey}}`为环境变量中的rootkey，`{{host}}`为FastGPT域名：
```bash
curl --location --request POST https://{{host}}/api/admin/initv4144 \
--header rootkey: {{rootkey}} \
--header Content-Type: application/json
```
该脚本会完成两项迁移任务：将4.14.3版本遗留的Dataset/local接口上传的文件迁移至S3，异步全量计算旧对话的反馈flags值。脚本执行为异步模式，接口不会立即返回结果，请通过日志检查是否打印`Migration feedback completed! 🚀`确认完成。

## 升级注意事项
本次升级存在几个关键易错点：删除应用和知识库时，必须输入对应名称进行校验，否则无法完成操作；分享链接的自定义鉴权返回uid参数长度需小于200，过长会影响文件上传功能；旧版Gridfs存储代码已完全移除，不再支持相关存储方式；升级脚本执行后无需手动干预其他操作，只需等待日志输出完成提示即可。此外，若使用S3存储，需确保已正确配置pathStyle与region参数。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/4144)
