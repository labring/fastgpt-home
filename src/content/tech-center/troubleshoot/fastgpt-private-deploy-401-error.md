---
title: 解决FastGPT私有部署对接OpenAI接口的401报错问题
slug: /zh/troubleshoot/fastgpt-private-deploy-401-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/943
source_type: GitHub issue
---

# 解决FastGPT私有部署对接OpenAI接口的401报错问题

## 现象
用户在Docker部署的FastGPT私有版本中，已在docker-compose.yml正确配置`OPENAI_BASE_URL`与`CHAT_API_KEY`环境变量。调用`/api/v1/chat/completions`接口时，FastGPT控制台返回401错误，前端页面提示报错文本：`account_deactivated The OpenAI account associated with this API key has been deactivated. If you are the developer for this OpenAI app, please check your email for more information. If you are seeing this error while using another app or site, please reach out to them for more help.`。用户通过curl命令测试该API key可正常获得响应，但在FastGPT内调用时始终报错。

## 可能原因
结合现象与已知信息，可能的触发原因包括：FastGPT容器未正确加载docker-compose配置的环境变量；FastGPT内部转发请求时未正确使用配置的API密钥；或者配置的密钥在传递过程中出现格式或内容偏差。

## 排查步骤
1. 检查docker-compose.yml文件，确认已正确添加`OPENAI_BASE_URL`与`CHAT_API_KEY`两个环境变量，变量名无拼写错误。
2. 进入FastGPT运行的Docker容器内部，执行`echo $CHAT_API_KEY`与`echo $OPENAI_BASE_URL`命令，确认容器内可正常读取到配置的变量值。
3. 重新在外部环境执行curl命令测试API key，确认该密钥仍可正常调用OpenAI接口。
4. 查看FastGPT的请求日志，确认转发至OpenAI接口时携带的API密钥与配置值是否一致。

## 解决与验证
若排查发现容器未正确加载环境变量，可重启FastGPT容器以重新加载配置。若配置的API密钥有误，修正docker-compose.yml中的`CHAT_API_KEY`值为可用的正确密钥。若环境变量未生效，需检查docker-compose的服务配置是否正确挂载了环境变量。验证时，在FastGPT聊天窗口发送任意消息，确认不再弹出401报错，且可正常获取OpenAI的响应结果。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/943)
