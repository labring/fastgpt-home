---
title: FastGPT V4.9.7版本升级步骤与更新内容说明
slug: /zh/deploy/fastgpt-v497-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/497
source_type: 官方文档
---

# FastGPT V4.9.7版本升级步骤与更新内容说明

### 升级操作步骤
1. 完成数据备份，这是升级前的必要前置操作。
2. 更新对应镜像的Tag：
- FastGPT 开源镜像Tag更新为`v4.9.7-fix2`
- FastGPT 商业版镜像Tag更新为`v4.9.7`
- MCP Server 和 Sandbox 无需执行更新
- AIProxy 镜像Tag更新为`v0.1.8`

本文档针对FastGPT V4.9.7版本的升级与更新内容进行说明，本次更新涵盖新增功能、体验优化与问题修复三类。新增功能包括知识库回答段落末尾添加引用、MCP工具支持HTTP Streamable协议、MCP Server支持编辑工具名适配无中文名客户端、工作流右键自动对齐节点、支持自定义生产环境config.json路径、API调用可通过传入`NO_RECORD_HISTORIES`作为chatId禁用历史记录存储、Rerank模型按量计费、套餐兑换码功能、支付宝支付、短链数据埋点，以及新增Jina AI模型系统配置。优化项则包括Doc2x文档解析的报错捕获与超时时长调整、PG vector查询强制使用向量索引、对话时间统计准确返回工作流整体时长、从AIProxy获取音频解析时长、AI模型Token值优先使用API usage确保准确性，仅在无API数据时采用GPT3.5估算方式，以及优化对话日志list接口适配大量对话的单个对话框场景。

升级过程中需严格遵循前置步骤，同时需注意部分修复问题的场景与使用边界：例如修复了文件上传分块大小超出MongoDB限制的问题，需确保上传文件的分块配置符合平台要求；修复了仪表盘接口因未考虑时区导致的统计异常，需确认系统时区配置与统计需求匹配；修复了LLM模型测试接口无法测试未启用模型的问题，同时修正了该接口会移除模型自定义请求地址的问题。此外还修复了Copy App权限异常、导出对话记录单条上限1000组避免导出失败、工作流变量文本不触发渲染、调试知识库检索模块的无权操作提示、分享链接强制返回嵌套应用引用内容、知识库同名标签筛选异常、应用列表权限配置index刷新异常等问题。在使用新增功能时，若遇到知识库标签筛选无结果的情况，需注意同名标签的`$and`筛选逻辑调整；使用API的`NO_RECORD_HISTORIES`参数时，需确认调用场景无需存储对话历史。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/497
