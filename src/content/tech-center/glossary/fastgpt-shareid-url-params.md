---
title: 详细说明FastGPT免登录窗口shareId与URL参数提取用法
slug: /zh/glossary/fastgpt-shareid-url-params
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/887
source_type: 官方文档
---

# 详细说明FastGPT免登录窗口shareId与URL参数提取用法

## 一句话定义
shareId是FastGPT免登录分享对话链接中的唯一标识参数，用于标记对应的分享会话，嵌入在免登录访问链接的URL参数中。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
免登录分享窗口的标准访问链接格式为`http://[域名]/chat/share?shareId=[会话标识]&[自定义参数]`，例如本地部署时生成的示例链接`http://localhost:3020/chat/share?shareId=16wngsrbtpw2ph18fheuwbg1`。高级编排模块的HTTP工具可通过`{{自定义参数名}}`模板变量提取URL中的自定义参数，例如提取userId和key时可使用`{{userId}}`、`{{key}}`。此外，高级编排的用户引导模块可新增URL参数类型的全局变量，启动对话时自动读取URL参数对应字段，无需手动填写。

## 容易搞错的地方
本地部署FastGPT时，默认生成的免登录链接使用localhost域名，仅本机可访问，其他设备无法正常访问。自定义URL参数的模板变量需与参数名完全一致，否则无法正确提取参数值。用户引导模块的URL参数类型全局变量需正确配置字段key，才能自动读取URL中的对应参数。

> [FastGPT GitHub issue 887](https://github.com/labring/FastGPT/issues/887), [FastGPT GitHub issue 954](https://github.com/labring/FastGPT/issues/954)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
