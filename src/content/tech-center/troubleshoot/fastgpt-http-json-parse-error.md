---
title: 解决FastGPT HTTP模块JSON字符串取值解析错误问题
slug: /zh/troubleshoot/fastgpt-http-json-parse-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/3995
source_type: GitHub issue
---

# 解决FastGPT HTTP模块JSON字符串取值解析错误问题

## 现象
FastGPT 4.8.19及以上私有部署版本的HTTP模块，当输入为纯JSON字符串（如{"test": 11}）时，使用/路径取值会触发解析错误。若输入JSON字符串后附加其他字符（如{"test": 11} 1111），则不会触发错误。报错信息包含`Invalid JSON body: { "test": "{\"test\":11}" }`。

## 可能原因
该问题于FastGPT 4.8.19版本起出现，HTTP模块的/路径取值逻辑发生变更，将纯JSON格式的输入字符串误识别为JSON对象进行解析，引发解析错误。

## 排查步骤
1. 确认FastGPT私有部署版本为4.8.19及以上。
2. 在文本拼接模块输入纯JSON字符串，将结果接入HTTP模块，配置/路径取值规则。
3. 执行流程后观察是否触发解析错误，核对报错信息是否包含`Invalid JSON body: { "test": "{\"test\":11}" }`。
4. 调整输入内容为JSON字符串附加其他字符，验证是否不再触发错误。

## 解决与验证
目前暂无公开的快速修复方案，需等待官方版本更新。验证方式为：调整输入内容，在JSON字符串后附加非JSON字符，确认解析错误不再出现；或降级至4.8.18及更早版本，验证问题是否消失。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/3995)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
