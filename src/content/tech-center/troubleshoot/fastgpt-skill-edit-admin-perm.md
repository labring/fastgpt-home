---
title: FastGPT skill模块canNotEditAdminPermission错误说明
slug: /zh/troubleshoot/fastgpt-skill-edit-admin-perm
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/skill.ts
source_type: 官方文档
---

# FastGPT skill模块canNotEditAdminPermission错误说明

## 这个错误是什么
该错误属于FastGPT skill模块，枚举标识为canNotEditAdminPermission，对应状态文本为canNotEditAdminPermission，国际化文案键为common:code_error.skill_error.can_not_edit_admin_permission，用于提示操作者无权限执行skill模块的管理员权限编辑操作。

## 什么情况下会触发
当操作者尝试编辑skill模块下的管理员权限配置项，且当前操作者未被分配该操作所需的编辑权限时，会触发该错误。

## 怎么定位
首先检查当前操作者的权限配置，确认是否被授予skill模块的管理员权限编辑权限；其次查看接口返回的statusText是否为canNotEditAdminPermission，同时确认返回的国际化文案匹配common:code_error.skill_error.can_not_edit_admin_permission；最后核对发起操作的请求参数，确认操作目标为skill模块的管理员权限配置相关内容。

## 处理与验证
首先联系系统管理员申请skill模块的管理员权限编辑权限；在获取对应权限后，重新执行之前的管理员权限配置编辑操作；验证操作是否成功完成，确认接口不再返回canNotEditAdminPermission错误，且相关权限配置已生效。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/skill.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
