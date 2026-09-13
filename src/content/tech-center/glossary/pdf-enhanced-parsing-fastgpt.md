---
title: 介绍FastGPT中PDF增强解析的功能与配置使用方法
slug: /zh/glossary/pdf-enhanced-parsing-fastgpt
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/self-host/custom-models/marker
source_type: 官方文档
---

# 介绍FastGPT中PDF增强解析的功能与配置使用方法

## 一句话定义
PDF增强解析是FastGPT中针对PDF文件的自定义增强解析功能，依托外部服务完成文件解析，解析后的PDF文件可保留图片链接。

## 在FastGPT里怎么用
该功能可通过两个场景启用。其一，在知识库上传PDF文件时，勾选`PDF 增强解析`选项；其二，在应用的文件上传配置界面中，勾选该选项。启用该功能后，需将LOG_LEVEL设置为info或debug，才能在日志中查看解析相关的信息。解析过程中会输出类似以下的日志内容：
```
[Info] 2024-12-05 15:04:42 Parsing files from an external service
[Info] 2024-12-05 15:07:08 Custom file parsing is complete, time: 1316ms
```
解析完成后，生成的PDF文件会携带对应的图片链接，可在文件详情中查看相关内容，得到携带图片链接的PDF解析结果。

## 容易搞错的地方
未将LOG_LEVEL设置为info或debug时，无法查看解析相关的日志，无法确认解析是否正常完成。该功能需在指定位置勾选启用，包括知识库上传PDF时的选项，以及应用的文件上传配置中的选项，不可在未勾选的场景下生效。部分用户可能误将该功能用于非PDF文件的解析，导致无法触发对应的解析流程。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/custom-models/marker)
> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/custom-models/mineru)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
