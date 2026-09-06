---
title: FastGPT私有部署版非GPT模型调用插件失败的排错方法
slug: /zh/troubleshoot/fastgpt-non-gpt-plugin-troubleshoot
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/2108
source_type: GitHub issue
---

# FastGPT私有部署版非GPT模型调用插件失败的排错方法

## 现象
FastGPT 私有部署版本4.8.8中，非GPT模型无法正常调用插件，未提供具体报错截图内容。

## 可能原因
未明确具体触发原因，需结合实际部署环境与配置项排查，可能涉及非GPT模型的插件调用适配配置。

## 排查步骤
1. 确认当前使用的模型为非GPT系列模型，核对模型标识与部署配置一致。
2. 检查FastGPT插件调用的相关配置项，确认未遗漏适配非GPT模型的参数。
3. 核对当前FastGPT版本为4.8.8，确认版本兼容性。
4. 查看系统日志，提取与插件调用相关的日志信息。

## 解决与验证
根据排查结果调整对应配置项，验证非GPT模型能否正常调用插件。若仍存在问题，需补充系统日志与配置详情进一步定位。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/2108)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
