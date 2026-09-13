---
title: 解决FastGPT私有部署时Vue axios调用工作流的跨域错误问题
slug: /zh/troubleshoot/fastgpt-vue-axios-cors-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4413
source_type: GitHub issue
---

# 解决FastGPT私有部署时Vue axios调用工作流的跨域错误问题

## 现象
用户在私有部署的fastgpt:v4.9.1-fix版本的Vue项目中，使用axios发送POST请求调用FastGPT工作流时，返回跨域错误。使用apifox或curl命令发起相同请求时，可以正常建立对话，不受影响。

## 可能原因
一是浏览器同源策略限制，当前Vue项目的访问地址与FastGPT服务的地址不符合同源要求；二是FastGPT服务未配置允许该Vue项目的跨域请求来源。命令行工具不受浏览器同源策略约束，因此apifox和curl可以正常调用服务。

## 排查步骤
1. 确认FastGPT服务的部署地址与Vue项目的访问地址的协议、域名、端口是否一致，不一致则存在同源策略限制风险。
2. 检查FastGPT的跨域配置，确认是否添加了Vue项目的完整访问地址作为允许的跨域来源。
3. 打开浏览器开发者工具的网络面板，查看该POST请求的详细报错信息，确认是否为CORS跨域错误。
4. 再次使用apifox或curl命令发起相同请求，验证FastGPT服务本身是否可以正常响应请求，排除服务自身故障。

## 解决与验证
若Vue项目与FastGPT服务地址不符合同源要求，可调整其中一方的部署地址以满足同源规则。若需保留不同源的部署方式，需将Vue项目的完整访问地址添加到FastGPT服务的跨域允许来源列表中。验证时，重新在Vue项目中发起POST请求，确认不再出现跨域错误，且可以正常调用FastGPT工作流。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/4413)
