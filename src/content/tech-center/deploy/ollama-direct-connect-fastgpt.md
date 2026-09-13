---
title: FastGPT 4直接接入Ollama的部署配置指南
slug: /zh/deploy/ollama-direct-connect-fastgpt
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/custom-models/ollama
source_type: 官方文档
---

# FastGPT 4直接接入Ollama的部署配置指南

当无需使用AI Proxy或OneAPI时，可通过修改部署FastGPT的docker-compose.yml文件，直接完成Ollama的接入配置。该方式无需额外中转服务，仅需调整相关环境变量与注释对应代码即可完成对接，适配Docker部署的Ollama场景。

## 直接接入的详细配置步骤
1.  打开FastGPT部署所用的docker-compose.yml配置文件。
2.  注释掉文件中所有与AIProxy相关的代码块，保留原有OpenAI相关配置的框架。
3.  配置`OPENAI_BASE_URL`环境变量，格式固定为`http://[地址]:[端口]/v1`，必须添加`/v1`后缀，不可省略。
4.  配置`OPENAI_API_KEY`环境变量，Ollama默认未开启鉴权时，可随意填入任意有效字符串；若已开启Ollama的鉴权功能，则填入对应认证密钥。
5.  若使用Docker部署的Ollama，需将主机访问地址调整为`http://[主机IP]:[端口]`，确保网络连通性。
可参考配套的截图示例完成上述配置操作。

配置完成并保存docker-compose.yml文件后，即可按照FastGPT内置的模型添加流程完成对应Ollama模型的添加，后续即可正常调用接入的Ollama模型完成相关任务。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/custom-models/ollama)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
