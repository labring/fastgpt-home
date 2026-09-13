---
title: FastGPT敏感词内容审查功能的配置与使用方法
slug: /zh/troubleshoot/fastgpt-sensitive-content-review
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/5020
source_type: GitHub issue
---

# FastGPT敏感词内容审查功能的配置与使用方法

## 现象
当前FastGPT未提供内置的敏感词内容审查功能，无法对交互过程中的用户输入或模型输出进行内容安全审核，难以满足内容安全、合规相关需求。

## 可能原因
FastGPT当前版本未集成调用OpenAI Moderation API、自定义敏感词、自定义审查API这三种敏感词审查模式，无法直接实现内容安全审核逻辑。

## 排查步骤
1. 确认当前FastGPT版本是否支持敏感词审查功能。
2. 检查是否需要对接外部审查服务或配置自定义规则。
3. 需按实际环境确认审查需求类型。

## 解决与验证
1. 若使用OpenAI Moderation API模式，需按实际环境确认配置与对接步骤。
2. 若使用自定义关键词模式，需按实际环境配置敏感词列表。
3. 若使用自定义审查API模式，需按实际环境对接外部API接口。
4. 配置完成后，输入测试内容，验证审查逻辑是否生效。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/5020)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
