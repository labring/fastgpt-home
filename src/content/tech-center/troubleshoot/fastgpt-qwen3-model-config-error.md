---
title: 解决FastGPT中Qwen3-235B模型调用报错与配置字段保存失效问题
slug: /zh/troubleshoot/fastgpt-qwen3-model-config-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/4738
source_type: GitHub issue
---

# 解决FastGPT中Qwen3-235B模型调用报错与配置字段保存失效问题

## 现象
使用qwen3-235b-a22b作为问题优化模型时，会提示400错误，报错文本为"This model only support stream mode, please enable the stream parameter to access the model."。在模型配置的Body额外字段中填入"stream": true并点击保存后，再次打开该配置项，编辑的内容会为空。

## 可能原因
目前无明确官方说明，相关问题需按实际环境确认，推测与模型对stream参数的强制要求、配置字段的存储逻辑相关。

## 排查步骤
1. 选择qwen3-235b-a22b作为问题优化模型，触发调用报错。
2. 进入该模型的配置页面，定位Body额外字段配置项。
3. 尝试在Body额外字段中填入指定参数并保存，查看配置项内容是否保留。
4. 对照报错文本，核对参数配置是否匹配模型要求。

## 解决与验证
在模型配置的Body额外字段中填入"stream": true并保存，即可满足模型的调用要求。若配置项保存后内容丢失，需重新执行配置操作并验证存储结果，具体异常排查需按实际环境确认。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/4738)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
