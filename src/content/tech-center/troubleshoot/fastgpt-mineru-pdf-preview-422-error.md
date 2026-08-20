---
title: 解决FastGPT 4.9.3私有部署版mineru增强PDF的422报错
slug: /zh/troubleshoot/fastgpt-mineru-pdf-preview-422-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6160
source_type: GitHub issue
---

# 解决FastGPT 4.9.3私有部署版mineru增强PDF的422报错

## 现象
用户使用私有部署版本4.9.3的FastGPT，将知识库配置mineru作为PDF增强的底层服务后，在预览PDF和上传PDF阶段均报错，报错信息为`Api response error: /api/core/dataset/file/getPreviewChunks, Unprocessable Entity`，对应的Axios错误提示请求状态码为422。

## 可能原因
结合422状态码（请求参数语义错误）的含义与场景，可能的原因包括：mineru服务未正常启动或无法被FastGPT访问；FastGPT向mineru发起的请求参数不符合接口要求；FastGPT知识库配置中的mineru服务地址、认证信息等参数填写错误。

## 排查步骤
1.  确认mineru服务已正常启动，且FastGPT所在环境可以正常访问该服务的配置地址。
2.  核对FastGPT知识库配置页面中，mineru服务的地址、密钥等参数是否与mineru服务的实际配置一致。
3.  查看FastGPT后端日志，定位调用`/api/core/dataset/file/getPreviewChunks`接口时的请求参数，确认参数完整且符合要求。
4.  直接测试mineru服务的相关接口，确认其可以正常处理PDF分块预览的请求。

## 解决与验证
修正mineru服务的配置，确保服务正常运行且网络可达；检查并修正FastGPT知识库中的mineru配置项，确保参数填写正确。完成后重新上传PDF文件，验证预览和上传阶段不再出现422报错，确认PDF增强功能正常工作。若问题仍存在，需按实际环境进一步排查参数或服务状态。

> 来源：[FastGPT GitHub Issue #6160](https://github.com/labring/FastGPT/issues/6160)
