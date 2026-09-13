---
title: FastGPT直接接入Ollama模型的配置步骤说明
slug: /zh/glossary/fastgpt-ollama-direct-connect
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/self-host/custom-models/ollama
source_type: 官方文档
---

# FastGPT直接接入Ollama模型的配置步骤说明

## 一句话定义
直接接入Ollama是FastGPT无需借助其他代理工具，直接配置连接Ollama模型的部署方式。

## 在 FastGPT 里怎么用
修改部署FastGPT的docker-compose.yml文件，注释掉AI Proxy相关代码。将OPENAI_BASE_URL设置为Ollama的开放地址，格式为http://[地址]:[端口]/v1，必须填写v1路径。在KEY字段填入任意内容，若Ollama开启鉴权则填写对应鉴权密钥。完成配置后，按照文档指引添加模型即可使用。若使用Docker部署Ollama且主机为本地部署，需将代理地址修改为http://[主机IP]:[端口]。本地开发环境启动FastGPT依赖时，需先关闭已运行的FastGPT容器，切换到FastGPT/deploy/dev目录，执行docker compose up -d启动依赖；无法获取镜像时可使用docker compose -f docker-compose.cn.yml up -d，Mongo数据库连接地址需添加directConnection=true参数以连接副本集。

## 容易搞错的地方
OPENAI_BASE_URL必须包含/v1路径，遗漏该路径会导致连接失败。KEY字段的填写需匹配Ollama的鉴权状态，默认无鉴权时可随意填入，开启鉴权需填写对应密钥，未正确配置会引发认证错误。主机部署的Ollama需使用主机IP作为地址，不可使用本地回环地址，否则容器内无法正常访问。修改docker-compose.yml时需正确注释AI Proxy相关代码，残留配置可能引发端口或服务冲突。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/custom-models/ollama)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
