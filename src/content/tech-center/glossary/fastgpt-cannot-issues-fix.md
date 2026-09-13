---
title: FastGPT中cannot类报错及知识库简介无法更新问题解决
slug: /zh/glossary/fastgpt-cannot-issues-fix
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/579
source_type: 官方文档
---

# FastGPT中cannot类报错及知识库简介无法更新问题解决

## 一句话定义
FastGPT中的cannot相关问题包含知识库简介无法更新与模型调用时的JSON解析失败报错两类场景。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
知识库简介的配置入口为知识库配置页面，可配置intro字段，点击保存按钮后系统提示更新成功。在4.6.3版本docker-compose部署的环境中，存在点击保存后提示更新成功，但返回列表页后简介仍显示为空的问题。
使用gpt-4-vision-preview模型时，会触发报错文本为bind_request_body_failed json: cannot unmarshal array into Go struct field Message.messages.content of type string的错误，请求ID示例为20231221170013440826620UJmYbqu8，调用时会触发格式相关异常。

## 容易搞错的地方
一是误以为知识库intro字段保存成功后会立即同步到列表页，实际存在显示异常；二是使用gpt-4-vision-preview模型时，未匹配消息content字段的类型要求，导致JSON解析失败报错。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/579)
> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/639)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
