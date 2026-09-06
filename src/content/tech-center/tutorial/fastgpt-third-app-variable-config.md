---
title: 配置FastGPT三方应用变量替换的相关参数
slug: /zh/tutorial/fastgpt-third-app-variable-config
page_type: 教程
source: https://doc.fastgpt.cn/zh-CN/guide/build/publish/openapi
source_type: 官方文档
---

# 配置FastGPT三方应用变量替换的相关参数

该部分内容用于规范三方应用对接FastGPT时的变量替换配置，明确核心配置项的填写规则，确保对接流程正常运行，避免因参数错误导致的接口访问失败、身份验证不通过或数据传输异常等问题。

## 核心配置参数及填写规则
共有两个核心配置项需完成设置：
1.  `OPENAI_API_BASE_URL`：默认基础地址为`http://localhost:3000/api`，该参数用于指定三方应用发起请求的基础接口地址，所有后续的接口请求都会基于该地址拼接，需替换为实际部署FastGPT服务的域名，确保请求能正确转发至目标服务。
2.  `OPENAI_API_KEY`：取值为上一步获取的FastGPT身份验证密钥，用于验证三方应用的访问权限。推荐在三方应用的请求体中传入`appId`参数，该方式可提升身份验证的灵活性与安全性；若第三方应用仅支持配置单一密钥字段，无法拆分多个参数，可使用`apiKey-appId`的兼容格式完成填写。

## 配置示例
为帮助快速理解参数的实际填写方式，提供对应配置场景的截图参考：
![](/imgs/chatgptnext.png)
![](/imgs/chatgptweb.png)

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/build/publish/openapi)

## 适用性与版本范围

本页适用于官方来源记录的 教程 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
