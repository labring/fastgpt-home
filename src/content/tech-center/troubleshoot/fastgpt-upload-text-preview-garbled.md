---
title: FastGPT知识库上传自定义文本预览乱码问题排查与解决
slug: /zh/troubleshoot/fastgpt-upload-text-preview-garbled
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5906
source_type: GitHub issue
---

# FastGPT知识库上传自定义文本预览乱码问题排查与解决

## 现象
用户在使用FastGPT时，将自定义文本上传至知识库后，预览该上传的文本内容出现乱码问题，涉及FastGPT v4.13.2版本的公有云和私有部署场景。

## 可能原因
基于现有排查信息，可能的原因包括：上传的自定义文本的字符编码与FastGPT服务预期的编码不匹配；文本上传过程中出现编码转换异常；对应版本的知识库文本处理逻辑存在编码兼容问题。

## 排查步骤
1. 查看待上传的自定义文本的字符编码，将其转换为UTF-8编码格式后重新上传测试。
2. 检查FastGPT服务运行环境的默认编码设置，确认服务使用UTF-8作为默认字符编码。
3. 核对当前使用的FastGPT版本，查阅对应版本的官方文档确认编码处理相关逻辑。
4. 使用其他纯文本文件进行上传预览测试，排查是否为单份自定义文本的编码问题。

## 解决与验证
解决方式可将自定义文本转换为UTF-8编码后重新上传；若服务运行环境编码不符合要求，调整环境编码为UTF-8。验证方式为重新上传转换编码后的自定义文本，查看预览内容是否正常显示，无乱码问题。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/5906)
