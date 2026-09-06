---
title: 配置FastGPT在RAG中存储元数据并通过API返回匹配文件信息
slug: /zh/troubleshoot/fastgpt-rag-metadata-api-return
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3602
source_type: GitHub issue
---

# 配置FastGPT在RAG中存储元数据并通过API返回匹配文件信息

## 现象
在FastGPT的RAG流程中，无法直接存储自定义元数据，且通过官方API调用时，无法通过设置detail参数为true返回匹配文件的元数据信息，无法满足业务端在自定义UI中展示知识来源、支持文件下载的需求。

## 可能原因
FastGPT默认的RAG召回接口未开放元数据存储与返回的配置开关，未提供元数据的自定义存储入口，detail参数未关联元数据返回逻辑，无法实现元数据的存储与召回使用。

## 排查步骤
1. 确认当前FastGPT版本是否支持元数据相关配置，需按实际环境确认版本兼容性。
2. 检查RAG流程的知识库配置项，查找元数据存储、关联相关的参数。
3. 验证API调用时是否正确设置detail参数为true，确认参数格式无误。
4. 确认知识库上传阶段是否已正确关联对应的元数据信息，确保元数据随知识库内容同步存储。

## 解决与验证
需按实际环境确认相关配置项与参数设置，检查是否存在元数据存储与返回的配置开关，在知识库上传阶段关联所需元数据，在API调用时正确传入detail=true参数以获取匹配文件的元数据信息，验证返回结果是否包含预设的元数据内容。

> 来源: [FastGPT GitHub issue #3602](https://github.com/labring/FastGPT/issues/3602)
