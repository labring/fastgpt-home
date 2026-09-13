---
title: 介绍FastGPT中Function Calling功能的含义与用法
slug: /zh/glossary/fastgpt-function-calling-guide
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/657
source_type: 官方文档
---

# 介绍FastGPT中Function Calling功能的含义与用法

## 一句话定义
Function Calling是FastGPT支持的，可让大模型具备外部调用能力的功能，可结合平台现有模块插件实现可扩展的服务调用，提升对话系统的智能性与灵活性。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
可通过外接API秘钥创建接口，该接口可使用Function Calling功能。可结合FastGPT现有模块插件功能，实现联网查询、插件式调用等可扩展的服务场景。开发者可基于该功能构建具备外部调用能力的对话系统。

## 容易搞错的地方
需注意Function Calling功能无法脱离外接API接口单独使用，需依托外接API秘钥创建的接口实现。部分用户易误认为可直接在FastGPT原生界面中启用该功能，实际需先配置外接API接口后方可使用。同时需明确，该功能需结合FastGPT的模块插件功能，才能获得更灵活的服务扩展能力，不可将二者割裂使用。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/657)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
