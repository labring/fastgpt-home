---
title: FastGPT中window对象的使用与相关报错处理
slug: /zh/glossary/fastgpt-window-error-solution
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/465
source_type: 官方文档
---

# FastGPT中window对象的使用与相关报错处理

## 一句话定义
window是浏览器环境下的全局对象，用于绑定页面加载完成后的执行逻辑，在FastGPT场景中存在特定使用约束。
## 在 FastGPT 里怎么用
在使用外链弹窗形式加载FastGPT机器人时，若需绑定页面加载完成后的执行逻辑，应使用`window.addEventListener('load', function() { embedChatbot(); });`替代重复的`window.onload`代码，避免出现逻辑覆盖问题。
## 容易搞错的地方
一是在FastGPT私有部署的服务端渲染场景中，直接在非浏览器环境调用window对象，会触发`ReferenceError: window is not defined`报错，该报错会在启动后访问页面时出现；二是在相关代码中重复声明`window.onload`，会导致已绑定的执行逻辑被覆盖，引发功能异常。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/465)

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/720)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
