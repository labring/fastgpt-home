---
title: 解决FastGPT混合搜索开启结果重排时的rerank报错问题
slug: /zh/troubleshoot/fastgpt-mixed-search-rerank-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/961
source_type: GitHub issue
---

# 解决FastGPT混合搜索开启结果重排时的rerank报错问题

## 现象
在FastGPT知识库搜索测试时，选择混合搜索+结果重排并执行搜索后，docker logs fastgpt返回如下报错信息：`rerank error: { message: 'invalid request: list of documents must not be empty' }`，同时伴随【index】Task done、【QA】Task Done的日志输出。

## 可能原因
该报错提示传入重排模型的文档列表不能为空。本次场景使用的是cohere重排模型，可能的原因包括：1. 混合搜索未返回有效知识库文档，导致传入重排模型的文档列表为空；2. config.json中配置的cohere api和api_key存在错误，导致重排服务调用异常。

## 排查步骤
1.  检查config.json文件中配置的cohere api和api_key，确认密钥与服务地址填写正确。
2.  关闭结果重排选项，执行相同的混合搜索，验证是否能正常返回知识库搜索结果，确认基础搜索流程是否正常。
3.  查看FastGPT容器的完整日志，确认搜索阶段返回的文档列表是否为空，定位数据流转的异常节点。
4.  确认目标知识库已导入有效业务数据，确保搜索时存在可匹配的文档内容。

## 解决与验证
解决方法分为两种场景：如果基础搜索未返回有效文档，先完成知识库数据导入并确认基础搜索可正常返回结果；如果是重排模型配置错误，修正config.json中的对应参数后，重启FastGPT容器。验证方式：重新开启混合搜索+结果重排并执行搜索，查看docker logs是否不再出现rerank error报错，且能正常返回重排后的搜索结果。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/961)
