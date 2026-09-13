---
title: FastGPT team模块cannotDeleteNonEmptyOrg错误码详细说明
slug: /zh/troubleshoot/fastgpt-team-cannot-delete-non-empty-org
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/team.ts
source_type: 官方文档
---

# FastGPT team模块cannotDeleteNonEmptyOrg错误码详细说明

## 这个错误是什么
该错误属于FastGPT team模块的错误码，枚举名为`cannotDeleteNonEmptyOrg`，对应`statusText`为`cannotDeleteNonEmptyOrg`，关联的国际化文案键为`common:code_error.team_error.cannot_delete_non_empty_org`，用于标识非法的组织删除操作场景。

## 什么情况下会触发
当尝试删除包含未清理内容的组织时，会触发该错误。组织内存在未转移或删除的成员、子组织、关联应用、数据集等资源时，无法直接执行删除操作。

## 怎么定位
1. 查看报错返回的`statusText`字段，确认其值为`cannotDeleteNonEmptyOrg`；
2. 核对目标组织的详细信息，检查是否存在未完成转移或删除的关联资源；
3. 确认操作对象为组织而非其他团队资源，避免混淆错误场景。

## 处理与验证
1. 转移或删除组织内的所有成员、子组织、关联应用、数据集等资源，确保组织处于空状态；
2. 完成资源清理后，重新执行组织删除操作；
3. 验证删除操作是否成功执行，无报错返回。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/team.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
