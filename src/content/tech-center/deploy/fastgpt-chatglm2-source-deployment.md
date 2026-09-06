---
title: FastGPT平台ChatGLM2模型的源码部署步骤
slug: /zh/deploy/fastgpt-chatglm2-source-deployment
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/custom-models/chatglm2
source_type: 官方文档
---

# FastGPT平台ChatGLM2模型的源码部署步骤

## 部署说明
本流程用于FastGPT平台自定义ChatGLM2模型的源码部署，需按要求完成环境配置、依赖安装与启动配置，确保模型可正常对接。

## 部署操作步骤
1. 完成基础环境配置，具体教程可自行通过GPT获取。
2. 下载指定Python文件：https://github.com/labring/FastGPT/blob/main/plugins/model/llm-ChatGLM2/openai_api.py
3. 在命令行执行依赖安装命令：`pip install -r requirements.txt`
4. 编辑目标Python文件，在`verify_token`方法中配置验证token，用于防止接口被盗用。
5. 执行启动命令：`python openai_api.py --model_name 16`，其中数字需根据实际配置选择。
执行启动命令后，需等待模型自动下载并加载完成，若运行过程中出现报错，可先通过GPT排查问题。

## 启动连接验证
启动成功后将显示对应服务地址，其中`http://0.0.0.0:6006`即为可用的模型连接地址，可用于后续平台对接配置。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/custom-models/chatglm2)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
