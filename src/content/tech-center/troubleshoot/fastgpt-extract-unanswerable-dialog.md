---
title: 记录并提取FastGPT无法回答的对话数据的方法
slug: /zh/troubleshoot/fastgpt-extract-unanswerable-dialog
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1683
source_type: GitHub issue
---

# 记录并提取FastGPT无法回答的对话数据的方法

## 现象
当用户提出的问题在知识库中无相关知识时，系统按照预设提示词拒绝回答。需将此类无法回答的问题全部记录，后续由人工编写答案并手动插入知识库以完善知识库。

## 可能原因
此类无法回答的对话数据未单独归集存储，分散在MongoDB数据库的相关数据表中，需通过检索数据表提取目标记录。

## 排查步骤
1. 确认当前FastGPT版本为V4.8.3。
2. 访问FastGPT部署所使用的MongoDB数据库实例。
3. 定位数据库中的chat和chatitems数据表。
4. 根据实际场景的标记规则，筛选出标记为无法回答的对话记录，筛选条件需按实际环境确认。

## 解决与验证
通过检索chat和chatitems两个MongoDB数据表，即可提取标记为无法回答的对话记录。验证时，可查询数据表并确认提取的记录与实际无法回答的对话内容一致。

> 来源: [FastGPT GitHub issue #1683](https://github.com/labring/FastGPT/issues/1683)
