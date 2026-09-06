---
title: FastGPT中permission denied报错的常见场景与排查方法
slug: /zh/glossary/fastgpt-permission-denied-troubleshooting
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/1059
source_type: 官方文档
---

# FastGPT中permission denied报错的常见场景与排查方法

## 一句话定义
permission denied是FastGPT系统中出现的权限不足类报错，提示对应操作无法完成，因执行主体无访问或操作指定资源的权限。

## 在FastGPT里怎么用
在FastGPT中，该报错会在两类操作场景中触发。第一类为导入模型密钥时，系统会提示"not found the model or permission denied"；第二类为私有部署版本（具体版本号v4.8.11-fix）下上传文件时，触发报错文本"EACCES: permission denied, open '/tmp/aIQs6kGiQMUG.docx'"，对应的部署环境为centos7，使用docker compose部署。

## 容易搞错的地方
容易混淆两类报错的排查方向，未针对具体报错文本开展针对性排查。例如将文件上传场景的权限报错误判为模型访问权限问题，或未排查部署环境的目录挂载权限、模型密钥的官方访问权限，同时未确认部署配置是否符合系统要求。

> [FastGPT GitHub issue 1059](https://github.com/labring/FastGPT/issues/1059), [FastGPT GitHub issue 3242](https://github.com/labring/FastGPT/issues/3242)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
