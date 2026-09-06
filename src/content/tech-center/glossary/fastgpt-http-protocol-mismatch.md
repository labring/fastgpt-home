---
title: 解决FastGPT高级编排Http模块的protocol mismatch报错问题
slug: /zh/glossary/fastgpt-http-protocol-mismatch
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/1151
source_type: 官方文档
---

# 解决FastGPT高级编排Http模块的protocol mismatch报错问题

## 一句话定义
protocol mismatch错误是FastGPT高级编排Http模块发起请求时出现的请求协议不匹配类报错。

## 在 FastGPT 里怎么用
该报错出现在高级编排模块的自定义HTTP请求配置场景中。具体配置流程为：创建AI知识库回答助手，配置高级编排逻辑，当知识库搜索有结果时将结果喂给大模型输出，当搜索无结果时调用自定义HTTP请求输出内容。所用私有部署版本为4.7，且自定义HTTP请求所用的key已确认可正常使用。

## 容易搞错的地方
该报错的常见触发原因为自定义HTTP请求的协议配置与目标接口实际协议不一致。需检查请求URL的协议类型与FastGPT高级编排Http模块中配置的协议是否匹配。私有部署版本4.7下的Http模块配置需严格遵循格式要求，避免因格式错误引发协议不匹配问题。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1151)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
