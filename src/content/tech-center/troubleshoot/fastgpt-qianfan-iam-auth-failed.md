---
title: 解决FastGPT私有部署中百度千帆重排序服务IAM鉴权失败问题
slug: /zh/troubleshoot/fastgpt-qianfan-iam-auth-failed
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1978
source_type: GitHub issue
---

# 解决FastGPT私有部署中百度千帆重排序服务IAM鉴权失败问题

## 现象
FastGPT私有部署容器运行时，调用重排序接口`/v1/rerank`返回HTTP 200状态码，但后台日志出现鉴权报错。完整报错信息包括：`api return error, req_id:  code: 14, msg: IAM Certification failed 可能的原因: IAM 鉴权失败，请检查 Access Key 与 Secret Key 是否正确，当前使用的 Access Key 为 ``zjQTUb***``，以及百度千帆服务返回的`IamSignatureInvalid, cause: Could not find credential.`，同时伴随`fetch_supported_models`请求返回403状态码，响应体为空。

## 可能原因
根据日志中的报错细节，核心问题为百度千帆服务的IAM鉴权失败，具体表现为无法找到对应凭证。结合日志中提示的`Could not find credential.`，可能的触发因素包括：配置的Access Key与Secret Key不匹配、未将正确密钥填入FastGPT的对应配置项、密钥未在对应平台完成有效配置，或FastGPT服务未正确加载配置的密钥信息。

## 排查步骤
1.  核对当前使用的Access Key：从日志中可确认当前使用的Access Key为`zjQTUb***`，确认该密钥是否为对应平台的有效密钥，无过期、禁用情况。
2.  检查FastGPT的百度千帆服务配置：确认配置项中是否正确填入了Access Key与对应的Secret Key，避免出现漏填、错填、前后空格残留等问题。
3.  单独验证密钥可用性：使用该密钥直接调用百度千帆的对应接口，确认鉴权流程是否正常，排除密钥本身的问题。
4.  检查FastGPT容器的配置加载：确认容器的环境变量或配置文件中，密钥配置已正确写入且服务已重新加载配置，无配置未生效的情况。

## 解决与验证
解决方法：修正配置的Access Key与Secret Key，确保两者匹配且在对应平台有效，重新加载FastGPT服务配置后重启容器。验证步骤包括：1.  重新调用重排序接口，查看日志中是否不再出现`IAM Certification failed`相关报错。2.  确认`fetch_supported_models`的请求不再返回403状态码。3.  检查接口返回结果是否正常，无鉴权相关的错误提示。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1978)
