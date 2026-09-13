---
title: FastGPT中通过Ollama部署大模型的问题排查与使用说明
slug: /zh/glossary/fastgpt-ollama-model-deployment
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/1998
source_type: 官方文档
---

# FastGPT中通过Ollama部署大模型的问题排查与使用说明

## 一句话定义
指FastGPT中通过Ollama部署本地大模型或向量模型的集成与使用相关操作。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
通过Ollama部署的聊天模型可成功集成到FastGPT。知识库导入与检索阶段使用本地Ollama模型无异常，但AI会话界面会出现报错。修改config.json中的参数可能影响模型运行，当max response参数设置为2000时，可能触发对话接口报错或返回为空。部署向量模型（如m3e）时存在集成异常。

## 容易搞错的地方
修改config.json的参数可能导致本地Ollama部署的大模型在AI会话界面报错，知识库操作不受影响。向量模型通过Ollama部署后，在FastGPT中的集成存在异常。max response参数设置为2000时，易触发对话接口报错或返回为空。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1998)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
