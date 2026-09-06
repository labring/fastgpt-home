---
title: FastGPT team模块orgMemberDuplicated错误码说明
slug: /zh/troubleshoot/fastgpt-team-org-member-duplicated-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/team.ts
source_type: 官方文档
---

# FastGPT team模块orgMemberDuplicated错误码说明

## 这个错误是什么
该错误属于FastGPT team模块的错误码，枚举名为orgMemberDuplicated，statusText为orgMemberDuplicated，对应国际化文案键为common:code_error.team_error.org_member_duplicated，用于标识团队组织成员重复添加的异常情况。

## 什么情况下会触发
当尝试向当前团队组织添加已存在的成员时，会触发该错误。具体场景包括重复提交同一成员的加入申请，或使用已在组织成员列表中的成员信息发起添加操作。

## 怎么定位
首先，访问团队组织的成员管理页面，浏览已添加的成员清单，核对待添加成员的唯一标识，如用户ID、绑定邮箱等。其次，检查发起成员添加请求的接口参数，确认待添加成员的标识是否与已有成员的标识重复。

## 处理与验证
处理时，取消重复的成员添加请求，选择未加入当前组织的成员发起添加或邀请操作。验证时，重新提交成员添加请求，确保待添加成员未在组织成员列表中，确认接口返回无orgMemberDuplicated错误，且成员成功加入团队组织。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/team.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
