---
title: FastGPT team模块cannotDeleteDefaultGroup错误码说明
slug: /zh/troubleshoot/fastgpt-team-cannotdelete-defaultgroup-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/team.ts
source_type: 官方文档
---

# FastGPT team模块cannotDeleteDefaultGroup错误码说明

## 这个错误是什么
该错误属于FastGPT team模块的错误，枚举名为cannotDeleteDefaultGroup，对应statusText为cannotDeleteDefaultGroup，文案键为common:code_error.team_error.cannot_delete_default_group，用于标识无法完成默认分组删除操作的异常场景。

## 什么情况下会触发
当尝试执行团队默认分组的删除操作时，会触发该错误。默认分组为团队内置的不可直接删除的分组类型，用于承载团队默认的资源归属。

## 怎么定位（可照做的步骤）
1. 查看报错信息中的statusText字段，确认其值为cannotDeleteDefaultGroup。2. 核对报错所属模块，确认属于team模块错误。3. 检查当前操作的目标分组是否为团队内置的默认分组。

## 处理与验证
处理方式为避免直接删除默认分组，可将默认分组内的资源迁移至其他自定义分组后，保留默认分组或修改其名称。验证时，完成资源迁移操作后重新执行原删除分组的操作，确认不再触发cannotDeleteDefaultGroup错误。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/team.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
