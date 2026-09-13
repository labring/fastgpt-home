---
title: 解决FastGPT文件名含pdf时被误识别为PDF文件的问题
slug: /zh/troubleshoot/fastgpt-pdf-filename-misrecognition
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/2031
source_type: GitHub issue
---

# 解决FastGPT文件名含pdf时被误识别为PDF文件的问题

## 现象
上传文件名中带有pdf字样的图片文件时，FastGPT会将该图片自动识别为PDF文件，与文件实际类型不符。

## 可能原因
当前无明确可依据的原因信息，需结合实际部署环境排查确认。

## 排查步骤
1. 上传文件名中包含pdf字样的图片文件，确保该文件实际并非PDF格式。
2. 进入FastGPT的文件管理页面，查看该文件的识别类型结果。
3. 核对识别出的文件类型与文件实际类型是否一致，确认是否出现误识别情况。

## 解决与验证
验证：上传文件名不含pdf字样的同类型图片文件，查看识别结果是否符合实际文件类型，确认误识别问题仅在文件名含pdf时出现。若需修复该误识别问题，需调整FastGPT的文件识别逻辑，具体调整需结合实际部署环境的配置规则进行。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/2031)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
