---
title: 解决FastGPT并发API调用时的上下文干扰与准确率差异问题
slug: /zh/troubleshoot/fastgpt-concurrent-api-context-interference
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/5793
source_type: GitHub issue
---

# 解决FastGPT并发API调用时的上下文干扰与准确率差异问题

## 现象
私有部署版本4.8.13的FastGPT，通过API进行并发问答调用时，回答准确率低于单请求通过Web页面调用的结果。使用的LLM为Qwen3-8B、Qwen3-30B-A3B-Instruct-2507-FP8，并发请求存在上下文关联影响，无法实现各并发请求独立运行。

## 可能原因
并发API调用未隔离会话上下文，不同请求的历史对话信息相互干扰，导致模型输出受之前请求的上下文影响，最终出现准确率下降的情况。需按实际环境确认是否存在其他配置类因素。

## 排查步骤
1.  检查API请求参数，确认是否携带了会话上下文相关参数（如会话ID、历史对话列表等）。
2.  对比单请求Web调用与并发API调用的完整请求参数，确保两类调用的参数配置一致。
3.  查看FastGPT的并发相关配置项，确认是否存在默认共享会话上下文的设置。
4.  导出FastGPT运行日志，核对各并发请求的会话标识是否唯一。

## 解决与验证
为每个并发API请求生成唯一的会话标识，确保各请求的上下文完全隔离，避免不同请求间的上下文干扰。验证时，使用唯一会话标识发起并发API调用，对比Web页面单请求的回答结果，确认准确率一致。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/5793)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
