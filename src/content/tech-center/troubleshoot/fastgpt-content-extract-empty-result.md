---
title: 解决FastGPT内容提取返回空结果的排查与修复方法
slug: /zh/troubleshoot/fastgpt-content-extract-empty-result
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1395
source_type: GitHub issue
---

# 解决FastGPT内容提取返回空结果的排查与修复方法

## 现象
内容提取功能调用后返回空结果。FastGPT的请求参数被打印，使用curl实现相同功能的调用可正常返回结果，FastGPT端调用返回空。

## 可能原因
推测原因为内容提取的模板未使用输入的用户问题，导致输出为空。该推测需按实际环境确认。

## 排查步骤
1. 打印FastGPT内容提取功能的请求参数，确认传入的用户问题等参数是否正确。
2. 对比使用curl实现的相同功能调用，验证接口逻辑是否正常。
3. 检查内容提取模板的配置，确认模板是否正确引用了输入的用户问题参数。

## 解决与验证
若确认内容提取模板未引用输入的用户问题，修改内容提取模板，添加对输入用户问题的引用。修改完成后，重新调用内容提取功能，验证返回结果是否正常。若问题未解决，需按实际环境进一步排查。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1395)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
