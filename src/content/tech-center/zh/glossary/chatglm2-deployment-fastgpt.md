---
title: FastGPT中ChatGLM2自定义模型的部署配置与启动方法
slug: /zh/glossary/chatglm2-deployment-fastgpt
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/self-host/custom-models/chatglm2
source_type: 官方文档
---

# FastGPT中ChatGLM2自定义模型的部署配置与启动方法

## 一句话定义
ChatGLM2部署是FastGPT中通过源码方式配置并启动ChatGLM2自定义大语言模型的操作流程。

## 在 FastGPT 里怎么用
首先完成环境配置，相关配置教程可通过GPT获取。下载指定的openai_api.py文件，执行pip install -r requirements.txt安装依赖。在该py文件的verify_token方法中配置token，用于接口防盗用。执行启动命令python openai_api.py --model_name [配置对应数字]，等待模型加载完成。启动成功后将显示连接地址http://0.0.0.0:6006。

## 容易搞错的地方
误将verify_token的作用视为模型本身的验证，该配置仅用于接口层的防盗用。启动命令中--model_name后的数字需与前期配置的模型参数匹配，不可随意填写。启动后需等待模型完全加载，未加载完成时无法正常使用接口。遇到报错时需先通过GPT排查问题，不可直接跳过排查步骤。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/custom-models/chatglm2)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
