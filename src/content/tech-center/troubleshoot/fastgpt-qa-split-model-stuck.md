---
title: FastGPT知识库问答拆分引发模型异常停止问题排查与解决
slug: /zh/troubleshoot/fastgpt-qa-split-model-stuck
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3747
source_type: GitHub issue
---

# FastGPT知识库问答拆分引发模型异常停止问题排查与解决

## 现象
使用FastGPT知识库问答拆分功能处理大量文档时，显卡运行5~10分钟后停止，仅完成部分索引。Ollama模型在系统进程中显示为stopping状态，即便将模型配置为forever参数仍出现该问题。OneAPI运行日志中存在model ratio not found报错，经检查模型实际存在。重启OneAPI后可临时恢复正常，但5~10分钟后再次卡住，问答拆分任务无法一次性完成。

## 可能原因
最初推测问题源于Ollama默认5分钟无活动自动释放模型，但将模型配置为forever后问题仍未解决。OneAPI日志出现model ratio not found报错，或存在镜像相关异常。此外，数据库读取或索引速度过慢，可能导致调用间隔超过阈值，触发模型自动释放。

## 排查步骤
1. 查看OneAPI运行日志，确认是否存在model ratio not found报错。
2. 登录Ollama管理界面，检查模型配置，确认forever参数是否正确启用。
3. 调整调用方式，绕过OneAPI，直接通过FastGPT调用Ollama的OpenAI接口。
4. 检测数据库读取与索引速度，确认是否存在延迟过高导致调用间隔过长的问题。

## 解决与验证
将OneAPI更换至0.6.7版本，或绕过OneAPI直接调用Ollama的OpenAI接口。完成配置后，执行知识库问答拆分任务，确认显卡持续运行至任务完成，无stopping状态出现，且无model ratio not found报错。

> 来源: [FastGPT GitHub issue #3747](https://github.com/labring/FastGPT/issues/3747)
