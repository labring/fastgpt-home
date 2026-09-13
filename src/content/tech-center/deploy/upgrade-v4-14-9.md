---
title: FastGPT V4.14.9版本升级操作与功能变更说明
slug: /zh/deploy/upgrade-v4-14-9
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/4149
source_type: 官方文档
---

# FastGPT V4.14.9版本升级操作与功能变更说明

## 这个版本改了什么
接口层面，`/api/core/chat/getPaginationRecords` 接口新增返回 `useAgentSandbox:boolean` 字段，用于标识本轮对话是否使用虚拟机工具，同时计划移除 `llmModuleAccount` 和 `historyPreviewLength` 字段。新增功能包括AI虚拟机功能、微信个人号发布渠道支持、AgentV2上下文适配暂停态、logger sdk封装与Metrics追踪、知识库单数据更新同步collection更新时间、表单文件预览共6项。优化内容包含API知识库同步增加更多文件名获取方式、HTTP工具新增SSRF防御、兼容更多MCP JsonSchema字段、优化工作流运行池逻辑、使用Tarjan SCC算法替代DSC进行edges分组解决循环问题、系统工具集不显示版本共6项。修复了工作流嵌套插件运行详情保留、MCP工具调用、API知识库文件列表搜索框、工作流变量特殊值替换等16项问题，另有商业版开发依赖调整的代码优化项。

## 升级前要确认的事
升级前需确认现有部署中是否存在使用 `llmModuleAccount` 和 `historyPreviewLength` 字段的自定义接口调用，同时梳理代码运行沙盒的原有环境变量配置。若需开启内网安全检查，需提前准备对应环境变量的配置参数。

## 升级步骤（照做）
1. 更新环境变量：将原有 `SANDBOX_URL` 和 `SANDBOX_TOKEN` 分别重命名为 `CODE_SANDBOX_URL` 和 `CODE_SANDBOX_TOKEN`。若需开启内网安全检查，需设置环境变量 `CHECK_INTERNAL_IP=true`，该变量适用于fastgpt、fastgpt-pro、fastgpt-sandbox。
2. 更新对应镜像：FastGPT 镜像 tag 使用 v4.14.9.5，FastGPT 商业版镜像 tag 使用 v4.14.9.5，fastgpt-plugin 镜像 tag 使用 v0.5.5，sandbox 镜像 tag 使用 v4.14.9.1。mcp_server 与 AIProxy 无需更新。

## 升级后怎么验证
升级完成后，可通过以下方式验证：调用 `/api/core/chat/getPaginationRecords` 接口，确认返回结果包含 `useAgentSandbox` 字段；验证代码运行沙盒功能的调用逻辑，确认环境变量配置生效；测试工作流、知识库、微信个人号发布渠道等核心功能，确认无异常报错。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/4149)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
