---
title: 解决FastGPT上传PPTX文件时iso-8859-2编码无效报错
slug: /zh/glossary/fastgpt-iso8859-2-upload-error
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/3908
source_type: 官方文档
---

# 解决FastGPT上传PPTX文件时iso-8859-2编码无效报错

## 一句话定义
iso-8859-2是FastGPT创建标准知识库上传PPTX文件时，被系统判定为无效的字符编码，会触发对应上传报错。

## 在FastGPT里怎么用（参数 / 位置 / 步骤）
该报错仅在创建标准知识库并上传PPTX文件的流程中触发，完整流程为先创建标准知识库，再上传PPTX文件，待流程进行到最后一步点击提交时，系统会将接收到的编码判定为iso-8859-2，进而抛出the argument iso-8859-2 is invalid encoding received encoding的报错信息。

## 容易搞错的地方
部分使用者可能误以为该编码是系统支持的合法编码，实际在当前的PPTX文件上传流程中，该编码无法被系统正常识别，会直接触发上传失败，无法完成标准知识库的PPTX文件上传。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/3908)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
