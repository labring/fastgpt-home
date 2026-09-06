---
title: 解决FastGPT使用API KEY接入后对话日志不显示的问题
slug: /zh/troubleshoot/fastgpt-api-key-log-missing
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1544
source_type: GitHub issue
---

# 解决FastGPT使用API KEY接入后对话日志不显示的问题

## 现象
使用FastGPT应用的API KEY访问应用，通过feishu-openai框架完成流式正常对话后，FastGPT后台的"对话日志"页面无法查看对应的对话记录。

## 可能原因
暂无明确可确认的具体原因，需结合实际部署环境逐一排查。

## 排查步骤
1. 确认已通过FastGPT后台的"发布应用"模块创建并配置了有效的应用API KEY。
2. 确认对话流程使用feishu-openai框架完成，且对话过程无异常报错。
3. 进入FastGPT后台的"对话日志"页面，检查是否存在对应对话记录。
4. 确认当前部署的FastGPT版本为v4.8私有部署版本。

## 解决与验证
完成上述排查步骤后，若仍未在"对话日志"页面看到对应记录，需收集相关日志信息用于进一步排查。验证方式为再次完成正常对话流程，进入"对话日志"页面确认是否显示对应对话记录。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1544)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
