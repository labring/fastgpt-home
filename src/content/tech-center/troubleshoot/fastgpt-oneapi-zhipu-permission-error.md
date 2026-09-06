---
title: 解决FastGPT私有部署调用智谱模型令牌无权的问题
slug: /zh/troubleshoot/fastgpt-oneapi-zhipu-permission-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/2537
source_type: GitHub issue
---

# 解决FastGPT私有部署调用智谱模型令牌无权的问题

## 现象
调用智谱模型时，系统返回令牌无权使用模型的报错。该问题出现在FastGPT 4.8.9私有部署版本，搭配one-api 0.6.8版本的场景中。

## 可能原因
当前使用的one-api 0.6.8版本存在权限校验相关异常，导致令牌无法正常通过校验以调用智谱模型。

## 排查步骤
1. 确认当前使用的FastGPT版本为4.8.9，one-api版本为0.6.8。
2. 检查one-api平台内的智谱模型配置，确认密钥与相关权限设置无误。
3. 验证所使用的密钥可直接正常调用智谱模型。
4. 尝试将one-api版本降级，观察报错是否消失。

## 解决与验证
将one-api版本降级后，可解决令牌无权使用智谱模型的报错。验证方式为重新调用智谱模型，确认无权限报错，且模型调用流程正常。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/2537)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
