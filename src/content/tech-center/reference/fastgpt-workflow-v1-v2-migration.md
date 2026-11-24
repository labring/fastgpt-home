---
title: FastGPT工作流V1升级至V2的迁移操作指南
slug: /zh/reference/fastgpt-workflow-v1-v2-migration
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/4-15/41507
source_type: 官方文档小节
---

# FastGPT工作流V1升级至V2的迁移操作指南

## 结论
该迁移步骤仅适用于部署过低于4.8版本FastGPT的用户。V4.15.0-beta7后工作流保存结构统一使用V2，需先完成V1到V2的迁移，再执行后续V2脏数据清洗。

## 具体怎么做
1. 迁移脚本位置为`projects/app/src/pages/api/admin/dataClean/v1WorkflowToV2.ts`，该接口仅用于本次升级迁移，不对外作为OpenAPI接口。
2. 先执行默认的dry-run扫描校验模式，仅扫描、转换并校验数据，不写库：
```bash
curl -X POST 'https://你的域名/api/admin/dataClean/v1WorkflowToV2' \
-H 'Content-Type: application/json' \
-H 'rootkey: 你的ROOT_KEY' \
-d '{"dryRun":true}'
```
3. 确认接口返回的统计结果无误后，修改`dryRun`为`false`执行数据写入：
```bash
curl -X POST 'https://你的域名/api/admin/dataClean/v1WorkflowToV2' \
-H 'Content-Type: application/json' \
-H 'rootkey: 你的ROOT_KEY' \
-d '{"dryRun":false}'
```
接口参数说明：
| 参数 | 类型 | 默认值 | 说明 |
| ---- | ---- | ------ | ---- |
| dryRun | boolean | true | 是否仅扫描验证不写库 |

## 注意事项
- 迁移时会按`apps.version != 'v2'`且`type`非`folder`、`httpPlugin`、`toolFolder`扫描应用，先处理`app_versions`再处理`apps`，避免中断后遗漏历史版本。
- 迁移会将V1节点字段升级为V2格式，例如`moduleId`转为`nodeId`、`flowType`转为`flowNodeType`。
- 未知节点类型会兜底为`emptyNode`，非法`valueType`会转为`any`；缺失`node.name`时用`flowType`兜底，缺失`input.label`时用`input.key`兜底。
- 写库前会使用`PublishAppBodySchema`校验数据，校验失败的文档不会写入，并会记录到接口返回结果中。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/4-15/41507)
