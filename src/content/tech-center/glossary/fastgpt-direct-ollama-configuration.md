---
title: 说明FastGPT直接接入Ollama模型的配置方法与注意事项
slug: /zh/glossary/fastgpt-direct-ollama-configuration
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/self-host/custom-models/ollama
source_type: 官方文档
---

# 说明FastGPT直接接入Ollama模型的配置方法与注意事项

## 一句话定义
直接接入是FastGPT跳过AI Proxy等中间代理，直接配置Ollama地址完成模型对接的部署方式。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
修改部署FastGPT的docker-compose.yml文件，注释掉AIProxy相关代码。在OPENAI_BASE_URL中填入Ollama开放地址，格式为http://地址:端口/v1，v1必须填写。在KEY中填入任意内容，若Ollama开启鉴权则填入对应密钥。其他操作与OneAPI配置一致，完成配置后，按照文档指引完成模型添加即可使用。若为Docker部署Ollama，主机部署时需将代理地址修改为http://[主机IP]:[端口]。

## 容易搞错的地方
容易出错的细节包括：OPENAI_BASE_URL必须添加/v1后缀，不可省略；KEY字段不能留空，即使Ollama默认无鉴权也需填入内容；拉取镜像时可能出现error pulling image configuration: download failed after attempts=6: dialing cdn03.quay.io:443这类报错，需更换镜像地址解决。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/custom-models/ollama)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
