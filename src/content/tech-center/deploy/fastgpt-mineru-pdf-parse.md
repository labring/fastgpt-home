---
title: 配置MinerU以优化FastGPT的PDF文件解析效果
slug: /zh/deploy/fastgpt-mineru-pdf-parse
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/custom-models/mineru
source_type: 官方文档
---

# 配置MinerU以优化FastGPT的PDF文件解析效果

## 内置PDF解析的局限
PDF是相对复杂的文件格式。FastGPT内置的PDF解析器依赖pdfjs库，基于逻辑解析，无法有效理解复杂PDF文件。当解析包含图片、表格、公式等非简单文本内容的PDF时，解析效果不佳。

## 可选的优化解析方案
当前市面上存在多种PDF解析方法，其中MinerU项目集成了YOLO、PaddleOCR以及表格识别等模型，基于视觉解析技术，可有效提取图片、表格、公式等复杂PDF内容。

## 配置步骤
社区版与商业版FastGPT用户的配置方式存在差异。社区版用户需在config.json文件中添加systemEnv.customPdfParse配置，即可使用MinerU解析PDF文件。商业版用户无需修改配置文件，直接在Admin后台根据表单指引填写相关内容即可完成配置。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/custom-models/mineru)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
