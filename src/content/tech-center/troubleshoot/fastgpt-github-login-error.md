---
title: 解决FastGPT平台使用GitHub第三方登录时出现的报错问题
slug: /zh/troubleshoot/fastgpt-github-login-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/2629
source_type: GitHub issue
---

# 解决FastGPT平台使用GitHub第三方登录时出现的报错问题

## 现象
登录FastGPT公有云版本网站，点击GitHub登录按钮后出现报错。该问题的复现步骤为登录FastGPT网站后点击GitHub登录按钮，反馈附带两张报错截图，未提供具体报错文本内容。

## 可能原因
当前反馈未明确标注具体报错原因，无法直接确定报错根源。需结合实际使用环境排查相关关联因素，具体排查方向需按实际场景确认。

## 排查步骤
1.  确认当前使用的FastGPT版本为公有云版本。
2.  确认用于登录的GitHub账号可正常访问GitHub平台，无异常状态。
3.  重新执行GitHub登录操作，完整记录所有报错提示内容。
4.  核对FastGPT平台的登录相关配置参数，确认参数无异常配置。

## 解决与验证
根据排查出的具体问题进行针对性处理。若排查出异常配置，修正对应配置项；若为账号或网络问题，按对应指引完成修复。验证方式为重新执行GitHub登录操作，确认报错是否不再出现。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/2629)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
