---
title: FastGPT team模块unAuthTeam错误码的说明
slug: /zh/troubleshoot/fastgpt-team-unauth-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/team.ts
source_type: 官方文档
---

# FastGPT team模块unAuthTeam错误码的说明

## 这个错误是什么
该错误属于FastGPT team模块的错误码体系，对应枚举值为TeamErrEnum.unAuthTeam，状态文本为unAuthTeam，对应的国际化文案键为common:code_error.team_error.un_auth，用于标识团队权限验证未通过的场景。

## 什么情况下会触发
该错误触发于用户尝试访问或操作无权限的团队资源时。具体包括用户未被授权加入指定团队，或尝试访问不属于自身权限范围的团队配置、团队数据、团队成员管理等操作场景，也可能出现在用户尝试操作已退出的团队资源时。

## 怎么定位
首先查看接口返回的statusText字段，确认是否为unAuthTeam。其次核对当前操作涉及的团队ID与团队名称，确认目标团队是否存在且当前用户有权限访问该团队的对应资源。最后结合国际化文案键common:code_error.team_error.un_auth对应的实际报错内容，定位具体的权限缺失场景，排查是否存在团队权限配置错误或用户权限未同步的问题。

## 处理与验证
处理该错误需先确认当前用户是否属于目标团队，或是否被分配了对应操作的权限。若用户未加入团队，可提交加入申请并等待团队管理员审批；若已加入团队，可联系团队管理员调整对应操作的权限范围。验证时，重新执行原操作，确认接口返回的statusText不再为unAuthTeam，且操作可正常完成，同时可查看团队权限配置页面确认当前用户的权限状态是否正确。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/team.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
