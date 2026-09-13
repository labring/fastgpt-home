---
title: 获取FastGPT私有部署免登录窗口的客户端IP方法
slug: /zh/troubleshoot/fastgpt-private-deploy-get-client-ip
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3628
source_type: GitHub issue
---

# 获取FastGPT私有部署免登录窗口的客户端IP方法

## 现象
使用FastGPT私有部署4.8.13版本的免登录窗口时，部分安全管控场景下需获取访问该窗口的客户端IP，但当前无公开的官方获取路径，无法直接通过平台内置功能获取相关信息。

## 可能原因
FastGPT的访问日志记录逻辑、存储位置及字段配置会随部署环境的不同产生差异，没有统一的客户端IP获取规则，需结合具体部署环境确认相关日志的采集与存储配置。

## 排查步骤
1. 定位FastGPT免登录窗口的访问日志存储路径，可通过查看部署配置文件或服务运行日志确认具体位置。
2. 打开对应的日志文件，核对其中的字段信息，确认是否包含客户端IP相关的记录字段。
3. 若未包含相关字段，需按实际部署环境调整日志采集或解析规则，补充客户端IP的记录逻辑。

## 解决与验证
当前无公开的官方获取方法。若需获取客户端IP，需结合实际部署环境，通过分析访问日志或自定义代码逻辑实现。可通过通用日志检索工具提取对应免登录窗口的访问记录，从中筛选并获取客户端IP信息。

> 来源: [FastGPT GitHub issue #3628](https://github.com/labring/FastGPT/issues/3628)
