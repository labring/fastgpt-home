---
title: FastGPT V4.16.0版本升级的操作与验证方法
slug: /zh/deploy/upgrade-v4-16-0
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-16/4160
source_type: 官方文档
---

# FastGPT V4.16.0版本升级的操作与验证方法

## 这个版本改了什么
V4.16.0版本更新了Agent沙盒相关依赖与配置逻辑，新增AGENT_SANDBOX_PREVIEW_PROXY_URL等沙盒配置环境变量，移除E2B相关配置项。调整系统模型初始化及保存的校验规则，将手动模式HTTP工具的数组参数改为标准JSON Schema，重构Agent Sandbox实例为同一应用、同一用户共享模式。同步更新fastgpt-app、fastgpt-pro、fastgpt-plugin、agent-sandbox-volumn、agent-sandbox-proxy的镜像版本。

## 升级前要确认的事
需确认网关是否支持WS和HTTP在同一端口，不支持则需配置PREVIEW_PORT环境变量。启用沙盒的环境需更新fastgpt-app与fastgpt-pro的环境变量，移除AGENT_SANDBOX_DISK_MB及E2B相关变量。需提前准备ROOT_KEY，用于执行后续数据迁移命令。启用Agent Sandbox的环境需完成历史数据迁移，所有环境必须使用本版本配套镜像，禁止新旧版本混合部署。

## 升级步骤（照做）
1. 更新agent-sandbox-proxy环境变量，配置PORT与可选的PREVIEW_PORT，在fastgpt-app和fastgpt-pro中新增AGENT_SANDBOX_PREVIEW_PROXY_URL与VM_VOLUME_NAME_PREFIX变量。2. 更新各镜像tag：fastgpt-app、fastgpt-pro为v4.16.0，fastgpt-plugin为v1.1.0，agent-sandbox-volumn、agent-sandbox-proxy为v0.3.0。3. 执行系统模型配置清洗：先运行dry-run命令`curl -X POST 'https://你的域名/api/admin/dataClean/cleanSystemModelConfigs' -H 'Content-Type: application/json' -H 'rootkey: 你的ROOT_KEY' -d '{"dryRun":true}'`，确认invalidSamples无待处理数据后，执行正式清洗命令，将dryRun改为false。4. 执行HTTP工具数据迁移：先运行dry-run命令`curl -X POST 'https://你的域名/api/admin/4160/initHttpToolSchema' -H 'Content-Type: application/json' -H 'rootkey: 你的ROOT_KEY' -d '{"dryRun":true}'`，确认结果后执行正式迁移命令，将dryRun改为false。5. 若启用过Agent Sandbox，执行沙盒数据迁移：先运行dry-run命令`curl -X POST 'https://你的域名/api/admin/4160/initUserSandbox' -H 'Content-Type: application/json' -H 'rootkey: 你的ROOT_KEY' -d '{"dryRun":true}'`，查看结果后执行正式迁移命令，将dryRun改为false；若仅出现Sandbox source is missing or deleted失败，可添加参数跳过残留Sandbox。

## 升级后怎么验证
访问agent-sandbox-proxy的`https://{{host}}/health`接口确认服务正常。重新执行各迁移命令的dry-run模式，确认系统模型清洗的wouldUpdate为0，HTTP工具迁移的changedDocumentCount为0，沙盒迁移处理完成。测试Agent Sandbox功能、系统模型配置加载、手动HTTP工具调用是否正常工作。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-16/4160)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
