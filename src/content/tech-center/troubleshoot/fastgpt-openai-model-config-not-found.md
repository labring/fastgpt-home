---
title: 解决FastGPT本地部署新增OpenAI自定义模型提示model config not found的问题
slug: /zh/troubleshoot/fastgpt-openai-model-config-not-found
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5321
source_type: GitHub issue
---

# 解决FastGPT本地部署新增OpenAI自定义模型提示model config not found的问题

## 现象
在FastGPT v4.9.14、aiproxy v0.2.2版本的Docker Compose部署环境中，通过前端「模型提供商」→「模型渠道」页面新增OpenAI渠道时，选择自定义模型如gpt-4o，系统会返回报错`model config not found: [gpt-4o]`，无法成功创建模型渠道。浏览器Network面板显示前端请求参数正确，但后端返回4xx错误。经确认，model.json挂载路径`/app/data/model.json`内容无误，且容器内curl调用OpenAI API成功，API Key与代理配置均正常，清理浏览器缓存、重启容器后问题仍存在。

## 可能原因
根据问题排查情况，可能的原因包括：
1. 后端aiproxy服务未正确加载或解析model.json配置文件，导致自定义模型配置未生效；
2. 代码中对模型名称的匹配逻辑存在缺陷，无法识别前端提交的自定义模型名称；
3. 当前版本存在配置方式或兼容性相关的潜在Bug。

## 排查步骤
1. 确认model.json挂载配置与内容：检查容器内`/app/data/model.json`文件，确认其中包含gpt-4o的模型定义，且挂载路径配置正确。
2. 重启相关服务容器：重启FastGPT与aiproxy容器，确保配置文件重新加载生效。
3. 验证容器内API调用：进入aiproxy或FastGPT容器，使用curl命令调用OpenAI API，确认API Key与代理配置正常可用。
4. 清理前端缓存：清理浏览器缓存或使用无痕模式访问页面，排除前端缓存导致的显示异常。
5. 检查服务与网络状态：确认容器网络通畅，所有相关服务的健康状态正常。

## 解决与验证
若问题由aiproxy未加载配置导致，重启容器后可通过查看aiproxy日志确认model.json解析成功。若为模型名称匹配问题，需确认model.json中的模型标识与前端选择的模型名称完全一致。验证时，重新进入「模型提供商」→「模型渠道」页面，选择gpt-4o模型并点击新增，确认不再弹出`model config not found: [gpt-4o]`错误，且模型渠道创建成功。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/5321)
