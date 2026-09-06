---
title: Configure MongoDB Index Sync for FastGPT 4.15.4
slug: /en/deploy/fastgpt-4154-mongodb-index-sync
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-15/4154
source_type: 官方文档
---

# Configure MongoDB Index Sync for FastGPT 4.15.4

## Deprecated and New Configuration Variables
Starting with FastGPT 4.15.4, the `SYNC_INDEX` environment variable is deprecated, replaced by `MONGO_DEPRECATE_INDEX`. The new variable defaults to `true`, and controls whether explicitly deprecated built-in MongoDB indexes are removed. Setting `MONGO_DEPRECATE_INDEX=false` skips only deprecated-index cleanup; creation of missing current schema indexes still proceeds automatically.

## Automatic Index Synchronization Behavior
FastGPT now runs safe, automated index synchronization on startup, with three core behaviors:
1.  Creates any indexes missing from the current FastGPT schemas
2.  Removes only built-in historical FastGPT indexes that are explicitly marked as deprecated by the corresponding schema, and whose name, key, and relevant options match exactly
3.  Preserves all custom indexes and any other indexes not explicitly declared as deprecated

This process does not invoke Mongoose’s full `syncIndexes()` operation, so indexes are never removed solely because they are absent from a FastGPT schema.

## Pre-Upgrade Obsolete Index Cleanup
To fully remove obsolete indexes before upgrading to 4.15.4, follow this procedure:
1.  Upgrade to and start FastGPT 4.15.3 once
2.  Set `SYNC_INDEX=true`, restart all FastGPT services, and wait for index synchronization to complete
3.  Confirm successful index synchronization, then upgrade to FastGPT 4.15.4

> ⚠️ Critical Warning: V4.15.3 removes every index not declared in its schemas, which may include custom user-created indexes. Back up your database and review existing indexes before proceeding. To preserve custom indexes, record their full definitions prior to running 4.15.3, then recreate them after synchronization completes. Alternatively, skip the 4.15.3 cleanup step if custom indexes must be retained.

## Key Boundaries and Legacy Notes
- `MONGO_DEPRECATE_INDEX` defaults to `true`, and only removes explicitly deprecated built-in FastGPT indexes with exact matching definitions. Customer-created indexes are never removed by this process. Always assign custom indexes an explicit name instead of relying on MongoDB’s default key-derived name to prevent collisions with built-in FastGPT index names.
- FastGPT 4.15.4 does not mark any existing historical indexes as deprecated, so upgrading directly to this version will not automatically remove old indexes. Future FastGPT releases will explicitly mark verified obsolete indexes in their schemas and remove them incrementally.
- Setting `MONGO_DEPRECATE_INDEX=false` skips deprecated-index cleanup that may be introduced in future FastGPT releases, but does not prevent creation of missing schema indexes.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/4-15/4154)
