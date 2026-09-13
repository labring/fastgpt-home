---
title: 说明FastGPT中return语句的使用场景与注意事项
slug: /zh/glossary/fastgpt-return-statement-usage
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/2309
source_type: 官方文档
---

# 说明FastGPT中return语句的使用场景与注意事项

## 一句话定义
FastGPT中的return语句用于按指定格式输出工作流节点或API接口的返回结果数据。

## 在 FastGPT 里怎么用
分为两种场景。第一种是工作流节点场景，在packages/service/core/workflow/dispatchV1/tools/answer.ts文件第35行，return语句返回包含NodeOutputKeyEnum.answerText键的对象，值为`\n${formatText}`，即在格式化后的文本前添加换行符。第二种是API接口场景，以/api/core/chat/getPaginationRecords接口为例，该接口接收appId、chatId、offset、pageSize、loadCustomFeedbacks参数，当未传入appId或chatId时，会执行return {list: [], total: 0}，返回空的对话记录列表与总条数。

## 容易搞错的地方
工作流节点的return会默认在回复内容前添加换行符，使用API调用时可能出现内容前多出换行符的预期外情况。/api/core/chat/getPaginationRecords接口默认限定了appId和chatId参数，未传入时直接返回空结果，无法获取全量对话记录。

> [FastGPT GitHub issue 2309](https://github.com/labring/FastGPT/issues/2309), [FastGPT GitHub issue 5062](https://github.com/labring/FastGPT/issues/5062)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
