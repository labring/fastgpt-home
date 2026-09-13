---
title: 解决FastGPT中千问模型搜索功能配置不生效的问题
slug: /zh/troubleshoot/fastgpt-qwen-search-config-not-working
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2289
source_type: GitHub issue
---

# 解决FastGPT中千问模型搜索功能配置不生效的问题

## 现象
用户在FastGPT私有部署版本4.8.6中，为qwen-turbo模型的配置项添加了`defaultConfig: {"enable_search":true}`，但该千问模型的搜索功能未生效，同时不清楚如何为模型添加自定义配置参数。

## 可能原因
一是配置修改后未重启FastGPT服务，新的defaultConfig参数未被系统加载；二是千问模型的搜索启用参数的配置方式未匹配FastGPT的参数读取规则；三是当前使用的4.8.6版本对该自定义参数的支持存在异常。

## 排查步骤
1.  重启FastGPT私有部署服务，确保config.json中的修改已生效。
2.  检查模型配置中的defaultConfig字段，确认其为合法的JSON对象，格式与示例`{"enable_search":true}`一致。
3.  确认当前使用的FastGPT版本为4.8.6，该版本支持在defaultConfig中配置千问模型的搜索参数。
4.  查看FastGPT系统日志，确认是否存在参数加载失败的相关报错信息，需按实际环境确认日志内容。

## 解决与验证
将千问模型的搜索启用参数添加至模型配置的defaultConfig字段中，配置示例如下：
```json
{
  "model": "qwen-turbo",
  "name": "qwen-turbo",
  "avatar": "/imgs/model/qwen.svg",
  "maxContext": 16000,
  "maxResponse": 2000,
  "quoteMaxToken": 13000,
  "maxTemperature": 1.2,
  "charsPointsPrice": 0,
  "censor": false,
  "vision": false,
  "datasetProcess": true,
  "usedInClassify": true,
  "usedInExtractFields": true,
  "usedInToolCall": true,
  "usedInQueryExtension": true,
  "toolChoice": true,
  "functionCall": true,
  "customCQPrompt": "",
  "customExtractPrompt": "",
  "defaultSystemChatPrompt": "",
  "defaultConfig": {"enable_search":true}
}
```
完成配置后重启FastGPT服务。验证方式为：进入FastGPT的模型管理页面，查看该千问模型的配置是否包含enable_search参数，发起对话测试搜索功能是否正常触发。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/2289)
