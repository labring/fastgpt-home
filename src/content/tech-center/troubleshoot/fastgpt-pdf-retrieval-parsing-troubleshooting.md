---
title: 解决FastGPT知识库检索准确率低及图片PDF解析配置问题
slug: /zh/troubleshoot/fastgpt-pdf-retrieval-parsing-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3835
source_type: GitHub issue
---

# 解决FastGPT知识库检索准确率低及图片PDF解析配置问题

## 现象
测试手册型PDF时，知识库检索准确率几乎为0。尝试更换不同模型与分块方式，仍无法检索出答案。部分场景下，上传图片格式PDF或调用Marker解析时，会出现解析报错。

## 可能原因
出现该问题的可能原因包括：知识库配置存在异常；待解析的PDF为图片格式，内置解析器不支持OCR功能；自定义Marker解析器默认未开启OCR配置；4.9版本中调用Marker解析流程可能出现报错。

## 排查步骤
1. 核查当前知识库的配置参数，需按实际运行环境确认配置正确性。
2. 识别待解析PDF的内容格式，若为纯图片型PDF，需配置自定义PDF解析器。
3. 若使用Marker作为自定义解析器，检查其OCR配置是否已开启。
4. 针对4.9版本用户，验证上传文档调用Marker解析时是否存在报错。

## 解决与验证
若PDF为图片格式，内置解析器不支持OCR，需配置Marker作为自定义PDF解析器，可参考官方文档的相关说明。配置Marker解析器时，需开启默认的OCR配置。若为4.9版本出现Marker解析报错，需按实际运行环境排查报错信息。完成配置后，重新上传PDF并发起检索，验证准确率是否恢复正常。

> 来源: [FastGPT GitHub issue #3835](https://github.com/labring/FastGPT/issues/3835)
