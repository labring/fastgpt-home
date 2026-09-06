---
title: FastGPT免登录窗口与问题扩展的常见报错处理
slug: /zh/glossary/fastgpt-login-window-extension-errors
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/1417
source_type: 官方文档
---

# FastGPT免登录窗口与问题扩展的常见报错处理

## 一句话定义
指FastGPT私有部署版本v4.7.1-fix2中，发布应用的免登录窗口嵌入外部页面时触发的HTTPS拦截报错，以及调用问题扩展功能时因返回非JSON结果引发的两类典型报错场景。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
免登录窗口的配置位置为发布应用功能的免登录窗口模块，在此处插入外部代码时，需确保代码中的链接协议与当前页面协议一致。问题扩展功能的调用需确保返回结果为标准JSON格式，以保证功能正常执行。

## 容易搞错的地方
一是免登录窗口插入的外部链接使用HTTP协议，而当前页面为HTTPS协议，触发浏览器拦截，提示“This request has been blocked; the content must be served over HTTPS”。二是问题扩展功能的返回结果未遵循JSON格式规范，导致系统无法正常解析，引发执行报错。

> [FastGPT GitHub issue 1417](https://github.com/labring/FastGPT/issues/1417), [FastGPT GitHub issue 1474](https://github.com/labring/FastGPT/issues/1474)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
