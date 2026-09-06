---
title: FastGPT文件解析服务的相关配置与优化说明
slug: /zh/glossary/fastgpt-file-parse-config-optimization
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/4152
source_type: 官方文档
---

# FastGPT文件解析服务的相关配置与优化说明

## 一句话定义
文件解析（Parse）是FastGPT中对上传文件进行内容提取与格式处理的核心服务，LiteParse为其专用解析组件。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
可通过环境变量`PARSE_FILE_WORKERS`配置文件解析worker的数量，当前默认值为5。升级LiteParse版本可解决并发解析PDF的报错问题。系统工具生成的文件将长期有效，随会话删除。工作流节点的数组字符串类型输入将自动适配，数组类型输入将自动进行JSON parse解析。文件解析的分块算法优化包括跨处理符号连续性增强，代码块与表格分割时以LLM模型上下文作为分块大小以保证完整性。

## 容易搞错的地方
容易混淆文件解析worker的默认数值，当前默认值为5，需注意环境变量配置的是调整后的参数。易误认为系统工具生成的文件仍有1小时过期限制，实际已改为长期有效。工作流数组类型的string输入会自动完成JSON parse，无需手动执行解析操作，避免重复处理。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/4152)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
