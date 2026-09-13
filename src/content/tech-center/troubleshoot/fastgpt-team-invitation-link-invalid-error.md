---
title: FastGPT team模块invitationLinkInvalid错误码的触发、定位与处理说明
slug: /zh/troubleshoot/fastgpt-team-invitation-link-invalid-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/team.ts
source_type: 官方文档
---

# FastGPT team模块invitationLinkInvalid错误码的触发、定位与处理说明

## 这个错误是什么
该错误属于FastGPT team模块的错误码，枚举名为invitationLinkInvalid，对应statusText为invitationLinkInvalid，国际化文案键为common:code_error.team_error.invitation_link_invalid，用于标识团队邀请链接无效的场景，是团队操作流程中的异常错误类型。

## 什么情况下会触发
该错误触发于使用无效团队邀请链接的场景，当尝试通过此类链接执行加入团队的操作时，系统会返回该错误。具体无效场景包括邀请链接过期、已被使用、格式不符合要求或关联团队不存在等情况。

## 怎么定位
定位该错误可通过以下步骤：首先查看接口返回的statusText字段是否为invitationLinkInvalid；其次检查当前使用的团队邀请链接是否完整，未被篡改或截断；最后确认该邀请链接未过期、未被使用过，且关联的团队仍处于有效状态。

## 处理与验证
处理该错误的核心方式为获取有效的团队邀请链接。可由团队管理员重新生成符合要求的邀请链接，或确认原有链接的有效性后重新使用。验证方式为：使用新获取的有效邀请链接尝试加入对应团队，若系统不再返回statusText为invitationLinkInvalid的错误，则表示问题已解决。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/team.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
