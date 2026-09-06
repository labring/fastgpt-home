---
title: 解决FastGPT通过Nginx代理时文档解析接口报404错误
slug: /zh/troubleshoot/fastgpt-nginx-proxy-404-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2867
source_type: GitHub issue
---

# 解决FastGPT通过Nginx代理时文档解析接口报404错误

## 现象
用户在私有部署V4.8.10-fix2版本的FastGPT中，通过Nginx代理调用`/api/v1/chat/completions`接口上传文件进行文档解析时，返回404错误。不使用Nginx直接访问FastGPT服务时，文档解析功能可以正常运行。用户提供了请求信息、Nginx配置的相关截图，其中Nginx代理指向的FastGPT部署地址为`http://10.18.31.135:13000/`。

## 可能原因
该问题大概率由Nginx代理配置错误导致。由于直接访问FastGPT服务时接口正常，仅代理后出现404错误，说明请求在经过Nginx转发时，路径或请求信息被错误修改，导致无法匹配FastGPT后端的接口路由。具体配置问题需结合实际Nginx规则确认，例如路径重写、proxy_pass的配置是否正确。

## 排查步骤
1.  核对当前Nginx配置中的代理转发规则，确认`/api/v1/chat/completions`请求是否被正确转发到FastGPT的部署地址`http://10.18.31.135:13000/`。
2.  检查Nginx配置中的路径重写规则，确认是否存在错误的路径替换操作，导致请求路径被修改后无法匹配FastGPT的接口路由。
3.  在可直接访问FastGPT服务的环境中，使用curl等工具调用`http://10.18.31.135:13000/api/v1/chat/completions`，验证该接口在无代理环境下的可用性，确认接口本身无异常。
4.  查看Nginx的访问日志，获取被代理请求的实际路径和返回状态，确认请求是否正确转发到FastGPT后端服务。

## 解决与验证
根据排查结果调整Nginx代理配置，确保请求路径被正确转发到FastGPT后端。例如修正路径重写规则或proxy_pass的配置，保证请求的接口路径能够被FastGPT正确识别。
完成配置修改后，重启Nginx服务使配置生效。再次通过Nginx代理调用`/api/v1/chat/completions`接口上传文件，验证文档解析功能是否恢复正常，无404错误返回。同时对比无代理时的接口调用结果，确认代理后的功能与直接访问时一致。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/2867)
