---
title: FastGPT日志中time参数的含义与关联报错说明
slug: /zh/glossary/fastgpt-time-log-parameter
page_type: 术语速查
source: https://github.com/labring/FastGPT/issues/1034
source_type: GitHub issue
---

# FastGPT日志中time参数的含义与关联报错说明

## 一句话定义
FastGPT日志中的time参数，用于记录对应操作的处理耗时，存在微秒与毫秒两种单位形式。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
time参数出现在两类FastGPT日志中。第一类为QA Queue完成日志，格式为JSON字段`{"time":数值}`，伴随导入知识库的向量处理流程；第二类为`/api/v1/chat/completions`接口的请求完成日志，格式为`time:数值ms`。其中第一类日志的time数值单位为微秒，第二类为毫秒。

## 容易搞错的地方
不同日志场景下time的单位存在差异，易被混淆为统一单位。当QA Queue Finish日志附带`Collection is not exist`报错时，易误以为是向量模型或索引异常，实际为目标知识库集合不存在。

> 来源: [FastGPT GitHub issue #1034](https://github.com/labring/FastGPT/issues/1034)
