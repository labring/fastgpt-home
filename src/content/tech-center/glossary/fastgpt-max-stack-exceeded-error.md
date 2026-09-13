---
title: 解决FastGPT本地部署的Maximum call stack size exceeded报错问题
slug: /zh/glossary/fastgpt-max-stack-exceeded-error
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/714
source_type: 官方文档
---

# 解决FastGPT本地部署的Maximum call stack size exceeded报错问题

## 一句话定义
Maximum call stack size exceeded是FastGPT本地部署场景下，在录入数据与查询操作时触发的RangeError类型调用栈溢出报错，会导致对应流程无法正常完成。

## 在FastGPT里怎么用
该报错仅出现于FastGPT的本地部署环境中，触发的具体场景为录入数据与执行查询操作的流程内。当该报错出现时，控制台会输出完整的错误提示文本RangeError: Maximum call stack size exceeded，同时相关部署场景常伴随pg链接不稳定的问题。该报错的关联现象已被记录为本地部署、数据录入、查询操作以及pg链接不稳定的组合场景。

## 容易搞错的地方
部分使用者容易仅将该报错的触发原因归结为调用栈溢出本身，将排查方向局限于代码调用栈的相关配置，忽略pg链接不稳定这一关联因素，导致无法快速定位问题根源。此外，部分使用者可能误将该报错等同于通用的调用栈溢出问题，未结合FastGPT本地部署与pg数据库链接的特定场景进行针对性排查。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/714)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
