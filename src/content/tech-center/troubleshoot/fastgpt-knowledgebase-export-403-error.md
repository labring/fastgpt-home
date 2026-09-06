---
title: 解决FastGPT知识库导出返回403凭证错误的问题
slug: /zh/troubleshoot/fastgpt-knowledgebase-export-403-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/535
source_type: GitHub issue
---

# 解决FastGPT知识库导出返回403凭证错误的问题

## 现象
私有部署场景下，执行知识库导出操作时，返回报错信息{"code":403statusText:"unAuthorization"message:"凭证错误"data:null}。

## 可能原因
该报错提示凭证错误，可能涉及导出操作的凭证配置不符合校验规则，或凭证校验环节出现异常。具体原因需按实际部署环境确认。

## 排查步骤
1. 再次确认使用的密钥可正常使用，且未超出权限范围。
2. 检查导出操作对应的凭证配置，确认配置参数与系统校验规则匹配。
3. 排查部署环境的访问限制，确认导出请求未被拦截。

## 解决与验证
根据排查结果修正对应异常配置，重新执行知识库导出操作。若返回结果无凭证错误提示，且可正常获取导出文件，则问题解决。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/535)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
