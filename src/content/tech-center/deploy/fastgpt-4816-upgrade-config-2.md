---
title: FastGPT V4.8.16版本升级操作与配置变更说明
slug: /zh/deploy/fastgpt-4816-upgrade-config-2
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4816
source_type: 官方文档
---

# FastGPT V4.8.16版本升级操作与配置变更说明

## 版本核心变更概述
V4.8.16为FastGPT的配置变更版本，本次更新包含多项新增功能、体验优化与问题修复。新增功能包括SearXNG搜索插件、商业版支持API知识库和链接集合定时同步、猜你想问支持选择模型与自定义提示词、钉钉和企微机器人webhook插件、商业版钉钉SSO登录配置、飞书和语雀知识库导入，以及sandbox新增createHmac加密全局方法、工作流右键支持全部折叠。优化内容涵盖模型选择器、SSR渲染逻辑、工作流变量初始化与数据类型处理。修复问题包括无法自动切换默认语言、数组选择器兼容4.8.13以前的数据、站点同步知识库链接未使用选择器、简易模式转工作流未转换系统配置项等多项场景。

## 升级操作步骤
本次升级需完成镜像更新与配置文件修改两步操作：
1.  更新镜像：将fastgpt镜像tag更新为v4.8.16，fastgpt-pro商业版镜像tag更新为v4.8.16，Sandbox镜像tag更新为v4.8.16。
2.  更新配置文件：修改config.json或管理后台的模型文件配置，为LLMModel和VectorModel新增provider字段用于模型分类。旧版config.json配置说明已不再维护，当前版本需参考模型配置方案。示例配置如下：
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

## 升级注意事项
升级过程中需注意以下细节：配置文件必须使用新版格式，不可沿用旧版配置说明；若设置了NEXT_PUBLIC_BASE_URL，需确认图片文件读取URL是否正确，本次更新已修复该场景的异常问题；工作流相关操作需注意变量初始化与数据类型兼容问题，避免因渲染顺序或类型不一致导致执行失败；插件调试时需确认日志是否正确保存输入参数，若出现异常可对照本次修复内容排查。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4816
