---
title: FastGPT V4.16.0-beta1版本升级操作与验证指南
slug: /zh/deploy/upgrade-v4-16-0-beta1
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-16/41601
source_type: 官方文档
---

# FastGPT V4.16.0-beta1版本升级操作与验证指南

## 这个版本改了什么
本版本对Agent Sandbox架构、HTTP工具配置、沙盒依赖及组件镜像进行了调整。具体包括将App Chat的Agent Sandbox从“每个对话一个实例”调整为“同一App、同一用户共享一个实例”；将手动模式HTTP工具的数组参数改为标准JSON Schema；移除E2B Sandbox Provider，需切换为opensandbox或sealosdevbox；新增多项沙盒配置变量，调整代理环境变量要求，同时更新各组件镜像版本。

## 升级前要确认的事
需确认网关对ws和http端口的支持情况，若不支持同端口则需设置PREVIEW_PORT。启用沙盒的环境需更新fastgpt-app和fastgpt-pro的环境变量，弃用AGENT_SANDBOX_DISK_MB及E2B相关变量，新增AGENT_SANDBOX_PREVIEW_PROXY_URL和VM_VOLUME_NAME_PREFIX等变量。需确认此前是否启用过Agent Sandbox或创建过手动HTTP工具，需执行对应迁移步骤。需使用本版本配套镜像，禁止新旧版本混合部署。配置的Agent Sandbox代理域名建议与FastGPT主站使用不同origin，同源部署可能带来安全风险。

## 升级步骤（照做）
1. 更新Agent-sandbox-proxy环境变量（可选）：若网关不支持ws和http同端口，设置PREVIEW_PORT，配置示例为：
```dotenv
# ws和http服务的端口
PORT=1006
# http服务的端口，可以覆盖 PORT
PREVIEW_PORT=1007
```
访问地址以http或https开头，可通过https://{{host}}/health确认访问。
2. 更新fastgpt-app和fastgpt-pro环境变量：新增AGENT_SANDBOX_PREVIEW_PROXY_URL和VM_VOLUME_NAME_PREFIX，弃用AGENT_SANDBOX_DISK_MB及E2B相关变量，可按需配置AGENT_SANDBOX_CPU_COUNT等可选变量。
3. 镜像更新：将fastgpt-app、fastgpt-pro镜像tag更新为v4.16.0-beta1，fastgpt-plugin为v1.1.0-beta1，agent-sandbox-volumn和agent-sandbox-proxy为v0.3.0-beta4。
4. 迁移Agent Sandbox数据（启用过的需执行）：先执行dry-run命令：
```bash
curl -X POST 'https://你的域名/api/admin/4160/initUserSandbox' \
  -H 'Content-Type: application/json' \
  -H 'rootkey: 你的ROOT_KEY' \
  -d '{"dryRun":true}'
```
查看结果后执行正式迁移，若需跳过缺失source的分组，添加skipError:true参数：
```bash
curl -X POST 'https://你的域名/api/admin/4160/initUserSandbox' \
  -H 'Content-Type: application/json' \
  -H 'rootkey: 你的ROOT_KEY' \
  -d '{"dryRun":false,"skipError":true}'
```
5. 迁移HTTP工具数据（创建过手动HTTP工具的需执行）：先执行dry-run命令：
```bash
curl -X POST 'https://你的域名/api/admin/4160/initHttpToolSchema' \
  -H 'Content-Type: application/json' \
  -H 'rootkey: 你的ROOT_KEY' \
  -d '{"dryRun":true}'
```
确认后执行正式迁移命令。

## 升级后怎么验证
1. 访问https://{{host}}/health确认agent-sandbox-proxy可访问；2. 执行Agent Sandbox迁移命令后，检查返回结果中normalization.pendingCount、failedCount均为0，normalizationBlocked为false，确认迁移完成；3. 查看HTTP工具配置，确认数组参数已转换为标准JSON Schema；4. 启动Agent Sandbox，验证功能正常。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-16/41601)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
