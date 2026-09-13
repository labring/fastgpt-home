---
title: 解释FastGPT中created字段与服务created状态的含义
slug: /zh/glossary/fastgpt-created-field-status
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/4267
source_type: 官方文档
---

# 解释FastGPT中created字段与服务created状态的含义

## 一句话定义
created在FastGPT中包含两种场景的含义，一是私有部署下Docker容器的状态，二是对话API响应中的时间戳字段。

## 在FastGPT里怎么用
1. 容器场景：私有部署的fastgpt_fastgpt服务处于created状态时，代表容器已完成创建但未正常启动，该状态会导致服务无法正常响应请求。
2. API场景：在V4.9.7版本私有部署环境中，调用/api/v1/chat/completions接口，当配置detail=false且stream=true时，响应的chunk数据中会包含created字段，示例值为`{"created":0}`。

## 容易搞错的地方
部分使用者会将容器的created状态误认为正常运行状态，进而忽略服务未启动的问题；也会误以为API响应的created字段会返回有效时间戳，实际在上述配置下该字段值为0。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/4267)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
