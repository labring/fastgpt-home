---
title: 解决FastGPT HTTP请求节点因SSL证书问题导致的请求失败问题
slug: /zh/troubleshoot/fastgpt-http-ssl-request-failed
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6200
source_type: GitHub issue
---

# 解决FastGPT HTTP请求节点因SSL证书问题导致的请求失败问题

## 现象
在FastGPT 4.14.4私有部署版本的HTTP请求节点中，向外部API网站发送HTTPS请求时，请求始终无法成功返回有效内容。用户经本地测试，关闭SSL证书验证后可正常返回结果，但无法在FastGPT平台的配置界面中找到关闭SSL验证的配置选项。

## 可能原因
1.  目标API的SSL证书已过期，导致FastGPT发起的HTTPS请求校验失败；
2.  FastGPT的HTTP请求节点默认启用SSL证书验证机制，且该版本未提供可视化的关闭SSL验证的配置入口。

## 排查步骤
1.  使用在线SSL检测工具或本地命令（如`openssl s_client -connect 目标API域名:端口`），确认目标API的SSL证书是否过期或存在异常。
2.  在本地环境中关闭SSL证书验证后重新发起请求，验证问题是否由SSL证书校验导致。
3.  检查FastGPT HTTP请求节点的配置面板，确认是否存在SSL证书验证相关的开关配置项。

## 解决与验证
若目标API的SSL证书确实过期，可联系API服务方更新证书后重新发起请求，即可恢复正常。若暂时无法更新目标API的SSL证书，需找到FastGPT中关闭SSL证书验证的配置项：该配置项的具体位置需按实际FastGPT版本的界面确认；若官方未提供可视化开关，则需通过修改对应部署配置文件或环境变量实现（需按实际部署环境确认具体操作步骤）。配置完成后重新发起HTTP请求，即可验证请求是否可以正常返回内容。

> 来源：[FastGPT GitHub Issue #6200](https://github.com/labring/FastGPT/issues/6200)
