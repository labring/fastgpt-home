---
title: 解决FastGPT中qwen-vl-v1多模态模型调用报错的问题
slug: /zh/troubleshoot/fastgpt-qwen-vl-call-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2178
source_type: GitHub issue
---

# 解决FastGPT中qwen-vl-v1多模态模型调用报错的问题

## 现象
FastGPT 4.8.7版本中，配置qwen-vl-v1多模态模型并通过oneapi渠道接入，oneapi渠道测试成功，但FastGPT调用该模型时直接报错。报错返回内容为`{"error":{"message":"url error, please check url！ (request id: 2024072620311947445322302636794)","type":"upstream_error","param":"400","code":"bad_response_status_code`。使用issue提供的curl命令测试该接口时，同样提示URL错误，但测试的图片链接可正常打开。同时oneapi日志显示已成功匹配到渠道6对应的qwen-vl-v1模型。

## 可能原因
结合报错信息与测试情况，可能的原因包括：FastGPT配置的模型接口路径与qwen-vl-v1模型要求不匹配，请求体参数不符合模型规范，或接口调用的地址、认证配置存在错误。

## 排查步骤
1.  确认FastGPT中该模型配置的接口地址是否正确，核对是否为多模态模型对应的标准接口路径。
2.  复制issue中提供的curl命令，替换为实际的模型服务地址、认证密钥与测试图片链接，执行命令测试接口连通性。
3.  核对FastGPT中的请求参数，包括model名称、messages格式、max_tokens等，确保与curl测试的参数保持一致。
4.  查看FastGPT的详细报错日志，结合oneapi的上游调用日志，进一步定位请求异常环节。

## 解决与验证
根据排查结果调整对应配置：若接口路径有误，修改为qwen-vl-v1模型要求的正确接口路径；若请求参数不匹配，调整为符合模型要求的格式。调整完成后，在FastGPT中发起模型调用，确认不再返回原URL错误提示。同时可通过oneapi日志确认请求已正常到达上游服务，且调用结果符合预期。再次执行调整后的curl测试命令，验证接口可正常返回结果。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/2178)
