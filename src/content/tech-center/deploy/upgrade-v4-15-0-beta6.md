---
title: FastGPT V4.15.0-beta6版本升级操作与验证指南
slug: /zh/deploy/upgrade-v4-15-0-beta6
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/41506
source_type: 官方文档
---

# FastGPT V4.15.0-beta6版本升级操作与验证指南

## 这个版本改了什么
该版本调整对话标题生成模型配置方式，不再通过环境变量CHAT_TITLE_MODEL配置，改为在「模型配置」的「默认模型配置」中选择「对话标题模型」。新增Agent Sandbox包管理镜像源配置，支持自定义npm、PyPI镜像，商业版支持本地直连FastGPT调试插件。优化LLM请求追踪记录的团队隔离逻辑，将唯一索引从单字段requestId调整为复合索引{teamId: 1, requestId: 1}。Skill Edit对话迁移至标准Chat存储模型，修复chat/completions接口返回nodeResponse时的字段过滤问题，抽象chat接口为平台通用逻辑，PDF解析兼容linux/arm64 + Alpine/musl架构并回退至pdfjs解析方案。

## 升级前要确认的事
需确认是否配置过CHAT_TITLE_MODEL环境变量，若有需准备移除fastgpt和fastgpt-pro的对应环境变量。需确认新的Chat source索引是否已创建，若自托管环境关闭了SYNC_INDEX，升级后需执行一次索引同步以移除旧的requestId_1唯一索引。升级前的LLM请求追踪记录无teamId字段，升级后无法通过requestId查询，需提前导出相关日志或保留原始请求信息。若启用Agent Sandbox，需提前准备对应镜像更新。

## 升级步骤（照做）
1. 可选配置Agent Sandbox镜像源，添加以下环境变量：AGENT_SANDBOX_NPM_REGISTRY、AGENT_SANDBOX_PYPI_INDEX_URL。
2. 更新镜像：fastgpt-app镜像tag为v4.15.0-beta6，fastgpt-pro镜像tag为v4.15.0-beta6，fastgpt-plugin镜像tag为v1.0.0-beta6，aiproxy镜像tag为v0.6.2。若启用Agent Sandbox，需同步更新fastgpt-agent-sandbox-proxy和fastgpt-agent-sandbox镜像tag为v0.2.0-beta3。
3. 执行迁移接口清理旧Skill Debug对话数据：首先执行dry-run模式统计，命令为curl -X POST 'https://你的域名/api/admin/4150/init4150-beta6' -H 'Content-Type: application/json' -H 'rootkey: 你的ROOT_KEY' -d '{"dryRun":true}'。确认返回结果无误后，修改dryRun为false执行迁移和删除，命令为curl -X POST 'https://你的域名/api/admin/4150/init4150-beta6' -H 'Content-Type: application/json' -H 'rootkey: 你的ROOT_KEY' -d '{"dryRun":false}'。
4. 若自托管环境关闭了SYNC_INDEX，需执行一次索引同步以更新LLM请求追踪记录的唯一索引。

## 升级后怎么验证
检查「模型配置」页面是否可选择「对话标题模型」。验证Agent Sandbox初始化时是否正确写入镜像源配置。验证LLM请求追踪记录可按团队查询，chat/completions接口返回nodeResponse时包含q/a/index字段。验证Skill Edit对话可正常存储与读取，旧Skill Debug对话已被清理。检查PDF解析在linux/arm64 + Alpine/musl架构下可正常工作。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/41506)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
