---
title: 解决FastGPT经Nginx代理后免登录窗口强制登录的问题
slug: /zh/troubleshoot/fastgpt-nginx-proxy-login-issue
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1735
source_type: GitHub issue
---

# 解决FastGPT经Nginx代理后免登录窗口强制登录的问题

## 现象
用户使用FastGPT 4.8私有部署版本，通过Nginx代理转发访问服务，在前端嵌入免登录窗口链接后，免登录窗口仍需输入账号密码完成登录。

## 可能原因
Nginx代理配置未正确传递FastGPT免登录校验所需的请求头，导致服务端无法识别合法的免登录请求，触发登录验证流程。部分代理路径的头传递配置存在缺失。

## 排查步骤
1. 确认当前FastGPT部署版本为4.8私有部署版本，核对官方文档中的代理部署要求。
2. 打开浏览器开发者工具的网络请求面板，查看免登录请求的响应状态、返回内容与请求头信息，确认是否存在代理转发异常。
3. 直接访问FastGPT原生端口3000，测试免登录功能是否正常，排除FastGPT本身的配置问题。
4. 逐一核对Nginx配置中的代理头设置，确认根路径与/chat/路径的代理头均完整传递。

## 解决与验证
调整Nginx代理配置，确保所有请求路径正确传递必要的请求头。针对当前的配置，需确认以下内容：
- 根路径代理（`location /`）需完整传递`Host`、`X-Real-IP`、`X-Forwarded-For`、`X-Forwarded-Proto`等请求头。
- `/chat/`路径的SSE代理配置需保留`Upgrade`与`Connection`头的设置，确保流式响应正常。
修改配置后，执行`nginx -s reload`重启Nginx服务，访问代理后的免登录窗口链接，确认无需输入账号密码即可正常进入会话，完成验证。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1735)
