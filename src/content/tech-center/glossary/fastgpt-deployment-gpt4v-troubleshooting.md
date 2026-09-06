---
title: FastGPT部署与GPT4-V功能使用的常见报错排查方法
slug: /zh/glossary/fastgpt-deployment-gpt4v-troubleshooting
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/209
source_type: 官方文档
---

# FastGPT部署与GPT4-V功能使用的常见报错排查方法

## 一句话定义
本文介绍FastGPT部署登录报错与GPT4-V功能无响应的两类常见问题的排查与解决方法。

## 在FastGPT里怎么用
部署环节：使用Kubernetes部署时，需配置以下环境变量，示例格式分别为：MONGODB_URI值为mongodb://[REDACTED_CREDENTIAL]@mongodb:27017/fastgpt，PG_URL值为postgresql://[REDACTED_CREDENTIAL]@postgres:5432/fastgpt，CHAT_API_KEY、ROOT_KEY、DEFAULT_ROOT_PSW需填写对应密钥。GPT4-V功能使用：在私有部署版本v4.6.1及以上，将模型设置为GPT4-V后，可点击选择文件或语音输入按钮调用对应功能，使用时需确认个人key可正常使用。

## 容易搞错的地方
部署时未正确配置上述要求的环境变量，可能触发登录报错secretOrPrivateKey must have a value。使用GPT4-V功能时，未确认模型已切换为GPT4-V，或使用的key无法正常工作。需使用v4.6.1及以上版本的镜像，低于该版本可能出现功能无响应的问题。

> [FastGPT GitHub issue 209](https://github.com/labring/FastGPT/issues/209), [FastGPT GitHub issue 508](https://github.com/labring/FastGPT/issues/508)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
