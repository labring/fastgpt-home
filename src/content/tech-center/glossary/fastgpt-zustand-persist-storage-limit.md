---
title: 说明FastGPT中zustand persist中间件的存储限制与解决方法
slug: /zh/glossary/fastgpt-zustand-persist-storage-limit
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/666
source_type: 官方文档
---

# 说明FastGPT中zustand persist中间件的存储限制与解决方法

## 一句话定义
zustand persist中间件是FastGPT中用于缓存全局状态数据的工具，其默认实现依赖浏览器的localStorage接口，将应用的状态数据持久化存储在本地。

## 在FastGPT里怎么用
在FastGPT的状态管理体系中，该中间件被用于缓存应用的状态数据。当使用该中间件的默认存储模式时，数据会被存储在浏览器的localStorage中。当浏览器localStorage的可用容量不足时，会触发报错"Failed to execute 'setItem' on 'Storage'"。若需解决该存储容量限制问题，可将默认的localStorage存储替换为localforage，也可通过提交拉取请求的方式协助优化该中间件的存储方案。

## 容易搞错的地方
容易忽略该中间件默认依赖浏览器localStorage的特性，未提前预判本地存储容量不足的场景。也容易将该中间件的默认存储方案与其他前端存储方案混淆，导致无法快速定位存储相关的报错问题。该中间件触发的报错信息明确指向Storage接口的setItem方法执行失败，可作为快速定位该类存储问题的直接依据。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/666)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
