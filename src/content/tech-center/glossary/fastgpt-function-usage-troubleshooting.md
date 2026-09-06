---
title: FastGPT中function功能的使用说明与报错排查
slug: /zh/glossary/fastgpt-function-usage-troubleshooting
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/601
source_type: 官方文档
---

# FastGPT中function功能的使用说明与报错排查

## 一句话定义
FastGPT中的function功能涵盖知识库文档上传处理与对话系统function调用两类场景。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
知识库上传流程为登录系统后进入知识库页面，选择新建或导入入口，进入文件导入流程，选择目标文件并提交。对话系统function调用流程为通过外接API秘钥创建接口，可在离线环境下调用该接口实现相关功能。知识库上传文档时可能触发“e.replaceAll is not a function”报错。

## 容易搞错的地方
公有云版本与私有部署版本的功能适配存在差异，需确认对应版本的支持范围。使用外接API接口时，需确保秘钥配置正确，否则无法正常调用相关功能。上传文件时需严格遵循标准流程，避免触发“e.replaceAll is not a function”报错。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/601)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
