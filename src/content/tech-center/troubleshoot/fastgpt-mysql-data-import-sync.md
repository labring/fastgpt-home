---
title: FastGPT 对接 MySQL：知识同步与实时查询路径
slug: /zh/troubleshoot/fastgpt-mysql-data-import-sync
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4626
source_type: GitHub issue
---

# FastGPT 对接 MySQL：知识同步与实时查询路径

## 适用场景与历史记录

原议题同时询问 MySQL 数据导入知识库、数据库更新同步及根据问题执行 SQL。 原始讨论提交于 2025-04-22，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

三项需求分别涉及离线知识同步和实时数据库查询。知识库 OpenAPI 可用于维护集合，原线程缺少通用同步实现的确认。

## 排查与复测

1. 为知识同步定义稳定外部记录 ID、更新标识和删除规则。
2. 先把一条测试记录通过集合接口导入，再验证修改或删除后检索结果的变化。
3. 实时查询使用受控数据库接口和只读权限，校验查询范围，并用固定问题核对返回数据。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：关于知识库更新相关问题](https://github.com/labring/FastGPT/issues/4626)

> 来源: [FastGPT 知识库 OpenAPI](https://doc.fastgpt.io/en/openapi/dataset)

> 来源: [FastGPT 工具调用与终止](https://doc.fastgpt.io/en/guide/build/workflow/nodes/tool)
