---
title: 解决FastGPT调用数据集训练详情接口的500错误问题
slug: /zh/troubleshoot/fastgpt-training-detail-api-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/4847
source_type: GitHub issue
---

# 解决FastGPT调用数据集训练详情接口的500错误问题

## 现象
调用`/api/core/dataset/collection/trainingDetail?collectionId=682c1eb27d7524a42d34494a`接口时，返回如下报错响应：
```json
{"code": 500, "statusText": "", "message": "Unsupported projection option: sort: { _id: 1 }", "data": null}
```

## 可能原因
该报错源于MongoDB查询语句的参数配置错误。具体为在投影操作选项中错误加入了sort参数，而MongoDB要求sort参数需作为独立的查询配置项，不可嵌入投影选项内。当前使用私有部署版本v.4.9.9，搭配MongoDB 4.2。

## 排查步骤
1. 确认调用的接口路径为`/api/core/dataset/collection/trainingDetail`，且传入的collectionId参数为`682c1eb27d7524a42d34494a`。
2. 查看该接口对应的后端代码，检查MongoDB查询语句的参数结构。
3. 核对投影参数与sort参数的配置位置，确认sort是否被错误放入投影选项中。
4. 确认当前使用的MongoDB版本为4.2，核对该版本的查询参数校验规则。

## 解决与验证
1. 调整MongoDB查询语句，将sort参数从投影选项中移出，作为独立的查询配置项。
2. 重新调用目标接口，确认返回的响应中code不为500，且包含正确的训练详情数据。
3. 验证接口功能恢复正常，无报错返回。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/4847)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
