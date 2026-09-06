---
title: FastGPT API文件库对接外部知识库的排查与解决方案
slug: /zh/troubleshoot/fastgpt-api-file-library-integration
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3921
source_type: GitHub issue
---

# FastGPT API文件库对接外部知识库的排查与解决方案

## 现象
使用FastGPT API文件库的场景中，存在对接外部知识库以获取其中文档的需求，无法明确支持的对接对象，且无法直接完成对接操作。该场景使用v4.8.21私有部署版本，且已确认所使用的密钥可正常工作。

## 可能原因
FastGPT API文件库仅支持指定的外部知识库，自定义对接需实现文档中规定的三个接口。未完成对应接口实现时，无法直接对接外部知识库。部分外部知识库无法直接完成对接，需额外进行封装处理。

## 排查步骤
1. 确认当前使用的FastGPT版本，本次场景为v4.8.21私有部署版本。
2. 明确需要对接的外部知识库类型，核对官方支持的对接范围。
3. 检查是否已完成API文件库所需的三个接口的实现。
4. 针对无法直接对接的外部知识库，确认是否可通过封装其openapi的方式完成对接。

## 解决与验证
目前官方支持对接语雀和飞书文档。若需对接其他外部知识库，需自行实现文档中提及的三个接口。pingcode无法直接对接，可在其openapi上套一层后完成对接。验证流程为完成接口实现后，测试能否正常获取目标知识库的文档内容，确认对接功能正常。

> 来源: [FastGPT GitHub issue #3921](https://github.com/labring/FastGPT/issues/3921)
