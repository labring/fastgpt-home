---
title: FastGPT文档处理时JSON解析报错的排查与解决方法
slug: /zh/troubleshoot/fastgpt-json-parse-error-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/929
source_type: GitHub issue
---

# FastGPT文档处理时JSON解析报错的排查与解决方法

## 现象
文档处理流程中出现JSON解析报错，可通过docker logs查看相关报错日志。部分场景下，报错关联的token包含未在业务代码中使用的中文字符，无法直接通过业务代码排查问题来源。

## 可能原因
大概率是使用分类、提取或补全类功能时，模型未返回标准JSON格式。当前仅GPT系列模型支持相关功能模式，部分模型如chatglm2-16bit不具备tool模式，无法正确生成符合要求的JSON格式输出。模型选型不当也可能引发该报错。

## 排查步骤
1.  通过docker logs查看报错日志，确认JSON解析相关的具体报错信息。
2.  检查当前配置的文件处理模型、索引模型、重排模型，确认是否使用了不支持对应功能模式的模型。
3.  确认是否在流程中使用了需要模型返回JSON格式的分类、提取、补全类功能。

## 解决与验证
若因模型不支持对应模式导致报错，仅GPT系列模型支持当前功能，FastGPT 4.7版本将支持更多模型的function模式。当前可更换为支持的模型，或调整功能选型。若需使用chinese-llama-alpaca-2作为文件处理模型，需确认其是否适配当前功能场景。验证方式为：调整模型配置后重新执行文档处理流程，查看docker logs是否仍出现JSON解析报错，确认功能正常运行。

> 来源: [FastGPT GitHub issue #929](https://github.com/labring/FastGPT/issues/929)
