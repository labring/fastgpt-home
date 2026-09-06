---
title: FastGPT 4.8.8版本HTTP请求参数保存后不更新的排错指南
slug: /zh/troubleshoot/fastgpt-http-params-updated
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2258
source_type: GitHub issue
---

# FastGPT 4.8.8版本HTTP请求参数保存后不更新的排错指南

## 现象
FastGPT 4.8.8版本中，修改HTTP请求body内的参数后，运行流程时仍使用此前保存的参数。运行调试时带出的参数与保存的参数不一致。

## 可能原因
核心原因为HTTP请求的参数未正确保存。调试时返回的body参数与截图显示的param参数类型不一致，会引发参数匹配异常。

## 排查步骤
1.  确认当前使用的FastGPT版本为4.8.8。
2.  查看运行调试时带出的参数类型，核对其与保存的参数类型是否一致。
3.  对比HTTP请求中body参数与调试界面显示的param参数的差异。
4.  检查参数保存操作是否完成，未出现保存失败的提示。

## 解决与验证
重新执行参数保存操作，确保保存流程无异常。调整参数类型，确保HTTP请求的body参数与调试界面显示的参数类型匹配。修改HTTP请求的body参数并完成保存，重新运行流程，确认运行时使用的为最新保存的参数。

> 来源: [FastGPT GitHub issue #2258](https://github.com/labring/FastGPT/issues/2258)
