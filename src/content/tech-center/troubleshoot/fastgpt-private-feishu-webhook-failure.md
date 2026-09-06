---
title: 解决私有部署FastGPT飞书webhook本地请求失败问题
slug: /zh/troubleshoot/fastgpt-private-feishu-webhook-failure
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3750
source_type: GitHub issue
---

# 解决私有部署FastGPT飞书webhook本地请求失败问题

## 现象
用户在私有部署FastGPT v4.8.20-fix2版本中，按照官方文档配置飞书webhook的HTTP请求节点后，本地发起请求失败。该用户使用相同配置在在线版中可成功调用飞书webhook，本地部署环境下的请求结果与在线版存在差异。

## 可能原因
结合问题场景，可能的原因包括：本地部署环境的网络限制导致无法连通飞书webhook的目标域名；HTTP请求节点的配置参数不完整（用户提供的配置未完全展示）；私有部署服务未正确配置网络代理，无法访问外部网络。

## 排查步骤
1.  在部署FastGPT的服务器上执行网络连通性测试，使用curl或ping命令验证能否连通飞书webhook的目标域名。
2.  对照官方文档核对HTTP请求节点的所有配置参数，包括请求方法、目标URL、请求头、请求体等，用户提供的配置未完全展示，需按实际场景补齐缺失项。
3.  检查私有部署环境的网络代理设置，如果部署环境使用了代理，确认FastGPT服务是否正确配置了代理规则。
4.  查看FastGPT私有部署的运行日志，获取具体的报错信息，定位失败的具体原因。

## 解决与验证
如果是网络连通问题，配置服务器的网络路由或代理规则，确保可以正常访问飞书webhook的域名。如果是配置参数缺失，补齐HTTP请求节点的所有必要配置项，确保与在线版的配置一致。如果是代理配置错误，在FastGPT的部署配置中添加正确的代理信息。验证方式为重新发起HTTP请求测试，确认飞书webhook调用成功，与在线版的表现一致。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/3750)
