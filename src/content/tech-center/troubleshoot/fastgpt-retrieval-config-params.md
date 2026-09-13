---
title: 查找FastGPT检索与文本处理类可配置参数的配置位置
slug: /zh/troubleshoot/fastgpt-retrieval-config-params
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5077
source_type: GitHub issue
---

# 查找FastGPT检索与文本处理类可配置参数的配置位置

## 现象
用户在探索FastGPT项目时，已查看projects/app/.env.template和projects/app/data/config.json两个配置文件，找到了部分通用配置，但未找到检索与文本处理相关的可配置参数，比如用于控制检索文档数量的top_k、用于设置文本拆分大小的chunk_size，无法确定这类参数的具体配置位置。

## 可能原因
这类检索与文本处理相关的参数，可能未在用户已查看的两个配置文件中定义，而是分布在项目的检索模块、文本分割模块的代码配置或专属配置文件中。

## 排查步骤
1.  搜索项目代码中包含top_k、chunk_size关键词的文件，定位参数的实际使用位置。
2.  查看项目中与知识库检索、文档文本拆分相关的模块代码文件，确认参数的配置来源。
3.  检查是否存在未被用户查看的专属配置文件，比如检索引擎配置、知识库专属配置文件。
4.  核对代码中参数的加载逻辑，确认该参数是否支持用户自定义修改。

## 解决与验证
首先通过代码搜索定位top_k、chunk_size等参数的使用位置，查看其加载的配置来源。若参数可通过自定义配置文件修改，找到对应配置项并调整参数值；若参数仅在代码中硬编码定义，需确认项目是否提供了自定义配置的入口。完成参数修改后，重启服务并发起检索请求，验证返回的文档数量、文本拆分结果是否符合调整后的参数设置。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/5077)
