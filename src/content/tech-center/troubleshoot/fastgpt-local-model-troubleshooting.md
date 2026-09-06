---
title: FastGPT接入本地部署大模型的问题排查与解决方法
slug: /zh/troubleshoot/fastgpt-local-model-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/154
source_type: GitHub issue
---

# FastGPT接入本地部署大模型的问题排查与解决方法

## 现象
用户尝试在FastGPT中接入本地部署的大模型，通过OneAPI进行接入时，发现OneAPI的官方文档未说明本地模型的接入方法，仅支持非本地的商业化大模型，无法完成本地模型的配置与调用。

## 可能原因
1. 本地部署的大模型未提供兼容OpenAI API格式的对外接口，无法被OneAPI识别与调用。
2. 未通过OneAPI的自定义渠道与自定义模型名称功能完成配置，无法将请求路由至本地部署的模型服务器。
3. 自定义配置中的请求地址、模型名称等参数未与本地模型的实际配置保持一致。

## 排查步骤
1. 确认本地部署的大模型是否支持OpenAI API格式的接口调用，查阅模型的官方接口文档或配置说明。
2. 登录OneAPI管理后台，进入渠道管理模块，创建新的自定义渠道或编辑已有自定义渠道。
3. 在自定义渠道的配置界面，将请求地址修改为本地部署的大模型服务器的实际访问地址。
4. 进入模型管理模块，创建新的自定义模型，填写与本地模型一致的模型名称，并关联已配置的自定义渠道。
5. 逐一检查所有配置参数，确保无拼写错误、地址错误或参数遗漏。

## 解决与验证
完成自定义渠道与自定义模型的配置后，即可在FastGPT的模型选择列表中找到并使用配置好的本地模型。可参考官方文档https://doc.fastgpt.run/docs/other/ChatGLM2/ 完成具体的配置流程。验证配置是否成功时，在FastGPT的对话界面选择该本地模型，发起测试请求，若能正常获取模型返回的响应结果，则配置生效。

> 来源: [FastGPT GitHub issue #154](https://github.com/labring/FastGPT/issues/154)
