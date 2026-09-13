---
title: FastGPT common模块fileNotFound错误码的详细说明与处理指南
slug: /zh/troubleshoot/fastgpt-common-filenotfound-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/common.ts
source_type: 官方文档
---

# FastGPT common模块fileNotFound错误码的详细说明与处理指南

## 这个错误是什么
该错误属于FastGPT common模块的fileNotFound错误，对应错误码为507002，HTTP状态码为404，错误提示文案键为common:error.fileNotFound，statusText标识为fileNotFound。

## 什么情况下会触发
该错误触发于系统无法定位到指定的目标文件的场景，当请求中引用的文件不存在时，会抛出该错误。

## 怎么定位
1. 提取错误返回的statusText为fileNotFound，错误码507002，HTTP状态码404；
2. 核对请求中传入的文件相关参数，如文件路径、唯一标识等是否与实际存储的文件信息一致；
3. 确认目标文件是否存在于系统配置的存储位置中。

## 处理与验证
处理环节需先修正请求中的文件参数错误，确保参数与实际文件信息匹配；其次检查目标文件是否已被删除或移动，恢复或重新上传目标文件。验证环节可重新发起包含正确文件参数的请求，确认错误不再出现，且能正常获取目标文件。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/common.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
