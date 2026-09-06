---
title: 解决FastGPT知识库上传含图片Word文档后AI回答不显示图片的问题
slug: /zh/troubleshoot/fastgpt-word-image-display-issue
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1445
source_type: GitHub issue
---

# 解决FastGPT知识库上传含图片Word文档后AI回答不显示图片的问题

## 现象
上传至FastGPT知识库的Word文档包含内嵌图片，AI生成回答时无法展示文档内的图片，仅返回文本内容，无法同步呈现文档中的图片信息。

## 可能原因
当前FastGPT知识库的文档解析流程未提取Word文档内的内嵌图片并转换为可展示的格式，仅处理文档内的文本内容。用户提出的是否仅支持Markdown格式图片链接，说明现有解析逻辑仅识别外部Markdown图片链接，未处理Word内嵌图片。

## 排查步骤
1.  确认上传至知识库的Word文档内的内嵌图片是否正常显示，可直接打开本地文档查看。
2.  查看知识库解析后的文本片段，确认是否未包含图片相关的标识或链接信息。
3.  尝试使用外部Markdown格式的图片链接替换文档内嵌图片，重新上传后发起提问，查看回答表现，需按实际环境确认效果。

## 解决与验证
目前可通过以下方式实现回答包含图片：将Word文档内的内嵌图片上传至可公开访问的存储空间，生成标准Markdown图片链接，替换文档内的内嵌图片后重新上传至知识库。验证方式为：重新上传处理后的文档，向知识库发起相关提问，查看AI回答是否包含对应的图片链接或正常展示图片。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1445)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
