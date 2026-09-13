---
title: Execute FastGPT 4.16.2 Permission Cleanup Tasks
slug: /en/deploy/fastgpt-4162-permission-cleanup
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-16/4162
source_type: 官方文档
---

# Execute FastGPT 4.16.2 Permission Cleanup Tasks

## Overview
This document details the required permission cleanup and migration workflow for FastGPT 4.16.2, which removes invalid resource permissions to enable complete effective access control lists (ACLs) for Apps, Datasets, and Agent Skills. All admin API operations require a valid root key.

## Step-by-Step Workflow
Start with a dry run to preview changes without modifying any permission data. The default command processes all teams; add the `teamId` parameter to target a single team.
```bash
curl -X POST 'https://your-domain/api/admin/4162/initPermission' \
  -H 'Content-Type: application/json' \
  -H 'rootkey: YOUR_ROOT_KEY' \
  -d '{"dryRun":true,"teamConcurrency":100}'
```
Use the following configurable parameters for the API request:
| Parameter | Type | Details | Default |
|-----------|------|---------|---------|
| `dryRun` | Boolean | Set to `true` for preview mode (no data deletion or writes) | N/A |
| `teamConcurrency` | Integer | Controls concurrent team ACL migration processing, accepts values 1–1000 | 100 |
| `teamId` | String | Optional, targets a single team for processing | Processes all teams |
| `sampleLimit` | Integer | Optional, controls the number of invalid permission samples returned in `cleanup.samples` | N/A |

Within each team, Apps, Datasets, and Agent Skills are processed sequentially. If a resource type fails for a team, FastGPT logs the error in `migration.errors` and continues processing remaining resources and teams.

Once you confirm the invalid permissions listed in `cleanup` are expected, and `migration.errors` is empty or affected resources have been fixed, run the full cleanup and migration command by setting `dryRun` to `false`:
```bash
curl -X POST 'https://your-domain/api/admin/4162/initPermission' \
  -H 'Content-Type: application/json' \
  -H 'rootkey: YOUR_ROOT_KEY' \
  -d '{"dryRun":false,"teamConcurrency":100}'
```

## Validation & Response Metrics
The API response includes two top-level objects:
- `cleanup`: Reports scan, match, and deletion statistics for invalid permissions
- `migration`: Contains resource processing metrics:
  - `resourceCount`: Total number of scanned resources
  - `updatedResourceCount`: Number of resources requiring permission writes
  - `skippedResourceCount`: Target resources skipped due to missing parents or invalid trees
  - `errors`: Detailed error logs for failed processing

Additional behavioral notes: Existing resource owners and child-specific permissions are preserved. Ancestor permission chains are loaded on demand, and historical resources without an inheritance flag are treated as inheriting permissions. During a dry run, migration previews use pre-cleanup permission data, so migration statistics from the full run may differ after invalid permissions are removed. The cleanup and migration process is safe to retry. After applying the changes, run another dry run and confirm that `cleanup.danglingPermissionCount` and `migration.updatedResourceCount` are both `0`, and `migration.errors` is empty. If `migration.errors` is non-empty, repair the affected resources using the provided resource type, resource ID, and parent ID details, then retry the workflow.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/4-16/4162)
