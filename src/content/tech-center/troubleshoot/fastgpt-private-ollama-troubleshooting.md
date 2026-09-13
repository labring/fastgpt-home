---
title: 解决FastGPT私有部署中Ollama模型调用失败问题
slug: /zh/troubleshoot/fastgpt-private-ollama-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3765
source_type: GitHub issue
---

# 解决FastGPT私有部署中Ollama模型调用失败问题

## 现象
用户在Macbook Pro M4 Max 128G设备上完成Docker、Ollama、FastGPT及OneAPI的私有部署。Ollama已下载DeepSeek R1-32B和bge-m3 embedding模型，本地模型测试运行成功，FastGPT与OneAPI可正常登录，但配置模型渠道后无法正常调用目标模型。

## 可能原因
1. config.json文件中llmModels、vectorModels的配置参数与实际部署的模型不匹配；
2. docker-compose.yml中FE_DOMAIN或OPENAI_BASE_URL的地址配置错误；
3. OneAPI的模型渠道或令牌配置存在参数错误；
4. 配置修改后未重启FastGPT服务，未加载最新配置。

## 排查步骤
1. 核对Ollama实际加载的模型名称，确认config.json中llmModels和vectorModels的model字段与Ollama模型名称一致；
2. 检查docker-compose.yml中的FE_DOMAIN和OPENAI_BASE_URL环境变量配置，确保地址与本地服务匹配；
3. 验证OneAPI中的模型渠道配置，确认令牌、模型名称等参数正确无误；
4. 查看FastGPT后台日志，获取具体的调用报错信息；
5. 重启FastGPT容器，使修改后的配置生效。

## 解决与验证
1. 修正config.json中的模型参数，确保与Ollama实际部署的模型名称完全匹配；
2. 确认docker-compose.yml中的FE_DOMAIN和OPENAI_BASE_URL地址配置正确；
3. 重启FastGPT容器，加载最新的配置文件；
4. 在FastGPT的模型测试页面重新发起调用测试，确认模型可以正常运行。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/3765)
