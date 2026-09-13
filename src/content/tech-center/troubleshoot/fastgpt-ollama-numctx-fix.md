---
title: 解决FastGPT 4.8.20中ollama请求num_ctx参数失效
slug: /zh/troubleshoot/fastgpt-ollama-numctx-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3680
source_type: GitHub issue
---

# 解决FastGPT 4.8.20中ollama请求num_ctx参数失效

## 现象
在FastGPT 4.8.20中配置自定义请求地址为ollama的OpenAI格式接口时，传入num_ctx参数无法生效。使用ollama原生非OpenAI格式的chat接口调用时，可正常传递num_ctx参数，ollama服务启动日志会显示类似`--ctx-size 111333`的参数内容。

## 可能原因
FastGPT 4.8.20的自定义请求逻辑，在处理ollama的OpenAI格式接口时，未将用户配置的num_ctx参数正确传递到请求体中，导致ollama服务无法识别该配置项。

## 排查步骤
1.  确认FastGPT版本为4.8.20，且自定义请求地址配置为ollama的OpenAI格式接口。
2.  查看ollama服务的启动日志，检查是否包含`--ctx-size [自定义数值]`类的参数，示例数值为111333。若未出现该参数，说明参数未成功传递。
3.  对比ollama原生非OpenAI格式的chat接口请求，确认请求体中携带options字段及其中的num_ctx参数。
4.  检查FastGPT的自定义请求参数配置，确认是否将num_ctx参数正确添加到请求体的对应位置。

## 解决与验证
解决方法：按照ollama原生非OpenAI格式的接口要求，构造包含options字段的请求体，将num_ctx参数放入options中。验证步骤：使用符合该格式的请求调用FastGPT配置的自定义接口，查看ollama服务启动日志是否出现`--ctx-size [自定义数值]`的参数，同时确认对话流程可正常使用该上下文大小配置。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/3680)
