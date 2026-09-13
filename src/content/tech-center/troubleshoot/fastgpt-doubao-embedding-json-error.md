---
title: 解决FastGPT添加豆包嵌入视觉模型的JSON解析报错问题
slug: /zh/troubleshoot/fastgpt-doubao-embedding-json-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/6460
source_type: GitHub issue
---

# 解决FastGPT添加豆包嵌入视觉模型的JSON解析报错问题

## 现象
手动添加doubao-embedding-vision-250615或doubao-embedding-vision-251215模型至FastGPT时，会触发报错：The parameter `` specified in the request are not valid: we could not parse the JSON body of your request. Request id: xxxxxx。同时，原有的doubao-embedding-large-text-250515和doubao-embedding-text-240715模型无法正常使用。

## 可能原因
报错核心为请求参数不符合接口规范，结合场景可推断，一是FastGPT内置模型列表未包含指定的豆包嵌入视觉模型，导致生成的请求体无法被正确解析；二是原有的两款文本嵌入模型已停止服务，无法正常调用。

## 排查步骤
1. 确认当前使用的FastGPT版本为最新版，已完成升级操作。
2. 核对待添加的模型名称，确保为doubao-embedding-vision-250615或doubao-embedding-vision-251215，无拼写错误。
3. 查看报错信息，确认是否包含“The parameter `` specified in the request are not valid: we could not parse the JSON body of your request”相关内容。
4. 检查原有的doubao-embedding-large-text-250515和doubao-embedding-text-240715模型的可用状态。

## 解决与验证
解决方式为将指定的豆包嵌入视觉模型手动添加至FastGPT的模型配置列表中，确保配置参数匹配模型接口要求。验证流程为：添加模型后发起测试调用，确认不再出现JSON请求体解析报错，且模型可正常用于知识库索引任务。同时需将无法使用的旧模型替换为新增的视觉嵌入模型。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/6460)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
