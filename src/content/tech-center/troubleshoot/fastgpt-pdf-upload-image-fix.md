---
title: 解决FastGPT外部解析PDF后文件上传的图片链接异常问题
slug: /zh/troubleshoot/fastgpt-pdf-upload-image-fix
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/5239
source_type: GitHub issue
---

# 解决FastGPT外部解析PDF后文件上传的图片链接异常问题

## 现象
FastGPT当前使用的marker版本非最新版本，在线环境无法配置marker调用LLM，在处理复杂表格与特殊符号时的效果不足。当需要处理复杂PDF文件时，先通过本地最新版本的marker完成PDF解析，再上传解析后的文件至知识库是更优的操作方式。但当前无法将marker处理后生成的包含md文件与对应图片的文件夹同时上传至知识库，导致md文件内的图片链接无法被正确解析。

## 可能原因
FastGPT内置的marker版本未更新至最新版本，且在线环境未支持marker调用LLM，导致复杂文档解析效果受限。同时FastGPT的文件上传功能未支持同结构的md文件与关联图片文件夹的批量上传，无法正确识别md文件内的相对路径图片链接，进而引发图片无法正常显示的问题。

## 排查步骤
1. 确认FastGPT当前使用的marker版本是否为最新版本。
2. 检查是否尝试将本地marker处理后的md文件与对应图片文件夹同时上传至知识库。
3. 查看上传后的md文件内容，确认图片链接是否无法正常加载。
4. 需按实际环境确认marker的LLM配置状态。

## 解决与验证
使用本地最新版本的marker处理目标PDF文件，生成包含md文件与对应图片的文件夹。将该文件夹整体上传至FastGPT知识库。上传完成后，打开知识库内的md文件，验证图片是否可正常显示。需按实际环境确认marker的LLM配置是否符合实际需求。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/5239)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
