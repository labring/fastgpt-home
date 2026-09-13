---
title: FastGPT Resource Permission System Developer Reference
slug: /en/tutorial/fastgpt-resource-permission-reference
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/workspace/team/team_roles_permissions
source_type: Official documentation
---

# FastGPT Resource Permission System Developer Reference

> This content is intended exclusively for custom developers; non-developing users may skip this section.

## Permission Design Principles
FastGPT's permission system is inspired by Linux permissions, using binary storage for permission bits. A permission bit of 1 means the permission is granted, 0 means no permission. Team owner permissions are specially marked as all 1s, granting full access to all team-associated resources.

## Permission Storage Location
Permission information is stored in MongoDB's `resource_permissions` collection. This data structure enables flexible and precise permission control across team, application, and dataset resources within the FastGPT platform.

## Schema Field Reference
The following table lists all core fields of the `resource_permissions` collection, as defined in the official FastGPT codebase:
| Field Name       | Data Type                  | Description                                                                 | Associated Reference Collection    |
|------------------|----------------------------|-----------------------------------------------------------------------------|------------------------------------|
| `teamId`         | MongoDB ObjectId           | Unique identifier for the linked team                                     | `TeamCollectionName`               |
| `tmbId`          | MongoDB ObjectId           | Unique ID for a team member (one of three valid permission subjects)        | `TeamMemberCollectionName`         |
| `groupId`        | MongoDB ObjectId           | Unique ID for a member group (one of three valid permission subjects)       | `MemberGroupCollectionName`        |
| `orgId`          | MongoDB ObjectId           | Unique ID for an organizational unit (one of three valid permission subjects)| `OrgCollectionName`                |
| `resourceType`   | String                     | Type of protected resource, limited to values from `PerResourceTypeEnum`   | N/A                                |
| `permission`     | Number                     | Binary bit field representing granted or denied permissions                  | N/A                                |
| `resourceId`     | MongoDB ObjectId or null   | ID of the specific resource; null when `resourceType` is `team`             | N/A                                |

## Official Schema Definition
The official TypeScript schema for the `resource_permissions` collection is defined in `packages/service/support/permission/schema.ts`:
```typescript
export const ResourcePermissionSchema = new Schema({
  teamId: {
    type: Schema.Types.ObjectId,
    ref: TeamCollectionName
  },
  tmbId: {
    type: Schema.Types.ObjectId,
    ref: TeamMemberCollectionName
  },
  groupId: {
    type: Schema.Types.ObjectId,
    ref: MemberGroupCollectionName
  },
  orgId: {
    type: Schema.Types.ObjectId,
    ref: OrgCollectionName
  },
  resourceType: {
    type: String,
    enum: Object.values(PerResourceTypeEnum),
    required: true
  },
  permission: {
    type: Number,
    required: true
  },
  // Resrouce ID: App or DataSet or any other resource type.
  // It is null if the resourceType is team.
  resourceId: {
    type: Schema.Types.ObjectId
  }
});
```

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/workspace/team/team_roles_permissions)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
