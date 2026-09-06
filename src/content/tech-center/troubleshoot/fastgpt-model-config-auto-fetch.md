---
title: 解决FastGPT模型配置需手动修改及无法自动获取模型列表问题
slug: /zh/troubleshoot/fastgpt-model-config-auto-fetch
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/731
source_type: GitHub issue
---

# 解决FastGPT模型配置需手动修改及无法自动获取模型列表问题

## 现象
添加模型时需手动修改config.json内的模型配置，修改后需重启服务，会对业务运行造成影响；无法通过标准openapi接口获取可用模型列表，手动输入配置参数时易出现空格等失误，导致配置错误。

## 可能原因
现有FastGPT版本中，模型配置仅支持通过修改本地config.json文件完成，未提供网页端可视化配置入口；未集成通过标准openapi接口自动拉取可用模型列表的功能，仅支持手动输入模型配置参数。

## 排查步骤
1. 确认当前FastGPT部署环境中，模型配置是否通过修改config.json文件完成。
2. 确认是否需要通过openapi接口获取对应服务的可用模型列表。
3. 需按实际环境确认现有配置流程的具体限制及业务影响。

## 解决与验证
解决方向为支持通过网页端完成模型配置，无需修改config.json文件，且无需重启服务；集成标准openapi接口自动加载可用模型列表，减少手动输入带来的失误。验证时，可通过网页端完成模型配置操作，无需修改本地配置文件；可通过openapi接口自动拉取可用模型列表，直接加载至配置参数中，降低配置失误概率。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/731)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
