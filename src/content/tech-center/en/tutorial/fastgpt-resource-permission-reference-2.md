---
title: FastGPT Resource Permission Reference
slug: /en/tutorial/fastgpt-resource-permission-reference-2
page_type: 教程/部署
source: https://doc.fastgpt.cn/en/guide/workspace/team/team_roles_permissions
source_type: 官方文档
---

# FastGPT Resource Permission Reference

## FastGPT Resource Permission Reference
FastGPT organizes access controls around discrete resource types, including apps, datasets, and teams. Each resource has a predefined set of manageable permissions that define allowed actions within the workspace. This document outlines all standard resource permissions available in the FastGPT team workspace system.

## Official Resource Permission Matrix
The following table lists all supported resource permissions, their associated resource type, and official descriptions:

| Resource | Manageable Permissions | Description |
|----------|-------------------------|-------------|
| Team | Create Apps | Create, delete, and other basic operations |
| Team | Create Datasets | Create, delete, and other basic operations |
| Team | Create Team APIKey | Create, delete, and other basic operations |
| Team | Manage Members | Invite/remove users, create groups, etc. |
| App | Can Use | Allows conversation interaction |
| App | Can Edit | Modify basic info, workflow orchestration, etc. |
| App | Can Manage | Add or remove collaborators |
| Dataset | Can Use | Can call this Dataset in apps |
| Dataset | Can Edit | Modify Dataset content |
| Dataset | Can Manage | Add or remove collaborators |

## Permission Scope Details
### Team Permissions
Team-level permissions govern workspace-wide resource creation and administrative tasks. The four available team permissions cover core workspace operations: creating apps and datasets, generating team API keys, and managing team membership.
### App Permissions
App permissions are scoped to individual application assets. The three permission tiers grant escalating access: Can Use enables basic conversation interactions, Can Edit allows modifying app configuration including basic information and workflow orchestration, and Can Manage permits adding or removing collaborators for the specific app.
### Dataset Permissions
Dataset permissions mirror the tiered structure of app permissions. Can Use allows the dataset to be called in compatible team apps, Can Edit permits modifying the dataset's stored content, and Can Manage allows adding or removing collaborators for the specific dataset.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/guide/workspace/team/team_roles_permissions)
