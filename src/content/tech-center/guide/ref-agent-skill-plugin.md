---
title: FastGPT 配置与开发参考：Agent、技能与插件（106 篇清单）
slug: /zh/guide/ref-agent-skill-plugin
page_type: 问题清单聚合页
source: https://doc.fastgpt.cn/zh-CN/guide/build/skill/intro
source_type: 站内已发布文档的程序化归类
check_day: 2026-10-19
article_section: 配置与开发参考
is_part_of: FastGPT 技术中心
date_modified: 2026-10-26
---

# FastGPT 配置与开发参考：Agent、技能与插件

本页汇总站内已发布的对话 Agent、技能、系统插件、MCP 与沙盒的配置相关文档，共 106 篇，按标题排序列出。

## 这一类文档通常在讲什么

1. 对话 Agent 的提示词、虚拟机与调试功能怎样配置
2. 技能怎样开发、发布、回滚与绑定到智能体
3. 系统插件、MCP 服务与沙盒的部署和环境变量

若问题与上述三个方向都不匹配，可返回[配置与开发参考全景](/zh/guide/reference-overview)查找Agent、技能与插件接入之外的关联主题。

## 阅读顺序建议

1. 先从表中选择与Agent、技能与插件接入当前问题直接对应的条目，核对文档适用版本
2. 对照Agent、技能与插件接入的关联条目，列出需要共同配置的依赖项
3. 将Agent、技能与插件接入涉及的设置项逐一与参考资料中的官方说明对照

## 已发布的文档清单（106 篇）

| 文档 |
| --- |
| [FastGPT Agent Sandbox 镜像与环境变量配置说明](/glossary/fastgpt-agent-sandbox-config-2) |
| [FastGPT Agent Sandbox资源与生命周期配置参数说明](/glossary/fastgpt-agent-sandbox-config) |
| [FastGPT Agent V2智能数据分析Agent的业务价值与配置说明](/tutorial/fastgpt-agent-v2-data-analysis) |
| [FastGPT Agent V2智能数据分析Agent的适用场景与操作方法讲解](/reference/fastgpt-agent-v2-data-analysis-scenario) |
| [FastGPT Agent V2虚拟机的核心概念与使用说明](/reference/fastgpt-agentv2-vm-guide) |
| [FastGPT Agent V2虚拟机的配置、使用与运行限制说明](/tutorial/fastgpt-agentv2-vm-usage-2) |
| [FastGPT Agent V2辅助生成与调试功能使用说明](/tutorial/agentv2-augment-debug) |
| [FastGPT AgentV2虚拟机脚本执行限制与容错机制说明](/reference/fastgpt-agentv2-vm-execution-rules) |
| [FastGPT AgentV2通用调试功能的使用说明](/reference/fastgpt-agentv2-general-debug) |
| [FastGPT Agent与日志启用配置的含义与使用说明](/glossary/fastgpt-enable-config-guide) |
| [FastGPT Agent沙箱的配置、镜像源设置及迁移流程说明](/glossary/agent-sandbox-config-migration) |
| [FastGPT Agent虚拟机功能的启用与使用说明](/tutorial/fastgpt-agent-vm-guide) |
| [FastGPT Agent虚拟机生命周期脚本配置与执行方法](/reference/fastgpt-agent-vm-script-lifecycle) |
| [FastGPT Code Sandbox 自建部署环境变量配置速查](/reference/fastgpt-code-sandbox-env-config) |
| [FastGPT MCP Server 功能的配置与调用说明](/tutorial/fastgpt-mcp-server-usage) |
| [FastGPT OpenSandbox 沙盒运行环境的配置与使用说明](/reference/fastgpt-opensandbox-config-guide) |
| [FastGPT support接口与插件JSON序列化问题说明](/glossary/fastgpt-support-json-serialization) |
| [FastGPT 工作流工具调用与终止节点的使用方法](/reference/fastgpt-tool-call-terminate) |
| [FastGPT中AI智能体技能的设计原理与使用说明](/tutorial/fastgpt-skill-design-usage) |
| [FastGPT中API调用与工具调用问题的速查说明](/glossary/fastgpt-api-call-functions-call) |
| [FastGPT中Marker自定义PDF解析工具的使用说明](/glossary/fastgpt-marker-pdf-parser-3) |
| [FastGPT中base64解码工具与部署配置说明](/glossary/fastgpt-base64-decode-config) |
| [FastGPT启用沙盒功能的环境变量更新配置指南](/reference/fastgpt-sandbox-env-update) |
| [FastGPT工作流工具调用节点的配置与使用说明](/node/fastgpt-tool-call-node-config) |
| [FastGPT工作流工具调用节点的配置与运行逻辑说明](/node/fastgpt-workflow-tool-node) |
| [FastGPT工具调用节点的功能、配置及使用注意事项](/node/fastgpt-workflow-tool-call-2) |
| [FastGPT工具调用节点的配置、逻辑与使用说明](/node/fastgpt-workflow-tool-call) |
| [FastGPT平台AI智能体技能的设计原理与使用说明](/tutorial/fastgpt-agent-skill-design) |
| [FastGPT手动模式HTTP工具数组参数数据迁移操作指南](/reference/fastgpt-manual-http-tool-schema-migration) |
| [FastGPT技能初始化脚本的配置、运行与约束说明](/tutorial/fastgpt-skill-initialization-script-2) |
| [FastGPT技能初始化脚本的配置与使用方法](/reference/fastgpt-skill-initialization-script) |
| [FastGPT技能开发与调试的全流程操作与配置方法](/tutorial/fastgpt-skill-development) |
| [FastGPT技能版本发布、快照保存与历史版本回滚指南](/tutorial/fastgpt-skill-version-publish-rollback) |
| [FastGPT技能的创建、管理与调试操作说明](/tutorial/fastgpt-skill-development-debug) |
| [FastGPT技能脚本智能去重机制的运行与配置说明](/tutorial/fastgpt-skill-deduplication-mechanism) |
| [FastGPT插件local-pool运行时的参数配置与调用流程说明](/reference/fastgpt-plugin-local-pool-runtime) |
| [FastGPT插件开发check验证与部署环境变量配置指南](/glossary/fastgpt-plugin-check-env-config) |
| [FastGPT插件开发提交前验证事项说明](/glossary/fastgpt-plugin-dev-validation) |
| [FastGPT插件生态相关仓库的含义与使用方法说明](/glossary/fastgpt-plugin-repos-guide) |
| [FastGPT插件的构建、检查与打包操作速查](/reference/fastgpt-plugin-build-check-pack) |
| [FastGPT插件系统的安装、管理与使用边界说明](/tutorial/fastgpt-plugin-management-guide) |
| [FastGPT插件系统的安装、管理与开发配置说明](/tutorial/fastgpt-plugin-install-config) |
| [FastGPT插件项目的仓库结构与分层设计说明](/reference/fastgpt-plugin-repo-structure) |
| [FastGPT智能体从工具到技能的核心设计原理说明](/tutorial/fastgpt-tool-skill-design) |
| [FastGPT智能体绑定与调用已发布技能的操作说明](/tutorial/agent-skill-integration) |
| [FastGPT智能体调用技能的配置与操作说明](/tutorial/fastgpt-agent-skill-invocation) |
| [FastGPT沙盒V2可使用的JavaScript第三方模块说明](/node/fastgpt-sandbox-v2-js-modules) |
| [FastGPT沙盒V2节点可直接使用的Python白名单模块速查](/reference/fastgpt-sandbox-v2-python-whitelist-modules) |
| [FastGPT沙盒v2节点JavaScript白名单模块使用规则说明](/glossary/fastgpt-sandbox-v2-js-whitelist-modules) |
| [FastGPT沙盒v2节点的JavaScript代码示例使用指南](/reference/fastgpt-sandbox-v2-js-examples) |
| [FastGPT沙盒v2节点的Python代码使用配置与示例](/node/fastgpt-sandbox-python-examples) |
| [FastGPT系统工具在线上传、更新与权限管理操作指南](/tutorial/fastgpt-system-tool-upload) |
| [FastGPT系统工具在线上传、更新及权限管理操作指南](/tutorial/fastgpt-system-tool-upload-2) |
| [FastGPT系统工具插件的开发流程与配置说明](/tutorial/fastgpt-system-tool-development) |
| [FastGPT系统工具插件的开发配置与使用方法](/tutorial/fastgpt-system-tool-development-2) |
| [FastGPT系统插件开发前需明确的核心准备事项](/reference/fastgpt-system-plugin-prep) |
| [FastGPT系统插件本地调试的操作方法与边界规则](/reference/fastgpt-plugin-local-debug) |
| [FastGPT系统插件构建流程相关具体使用规范说明](/glossary/fastgpt-plugin-build-guide) |
| [FastGPT系统插件的创建方法与提交前验证要求](/glossary/fastgpt-plugin-dev-checklist) |
| [FastGPT网页知识库同步爬虫工具的配置与使用说明](/glossary/fastgpt-web-knowledge-crawler) |
| [FastGPT虚拟机生命周期状态去重机制说明](/reference/fastgpt-vm-state-deduplication) |
| [介绍FastGPT MCP Server的定义与使用流程](/glossary/fastgpt-mcp-server-usage-3) |
| [介绍FastGPT MCP服务器的配置与调用方法](/glossary/fastgpt-mcp-server-usage) |
| [介绍FastGPT Plugin的定义、使用规则与常见误区](/glossary/fastgpt-plugin-overview) |
| [介绍FastGPT中MCP Server的功能与使用方法](/glossary/fastgpt-mcp-server-guide) |
| [介绍FastGPT中MCP Server的定义与配置方法](/glossary/fastgpt-mcp-server-usage-2) |
| [介绍FastGPT对话Agent V2的辅助生成与调试功能](/tutorial/fastgpt-agentv2-debug-assist) |
| [使用Agent工具开发FastGPT官方插件的完整操作流程](/reference/fastgpt-plugin-agent-development) |
| [具体配置并使用MCP server调用FastGPT应用的操作方法](/tutorial/use-mcp-server-fastgpt) |
| [启动FastGPT插件本地远程调试会话的具体操作步骤](/reference/fastgpt-plugin-local-remote-debug) |
| [在FastGPT中创建、测试MCP工具集并调用相关工具功能](/tutorial/fastgpt-mcp-toolset-usage) |
| [在FastGPT中创建、配置与调用MCP工具集的具体方法](/tutorial/fastgpt-mcp-toolset-config) |
| [在FastGPT中配置企业邮件撰写对话Agent并验证效果](/tutorial/fastgpt-enterprise-email-assistant) |
| [在FastGPT智能体应用中集成与调用已发布的技能](/tutorial/fastgpt-agent-skill-integration) |
| [在FastGPT沙盒中使用httpRequest发起外部HTTP请求](/reference/fastgpt-sandbox-http-request) |
| [实现FastGPT单系统工具的开发配置与规范说明](/tutorial/fastgpt-single-tool-development) |
| [排查FastGPT工具调用与配置参数使用异常的方法](/glossary/fastgpt-parameter-troubleshooting) |
| [获取FastGPT插件请求的非流式与流式响应数据](/api/fastgpt-plugin-response-fetch) |
| [获取并配置FastGPT的MCP服务器调用地址](/reference/fastgpt-mcp-server-usage) |
| [讲解FastGPT Agent V2虚拟机沙箱的配置与使用方法](/tutorial/fastgpt-agentv2-vm-usage) |
| [讲解FastGPT自部署的SSO服务与插件调试配置](/glossary/fastgpt-self-deploy-config) |
| [详细介绍FastGPT工具节点的运行条件与调用逻辑](/node/fastgpt-tool-call-logic) |
| [详细介绍FastGPT自定义系统工具集的开发配置方法](/tutorial/fastgpt-custom-toolset-config) |
| [详细介绍FastGPT高级编排中工具调用节点的配置与使用方法](/tutorial/fastgpt-advanced-tool-call-nodes) |
| [详细讲解FastGPT中local-pool运行时与Pod插件进程的使用规则](/glossary/fastgpt-local-pool-pod-guide) |
| [说明FastGPT Agent V2中提示词的定义与配置使用方法](/glossary/fastgpt-agentv2-prompt-config) |
| [说明FastGPT Agent V2虚拟机的定义与使用方法](/glossary/fastgpt-agent-v2-vm-usage) |
| [说明FastGPT中group参数相关的HTTP插件请求失败问题](/glossary/fastgpt-group-parameter-failure) |
| [说明FastGPT中的mineru PDF解析工具的含义与使用方法](/glossary/fastgpt-mineru-pdf-parser) |
| [说明FastGPT工具节点的运行条件、参数要求与调用逻辑](/tutorial/fastgpt-tool-node-operation-logic) |
| [说明FastGPT技能的版本发布、快照保存与历史回滚操作方法](/tutorial/skill-version-publish-rollback) |
| [说明FastGPT智能体技能调用的配置与使用方法](/glossary/fastgpt-agent-skill-invocation) |
| [说明FastGPT智能体技能集成功能的使用方法](/glossary/fastgpt-agent-skill-integration) |
| [说明在FastGPT智能体应用中绑定技能的完整操作流程](/tutorial/fastgpt-agent-skill-binding) |
| [配置 FastGPT Agent Sandbox Proxy 服务的环境变量与端口](/reference/fastgpt-agent-sandbox-proxy-config) |
| [配置FastGPT Agent的提示词功能与关联设置](/tutorial/fastgpt-agent-prompt-settings) |
| [配置FastGPT MCP服务器的身份代理请求头参数与方法](/integration/fastgpt-mcp-proxy-auth-headers) |
| [配置FastGPT Plugin Server的远程调试网关环境变量](/reference/fastgpt-plugin-debug-gateway-config) |
| [配置FastGPT使用Sealos Devbox作为Agent沙盒的相关环境变量](/reference/fastgpt-sealos-devbox-env-config) |
| [配置FastGPT智能数据分析Agent V2的具体操作步骤](/tutorial/fastgpt-data-analysis-agent-v2-setup) |
| [配置FastGPT自部署场景下OpenSandbox服务的环境变量](/reference/fastgpt-opensandbox-env-config) |
| [配置与使用FastGPT MCP Server对外提供应用调用能力](/integration/fastgpt-mcp-server-usage) |
| [配置与运行FastGPT技能初始化脚本的操作指南](/tutorial/fastgpt-skill-initialization-script) |
| [配置对话Agent V2的提示词、虚拟机及技能专项配置项](/tutorial/fastgpt-agentv2-special-config) |
| [配置对话Agent V2的提示词、运行环境与技能扩展能力](/tutorial/agentv2-special-config) |
| [配置并使用FastGPT MCP Server调用已创建的AI应用](/integration/fastgpt-mcp-server-config) |

## 这份清单的适用范围

这份Agent、技能与插件接入清单依据文档标题归类；跨主题的问题还需查阅关联目录。使用时先核对以下条件：

- Agent、技能与插件接入的文档版本与当前部署版本是否一致
- 当前版本是否包含Agent、技能与插件接入所需的商业版功能
- Agent、技能与插件接入涉及的环境依赖是否与私有化部署文档一致

## 继续阅读

- 从Agent、技能与插件接入返回[FastGPT 配置与开发参考全景](/zh/guide/reference-overview)
- 核对Agent、技能与插件接入前阅读[版本升级与变更说明](/zh/guide/ref-upgrade-and-changes)
- 配合Agent、技能与插件接入查看[模型接入与配置](/zh/guide/ref-model-integration)

## 参考资料

- [技能基础介绍](https://doc.fastgpt.cn/zh-CN/guide/build/skill/intro)
- [插件系统说明](https://doc.fastgpt.cn/zh-CN/plugin/intro)

## 需要进一步确认时

这些条目可用于核对Agent、技能与插件接入的配置前提。确定实施方式前，建议准备当前版本、部署形态和一组真实样本；涉及现有系统的数据边界或业务流程时，可据此进行商务咨询并评估实施条件。

- 商务咨询：结合现有系统讨论Agent、技能与插件接入的实施条件
- 立即开始：用真实样本验证Agent、技能与插件接入
- 定价：按Agent、技能与插件接入的部署需求比较可选形态
