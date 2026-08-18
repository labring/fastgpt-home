---
title: 解决Gemini-3-Flash和Pro模型无思考过程输出的问题
slug: /zh/troubleshoot/gemini-flash-pro-missing-thought-signature
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6363
source_type: GitHub issue
---

# 解决Gemini-3-Flash和Pro模型无思考过程输出的问题

## 现象
使用Gemini-3-Flash-Preview、Gemini-3-Pro模型时，用户已确认开启思考过程输出的配置开关，但调用工具时未生成思考过程，且请求或返回结果中缺少thought-signature参数。

## 可能原因
结合问题描述，可能的触发因素包括：一是已开启的思考过程输出开关未在工具调用场景中生效；二是工具调用流程中未正确生成或传递thought-signature参数；三是需按实际环境确认的相关配置存在异常。

## 排查步骤
1. 再次进入对应模型的配置页面，确认思考过程输出开关已正确开启并完成保存。
2. 查看工具调用的请求与返回日志，检查是否存在thought-signature参数的缺失情况。
3. 核对工具调用的流程配置，确认思考过程生成逻辑已正确关联到工具调用环节。
4. 需按实际环境查看系统调试日志，排查参数传递链路是否存在异常。

## 解决与验证
若为配置开关未在工具调用场景生效，重新开启开关并保存配置后重新发起工具调用；若为thought-signature参数缺失，补充对应参数的生成逻辑并确保传递正常。验证方式为发起工具调用请求，检查返回结果中是否包含thinking思考过程内容以及thought-signature参数。

> 来源：[FastGPT GitHub Issue #6363](https://github.com/labring/FastGPT/issues/6363)
