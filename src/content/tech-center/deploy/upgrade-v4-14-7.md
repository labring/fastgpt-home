---
title: FastGPT V4.14.7版本升级操作与变更说明
slug: /zh/deploy/upgrade-v4-14-7
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/4147
source_type: 官方文档
---

# FastGPT V4.14.7版本升级操作与变更说明

## 这个版本改了什么
本次版本新增基于上下文工程的Agent测试模式、LLM请求追踪功能、知识库搜索指定collectionIds筛选、模型监控缓存命中率等功能；优化Chat Agent与知识库选择UX、MCP字段过滤、工具调用逻辑等；修复工作流全局变量、AI节点渲染、MCP权限控制等11项问题；新增获取用户信息工具与kimi2.5模型预设；完善向量数据库与packages/global单元测试覆盖率。

## 升级前要确认的事
需准备好环境变量中的rootkey与FastGPT域名；确认mcp_server、sandbox、mongo无需更新；需移除旧的LOG_LEVEL、STORE_LOG_LEVEL、SIGNOZ_BASE_URL、SIGNOZ_SERVICE_NAME、SIGNOZ_STORE_LEVEL环境变量，新增六个通用日志相关环境变量；若从4.14.6版本升级，可跳过系统插件更新步骤。

## 升级步骤（照做）
1. 更新镜像：FastGPT镜像tag设为v4.14.7.2，商业版镜像tag设为v4.14.7.1，fastgpt-plugin镜像tag设为v0.5.4，AIProxy镜像tag设为0.3.15。
2. 更新系统环境变量，移除指定旧变量，新增LOG_ENABLE_CONSOLE、LOG_CONSOLE_LEVEL、LOG_ENABLE_OTEL、LOG_OTEL_LEVEL、LOG_OTEL_SERVICE_NAME、LOG_OTEL_URL六个变量，适用于fastgpt、fastgpt-pro、fastgpt-plugin、fastgpt-mcp-server。
3. 更新系统插件：可前往插件市场更新，或下载指定zip包安装base64Decode、dallle3、docDiff等工具；已在4.14.6升级过插件可跳过此步。
4. 执行升级脚本：在终端发起POST请求，命令为`curl --location --request POST 'https://{{host}}/api/admin/initv4147' --header 'rootkey: {{rootkey}}' --header 'Content-Type: application/json'`，替换{{rootkey}}为环境变量rootkey，{{host}}为FastGPT域名。
5. 调整接口解析：/api/core/chat/getPaginationRecords的value解析需直接判断text、tools等字段是否存在。

## 升级后怎么验证
可通过检查日志系统运行状态、测试LLM请求追踪功能、验证知识库筛选与对话日志过滤功能、确认工作流与工具调用正常、调用指定接口验证解析逻辑等方式完成升级验证，同时检查各服务启动状态是否正常。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/4147)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
