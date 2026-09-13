---
title: FastGPT外链嵌入与初始化加载的load事件使用规范
slug: /zh/glossary/fastgpt-load-event-usage
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/720
source_type: 官方文档
---

# FastGPT外链嵌入与初始化加载的load事件使用规范

## 一句话定义
load事件是FastGPT外链嵌入机器人场景中触发加载逻辑的浏览器事件，同时包含初始化配置加载的报错排查相关场景。

## 在FastGPT里怎么用
使用外链弹窗形式加载FastGPT机器人时，若需绑定页面加载完成后触发的嵌入逻辑，需采用`window.addEventListener('load', function() { embedChatbot(); });`代码。该代码可避免多个`window.onload`赋值语句导致的逻辑互相覆盖问题。本地开发私有部署版本的FastGPT项目时，若遇到初始化配置加载相关的报错，需优先排查初始化配置文件的JSON语法错误。

## 容易搞错的地方
使用外链加载FastGPT机器人时，若在HTML代码中编写多个`window.onload`赋值语句，会导致加载逻辑互相覆盖，引发功能异常bug。本地开发时，若未定位初始化配置文件的JSON语法错误，会触发“Load init config error SyntaxError: Unexpected token A in JSON at position 921”报错，导致项目无法正常启动。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/720)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
