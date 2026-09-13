---
title: FastGPT team模块tooManyInvitations错误码说明
slug: /zh/troubleshoot/fastgpt-team-too-many-invitations-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/team.ts
source_type: 官方文档
---

# FastGPT team模块tooManyInvitations错误码说明

## 这个错误是什么
该错误属于FastGPT的team模块，枚举名称为tooManyInvitations，对应statusText字段值为tooManyInvitations，关联的国际化文案键为common:code_error.team_error.too_many_invitations，用于标识团队邀请相关的超限类错误，提示邀请操作违反了系统的数量限制规则。

## 什么情况下会触发
当向团队发送邀请的操作次数达到系统预设的周期上限，或单次邀请的成员数量超出限制时，会触发该错误。该错误仅出现在团队邀请相关的操作流程中，属于团队管理场景下的资源超限类问题。

## 怎么定位
1. 提取接口返回的错误信息中的statusText字段，确认其值为tooManyInvitations；
2. 查看当前操作的团队邀请发送记录，统计已发起的邀请数量；
3. 结合team模块的错误码定义，匹配该错误对应的枚举项，确认错误类型。

## 处理与验证
处理该错误时，可先暂停发起新的团队邀请，等待系统的限制周期自动重置。若拥有团队管理的相关权限，可调整团队邀请的数量限制阈值。验证时，在限制周期重置后，重新发起符合数量要求的团队邀请操作，确认错误不再出现。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/team.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
