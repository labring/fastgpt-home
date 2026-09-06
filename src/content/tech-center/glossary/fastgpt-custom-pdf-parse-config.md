---
title: 说明FastGPT中自定义PDF解析配置的使用方法
slug: /zh/glossary/fastgpt-custom-pdf-parse-config
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/self-host/custom-models/marker
source_type: 官方文档
---

# 说明FastGPT中自定义PDF解析配置的使用方法

## 一句话定义
systemEnv.customPdfParse是FastGPT中用于配置启用自定义PDF解析工具的系统环境参数，可替代内置PDF解析器处理复杂PDF文件。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
FastGPT v4.9.0版本及以上支持该配置。社区版用户需在config.json文件中添加systemEnv.customPdfParse配置，重新拉取对应自定义PDF解析工具的镜像，且接口格式已发生变动。商业版用户可直接在Admin后台按照表单指引填写相关配置，无需修改本地配置文件。该配置可让FastGPT使用外部工具解析PDF，以更好地处理包含图片、表格、公式等复杂内容的PDF文件。

## 容易搞错的地方
部分用户会混淆社区版与商业版的配置路径，社区版需修改本地config.json文件，商业版直接在Admin后台操作即可。部分用户未重新拉取对应自定义PDF解析工具的镜像，导致配置无法生效。还有用户未注意接口格式变动，沿用旧的调用逻辑，引发调用异常。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/custom-models/marker)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
