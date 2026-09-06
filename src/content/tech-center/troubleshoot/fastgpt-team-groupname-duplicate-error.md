---
title: FastGPT team模块groupNameDuplicate错误码说明与处理
slug: /zh/troubleshoot/fastgpt-team-groupname-duplicate-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/team.ts
source_type: 官方文档
---

# FastGPT team模块groupNameDuplicate错误码说明与处理

## 这个错误是什么
该错误属于FastGPT team模块的标准错误枚举项，枚举名为groupNameDuplicate，对应statusText字段值为groupNameDuplicate，国际化文案键为common:code_error.team_error.group_name_duplicate，用于统一标识团队分组名称重复的异常场景。

## 什么情况下会触发
该错误会在创建团队分组，或修改已有团队分组名称时触发。当提交的分组名称与当前团队内已存在的其他分组名称完全一致时，系统会校验并抛出此错误，阻止重复分组的创建或名称修改操作。

## 怎么定位
定位该错误可按照以下步骤执行：1. 提取报错返回的statusText字段，确认其值为groupNameDuplicate；2. 进入对应团队的分组管理界面，查看当前已存在的所有分组名称列表；3. 对比待操作的分组名称与列表内的已有名称，确认存在重复项。

## 处理与验证
处理该错误需调整重复的分组名称。将待创建或修改的分组名称替换为当前团队内未被使用的名称，重新提交对应操作。验证时，可再次进入分组管理页面，确认新分组名称已成功创建或更新，且无重复相关的报错提示出现。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/team.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
