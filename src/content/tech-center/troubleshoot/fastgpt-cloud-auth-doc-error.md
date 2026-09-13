---
title: 解决FastGPT对接云服务的鉴权失败与文档数超限报错
slug: /zh/troubleshoot/fastgpt-cloud-auth-doc-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1968
source_type: GitHub issue
---

# 解决FastGPT对接云服务的鉴权失败与文档数超限报错

## 现象
调用FastGPT对接的`qianfan.baidubce.com`的/v1/rerank接口时出现两类报错：
1.  首次报错：接口返回200状态码但内部返回api错误，日志显示`code: 14, msg: IAM Certification failed`，提示IAM鉴权失败，当前使用的Access Key为`zjQTUb***`，响应头包含`X-Bce-Error-Code: IamSignatureInvalid`，详细错误为`Could not find credential`。
2.  修复鉴权问题后出现新报错：日志显示`code: 336221, msg: max number of documents is 64`，单次请求提交的文档总数量超出接口限制。

## 可能原因
1.  鉴权失败原因：错误使用了应用内的AK/SK，未使用安全中心获取的AK/SK。
2.  文档数超限原因：单次提交的文档总数量超过接口限定的最大数量。

## 排查步骤
1.  检查当前使用的Access Key与Secret Key的来源，确认是否为安全中心获取的AK/SK。
2.  查看调用接口的请求参数，统计提交的文档总数量。
3.  核对接口文档确认单次请求的文档数量上限，本次场景上限为64个。

## 解决与验证
1.  鉴权问题解决：替换为安全中心获取的AK/SK，替换后鉴权错误消失。
2.  文档数超限问题解决：将单次提交的文档数量调整至64个以内。
3.  验证：重新调用/v1/rerank接口，确认接口无报错且返回结果正常。

> 来源: [FastGPT GitHub issue #1968](https://github.com/labring/FastGPT/issues/1968)
