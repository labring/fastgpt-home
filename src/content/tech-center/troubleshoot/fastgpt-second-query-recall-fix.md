---
title: 解决FastGPT私有部署后二次提问无法召回知识库数据的问题
slug: /zh/troubleshoot/fastgpt-second-query-recall-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1495
source_type: GitHub issue
---

# 解决FastGPT私有部署后二次提问无法召回知识库数据的问题

## 现象
用户在私有部署FastGPT后，首次提问可正常召回知识库数据，第二次提问无法召回目标数据。

## 可能原因
经查看项目源码，问题的根本原因为rewriteQuery变量的处理逻辑存在缺陷，该变量被错误拼接为JavaScript对象格式，未转换为合法的字符串，进而导致重排序（rerank）步骤的匹配分数极低，无法召回目标知识库数据。

## 排查步骤
1. 定位项目中处理rewriteQuery变量的代码片段，检查变量拼接与输出逻辑。
2. 抓取两次提问时rewriteQuery变量的实际输出内容，对比正常场景与异常场景的差异。
3. 确认变量是否被错误转换为JavaScript对象格式。

## 解决与验证
解决方法为修正rewriteQuery变量的拼接逻辑，确保其输出为符合要求的字符串格式。
验证步骤：
1. 部署修复后的代码，发起首次提问，确认可正常召回知识库数据。
2. 再次发起相同或相似的提问，确认可正常召回目标数据。
3. 检查重排序步骤的匹配分数，确认分数处于正常区间。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1495)
