---
title: FastGPT support接口与插件JSON序列化问题说明
slug: /zh/glossary/fastgpt-support-json-serialization
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/1156
source_type: 官方文档
---

# FastGPT support接口与插件JSON序列化问题说明

## 一句话定义
support是FastGPT后端接口的通用前缀，同时关联插件调用时的JSON序列化处理逻辑。

## 在 FastGPT 里怎么用
在FastGPT开源版本中，部分后端接口路径以/proApi/support开头，例如/proApi/support/user/account/register/emailAndPhone。使用文本内容提取插件时，系统默认通过大模型执行JSON序列化，当使用非ChatGPT类模型时，可能触发报错“Your model may not support toll_call SyntaxError: Unexpected end of JSON input”。私有部署版本4.7中，该序列化逻辑未提供外置JSON工具替换的配置选项，无法直接通过插件参数修改序列化的执行主体。

## 容易搞错的地方
容易将/proApi/support开头的接口路径与具体后端实现代码混淆，仅通过接口路径无法直接找到对应实现逻辑。同时，部分用户可能误以为所有大模型均支持大模型侧的JSON序列化格式，导致非兼容模型使用时出现JSON解析报错。另外，部分用户在使用文本内容提取插件时，未注意到当前版本的序列化逻辑仅兼容支持大模型侧JSON序列化的模型，从而触发预期外的报错。

> [FastGPT GitHub issue 1156](https://github.com/labring/FastGPT/issues/1156), [FastGPT GitHub issue 1878](https://github.com/labring/FastGPT/issues/1878)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
