---
title: FastGPT V4.14.4版本升级操作与更新说明
slug: /zh/deploy/fastgpt-v4144-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/4144
source_type: 官方文档
---

# FastGPT V4.14.4版本升级操作与更新说明

## 版本核心更新
本版本包含多项新增功能、优化项与bug修复。新增内容包括工具调用支持配置流输出、AI积分告警通知，对话日志支持展示IP归属地、应用版本名、按点赞点踩过滤，API上传本地文件至知识库并移除旧版Gridfs代码，新版订阅套餐逻辑，对话文件白名单配置，S3存储支持pathStyle与region配置，Sealos多租户自定义域名，工作流工具文件输入支持手动填写，以及HTTP/HTTPS代理支持。优化项包括将S3上传文件超时时长延长至5分钟，采用JinaAI边际收益公式优化检索词，优化用户通知模板与异步删除知识库队列，新增LLM图片无效报错提示，completions接口非stream模式且detail=false时返回reason_content，新增无效S3 key检测，删除应用与知识库需输入名称校验，优化Mongo慢操作日志打印内容，限制分享链接自定义鉴权uid长度小于200。修复内容涵盖循环节点空内容过滤、工作流工具权限问题、非必填布尔/数字类型配置异常等多项前端与后端bug。插件方面新增GLM4.6与DS3.2系列模型预设，修复MinerU SaaS插件模型版本选择问题，新增微信公众号草稿箱列表工具等。

## 升级操作步骤
1. 更新镜像：将FastGPT官方镜像tag更新为v4.14.4，商业版镜像同步使用该tag，fastgpt-plugin镜像tag更新为v0.3.4；mcp_server、Sandbox、AIProxy无需更新。
2. 执行升级脚本：在任意终端发起POST请求，替换`{{rootkey}}`为环境变量中的rootkey，`{{host}}`为FastGPT域名，执行命令：
```bash
curl --location --request POST https://{{host}}/api/admin/initv4144 \
--header rootkey: {{rootkey}} \
--header Content-Type: application/json
```
本次升级包含两项异步迁移任务：将4.14.3版本遗留的Dataset/local接口上传的文件迁移至S3，全量计算旧chat中的反馈并新增flags字段用于筛选。该任务执行较慢，接口不会返回结果，请通过服务日志查看是否打印`Migration feedback completed! 🚀`确认迁移完成。

## 升级注意事项
本次升级的迁移任务为异步执行，无需等待接口返回结果，需关注服务日志确认完成状态。删除应用或知识库时，必须手动输入对应名称完成校验。若使用S3存储，需确保配置了正确的pathStyle和region参数。分享链接自定义鉴权返回的uid长度需小于200，避免影响文件上传功能。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/4144)
