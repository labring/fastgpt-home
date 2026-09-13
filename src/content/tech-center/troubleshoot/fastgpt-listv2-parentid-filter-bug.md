---
title: 解决FastGPT listV2接口parentId过滤失效问题
slug: /zh/troubleshoot/fastgpt-listv2-parentid-filter-bug
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/5075
source_type: GitHub issue
---

# 解决FastGPT listV2接口parentId过滤失效问题

## 现象
调用FastGPT的/api/core/dataset/collection/listV2接口时，无论请求参数中parentId传入具体值还是null，返回结果均包含不属于该parentId的内容，未按parentId参数完成过滤。

## 可能原因
需结合实际部署环境确认，暂无明确已知触发原因。

## 排查步骤
1. 确认调用/api/core/dataset/collection/listV2接口时，请求参数中parentId的传递格式是否正确，区分传具体值与null的场景。
2. 查看接口请求日志，确认parentId参数是否被正确解析至后端处理逻辑中。
3. 核对数据库查询语句，确认是否正确拼接了与parentId对应的过滤条件。

## 解决与验证
若排查发现参数解析错误，修正参数传递逻辑；若发现数据库查询条件拼接错误，调整查询过滤逻辑。验证时，重新调用接口，传入指定parentId，确认返回结果仅包含属于该parentId的内容；传入null时，确认返回结果符合预期的无父级数据集列表。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/5075)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
