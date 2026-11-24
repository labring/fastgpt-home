---
title: 说明在FastGPT中自定义接入第三方知识库的方法
slug: /zh/reference/fastgpt-third-party-knowledgebase-access
page_type: 技术速查
source: https://doc.fastgpt.cn/guide/dataset/third-party/third_dataset
source_type: 官方文档小节
---

# 说明在FastGPT中自定义接入第三方知识库的方法

## 结论
当前互联网存在多种类型的文档库，不同用户的对接需求存在差异。FastGPT内置飞书、语雀两类文档库，可适配多数用户的基础文档对接需求。若需接入FastGPT未覆盖的其他第三方文档库，可参考本节内容完成自定义开发。

## 具体怎么做
1. 明确需对接的第三方文档库类型，确认其不属于FastGPT已内置的飞书、语雀文档库；
2. 参照本节提供的开发说明完成自定义接入开发流程。

## 注意事项
仅可接入FastGPT未内置的第三方文档库，目前FastGPT已内置飞书、语雀两类文档库。需严格遵循本节提供的开发内容完成对接，请勿尝试接入已内置的文档库，避免出现对接异常。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/guide/dataset/third-party/third_dataset)
