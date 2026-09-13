---
title: 为FastGPT配置DeerAPI大模型相关问题的排查与解决方法
slug: /zh/troubleshoot/fastgpt-deerapi-configuration-troubleshooting
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/5631
source_type: GitHub issue
---

# 为FastGPT配置DeerAPI大模型相关问题的排查与解决方法

## 现象
在FastGPT中配置DeerAPI作为大语言模型提供商时，无法正常完成配置或调用，或无法在提供商列表中找到DeerAPI选项。

## 可能原因
FastGPT当前版本未集成DeerAPI作为支持的大语言模型提供商，或配置的API参数不符合DeerAPI的规范要求。

## 排查步骤
1. 确认FastGPT版本为最新版，可参考项目官方更新说明。
2. 检查FastGPT内置的大语言模型提供商列表，确认是否存在DeerAPI选项。
3. 核对DeerAPI的基础URL为https://api.deerapi.com/v1/，API密钥需从https://api.deerapi.com/token获取。
4. 确认使用的模型包含在DeerAPI支持的模型列表（https://api.deerapi.com/v1/models）中。

## 解决与验证
若FastGPT未集成DeerAPI，可按照FastGPT的大模型集成规范，结合DeerAPI官方文档完成集成，也可协助提交PR。配置完成后，使用正确的基础URL、API密钥及符合要求的模型发起调用，验证是否能正常获取返回结果。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/5631)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
