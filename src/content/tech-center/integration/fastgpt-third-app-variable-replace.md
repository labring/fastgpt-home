---
title: 配置FastGPT第三方应用调用的变量替换参数及步骤
slug: /zh/integration/fastgpt-third-app-variable-replace
page_type: 集成
source: https://doc.fastgpt.cn/zh-CN/guide/build/publish/openapi
source_type: 官方文档
---

# 配置FastGPT第三方应用调用的变量替换参数及步骤

## 概述
本章节内容用于指导配置三方应用调用FastGPT服务时的变量替换操作，确保三方应用能够正确对接FastGPT的接口服务，完成正常的功能调用与数据交互。该操作主要用于解决三方应用与FastGPT服务之间的参数匹配问题，帮助三方应用正确识别FastGPT的接口地址与身份验证信息，避免因参数配置错误导致的接口调用失败。
## 核心配置参数
需配置两个关键参数，具体要求如下：
1.  **OPENAI_API_BASE_URL**：默认值为`http://localhost:3000/api`，需改成自己部署的域名。
2.  **OPENAI_API_KEY**：取值为上一步获取到的密钥。推荐在请求体中传入appId；如第三方应用只能配置密钥，可填apiKey-appId兼容格式。
## 配置示例图示
为帮助用户快速找到对应的参数填写位置，以下展示了配置界面的示例图示：
![](/imgs/chatgptnext.png)
![](/imgs/chatgptweb.png)

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/build/publish/openapi)

## 适用性与版本范围

本页适用于官方来源记录的 集成 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
