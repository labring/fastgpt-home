---
title: FastGPT手动模式HTTP工具数组参数数据迁移操作指南
slug: /zh/reference/fastgpt-manual-http-tool-schema-migration
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/4-16/41601
source_type: 官方文档小节
---

# FastGPT手动模式HTTP工具数组参数数据迁移操作指南

## 结论
本操作用于将FastGPT手动模式HTTP工具的数组参数升级为标准JSON Schema。仅升级前创建过手动HTTP工具的环境需要执行此迁移，OpenAPI模式的HTTP工具无需处理。

## 具体怎么做
1. 执行dry-run查看待处理数据，该操作不会修改任何数据，使用以下curl命令：
```curl -X POST 'https://你的域名/api/admin/4160/initHttpToolSchema' \
-H 'Content-Type: application/json' \
-H 'rootkey: 你的ROOT_KEY' \
-d '{"dryRun":true}'
```
2. 确认dry-run的返回结果后，执行正式迁移，使用以下命令：
```curl -X POST 'https://你的域名/api/admin/4160/initHttpToolSchema' \
-H 'Content-Type: application/json' \
-H 'rootkey: 你的ROOT_KEY' \
-d '{"dryRun":false}'
```

## 注意事项
1. 脚本仅会按HTTP工具类型筛选应用，仅处理apiSchemaStr不存在的手动模式条目，其他应用及OpenAPI模式不会被修改。
2. 迁移按批次执行，可安全重试，多次执行不会产生重复操作。
3. 正式迁移完成后，可再次执行dry-run命令，若返回结果中`total.changedDocumentCount`为0，则代表所有待处理数据已完成迁移。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/4-16/41601)
