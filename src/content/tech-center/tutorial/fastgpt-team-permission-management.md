---
title: FastGPT团队成员组权限配置与鉴权规则说明
slug: /zh/tutorial/fastgpt-team-permission-management
page_type: 教程/部署
source: https://doc.fastgpt.cn/zh-CN/guide/workspace/team/team_roles_permissions
source_type: 官方文档
---

# FastGPT团队成员组权限配置与鉴权规则说明

### 权限系统核心逻辑
FastGPT权限系统融合基于属性和基于角色的权限管理范式，支持成员、部门和群组三种管理模式，可精细化控制团队、应用、知识库等资源的访问权限。权限判定遵循固定逻辑：首先检查用户的个人成员权限（最高优先级），其次检查用户所属部门和群组的权限（取并集），最终权限为上述结果的组合。不同资源对应不同可管理权限：团队资源支持创建应用、创建知识库、创建团队APIKey、管理成员（邀请、移除用户、创建群组等）操作；应用资源支持可使用（对话交互）、可编辑（修改基本信息、流程编排）、可管理（添加或删除协作者）；知识库资源支持可使用（应用中调用）、可编辑（修改内容）、可管理（添加或删除协作者）。

### 权限配置与使用技巧
1. 管理协作者权限时，需先添加协作者才能配置权限：管理团队权限需先选择成员/组织/群组，再进行配置；管理应用或知识库权限可直接修改成员权限。
2. 可通过全员群组快速设置团队默认基础权限，例如为应用设置全员可访问权限。需注意：个人成员权限会覆盖全员组权限，例如应用A设置全员编辑权限，用户M被单独配置为使用权限，则用户M仅能使用该应用，无法编辑。
3. 批量管理多用户权限可通过创建群组或组织实现：先将用户添加到对应群组，再对群组整体授权即可完成批量配置。

### 特殊权限与开发者说明
特殊权限包含三类：管理员负责管理资源协作关系，但无法修改或移除自身权限、其他管理员权限，也不能将管理员权限赋予其他协作者；每个资源有唯一Owner，拥有最高权限，转移所有权后原Owner将失去该资源权限；Root为系统唯一超级管理员，对所有团队的所有资源拥有完全访问和管理权限。面向开发者的权限设计参考Linux权限，采用二进制存储权限位，权限位为1表示拥有权限，0表示无权限，Owner权限标记为全1。权限信息存储在MongoDB的`resource_permissions`集合中，主要字段包括`teamId`（团队标识）、`tmbId/groupId/orgId`（权限主体三选一）、`resourceType`（资源类型，可选team/app/dataset）、`permission`（权限值数字）、`resourceId`（资源ID，团队资源为null），其Schema定义在`packages/service/support/permission/schema.ts`文件中。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/guide/workspace/team/team_roles_permissions)
