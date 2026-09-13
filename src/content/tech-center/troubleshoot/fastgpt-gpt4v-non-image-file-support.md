---
title: 解决FastGPT中GPT4V模型无法上传理解非图片文件的问题
slug: /zh/troubleshoot/fastgpt-gpt4v-non-image-file-support
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/789
source_type: GitHub issue
---

# 解决FastGPT中GPT4V模型无法上传理解非图片文件的问题

## 现象
用户在使用FastGPT时，希望实现上传非图片文件供GPT4V模型调用，将上传文件暂存至文件列表、在工作流节点中使用，同时建立全局变量存储文件列表供GPT在需要时调用，但当前无法达成该类需求。现有功能仅支持为GPT4V模型上传并理解图片格式文件，无法覆盖非图片文件的相关需求。

## 可能原因
GPT4V模型原生仅支持处理图片格式的上传文件，FastGPT当前未单独开发非图片文件的上传、理解、暂存至文件列表、工作流调用以及全局变量存储等相关功能模块，因此无法满足用户的相关需求。

## 排查步骤
1. 确认当前使用的模型版本为GPT4系列版本。
2. 检查待上传文件的格式，确认是否为非图片类型。
3. 查看FastGPT现有功能配置或官方说明文档，确认是否存在已集成的非图片文件处理相关功能（需按实际环境确认）。

## 解决与验证
当前FastGPT的GPT4V模型仅支持上传并理解图片格式文件，该功能为现有可用功能。如需实现非图片文件的上传、理解、暂存至文件列表、工作流调用以及全局变量存储功能，需单独开发对应功能模块。验证现有可用功能的方式为：选中GPT4版本模型，上传图片格式文件，确认可被模型正常理解与调用。

> 来源: [FastGPT GitHub issue #789](https://github.com/labring/FastGPT/issues/789)
