---
title: FastGPT V4.8.16版本升级步骤与配置变更说明
slug: /zh/deploy/fastgpt-4816-upgrade-config
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4816
source_type: 官方文档
---

# FastGPT V4.8.16版本升级步骤与配置变更说明

## 版本概述
FastGPT V4.8.16为配置变更版本，核心更新包括镜像版本升级、模型配置项调整，同时新增多项功能、优化交互体验并修复已知问题。该版本的旧版config.json配置说明已不再维护，需参考官方模型配置方案文档进行配置。

## 升级操作步骤
### 1. 更新镜像
将fastgpt、fastgpt-pro商业版、Sandbox镜像的tag均更新为`v4.8.16`。
### 2. 更新配置文件
修改`config.json`或admin后台的模型文件配置，为`LLMModel`和`VectorModel`新增`provider`字段用于模型分类。示例配置如下：
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

## 完整更新内容
本次更新新增多项功能：包括SearXNG搜索插件、商业版API知识库与链接集合定时同步、猜你想问的模型选择与自定义提示词支持、钉钉和企微机器人webhook插件、商业版钉钉SSO登录配置、商业版飞书与语雀知识库导入，以及sandbox新增`createHmac`加密全局方法、工作流右键全部折叠功能。同时优化了模型选择器、SSR渲染逻辑、工作流变量初始化代码与数据类型转换逻辑。修复了无法自动切换默认语言、数组选择器兼容4.8.13以前的数据、站点同步知识库链接未使用选择器等多项问题。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4816
