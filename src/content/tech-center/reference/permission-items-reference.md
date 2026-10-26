---
title: FastGPT 权限项对照表（v4.17.2）
slug: /zh/reference/permission-items-reference
page_type: 基准数据页
source: https://doc.fastgpt.cn/zh-CN/guide/workspace/team/team_roles_permissions
source_type: 官方文档与开源仓库源码（v4.17.2）
description: FastGPT v4.17.2 官方权限文档列出的 13 项资源权限，逐项对照源码里的权限键与权限位，并列出源码中有、文档表未列的权限项。
language: zh
check_day: 2026-10-19
meta_description: FastGPT v4.17.2 官方权限文档列出的 13 项资源权限，逐项对照源码里的权限键与权限位，并列出源码中有、文档表未列的权限项。
date_modified: 2026-10-26
---

# FastGPT 权限项对照表（v4.17.2）

本页把 FastGPT v4.17.2 官方「团队 & 成员组 & 权限」文档中的资源权限表（13 项）逐项对照同一版本源码 `packages/global/support/permission/` 下的权限定义。

权限判定按文档的规则：先看成员本人的权限，再看所属部门与群组的权限（取并集），成员权限优先级最高。

## 文档权限表与源码权限键

| 资源 | 权限 | 文档说明 | 源码权限键 | 权限位 |
| --- | --- | --- | --- | --- |
| 团队 | 创建应用 | 创建，删除等基础操作 | `appCreate` | 0b1000 |
| 团队 | 创建知识库 | 创建，删除等基础操作 | `datasetCreate` | 0b10000 |
| 团队 | 创建团队 APIKey | 创建，删除等基础操作 | `apikeyCreate` | 0b100000 |
| 团队 | 管理成员 | 邀请、移除用户，创建群组等 | `manage` | 0b1 |
| 应用 | 可使用 | 允许进行对话交互 | `read` | 0b100 |
| 应用 | 可编辑 | 修改基本信息，进行流程编排等 | `write` | 0b10 |
| 应用 | 可管理 | 添加或删除协作者 | `manage` | 0b1 |
| 知识库 | 可使用 | 可以在应用中调用该知识库 | `read` | 0b100 |
| 知识库 | 可编辑 | 修改知识库的内容 | `write` | 0b10 |
| 知识库 | 可管理 | 添加或删除协作者 | `manage` | 0b1 |
| 文件 / 文件夹 （集合） | 读权限 | 可查看该文件/文件夹内容。需知识库已开启文件级权限 | `read` | 0b100 |
| 文件 / 文件夹 （集合） | 写权限 | 修改内容、更新、同步、调整训练参数 | `write` | 0b10 |
| 文件 / 文件夹 （集合） | 管理员 | 添加或删除协作者；删除仅限创建者 | `manage` | 0b1 |

「源码权限键」一列按权限名称与说明对照得出；团队的「管理成员」对应团队角色里的 `manage`。

## 角色包含哪些权限位

| 资源 | 角色 | 包含的权限 |
| --- | --- | --- |
| 通用（应用、知识库、集合、技能） | `read` | `read` |
| 通用（应用、知识库、集合、技能） | `write` | `write` + `read` |
| 通用（应用、知识库、集合、技能） | `manage` | `manage` + `write` + `read` |
| 应用 | `manage` | `manage` + `write` + `read` + `readChatLog` |
| 应用 | `readChatLog` | `read` + `readChatLog` |
| 团队 | `appCreate` | `appCreate` + `read` + `write` |
| 团队 | `datasetCreate` | `datasetCreate` + `read` + `write` |
| 团队 | `apikeyCreate` | `apikeyCreate` + `read` + `write` |
| 团队 | `skillCreate` | `skillCreate` + `read` + `write` |

权限位取值：`read` 0b100 · `write` 0b10 · `manage` 0b1；团队另有 `appCreate` 0b1000 · `datasetCreate` 0b10000 · `apikeyCreate` 0b100000 · `skillCreate` 0b1000000；应用另有 `readChatLog` 0b1000。所有者拥有全部权限位。

团队角色里的 `write` 在界面上不显示勾选框；新成员默认角色为团队 `read`（普通成员）。应用、知识库、集合、技能的默认角色为无权限，需要通过协作者授予。

## 源码中有、文档表未列的权限项

| 资源 | 源码权限键 | 权限位 | 说明 |
| --- | --- | --- | --- |
| 团队 | `skillCreate` | 0b1000000 | 团队角色中的创建技能权限，角色同时包含 `read` 与 `write` |
| 应用 | `readChatLog` | 0b1000 | 应用的查看对话日志权限；应用的 `manage` 角色也包含这一位 |
| 技能 | `read` `write` `manage` | 0b100 / 0b10 / 0b1 | 技能资源沿用通用三档角色 |

源码的资源类型枚举共 6 种：`team`, `app`, `dataset`, `model`, `agentSkill`, `collection`。本页展开了其中团队、应用、知识库、集合与技能五种。

## 这张表的适用范围

权限项取自 FastGPT v4.17.2 官方权限文档与同版本源码。团队空间与权限按商业版功能差异表属于商业版与云服务版功能；文件 / 文件夹权限需要知识库已开启文件级权限。界面上显示的权限名称以实际版本为准。

## 参考资料

- [团队 & 成员组 & 权限](https://doc.fastgpt.cn/zh-CN/guide/workspace/team/team_roles_permissions)
- [知识库文件级权限](https://doc.fastgpt.cn/zh-CN/guide/dataset/collection_permission)
- [permission 目录（v4.17.2）](https://github.com/labring/FastGPT/tree/v4.17.2/packages/global/support/permission)
