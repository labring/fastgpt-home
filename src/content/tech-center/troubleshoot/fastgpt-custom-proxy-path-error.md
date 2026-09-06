---
title: 解决FastGPT自定义LLM代理路径请求拼接错误问题
slug: /zh/troubleshoot/fastgpt-custom-proxy-path-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/4833
source_type: GitHub issue
---

# 解决FastGPT自定义LLM代理路径请求拼接错误问题

## 现象
FastGPT 4.9.8版本中，配置自定义代理路径的LLM渠道进行测试时，实际发送的请求地址被错误拼接为`/compatible-mode/v1/chat/completions`。预期的请求地址应为仅在代理地址后拼接`/v1/chat/completions`。直接将模型配置到本地LLM时，可正常发送请求。

## 可能原因
FastGPT在处理自定义代理路径的LLM配置时，额外拼接了`compatible-mode`路径前缀，导致最终请求地址不符合预期。

## 排查步骤
1. 确认当前使用的FastGPT版本为4.9.8。
2. 查看LLM渠道的自定义代理路径配置，确认路径填写无误。
3. 对比直接配置模型到本地LLM的场景，确认该场景下请求地址正常。
4. 提取LLM测试时的请求日志，记录实际发送的完整请求地址。

## 解决与验证
验证时，确认自定义代理路径仅需添加`/v1/chat/completions`后缀，无需额外携带`compatible-mode`前缀。测试LLM功能时，检查实际请求地址是否符合预期。若直接配置模型可正常工作，可对比两者的配置差异，调整自定义代理路径的相关设置。需按实际环境确认最终修复方式。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/4833)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
