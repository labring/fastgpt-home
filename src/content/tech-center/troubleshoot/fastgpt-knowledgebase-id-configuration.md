---
title: 解决FastGPT中通过知识库名称动态选择检索知识库的配置问题
slug: /zh/troubleshoot/fastgpt-knowledgebase-id-configuration
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1574
source_type: GitHub issue
---

# 解决FastGPT中通过知识库名称动态选择检索知识库的配置问题

## 现象
FastGPT 4.8私有部署版本中，在知识库搜索组件内尝试使用知识库名称作为变量引用，无法触发对应知识库的检索功能。使用固定配置知识库ID的方式则可以正常完成检索。配置固定知识库时的标准JSON格式为`[{"datasetId":"{{datasetId}}","vectorModel":{"model":"text-embedding-v1","name":"QWen-Embedding","charsPointsPrice":0,"defaultToken":700,"maxToken":3000,"weight":100}}]`，其中datasetId为知识库ID。

## 可能原因
当前知识库搜索组件的变量引用功能仅支持传入知识库ID作为参数，无法自动将传入的知识库名称解析为对应的知识库ID，因此使用知识库名称作为变量时无法正常匹配到目标知识库。

## 排查步骤
1. 确认当前使用的FastGPT版本为4.8私有部署版本。
2. 查看知识库搜索组件的配置要求，确认组件需传入datasetId（知识库ID）作为检索参数。
3. 登录FastGPT后台，进入目标知识库的详情->配置页面，获取该知识库的ID。
4. 将获取到的知识库ID替换原配置中的知识库名称变量，或直接填入配置的datasetId字段。

## 解决与验证
解决方法为通过知识库详情页面获取目标知识库的ID，将该ID作为参数填入知识库搜索组件的配置中。验证时，将配置更新为符合标准JSON格式的内容，例如将`{{知识库名称变量}}`替换为实际的知识库ID，发起对话测试检索功能，即可正常检索对应知识库的内容。用户此前通过编排用户输入知识库ID的配置，已验证该方式可正常运行。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1574)
