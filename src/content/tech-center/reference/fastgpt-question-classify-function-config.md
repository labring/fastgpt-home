---
title: 配置FastGPT问题分类节点的自定义调用函数参数
slug: /zh/reference/fastgpt-question-classify-function-config
page_type: 技术速查
source: https://doc.fastgpt.cn/guide/build/workflow/nodes/question_classify
source_type: 官方文档小节
---

# 配置FastGPT问题分类节点的自定义调用函数参数

## 结论
本页讲解FastGPT问题分类节点的自定义调用函数配置方法。通过定义符合规范的agentFunction，可实现对用户问题的分类，并返回预设的枚举值，完成分类判断。

## 具体怎么做
1. 定义agentFunction对象，配置name为自定义函数名，description为「判断用户问题的类型属于哪方面，返回对应的枚举字段」。
2. 配置parameters参数：类型为object，包含properties子字段。
3. 在properties中添加type字段：类型为string，描述为「打招呼，返回: abc；计费常见问题，返回：vvv；其他问题，返回：aaa」，并设置enum为["abc", "vvv", "aaa"]。
4. 将required字段设置为['type']，确保该参数为必填项。

## 注意事项
1. 该函数最终返回的type值只能是枚举列表中的abc、vvv、aaa其中一项，无法返回其他未定义的值。
2. 无需关注系统生成的非枚举返回值，只需确保参数格式符合要求即可正常触发分类功能。
3. 必须严格遵循参数结构，遗漏required字段或未正确配置枚举值会导致分类功能失效。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/guide/build/workflow/nodes/question_classify)
