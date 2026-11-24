---
title: 通过FastGPT OpenAPI调用知识库搜索测试接口
slug: /zh/api/fastgpt-dataset-search-test
page_type: API与文档
source: https://doc.fastgpt.cn/openapi/dataset
source_type: 官方文档小节
---

# 通过FastGPT OpenAPI调用知识库搜索测试接口

## 接口功能说明
该接口为FastGPT OpenAPI的知识库搜索测试接口，用于传入指定测试文本，检索匹配当前知识库内的相关条目，可用于验证知识库检索配置是否符合预期。支持配置检索模式、相关度阈值、结果数量限制等参数，灵活调整检索逻辑，适配不同的检索需求。

## 调用步骤与参数配置
调用该接口前，需准备有效的API授权令牌与目标知识库ID。以下为完整的调用示例：
```bash
curl --location --request POST 'http://localhost:3000/api/core/dataset/searchTest' \
--header 'Authorization: Bearer fastgpt-xxxxx' \
--header 'Content-Type: application/json' \
--data-raw '{
"datasetId": "知识库的ID",
"text": "导演是谁",
"limit": 5000,
"similarity": 0,
"searchMode": "embedding",
"usingReRank": false,
"datasetSearchUsingExtensionQuery": true,
"datasetSearchExtensionModel": "gpt-5",
"datasetSearchExtensionBg": ""
}'
```
请求体中的参数说明如下：
- datasetId：目标知识库的唯一标识ID
- text：用于检索测试的目标文本
- limit：返回结果的最大tokens数量，上限为20000
- similarity：可选参数，最低相关度阈值，取值范围0~1
- searchMode：检索模式，支持embedding、fullTextRecall、mixedRecall三种选项
- usingReRank：是否开启重排优化功能
- datasetSearchUsingExtensionQuery：是否开启问题优化功能
- datasetSearchExtensionModel：问题优化使用的模型
- datasetSearchExtensionBg：问题优化的背景描述，可留空

## 响应结果说明
接口成功调用后会返回状态码200，此时statusText字段为空字符串。响应数据的data数组包含所有匹配到的知识库条目，每个条目包含id、q（问题文本）、a（回答文本）、datasetId、collectionId、sourceName（来源文件名）、sourceId、score（匹配相关度分值）等字段。例如示例返回的score值为0.8050316572189331，分值越高代表该条目与测试文本的匹配相关度越强。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/openapi/dataset)
