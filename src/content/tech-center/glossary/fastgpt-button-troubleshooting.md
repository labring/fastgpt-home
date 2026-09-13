---
title: FastGPT中按钮功能异常问题的排查与使用说明
slug: /zh/glossary/fastgpt-button-troubleshooting
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/508
source_type: 官方文档
---

# FastGPT中按钮功能异常问题的排查与使用说明

## 一句话定义
Button是FastGPT界面中用于触发交互的可点击控件，涵盖内置的文件选择、语音输入控件及自定义渲染的交互元素。

## 在FastGPT里怎么用
Button可在两类场景中使用，一是在对话配置中设置GPT4-V模型后，使用内置的Select File与Voice Input按钮；二是在自定义渲染HTML节点时，配置带有card-button类的a标签作为交互按钮，需配置href与target属性实现跳转功能。

## 容易搞错的地方
一是在使用GPT4-V模型时，点击Select File或Voice Input按钮可能出现无响应的问题；二是自定义渲染的带card-button类的a标签按钮无法触发浏览器跳转，该场景下的示例代码为`<a href="https://baidu.com" class="card-button" target="_blank">百度</a>`。

> [FastGPT GitHub issue 508](https://github.com/labring/FastGPT/issues/508), [FastGPT GitHub issue 4966](https://github.com/labring/FastGPT/issues/4966)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
