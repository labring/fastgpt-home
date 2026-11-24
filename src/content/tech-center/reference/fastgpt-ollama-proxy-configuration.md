---
title: FastGPT通过AI Proxy接入Ollama模型的配置步骤
slug: /zh/reference/fastgpt-ollama-proxy-configuration
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/custom-models/ollama
source_type: 官方文档小节
---

# FastGPT通过AI Proxy接入Ollama模型的配置步骤

## 结论
本文介绍FastGPT默认AI Proxy部署场景下，接入Ollama模型的完整配置流程。完成全部配置后，可在FastGPT工作台调用已添加的Ollama大模型。

## 具体怎么做
1. 确认FastGPT以默认配置（AI Proxy）启动。
2. 进入FastGPT账号菜单，依次点击「模型提供商」→「模型配置」→「新增模型」，确保新增模型的ID与OneAPI中的模型名称一致。
3. 运行FastGPT平台，进入账号菜单，依次点击「模型提供商」→「模型渠道」→「新增渠道」，选择Ollama作为渠道类型。
4. 填入已拉取的Ollama模型，填写代理地址：容器部署场景使用`http://[容器名]:[端口]`，主机安装场景使用`http://[主机IP]:[端口]`，主机IP不可为localhost。
5. 在工作台创建应用，选择已添加的模型，使用配置时设置的别名。

## 注意事项
1. 同一个模型无法多次添加，系统将采用最新添加时设置的别名。
2. 若无法访问Ollama，需检查主机是否监听0.0.0.0，或容器是否与FastGPT处于同一网络。
3. 主机安装Ollama时，代理地址不可使用localhost。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/custom-models/ollama)
