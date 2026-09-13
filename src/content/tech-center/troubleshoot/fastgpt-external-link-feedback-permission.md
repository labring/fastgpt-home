---
title: 解决FastGPT外链模式下点击反馈按钮无权限的问题
slug: /zh/troubleshoot/fastgpt-external-link-feedback-permission
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/718
source_type: GitHub issue
---

# 解决FastGPT外链模式下点击反馈按钮无权限的问题

## 现象
外链模式下点击反馈按钮时，系统弹出无权限提示，相关截图显示权限校验失败的弹窗内容。

## 可能原因
目前未明确具体触发原因，已知该问题出现在私有部署版本的FastGPT外链模式中，具体原因需按实际部署环境与配置确认。

## 排查步骤
1. 确认当前运行的FastGPT为私有部署版本。
2. 确认所使用的密钥可正常调用FastGPT相关服务。
3. 核对外链模式的配置是否符合项目文档要求。

## 解决与验证
根据排查结果调整对应配置，确保反馈功能的权限校验逻辑正常。验证时，在外链模式下点击反馈按钮，确认可以成功提交反馈内容，不再出现无权限提示。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/718)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
