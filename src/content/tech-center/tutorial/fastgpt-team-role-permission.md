---
title: FastGPT团队、成员组及资源权限精细化配置方法
slug: /zh/tutorial/fastgpt-team-role-permission
page_type: 教程/部署
source: https://doc.fastgpt.cn/zh-CN/guide/workspace/team/team_roles_permissions
source_type: 官方文档
---

# FastGPT团队、成员组及资源权限精细化配置方法

### 权限系统基础说明
FastGPT 权限系统融合基于属性和角色的管理范式，支持成员、部门、群组三种管理模式，可精细化控制团队、应用、知识库等资源的访问权限。权限判定逻辑为：优先检查用户个人成员权限，其次取用户所属部门和群组的权限并集，最终权限为两者的组合。不同资源对应不同权限范围：团队支持创建应用、知识库、APIKey及管理成员；应用支持可使用（对话交互）、可编辑（修改基本信息与流程编排）、可管理（添加或删除协作者）；知识库支持可使用（应用调用）、可编辑（修改内容）、可管理（添加或删除协作者）。

### 快速配置步骤
1. 登录团队管理页面，通过全员群组快速设置团队默认权限，例如为所有成员配置应用的「可使用」权限。
2. 若需单独调整单个用户权限，直接修改该用户的成员权限，个人权限会覆盖全员群组权限。例如应用A设置全员可编辑权限，用户M被单独设为可使用，则用户M仅能使用应用无法编辑。
3. 管理协作者权限时，团队权限需在专门的权限页面配置，应用和知识库可直接修改成员权限。

### 开发者权限设计参考
FastGPT 权限系统参考 Linux 权限设计，以二进制存储权限位，权限位为1表示拥有该权限，0表示无权限，Owner权限标记为全1。权限信息存储在 MongoDB 的 `resource_permissions` 集合中，核心字段包括：`teamId`（团队标识）、`tmbId/groupId/orgId`（权限主体三选一）、`resourceType`（资源类型：team/app/dataset）、`permission`（权限值数字）、`resourceId`（资源ID，团队资源为null）。其 Schema 定义在 `packages/service/support/permission/schema.ts` 文件中。
> 来源：https://doc.fastgpt.cn/zh-CN/guide/workspace/team/team_roles_permissions
