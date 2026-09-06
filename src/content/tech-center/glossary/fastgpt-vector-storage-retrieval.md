---
title: 说明FastGPT中vector向量检索与存储的配置与使用
slug: /zh/glossary/fastgpt-vector-storage-retrieval
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/guide/dataset/dataset_engine
source_type: 官方文档
---

# 说明FastGPT中vector向量检索与存储的配置与使用

## 一句话定义
FastGPT中的vector指用于向量存储与检索的PG Vector插件及PostgreSQL表中的专用存储字段。

## 在 FastGPT 里怎么用
FastGPT采用PostgreSQL的PG Vector插件作为向量检索器，索引为HNSW，PostgreSQL仅用于向量检索，可替换为其他数据库，MongoDB用于其他数据的存取。MongoDB的dataset.datas表存储向量原数据信息，其indexes字段为数组，可记录多个对应向量ID，支持文本、图片向量索引。PostgreSQL表通过vector字段存储向量。检索时先召回向量，再通过向量ID在MongoDB中查找原数据，合并同组原数据并取最高得分。如需升级PG Vector插件版本、更新知识库集合字段与index类型，可通过终端发起HTTP请求：执行curl命令，替换`{{rootkey}}`为环境变量中的rootkey、`{{host}}`为FastGPT域名，请求地址为`https://{{host}}/api/admin/initv490`，脚本执行后若提示timeout可忽略，数据库不崩则会增量执行。

## 容易搞错的地方
一是混淆PostgreSQL与MongoDB的分工，PostgreSQL仅用于向量检索，MongoDB存储非向量类的其他数据。二是误以为一组数据仅能对应一个向量，实际indexes字段为数组，支持一组数据关联多个向量。三是忽略升级脚本的timeout提示，该提示不影响脚本正常增量执行，只要数据库未崩溃即可继续运行。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/dataset/dataset_engine)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
