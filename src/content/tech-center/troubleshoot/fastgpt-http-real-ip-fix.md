---
title: 解决FastGPT流程HTTP控件获取真实客户端IP的问题
slug: /zh/troubleshoot/fastgpt-http-real-ip-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5808
source_type: GitHub issue
---

# 解决FastGPT流程HTTP控件获取真实客户端IP的问题

## 现象
在FastGPT流程的开始节点后添加HTTP控件用于记录客户端IP时，获取到的IP均为FastGPT运行容器的IP，无法获取真实的客户端访问IP。

## 可能原因
HTTP控件在发起请求时，未透传原始客户端请求的真实IP相关头部信息，导致仅能获取到代理层或运行容器的IP，无法获取真实客户端的访问IP。

## 排查步骤
1.  检查HTTP控件的请求头部配置项，确认是否未添加原始请求的IP透传配置。
2.  查看原始客户端请求的头部信息，确认是否存在X-Forwarded-For、X-Real-IP等真实IP相关头部。
3.  需按实际环境确认代理层是否正确配置并传递了真实客户端IP的头部信息。

## 解决与验证
在HTTP控件的请求头部配置中添加透传原始请求头部的逻辑。具体需添加以下头部配置：
`'X-Forwarded-For': originalRequest.headers['x-forwarded-for']`，用于传递原始请求中的客户端IP链；
`'X-Real-IP': originalRequest.headers['x-real-ip']`，用于传递原始请求中的真实客户端IP；
`'Host': originalRequest.headers['host']`，用于保留原始请求的Host头部。
完成配置后，发起新的客户端访问请求，查看HTTP控件记录的IP是否为真实的客户端访问IP，完成验证。

> 来源: [FastGPT GitHub issue #5808](https://github.com/labring/FastGPT/issues/5808)
