---
title: 说明FastGPT中address配置的使用与问题处理
slug: /zh/glossary/fastgpt-address-usage-troubleshooting
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/666
source_type: 官方文档
---

# 说明FastGPT中address配置的使用与问题处理

## 一句话定义
address在FastGPT中可指代解决存储缓存问题的方案，以及向量数据库连接地址的配置项。

## 在 FastGPT 里怎么用
在存储缓存场景中，FastGPT默认使用zustand/middleware persist结合local storage缓存store数据，当出现浏览器local storage容量限制问题时，可通过引入localforage作为替代方案来address该问题。在向量数据库场景中，需在docker-compose配置文件的环境变量部分添加MILVUS_ADDRESS字段，填入自行部署且可正常使用的向量数据库连接地址。

## 容易搞错的地方
在向量数据库场景中设置MILVUS_ADDRESS后，可能出现报错"Client must be connected before running operations"，此时需确认向量数据库服务是否正常启动且连接配置无误。在存储缓存场景中，需确保localforage的集成符合FastGPT的相关配置要求，避免出现存储缓存无法正常工作的问题。

> [FastGPT GitHub issue 666](https://github.com/labring/FastGPT/issues/666), [FastGPT GitHub issue 1802](https://github.com/labring/FastGPT/issues/1802)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
