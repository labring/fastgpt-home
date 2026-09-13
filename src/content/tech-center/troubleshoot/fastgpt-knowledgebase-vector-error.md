---
title: 解决FastGPT上传文本知识库时向量模型报错及PG库modeldata为空问题
slug: /zh/troubleshoot/fastgpt-knowledgebase-vector-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1002
source_type: GitHub issue
---

# 解决FastGPT上传文本知识库时向量模型报错及PG库modeldata为空问题

## 现象
配置文件与页面索引模型均已完成向量模型相关配置，上传文本知识库后，后台持续循环报错，上传完成后PostgreSQL数据库的modeldata字段为空，单独调用向量模型时无异常。

## 可能原因
1. 向量模型的API地址配置错误；
2. 知识库创建时使用的向量模型与当前配置不一致，且原有配置无法直接修改，需重新建库或补充对应模型配置。

## 排查步骤
1. 检查向量模型的API地址配置是否正确；
2. 确认当前知识库创建时使用的向量模型类型；
3. 核对配置文件与页面索引模型中的向量模型配置是否与知识库创建时的模型一致。

## 解决与验证
1. 若向量模型API地址配置错误，修正地址后重新上传文本文件；
2. 若知识库创建时使用的向量模型无法直接修改配置，可重新创建知识库，或在配置文件中补充对应向量模型的配置，例如添加ada-002的相关配置；
3. 完成配置调整或重新建库后，重新上传文本文件，验证后台不再循环报错，且PostgreSQL数据库的modeldata字段已正常写入数据。

> 来源: [FastGPT GitHub issue #1002](https://github.com/labring/FastGPT/issues/1002)
