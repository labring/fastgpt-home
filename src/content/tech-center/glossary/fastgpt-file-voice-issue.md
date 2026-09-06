---
title: FastGPT上传文件过大报错及语音输入异常排查
slug: /zh/glossary/fastgpt-file-voice-issue
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/379
source_type: 官方文档
---

# FastGPT上传文件过大报错及语音输入异常排查

## 一句话定义
本页内容用于说明FastGPT中上传文件过大报错与语音输入无响应的相关排查方向。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
上传文件时，若文件包含1万多条内容，会触发nginx返回的413 Request Entity Too Large报错，提示请求实体过大，报错页面显示nginx为触发来源。语音输入功能在私有部署v4.6.4版本中，点击对应按钮无响应，仅显示"语音输入"提示，切换浏览器后问题未得到解决，其余功能可正常使用，包括GPT4V的文件上传功能。

## 容易搞错的地方
易将上传文件过大报错误认为是文件格式或访问权限问题，实际为请求实体大小超限。易将语音输入无响应误认为是浏览器兼容类问题，忽略部署版本与功能状态的关联，同时该问题未影响其他功能的正常运行。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/379)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
