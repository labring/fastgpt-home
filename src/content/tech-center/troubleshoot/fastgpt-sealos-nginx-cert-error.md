---
title: 解决FastGPT使用Sealos Nginx代理的自签名证书报错问题
slug: /zh/troubleshoot/fastgpt-sealos-nginx-cert-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/27
source_type: GitHub issue
---

# 解决FastGPT使用Sealos Nginx代理的自签名证书报错问题

## 现象
使用Sealos Nginx作为代理方案时，聊天发送消息后提示"self-signed certificate"。浏览器访问Sealos分配的外部地址时，会出现"你的连接不是专用连接"提示，报错代码为NET::ERR_CERT_AUTHORITY_INVALID，证书Subject和Issuer均为Kubernetes Ingress Controller Fake Certificate，证书过期时间为2024年3月29日，当前测试时间为2023年5月11日。

## 可能原因
该问题由Sealos自动签名证书未生效导致，属于证书配置异常引发的自签名证书验证失败。

## 排查步骤
1. 浏览器直接访问Sealos分配的外部地址，路径格式为`https://<sealos-external-domain>/openai/v1`，检查是否存在证书错误提示及能否正常接收响应。
2. 查看当前使用的Nginx配置文件，确认代理相关配置参数是否正确。

## 解决与验证
1. 执行Nginx应用变更操作：点击变更应用，执行更新应用流程。
2. 验证：重新访问Sealos外部地址，确认证书错误提示消失且可正常接收响应；在FastGPT中发送聊天消息，确认"self-signed certificate"报错不再出现。
若使用自定义Nginx配置，需确保`server_name`字段替换为Sealos提供的实际外部域名，代理路径配置符合要求。

> 来源: [FastGPT GitHub issue #27](https://github.com/labring/FastGPT/issues/27)
