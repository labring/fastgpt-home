---
title: FastGPT V4.14.9版本升级步骤与更新内容说明
slug: /zh/deploy/fastgpt-v4149-upgrade-2
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/4149
source_type: 官方文档
---

# FastGPT V4.14.9版本升级步骤与更新内容说明

## 版本核心变更概述
本版本为FastGPT V4.14.9，包含环境变量调整、镜像更新、接口变更、新增功能与优化修复等核心内容。其中环境变量部分对沙盒相关配置进行了重命名，同时新增了内网安全检查的可选配置；镜像版本有明确的更新要求，部分组件无需升级。接口层面新增了对话沙盒使用状态的返回字段，并计划移除部分旧有字段。新增功能存在部分使用范围限制，整体优化覆盖了知识库、工作流、工具调用等多个模块。

## 升级操作步骤
### 1. 环境变量更新
修改FastGPT的沙盒相关环境变量：将原`SANDBOX_URL`（代码运行沙盒地址）和`SANDBOX_TOKEN`（沙盒凭证，可空）分别重命名为`CODE_SANDBOX_URL`和`CODE_SANDBOX_TOKEN`。默认关闭内网安全检查，如需开启需设置通用环境变量`CHECK_INTERNAL_IP=true`，该变量适用于fastgpt、fastgpt-pro、fastgpt-sandbox。
### 2. 镜像版本更新
将FastGPT官方镜像tag更新为`v4.14.9.5`，商业版镜像同步使用该tag；`fastgpt-plugin`镜像tag更新为`v0.5.5`；`sandbox`镜像tag更新为`v4.14.9.1`。`mcp_server`与`AIProxy`组件无需更新。

## 注意事项与细节说明
接口变更方面，`/api/core/chat/getPaginationRecords`接口新增`useAgentSandbox:boolean`返回字段，用于标识本轮对话是否使用虚拟机工具；同时计划移除`llmModuleAccount`和`historyPreviewLength`字段，已使用这些字段的项目需尽快完成适配。
新增功能中，AI虚拟机工具目前仅云服务开放使用，下个版本将推出轻量部署方案；此外还支持微信个人号发布渠道、AgentV2上下文暂停态适配，封装了logger SDK并增加Metrics追踪，知识库单个数据更新时会同步更新collection的更新时间，表单输入文件时支持预览文件。
优化内容包括API知识库同步时增加更多fallback获取文件名方式、HTTP工具新增SSRF防御、兼容更多MCP JsonSchema字段、优化工作流运行池逻辑，以及使用Tarjan SCC算法替代DSC处理工作流edges分组，解决复杂循环无法运行的问题，系统工具集不再显示版本选项。
修复的问题包括工作流嵌套插件时未保留运行详情、更新MCP toolset后无法正常调用、API知识库文件列表搜索框丢失、工作流变量含`$.`时替换异常、引用agent工具时获取版本异常、模型切换参数未移除导致调用失败、分享链接关闭后历史记录无法展示、工作流预览弹窗重新打开丢失表单内容、订阅套餐自定义字段未生效、login接口存在异步session问题、判断器arrayAny类型无判断条件可选、视频音频自定义文件类型流程开始无文件链接变量、用户输入框消息未转义为Markdown格式、AgentV2部分上下文拼接错误、login接口安全风险，以及工作流工具未连接结束节点时嵌套调用导致父工作流无法停止等问题。此外还修复了商业版开发时monorepo指向不同react导致需重装包的代码优化问题。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/4149
