---
title: 解决FastGPT更换向量模型后仍调用text-embedding-ada-002的问题
slug: /zh/troubleshoot/fastgpt-vector-model-call-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/586
source_type: GitHub issue
---

# 解决FastGPT更换向量模型后仍调用text-embedding-ada-002的问题

## 现象
在FastGPT私有部署场景中，已更换VectorModels配置项后，系统发起的向量相关请求仍使用text-embedding-ada-002模型。

## 可能原因
需按实际环境确认配置项的加载、识别与生效逻辑。

## 排查步骤
1. 核对VectorModels配置项的填写内容，确认参数格式符合要求。
2. 检查配置文件是否已完成保存，并重启FastGPT服务以加载新配置。
3. 查看系统运行日志，确认实际加载的向量模型配置信息。
4. 对比已更换的模型与配置项中的参数是否一致。

## 解决与验证
1. 修正VectorModels配置项的参数，确保填写内容正确。
2. 重启FastGPT服务，使新配置生效。
3. 发起向量相关请求，确认请求的模型为配置的目标模型。
4. 查看请求日志，验证模型调用是否符合预期。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/586)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
