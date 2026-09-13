---
title: 解决FastGPT高级编排HTTP请求返回403错误的问题
slug: /zh/troubleshoot/fastgpt-http-403-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/949
source_type: GitHub issue
---

# 解决FastGPT高级编排HTTP请求返回403错误的问题

## 现象
使用Docker-Compose部署的FastGPT私有部署版本4.6.8，在高级编排功能的HTTP模块中调用GET类型的API请求（如Google Custom Search API、TMDB API）时，返回`Request failed with status code 403`错误。相同的请求在其他软件中可正常获取JSON响应，报错信息包含AxiosError，错误堆栈指向axios请求处理流程。

## 可能原因
1. FastGPT高级编排的HTTP模块自动为请求添加了额外的请求头，与目标API的校验规则冲突。例如GET请求默认携带的Content-Type请求头，部分API不允许无请求体的GET请求携带该头。
2. 目标API对请求来源存在额外校验，FastGPT的部署环境IP未被目标API允许访问。
3. 请求中的认证信息格式或传递方式未被目标API识别。

## 排查步骤
1. 复制FastGPT HTTP模块中的完整请求URL、所有请求头、请求参数，在外部工具中复刻该请求，验证是否触发403错误。
2. 对比外部工具正常调用该API时的请求头，检查FastGPT模块中是否存在额外或不符合要求的请求头字段。
3. 确认请求中的认证信息格式与目标API的官方要求完全一致。
4. 检查FastGPT部署环境的网络出口是否可以正常访问目标API的域名。

## 解决与验证
1. 若发现请求头存在冲突，例如GET请求携带了Content-Type头，可在FastGPT的HTTP模块中手动覆盖该请求头，将其移除或调整为目标API允许的格式。
2. 若为目标API的访问限制问题，需联系目标API的服务提供商，将FastGPT部署环境的出口IP添加至访问白名单。
3. 完成调整后，重新在FastGPT的HTTP模块中发起请求，验证不再返回403错误，可正常获取目标JSON响应。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/949)
