---
title: 解决FastGPT工具调用时先回答后执行知识库搜索的问题
slug: /zh/troubleshoot/fastgpt-tool-call-sequence-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1831
source_type: GitHub issue
---

# 解决FastGPT工具调用时先回答后执行知识库搜索的问题

## 现象
使用xinference接入的qwen2模型时，工具调用流程出现异常。具体表现为，先直接输出问题回答内容，再执行知识库搜索操作。前期出现的模型思考过程异常已通过升级最新xinference解决，但该顺序异常问题仍存在。

## 可能原因
需按实际环境确认。该问题与xinference接入的模型调用流程相关，前期同类异常可通过升级xinference解决，推测与模型调用的响应时序逻辑存在关联。

## 排查步骤
1. 确认当前部署的FastGPT版本为4.8.4私有部署版本。
2. 检查所使用的xinference版本，确认是否已升级至最新版。
3. 复现工具调用场景，记录流程顺序，观察是否出现先回答问题后执行知识库搜索的异常。
4. 核对模型接入的相关配置，确认对接逻辑是否符合要求。

## 解决与验证
目前已知升级xinference可解决部分同类模型异常，但针对该工具调用顺序异常，暂无明确通用解决方案。需结合实际部署环境调整模型接入配置，或更新相关依赖版本。验证方式为复现工具调用场景，确认知识库搜索执行顺序先于问题回答输出的异常是否消除。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1831)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
