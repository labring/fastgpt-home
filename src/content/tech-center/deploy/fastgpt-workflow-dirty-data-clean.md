---
title: 修复FastGPT工作流枚举与结构脏数据的操作指南
slug: /zh/deploy/fastgpt-workflow-dirty-data-clean
page_type: 部署场景
source: https://doc.fastgpt.cn/self-host/upgrading/4-15/41507
source_type: 官方文档小节
---

# 修复FastGPT工作流枚举与结构脏数据的操作指南

**问题背景**
部分历史工作流节点会将TypeScript枚举表达式字符串直接写入MongoDB，错误格式示例为`{"renderTypeList": ["FlowNodeInputTypeEnum.hidden"], "valueType": "WorkflowIOValueTypeEnum.any"}`，正确的落库格式应为`{"renderTypeList": ["hidden"], "valueType": "any"}`。这类脏数据会影响工作流节点的输入渲染和IO类型判断，完成V1到V2的迁移后，需执行V2清洗脚本修复数据。

**数据清洗操作步骤**
清洗接口默认以dry-run模式运行，仅格式化内存数据并执行PublishAppBodySchema校验，不会写入数据库。执行以下命令发起扫描验证：
```bash
curl -X POST 'https://你的域名/api/admin/dataClean/initWorkflowData' \
-H 'Content-Type: application/json' \
-H 'rootkey: 你的ROOT_KEY' \
-d '{"dryRun":true,"batchSize":1000,"writeBatchSize":10}'
```
接口支持的参数包括：dryRun（布尔值，默认true，是否仅扫描验证不写库）、batchSize（数字，默认1000，每批读取文档数量）、writeBatchSize（数字，默认10，每次bulkWrite的文档数量，线上写入压力大时可调小）。
确认返回的统计信息无误后，将dryRun参数改为false，执行数据写入：
```bash
curl -X POST 'https://你的域名/api/admin/dataClean/initWorkflowData' \
-H 'Content-Type: application/json' \
-H 'rootkey: 你的ROOT_KEY' \
-d '{"dryRun":false,"batchSize":1000,"writeBatchSize":10}'
```

**清洗逻辑与返回说明**
清洗过程按批扫描apps和app_versions中的工作流数据，降低单次读取和写入压力。对每条工作流数据执行格式化操作，统一修复历史脏字段、空值、枚举表达式和旧结构兼容问题。格式化完成后，使用PublishAppBodySchema校验nodes、edges、chatConfig字段。Zod校验失败的文档仅记录在返回结果中，不会写入数据库。非dry-run模式下，仅写入发生过格式化变更且Zod校验通过的文档，未发生变化的文档不会重复写入。
返回结果会分别展示apps、appVersions和total的统计数据，包括扫描文档数、可修复文档数、Zod错误数量、写入成功数量、写入失败数量、枚举表达式统计、变更样本和错误样本。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/4-15/41507)
