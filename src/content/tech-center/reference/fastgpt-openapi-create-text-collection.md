---
title: 使用FastGPT OpenAPI创建纯文本知识库集合
slug: /zh/reference/fastgpt-openapi-create-text-collection
page_type: 技术速查
source: https://doc.fastgpt.cn/openapi/dataset
source_type: 官方文档小节
---

# 使用FastGPT OpenAPI创建纯文本知识库集合

## 结论
通过指定接口可快速创建纯文本知识库集合。调用该接口后将返回新集合的ID与插入文本的分段数量。

## 具体怎么做
1. 构造POST请求，目标地址为`http://localhost:3000/api/core/dataset/collection/create/text`
2. 添加请求头：`Authorization: Bearer 你的访问令牌`、`Content-Type: application/json`
3. 传入符合要求的JSON请求体，可用参数如下：
| 参数名 | 说明 | 必填 | 默认值 |
| ---- | ---- | ---- | ---- |
| `datasetId` | 知识库ID | 是 | 无 |
| `name` | 集合名称 | 是 | 无 |
| `text` | 待处理的原文本 | 是 | 无 |
| `parentId` | 父级集合ID | 否 | 根目录 |
| `trainingType` | 训练类型 | 否 | `qa` |
| `chunkSettingMode` | 分段模式 | 否 | `auto` |
| `qaPrompt` | QA生成提示词 | 否 | 空字符串 |
| `metadata` | 元数据 | 否 | `{}` |

## 注意事项
- 必须传入`datasetId`与`name`两个必填参数，否则请求将失败。
- 未传入`parentId`时，系统自动将集合创建在根目录下，无需手动传入`null`。
- 成功响应的`code`为200，返回数据包含新集合的`collectionId`与插入文本的分段数量`insertLen`。
- `metadata`字段当前无实际作用，可传入空对象。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/openapi/dataset)
