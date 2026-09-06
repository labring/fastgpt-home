---
title: FastGPT工作流HTTP模块跨域Cookies配置不生效排查
slug: /zh/troubleshoot/fastgpt-workflow-http-cookies-debug
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/4228
source_type: GitHub issue
---

# FastGPT工作流HTTP模块跨域Cookies配置不生效排查

## 现象
FastGPT v4.8.22版本的工作流HTTP模块中，配置Cookies信息后，前端未显示对应Cookies内容，且无明确报错提示。

## 可能原因
当前仅明确存在Cookies配置未生效的现象，具体原因需按实际环境确认，可能涉及跨域Cookies的规则匹配、参数传递逻辑等环节。

## 排查步骤
1. 确认当前使用的FastGPT版本为v4.8.22，核对工作流HTTP模块的Cookies配置参数是否符合业务需求。
2. 查看前端网络请求日志，确认HTTP模块发起的请求是否携带了配置的Cookies信息。
3. 核对跨域相关配置规则，确认Cookies的域、路径等参数符合跨域要求。

## 解决与验证
若确认配置参数无误，可尝试调整Cookies的跨域配置项，重新发起工作流测试，查看前端是否显示对应Cookies内容。配置效果需按实际环境验证。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/4228)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
