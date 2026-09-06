---
title: FastGPT批量添加数据集数据接口返回值说明
slug: /zh/glossary/fastgpt-batch-dataset-add-api
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/toc
source_type: 官方文档
---

# FastGPT批量添加数据集数据接口返回值说明

## 一句话定义
FastGPT中用于为数据集批量添加数据的API接口，返回值包含添加统计与异常信息。

## 在 FastGPT 里怎么用
该接口属于开发文档中开放API的数据集模块，应用场景为批量添加知识完成后需对知识进行更新操作的场景。调用后返回标准JSON格式响应，示例为{"code":200,"statusText":"","message":"","data":{"insertLen":1,"overToken":[],"repeat":[],"error":[]}}。响应数据字段包括：insertLen为成功添加的条目数量，overToken为超出Token限制的条目列表，repeat为重复的条目列表，error为处理失败的条目列表。

## 容易搞错的地方
该接口在批量添加数据成功后，不会返回新增QA对的ID，无法直接通过该响应获取新增数据的唯一标识，若需对新增数据进行更新操作，需通过其他方式匹配定位。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/toc)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
