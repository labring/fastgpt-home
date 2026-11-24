---
title: FastGPT 4.15.06 Skill Debug迁移清理指南
slug: /zh/deploy/fastgpt-41506-skill-debug-migration
page_type: 部署场景
source: https://doc.fastgpt.cn/self-host/upgrading/4-15/41506
source_type: 官方文档小节
---

# FastGPT 4.15.06 Skill Debug迁移清理指南

本版本将Skill Edit对话迁移到标准Chat存储模型。历史Skill Debug数据曾将skillId写入Chat三表的物理appId字段，且未携带sourceType；历史sandbox实例也需要补齐sourceType/sourceId字段。升级后旧Skill Debug对话不会被新Skill Edit对话读取，建议执行一次root-only初始化接口完成sandbox实例字段迁移并清理旧Skill Debug对话。该接口仅用于本次升级迁移，不作为OpenAPI对外接口。

## 试运行与正式执行步骤
首先确认新的Chat source索引已创建。该初始化接口默认开启dry-run模式，仅统计不执行删除或迁移操作，执行命令如下：
```bash
curl -X POST 'https://你的域名/api/admin/4150/init4150-beta6' \
-H 'Content-Type: application/json' \
-H 'rootkey: 你的ROOT_KEY' \
-d '{"dryRun":true}'
```
查看返回结果确认统计信息无误后，将dryRun参数改为false，执行正式迁移和清理：
```bash
curl -X POST 'https://你的域名/api/admin/4150/init4150-beta6' \
-H 'Content-Type: application/json' \
-H 'rootkey: 你的ROOT_KEY' \
-d '{"dryRun":false}'
```
接口参数dryRun的默认值为true，作用是控制是否仅统计不执行实际操作。该接口会全量读取skills表，不支持仅传入部分Skill ID，原因是sandbox实例迁移需要先识别所有Skill，再将未命中Skill且带appId的实例统一视为App sandbox，仅扫描部分Skill会导致未扫描到的Skill sandbox被误标为App。

## 迁移清理逻辑说明
该接口的迁移逻辑包括以下部分：
1.  查询skills表获取全部_id。
2.  对缺少sourceType或sourceId的agent_sandbox_instances，若匹配appId=skillId或metadata.skillId=skillId，写入sourceType=skillEdit和sourceId=skillId，并清理旧appId/metadata.skillId字段。
3.  对剩余缺少sourceType或sourceId、未命中Skill且存在非空appId的sandbox实例，写入sourceType=app和sourceId=appId，并清理旧appId/metadata.skillId字段。
4.  对已具备sourceType/sourceId但残留旧appId或metadata.skillId的sandbox实例，仅清理旧字段，不覆盖现有标准归属。
5.  非dry-run模式下，会删除无appId、appId为空或无法通过metadata.skillId归属到Skill的orphan sandbox的远端实例、OpenSandbox volume、S3归档和Mongo记录；dry-run模式仅通过orphanMatchedCount统计此类实例。
6.  清理旧Skill Debug chat：先用apps表去除与App _id重复的Skill ID，再删除剩余Skill ID下匹配到的旧chats、chatitems、chat_item_responses和旧格式Chat S3文件前缀。
该接口不会回填几亿条历史App Chat的sourceType。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/4-15/41506)
