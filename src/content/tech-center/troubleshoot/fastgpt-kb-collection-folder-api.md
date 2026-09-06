---
title: 解决FastGPT批量上传知识库无法创建独立集合与文件夹结构的问题
slug: /zh/troubleshoot/fastgpt-kb-collection-folder-api
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/548
source_type: GitHub issue
---

# 解决FastGPT批量上传知识库无法创建独立集合与文件夹结构的问题

## 现象
用户使用官方提供的`/api/core/dataset/data/pushData`接口上传知识库数据时，必须传入已存在的`collectionId`参数，无法通过该接口直接创建新的文件集合。用户希望上传的每个本地文件对应云端一个独立的`collectionId`，且能根据本地文件夹结构在云端生成对应的知识库层级结构，但当前无对应API支持该需求。官方示例curl请求中需硬编码已存在的`collectionId`，无法实现批量自动创建与结构映射。

## 可能原因
当前官方提供的`pushData`接口仅支持向已存在的文件集合中写入数据，未提供创建独立文件集合（collection）与知识库文件夹层级的API，无法自动将本地文件夹结构映射为云端知识库结构，导致批量上传本地文件时需手动指定每个文件对应的`collectionId`。

## 排查步骤
1.  检查当前调用`/api/core/dataset/data/pushData`的请求参数，确认是否传入了`collectionId`字段。
2.  核对官方示例代码，确认该接口未提供创建新collection的相关参数。
3.  对比本地文件夹结构与云端已有的知识库结构，确认无法自动生成匹配的层级与独立集合。

## 解决与验证
目前需等待官方提供对应API实现需求。若需适配该场景，可先通过官方新增的创建collection API生成与本地文件对应的独立集合，记录生成的`collectionId`后，再调用`pushData`接口写入数据；通过新增的创建文件夹API可构建与本地一致的知识库层级结构。验证时可上传本地测试文件，确认云端生成对应数量的独立collection与匹配的文件夹层级，且数据可正常写入对应集合。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/548)
