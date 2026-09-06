---
title: 解决FastGPT调用Search XNG后模型流响应为空的问题
slug: /zh/troubleshoot/fastgpt-xng-search-empty-stream-response
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4039
source_type: GitHub issue
---

# 解决FastGPT调用Search XNG后模型流响应为空的问题

## 现象
用户在FastGPT私有部署v4.8.23-fix版本中，配置Search XNG搜索引擎与qwen-max大语言模型，且知识库为空的情况下，执行搜索操作。搜索引擎成功返回数据后，界面提示“模型流响应为空，请检查模型流输出是否正常”。用户同时验证，直接使用日志中的请求报文发起请求，可正常获得结果。

## 可能原因
结合现象可推测可能涉及以下方向：一是大语言模型调用的中间数据传递环节异常；二是搜索引擎返回结果后，模型流处理逻辑未正确适配；三是相关配置未正确关联搜索引擎与大语言模型的调用流程。目前无明确根因，需结合实际环境进一步确认。

## 排查步骤
1. 确认当前FastGPT版本为v4.8.23-fix私有部署版本，核对大语言模型、搜索引擎的配置信息是否正确。
2. 提取FastGPT与OneApi日志中的请求报文，单独使用该报文发起请求，验证是否可正常返回结果。
3. 检查知识库配置状态，确认当前知识库为空的场景下是否存在适配问题。
4. 核对搜索引擎与大语言模型的关联配置，确保调用链路无断裂。

## 解决与验证
若排查后确认是中间数据传递或逻辑适配问题，可尝试重新配置搜索引擎与大语言模型的关联关系，重启FastGPT服务后再次测试。验证方式为：再次执行搜索操作，确认界面不再提示“模型流响应为空，请检查模型流输出是否正常”，且可正常获取模型响应结果。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/4039)
