---
title: 解决FastGPT中marker-pdf解析大PDF时前端超时误导问题
slug: /zh/troubleshoot/fastgpt-marker-pdf-timeout-fix-2
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/4126
source_type: GitHub issue
---

# 解决FastGPT中marker-pdf解析大PDF时前端超时误导问题

## 现象
本地部署marker-pdf解析器后，上传页数过多的PDF文件，解析耗时超过前端网络请求的默认超时时间。此时前端页面显示"错误"提示，但文件实际已成功上传至知识库，提示内容存在误导性。

## 可能原因
前端网络请求设置了默认超时阈值，当marker-pdf解析大体积或多页数PDF的耗时超出该阈值时，前端触发超时错误提示。后端的文件解析与上传流程仍正常执行，未受前端超时影响。

## 排查步骤
1. 确认已部署本地marker-pdf解析器。
2. 上传页数较多的PDF文件，等待前端请求超时。
3. 访问知识库页面，检查是否已存在该上传的文件，验证实际上传结果。
4. 记录前端显示的"错误"提示文本与实际文件状态的差异。

## 解决与验证
通过调整前端网络请求的超时配置，延长超时阈值以适配marker-pdf解析大PDF的耗时。验证时，上传页数较多的PDF文件，等待解析流程完成，确认前端不再提前显示"错误"提示，且知识库中正确生成对应文件。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/4126)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
