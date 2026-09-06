---
title: FastGPT V4.8.16版本升级操作与变更说明
slug: /zh/deploy/upgrade-v4-8-16
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4816
source_type: 官方文档
---

# FastGPT V4.8.16版本升级操作与变更说明

## 这个版本改了什么
本次更新包含多项新增、优化与修复内容。新增功能包括SearXNG搜索插件，商业版支持API知识库和链接集合定时同步，猜你想问支持选择模型和自定义提示词，钉钉和企微机器人webhook插件，商业版钉钉SSO登录配置、飞书和语雀知识库导入，sandbox新增createHmac加密全局方法，工作流右键支持全部折叠。优化内容涵盖模型选择器、SSR渲染（预判断移动端与PC端减少页面抖动）、工作流/简易模式变量初始化代码、工作流数据类型转化。修复问题包括无法自动切换默认语言、数组选择器兼容4.8.13以前的数据、站点同步知识库链接同步异常、简易模式转工作流系统配置未转化、插件变量初始值未赋值、弹窗关闭后页面偏移、插件调试日志未保存输入参数、部分模板市场模板异常、设置NEXT_PUBLIC_BASE_URL时图片URL读取不正确等。

## 升级前要确认的事
需确认当前FastGPT部署环境，准备更新镜像至指定版本。同时需更新配置文件，为LLMModel和VectorModel新增provider字段，旧版config.json配置说明不再维护，需参考官方模型配置方案调整配置格式。

## 升级步骤（照做）
1. 更新镜像：将fastgpt镜像tag设为v4.8.16，fastgpt-pro商业版镜像tag设为v4.8.16，Sandbox镜像tag设为v4.8.16。
2. 更新配置文件：修改config.json或admin中的模型文件配置，添加provider字段，示例配置格式如下：
```json
{
  "provider": "OpenAI",
  "model": "gpt-4o",
  "name": "gpt-4o",
  "maxContext": 125000,
  "maxResponse": 4000,
  "quoteMaxToken": 120000,
  "maxTemperature": 1.2,
  "charsPointsPrice": 0,
  "censor": false,
  "vision": true,
  "datasetProcess": true,
  "usedInClassify": true,
  "usedInExtractFields": true,
  "usedInToolCall": true,
  "usedInQueryExtension": true,
  "toolChoice": true,
  "functionCall": false,
  "customCQPrompt": "",
  "customExtractPrompt": "",
  "defaultSystemChatPrompt": "",
  "defaultConfig": {},
  "fieldMap": {}
}
```

## 升级后怎么验证
确认所有镜像版本为v4.8.16，检查模型配置包含provider字段并可正常调用。测试新增功能正常运行，包括SearXNG搜索、猜你想问配置、钉钉企微webhook插件、商业版同步与SSO登录、知识库导入等。验证工作流功能、默认语言切换、数组选择器兼容、图片URL读取等修复项正常生效。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4816)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
