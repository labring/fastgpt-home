---
title: FastGPT V4.6.6升级后第二次对话报错找不到模型的排查
slug: /zh/troubleshoot/fastgpt-v466-model-not-found-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/747
source_type: GitHub issue
---

# FastGPT V4.6.6升级后第二次对话报错找不到模型的排查

## 现象
用户将FastGPT从V4.6.4升级到V4.6.6版本后，通过docker-compose完成部署更新。在使用OneAPI接入本地ChatGLM大模型的场景中，进入应用调试预览时，第一次提问可正常获得回复，但第二次提问时会弹出报错提示：找不到模型 gpt-3.5-turbo-1106。

## 可能原因
结合报错场景与已知信息，目前未明确官方归因。推测可能为升级后FastGPT的会话请求模型参数未正确关联用户配置的ChatGLM模型，第二次请求时默认调用了未在配置中定义的gpt-3.5-turbo-1106；也可能存在配置文件内容截断，导致目标模型未正确加载，如用户提供的config.json中chatglm_turbo的配置未完成。

## 排查步骤
1.  确认当前FastGPT部署版本为V4.6.6，检查docker镜像是否已完成拉取更新。
2.  打开config.json配置文件，查看chatModels配置项，确认所有模型配置完整，无截断情况，重点检查chatglm_turbo相关配置。
3.  进入FastGPT对应应用页面，检查OneAPI接入的模型是否与配置文件中的模型名称一致。
4.  查看对话请求的日志信息，确认第二次请求调用的模型名称是否为gpt-3.5-turbo-1106。

## 解决与验证
1.  补全config.json中未完成的模型配置项，确保chatglm_turbo的所有字段配置完整，如补全defaultSystemChatPrompt字段。
2.  确认chatModels中配置的模型名称与OneAPI渠道中配置的模型名称完全匹配。
3.  执行docker-compose down && docker-compose up -d重启服务。
4.  进入应用调试预览，依次发起两次提问，确认第二次提问不再出现找不到模型的报错，对话流程恢复正常。
需按实际部署环境确认配置文件挂载是否正确，避免更新后配置未生效。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/747)
