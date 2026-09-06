---
title: 解决FastGPT调用华为云DeepSeek模型时的400 extra_forbidden报错问题
slug: /zh/troubleshoot/fastgpt-huawei-deepseek-400-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/3778
source_type: GitHub issue
---

# 解决FastGPT调用华为云DeepSeek模型时的400 extra_forbidden报错问题

## 现象
使用FastGPT私有部署版本V4.8.2，调用华为云DeepSeek-R1-Distill-Qwen-32B模型时，返回400错误。每次调用该模型均会触发该报错，报错信息为：400 [{'type': 'extra_forbidden', 'loc': ('body', 'enable_search'), 'msg': "Extra inputs are not permitted", 'input': True}]，附带request id: 20250213063949245782450561340。

## 可能原因
请求体中包含模型不支持的enable_search参数，触发接口的额外输入禁止校验规则，返回对应错误。

## 排查步骤
1.  查看FastGPT调用该华为云模型的请求配置，确认是否传入了enable_search参数。
2.  核对华为云该模型的官方接口文档，确认该模型是否支持enable_search参数。
3.  检查FastGPT的模型调用模板，确认是否存在强制添加该参数的配置。

## 解决与验证
若FastGPT调用配置中强制传入enable_search参数，移除该参数。若为模板默认添加该参数，修改模板配置删除该参数。重新发起模型调用，确认不再返回该400错误，调用正常完成。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/3778)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
