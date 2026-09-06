---
title: 解决FastGPT文本内容提取插件非ChatGPT模型报错的问题
slug: /zh/troubleshoot/fastgpt-text-extract-model-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1156
source_type: GitHub issue
---

# 解决FastGPT文本内容提取插件非ChatGPT模型报错的问题

## 现象
私有部署4.7版本的FastGPT中，文本内容提取插件无法使用非ChatGPT系列模型完成内容提取。接入qwen1.5-14b模型时，会抛出报错信息"Your model may not support toll_call SyntaxError: Unexpected end of JSON input"。

## 可能原因
当前文本内容提取插件的JSON序列化逻辑由调用的大语言模型执行。部分模型无法生成符合标准格式的JSON内容，导致序列化失败，触发上述报错。

## 排查步骤
1. 确认FastGPT部署版本为4.7私有部署版本。
2. 检查文本内容提取插件所调用的模型是否属于非ChatGPT系列模型。
3. 查看插件运行日志，确认报错信息包含"Your model may not support toll_call SyntaxError: Unexpected end of JSON input"。
4. 需按实际环境确认目标模型是否支持标准JSON格式输出。

## 解决与验证
将JSON序列化逻辑从大语言模型迁移至独立工具处理，替换原有的模型端JSON序列化流程。验证时，更换模型为qwen1.5-14b后，文本内容提取插件可正常完成内容提取，无上述报错。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1156)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
