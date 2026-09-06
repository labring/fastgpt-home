---
title: 解决FastGPT公有云版模型提供商页面无自定义模型选项问题
slug: /zh/troubleshoot/fastgpt-cloud-custom-model-issue
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/5158
source_type: GitHub issue
---

# 解决FastGPT公有云版模型提供商页面无自定义模型选项问题

## 现象
使用https://cloud.tryfastgpt.ai 公有云版本且购买套餐后，进入模型提供商页面，无法找到文档中提及的自定义模型选项，无法添加如gemini 2.5正式版系列等未上架的模型。

## 可能原因
该问题的可能原因需结合平台实际配置确认，已知关联场景为使用公有云付费版本且期望添加未上架的自定义模型。

## 排查步骤
1.  确认当前使用的是https://cloud.tryfastgpt.ai 公有云版本，且已完成对应套餐的购买流程。
2.  访问模型提供商页面，对照官方文档确认自定义模型选项的预期展示位置。
3.  检查当前账号的可用功能权限，确认是否开放自定义模型配置权限。

## 解决与验证
若为公有云平台规则限制导致的问题，需联系平台运维人员确认自定义模型的开放规则。验证方式为查看模型提供商页面是否展示自定义模型配置选项，或成功添加未上架的目标模型。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/5158)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
