---
title: FastGPT 4.15.0-beta7版本升级操作与配置调整说明
slug: /zh/deploy/upgrade-v4-15-0-beta7
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/41507
source_type: 官方文档
---

# FastGPT 4.15.0-beta7版本升级操作与配置调整说明

## 这个版本改了什么
该版本为4.15.0正式版最后一个beta版本。主要变更包括：开源版config.json配置文件移除，替换为指定环境变量，涵盖MCP代理、PDF解析、向量检索参数、知识库处理并发控制等配置；商业版需新增SSE_MCP_SERVER_PROXY_ENDPOINT环境变量；OpenSandbox Volume Manager配置变为必填，环境变量重命名为AGENT_SANDBOX_OPENSANDBOX_VOLUME_MANAGER_URL与AGENT_SANDBOX_OPENSANDBOX_VOLUME_MANAGER_TOKEN；镜像tag更新为v4.15.0-beta7；新增工作流V1转V2迁移、V2脏数据清洗、重复Chat会话头清理三个数据清洗脚本。

## 升级前要确认的事
部署过4.15.0-beta版本的用户，需先升级到该版本，完成beta期间所有升级操作后，再更新镜像至正式版。仅部署过<4.8版本FastGPT的用户，需执行工作流V1转V2迁移操作。执行数据清洗接口需准备ROOT_KEY。

## 升级步骤（照做）
1. 配置更新：开源版替换config.json为指定环境变量；商业版在fastgpt服务中新增SSE_MCP_SERVER_PROXY_ENDPOINT=http://localhost:3003环境变量，并更新OpenSandbox相关环境变量。
2. 镜像更新：将fastgpt-app与fastgpt-pro镜像tag更新为v4.15.0-beta7。
3. 工作流迁移（仅<4.8版本用户）：先执行dry-run模式的V1转V2迁移接口：
```bash
curl -X POST 'https://你的域名/api/admin/dataClean/v1WorkflowToV2' \
  -H 'Content-Type: application/json' \
  -H 'rootkey: 你的ROOT_KEY' \
  -d '{"dryRun":true}'
```
确认返回统计无误后，修改dryRun为false执行写入：
```bash
curl -X POST 'https://你的域名/api/admin/dataClean/v1WorkflowToV2' \
  -H 'Content-Type: application/json' \
  -H 'rootkey: 你的ROOT_KEY' \
  -d '{"dryRun":false}'
```
4. V2脏数据清洗：先执行dry-run模式的清洗接口：
```bash
curl -X POST 'https://你的域名/api/admin/dataClean/initWorkflowData' \
  -H 'Content-Type: application/json' \
  -H 'rootkey: 你的ROOT_KEY' \
  -d '{"dryRun":true,"batchSize":1000,"writeBatchSize":10}'
```
确认无误后修改dryRun为false执行写入：
```bash
curl -X POST 'https://你的域名/api/admin/dataClean/initWorkflowData' \
  -H 'Content-Type: application/json' \
  -H 'rootkey: 你的ROOT_KEY' \
  -d '{"dryRun":false,"batchSize":1000,"writeBatchSize":10}'
```
5. 重复Chat会话头清理：先执行dry-run模式的清理接口：
```bash
curl -X POST 'https://你的域名/api/admin/dataClean/cleanupDuplicateChats' \
  -H 'Content-Type: application/json' \
  -H 'rootkey: 你的ROOT_KEY' \
  -d '{"dryRun":true,"sampleLimit":20}'
```
确认无误后修改dryRun为false执行删除。

## 升级后怎么验证
检查服务启动日志，确认配置的环境变量正常加载。测试工作流的保存与运行，确认节点渲染与IO类型判断正常。发起Chat会话，确认无重复会话头数据。访问知识库配置页面，确认PDF解析、向量检索参数生效。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/41507)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
