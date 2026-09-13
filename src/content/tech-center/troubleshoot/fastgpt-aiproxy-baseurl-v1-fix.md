---
title: 解决FastGPT aiProxyBaseUrl拼接v1的适配问题
slug: /zh/troubleshoot/fastgpt-aiproxy-baseurl-v1-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4062
source_type: GitHub issue
---

# 解决FastGPT aiProxyBaseUrl拼接v1的适配问题

## 现象
配置FastGPT的aiProxyBaseUrl参数后，程序自动拼接v1路径，导致非v1版本的代理服务无法正常调用。

## 可能原因
程序默认将v1路径拼接至aiProxyBaseUrl，仅适配特定场景，未提供可自定义路径后缀的配置项，导致部分封装后的非v1版本代理服务无法适配。

## 排查步骤
1. 查看当前配置的aiProxyBaseUrl参数值。
2. 确认代理服务实际提供的API路径版本。
3. 对比程序发起的请求路径与代理服务的实际路径，确认是否因自动拼接v1导致不匹配。

## 解决与验证
当前程序默认拼接v1路径，仅适配ollama相关场景。若需适配非v1版本的代理服务，需移除代码中拼接v1的逻辑。可参考相关代码路径：service/aiproxy/relay/adaptor/ollama。修改完成后重新部署程序，配置正确的aiProxyBaseUrl，发起测试请求，确认请求路径与代理服务实际路径匹配，调用成功。

> 来源: [FastGPT GitHub issue #4062](https://github.com/labring/FastGPT/issues/4062)
