---
title: 解决FastGPT分组default下text-embedding-ada-002无可用渠道问题
slug: /zh/troubleshoot/fastgpt-default-embedding-channel-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/414
source_type: GitHub issue
---

# 解决FastGPT分组default下text-embedding-ada-002无可用渠道问题

## 现象
导入数据后，控制台出现报错文本：当前分组 default 下对于模型 text-embedding-ada-002 无可用渠道。该问题的触发场景为私有部署模式，且已接入one-api平台并使用微软云openai模型。

## 可能原因
该问题的具体原因需按实际环境确认，无预设可直接判定的通用原因，可能涉及模型渠道的配置有效性、分组与模型渠道的绑定关系、平台接入的权限配置等方面。

## 排查步骤
1.  确认当前部署模式为私有部署，且已完成one-api平台的接入配置，同时配置了微软云openai相关模型。
2.  进入FastGPT的分组管理页面，检查default分组是否已绑定text-embedding-ada-002模型的可用渠道。
3.  登录one-api平台，核对对应模型的配置信息，确认密钥、权限及渠道状态正常。
4.  查看FastGPT控制台的日志信息，确认报错文本与描述内容一致。

## 解决与验证
根据排查结果调整对应配置，例如补充绑定default分组与text-embedding-ada-002模型的渠道，或修正one-api平台的配置问题。完成调整后重新导入数据，确认控制台不再出现该报错文本。若问题仍存在，需按实际环境进一步确认配置细节。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/414)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
