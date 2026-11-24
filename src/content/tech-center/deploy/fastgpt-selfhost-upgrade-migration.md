---
title: FastGPT v4.15.0自托管升级的迁移脚本执行指南
slug: /zh/deploy/fastgpt-selfhost-upgrade-migration
page_type: 部署场景
source: https://doc.fastgpt.cn/self-host/upgrading/4-15/41500
source_type: 官方文档小节
---

# FastGPT v4.15.0自托管升级的迁移脚本执行指南

## 前置准备与注意事项
执行迁移脚本前需完成三项核心准备：备份MongoDB、对象存储与当前部署配置；将fastgpt-app或fastgpt-pro升级至包含Root管理员接口的镜像版本；准备可访问FastGPT的{{host}}与{{rootkey}}，所有迁移接口均需携带rootkey请求头。
正式版将同步`{ appId, chatId }`与`{ sourceType, appId, chatId }`两个唯一索引，若chats集合中存在重复的appId+chatId，开启`SYNC_INDEX=true`后可能触发`E11000 duplicate key error`，导致唯一约束无法生效，因此建议执行重复数据清理步骤。

## 迁移脚本执行步骤
### 6.1 清理重复的appId-chatId（建议执行）
先执行dry-run模式的检查命令，该步骤不会删除任何数据，所有环境建议至少执行一次：
```bash
curl -X POST 'https://{{host}}/api/admin/dataClean/cleanupDuplicateChats' \
-H 'Content-Type: application/json' \
-H 'rootkey: {{rootkey}}' \
-d '{"dryRun":true,"sampleLimit":20}'
```
查看返回结果中的`duplicateDocumentCount`，若该值为0则无需执行正式清理；若大于0，确认返回的重复样本无误后，执行正式清理命令：
```bash
curl -X POST 'https://{{host}}/api/admin/dataClean/cleanupDuplicateChats' \
-H 'Content-Type: application/json' \
-H 'rootkey: {{rootkey}}' \
-d '{"dryRun":false,"sampleLimit":20}'
```
清理策略为每组重复的appId+chatId保留updateTime最新的一条数据，若时间相同则以_id倒序作为兜底，仅删除chats会话头，不涉及chatitems、chat_item_responses中的消息内容。清理完成后保持`SYNC_INDEX=true`并重启服务，可通过MongoDB命令确认索引已生效：
```javascript
db.chats.getIndexes().filter((idx) => ['appId_1_chatId_1', 'sourceType_1_appId_1_chatId_1'].includes(idx.name));
```
### 6.2 Workflow V1->V2迁移（可选）
仅从<4.8版本直接升级或保留V1 Workflow数据的环境需执行该步骤，先执行dry-run校验：
```bash
curl -X POST 'https://{{host}}/api/admin/dataClean/v1WorkflowToV2' \
-H 'Content-Type: application/json' \
-H 'rootkey: {{rootkey}}' \
-d '{"dryRun":true}'
```
确认返回统计后执行正式迁移，若已完成迁移或从v4.8及以上版本升级则可跳过该步骤。
### 6.3 Workflow脏数据清理（必须）
该步骤需在6.2之后执行（若已执行6.2），先执行dry-run扫描：
```bash
curl -X POST 'https://{{host}}/api/admin/dataClean/initWorkflowData' \
-H 'Content-Type: application/json' \
-H 'rootkey: {{rootkey}}' \
-d '{"dryRun":true,"batchSize":1000,"writeBatchSize":10}'
```
确认存在可修复数据后执行正式修复，生产环境可调低`writeBatchSize`降低写入压力，未通过Zod校验的文档仅会在响应中报告，不会被写入数据库。
### 6.4 归档旧沙盒（可选）
仅针对使用过旧版sandbox workspace的环境，先执行检查命令，不会触发实际归档：
```bash
curl -X POST 'https://{{host}}/api/admin/dataClean/initSandboxArchive' \
-H 'Content-Type: application/json' \
-H 'rootkey: {{rootkey}}' \
-d '{"runArchive":false,"inactiveDays":0}'
```
若需立即归档满足条件的不活跃工作区，执行`runArchive:true`的命令即可。

## 后续验证
所有迁移脚本执行完成后，需确认服务正常启动，可通过MongoDB索引检查、业务功能测试等方式验证迁移结果，确保数据一致性与服务稳定性。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/4-15/41500)
