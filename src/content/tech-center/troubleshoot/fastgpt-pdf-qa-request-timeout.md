---
title: 解决FastGPT PDF抽取问答对时的LLM请求超时问题
slug: /zh/troubleshoot/fastgpt-pdf-qa-request-timeout
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3975
source_type: GitHub issue
---

# 解决FastGPT PDF抽取问答对时的LLM请求超时问题

## 现象
用户在FastGPT私有部署4.8.23-fix2版本中，执行PDF抽取问答对任务时，日志频繁出现报错信息。日志包含`[Info] 2025-03-04 11:41:36 [QA Queue] Start`，随后多次出现`[Error] LLM response error`，错误信息为`Request timed out.`，堆栈信息包含`pl.makeRequest (/app/projects/app/.next/server/chunks/91088.js:20:79537)`等内容。请求体中使用的模型为`deepseek-r1:14b_32k`，用户使用ollama运行模型，配置分块长度为8192，最大上下文为128000。

## 可能原因
该报错为LLM调用超时，与embedding无关。可能的原因包括：
1.  部署的LLM模型响应速度不足，无法在FastGPT设置的超时时间内返回结果；
2.  单次请求的token数量超过模型处理上限，导致处理超时；
3.  FastGPT配置的LLM请求超时阈值过低，无法适配当前模型的响应延迟。

## 排查步骤
1.  查看FastGPT的LLM模型配置，确认当前设置的请求超时时间参数。
2.  检查ollama服务的运行状态、资源占用情况，确认模型是否正常加载。
3.  单独调用目标LLM模型，测试其响应时间，确认是否存在超时问题。
4.  核对PDF分块长度与模型上下文限制，确认单次请求的token数量是否合理。

## 解决与验证
1.  调整LLM请求超时时间：在FastGPT的模型配置界面，适当增加超时阈值，需按实际环境确认具体配置项。
2.  优化PDF分块策略：将分块长度调整为更合理的数值，避免单次请求token过多，需按模型上下文限制调整。
3.  优化模型运行环境：为ollama服务分配更多的CPU、内存或GPU资源，提升模型响应速度。
4.  验证：重新执行PDF抽取问答对任务，查看日志中是否仍出现`Request timed out.`的错误，确认任务正常完成。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/3975)
