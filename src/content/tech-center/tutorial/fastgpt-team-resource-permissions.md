---
title: FastGPT团队及应用知识库资源权限管理说明
slug: /zh/tutorial/fastgpt-team-resource-permissions
page_type: 教程
source: https://doc.fastgpt.cn/zh-CN/guide/workspace/team/team_roles_permissions
source_type: 官方文档
---

# FastGPT团队及应用知识库资源权限管理说明

## 资源权限概述
在FastGPT平台的团队协作体系中，不同类型的资源对应不同的管理权限。此处所指的资源包含应用、知识库、团队等核心协作资源，合理配置权限可规范各类操作边界，保障团队资源的有序管理与安全使用。

## 资源权限明细
不同资源对应的可管理权限如下表所示：
| 资源 | 可管理权限 | 说明 |
| --- | --- | --- |
| 团队 | 创建应用 | 创建，删除等基础操作 |
|  | 创建知识库 | 创建，删除等基础操作 |
|  | 创建团队 APIKey | 创建，删除等基础操作 |
|  | 管理成员 | 邀请、移除用户，创建群组等 |
| 应用 | 可使用 | 允许进行对话交互 |
|  | 可编辑 | 修改基本信息，进行流程编排等 |
|  | 可管理 | 添加或删除协作者 |
| 知识库 | 可使用 | 可以在应用中调用该知识库 |
|  | 可编辑 | 修改知识库的内容 |
|  | 可管理 | 添加或删除协作者 |

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/workspace/team/team_roles_permissions)

## 适用性与版本范围

本页适用于官方来源记录的 教程 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
