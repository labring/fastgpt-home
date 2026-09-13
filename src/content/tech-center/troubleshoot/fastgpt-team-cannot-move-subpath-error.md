---
title: FastGPT team模块cannotMoveToSubPath错误码详细说明
slug: /zh/troubleshoot/fastgpt-team-cannot-move-subpath-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/team.ts
source_type: 官方文档
---

# FastGPT team模块cannotMoveToSubPath错误码详细说明

## 这个错误是什么
该错误属于FastGPT team模块下的枚举错误，对应TeamErrEnum枚举的cannotMoveToSubPath项，statusText为cannotMoveToSubPath，国际化文案键为common:code_error.team_error.cannot_move_to_sub_path，用于标识团队组织架构移动操作中的层级异常问题。

## 什么情况下会触发
当尝试将团队组织节点移动至其自身的子路径时，会触发该错误。该场景通常出现在调整团队分组或组织节点层级的操作中，若目标移动路径为当前节点的下属层级，将导致循环层级问题，从而触发此错误。

## 怎么定位
1. 查看报错信息中的statusText字段，确认其值为cannotMoveToSubPath，且归属team模块。
2. 核对当前操作涉及的团队组织节点ID与目标移动路径的层级关系，确认目标路径是否为当前节点的子路径。
3. 检查操作提交的节点ID、目标路径等参数是否正确。

## 处理与验证
处理方式为调整移动目标路径，将其设置为当前节点的同级或上级路径，避免形成循环层级。验证方式为重新执行移动操作，确认cannotMoveToSubPath错误不再出现，同时检查团队组织架构的层级关系是否符合预期。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/team.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
