---
title: 解决FastGPT多知识库调用时token超出模型上限问题
slug: /zh/troubleshoot/fastgpt-multi-kb-token-over-limit
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1210
source_type: GitHub issue
---

# 解决FastGPT多知识库调用时token超出模型上限问题

## 现象
使用FastGPT私有部署4.7.1版本，通过工具调用接入多个知识库，单个知识库引用上限设置低于3000 token。当调用2个知识库回答问题时，系统提示token超出模型16k上限，无法正常完成回答。

## 可能原因
具体原因需按实际环境确认。

## 排查步骤
1. 确认当前FastGPT的部署版本为私有部署4.7.1。
2. 核对工具调用接入的知识库数量，以及单个知识库的token引用上限配置。
3. 计算单次调用中所有被调用知识库召回的总token数值，对比模型的16k上下文上限。
4. 查看系统返回的超限提示内容，确认token超限的具体情况。

## 解决与验证
1. 若总召回token数确实超出模型上限，可调整知识库召回策略，减少单次调用的知识库数量，或降低单个知识库的召回token配额。
2. 按照预期的分词整合方案，配置系统对超出上限的召回内容进行分词处理后整合回答。
3. 重新发起提问调用，验证token超限问题是否解决，能否正常完成多知识库内容的整合回答。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1210)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
