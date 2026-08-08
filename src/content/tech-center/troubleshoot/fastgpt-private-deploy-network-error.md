---
title: FastGPT私有部署网络连接无法访问问题排查
slug: /zh/troubleshoot/fastgpt-private-deploy-network-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6700
source_type: GitHub issue
---

# FastGPT私有部署网络连接无法访问问题排查

## 现象
用户在私有部署FastGPT时，使用宝塔面板进行配置，仍出现网络连接无法访问的情况，附带了相关报错截图。

## 可能原因
1.  服务器原生防火墙或安全组规则拦截了FastGPT使用的端口
2.  宝塔面板的安全策略未放行FastGPT对应的端口
3.  FastGPT的网络配置参数与实际部署环境不匹配，需按实际环境确认具体配置项

## 排查步骤
1.  确认FastGPT部署所使用的端口号，检查服务器原生防火墙是否开放该端口
2.  登录宝塔面板，查看安全组配置，确认FastGPT使用的端口未被拦截
3.  核对FastGPT的网络配置项，确保参数与当前部署环境一致，信息不足的部分需按实际环境确认
4.  查看FastGPT的运行日志，提取具体的连接报错信息

## 解决与验证
若为防火墙或安全组拦截问题，需开放对应端口至允许访问；若为配置参数错误，修正参数后重启FastGPT服务；验证方式为访问配置的网络地址，确认可正常建立连接。

> 来源：https://github.com/labring/FastGPT/issues/6700
