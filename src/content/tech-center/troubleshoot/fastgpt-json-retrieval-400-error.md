---
title: 解决FastGPT中JSON数据获取及工具调用400报错问题
slug: /zh/troubleshoot/fastgpt-json-retrieval-400-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3890
source_type: GitHub issue
---

# 解决FastGPT中JSON数据获取及工具调用400报错问题

## 现象
在FastGPT使用过程中，尝试通过`/data/answer`或`$.data.answer`字段路径获取JSON数据时，无法获取目标数据。同时，在另一应用通过工具调用该应用时，返回400报错。

## 可能原因
暂未明确标注具体触发原因，需结合实际部署与调用场景按环境确认。

## 排查步骤
1.  验证JSON数据获取的字段引用格式，确认使用`/data/answer`或`$.data.answer`作为目标字段路径。
2.  针对工具调用场景，检查调用请求的参数与目标应用的交互格式是否匹配。
3.  记录工具调用返回的400报错详情，用于后续排查。

## 解决与验证
针对JSON数据获取问题，将字段引用路径设置为`/data/answer`或`$.data.answer`，即可正常获取目标数据。针对工具调用返回400报错的场景，需结合实际调用环境确认请求参数、格式是否符合要求，暂无通用明确解法。

> 来源: [FastGPT GitHub issue #3890](https://github.com/labring/FastGPT/issues/3890)
