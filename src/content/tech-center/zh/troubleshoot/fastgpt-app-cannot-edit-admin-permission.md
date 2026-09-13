---
title: FastGPT app模块canNotEditAdminPermission错误码详细说明
slug: /zh/troubleshoot/fastgpt-app-cannot-edit-admin-permission
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/app.ts
source_type: 官方文档
---

# FastGPT app模块canNotEditAdminPermission错误码详细说明

## 这个错误是什么
该错误属于FastGPT app模块的错误码体系，枚举名为`canNotEditAdminPermission`，对应状态文本为`canNotEditAdminPermission`，错误码为502004，关联的国际化文案键为`common:code_error.app_error.can_not_edit_admin_permission`。

## 什么情况下会触发
当执行编辑应用管理员权限的操作时，权限校验逻辑未通过，无法完成该编辑操作，将触发此错误。

## 怎么定位
1. 确认当前执行的操作是否为编辑应用管理员权限的相关操作；
2. 检查操作发起者的权限是否符合应用管理员权限编辑的要求；
3. 查看返回的错误信息，确认是否包含状态文本`canNotEditAdminPermission`或错误码502004；
4. 核对关联的国际化文案键`common:code_error.app_error.can_not_edit_admin_permission`对应的提示内容。

## 处理与验证
1. 确认操作发起者是否拥有对应应用的最高管理权限，或符合编辑管理员权限的权限规则；
2. 调整操作权限或操作对象后，重新尝试编辑应用管理员权限的操作；
3. 验证操作是否成功完成，且不再返回该错误；
4. 确认返回的错误信息、状态文本及错误码与预期一致。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/app.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
