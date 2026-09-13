---
title: Filter Dataset Collections in FastGPT Searches
slug: /en/tutorial/fastgpt-dataset-collection-filtering
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/dataset/collection_tags
source_type: Official documentation
---

# Filter Dataset Collections in FastGPT Searches

# Overview
Collection filtering in FastGPT dataset searches lets you narrow returned results to specific subsets of your uploaded collections. By configuring the Collection Filter field, you can target collections based on their assigned tags and creation timestamps, reducing irrelevant results and streamlining search workflows.

# Filter Syntax & Parameters
The filter configuration uses a valid JSON object with two top-level supported fields: `tags` and `createTime`. The following table outlines each field and their valid operators:

| Configuration Field | Valid Operators | Purpose |
|----------------------|----------------|---------|
| `tags` | `$and`, `$or` | Filters collections by their associated tag values. |
| `createTime` | `$gte`, `$lte` | Filters collections by their creation timestamp, formatted as `YYYY-MM-DD HH:mm`. |

A complete example filter configuration is provided below:
```json
{
  "tags": {
    "$and": ["Tag 1", "Tag 2"],
    "$or": ["When $and tags are present, $and takes effect and $or is ignored"]
  },
  "createTime": {
    "$gte": "YYYY-MM-DD HH:mm format, matches collections created after this time",
    "$lte": "YYYY-MM-DD HH:mm format, matches collections created before this time. Can be used together with $gte"
  }
}
```
Each operator functions as defined:
- `$and`: Requires all listed tags to be present on a collection for it to match the filter.
- `$or`: Requires at least one listed tag to be present, though this condition is ignored if `$and` is also configured.
- `$gte`: Returns collections created on or after the specified timestamp.
- `$lte`: Returns collections created on or before the specified timestamp, and may be used alongside `$gte` to define a targeted time range.

# Key Usage Guidelines
There are two critical rules for proper filter configuration:
1. Tag value formats: Tag values may be either a string representing a tag name, or `null`. The `null` value specifically matches collections that have no tags assigned.
2. Conditional priority: If both `$and` and `$or` are included in the `tags` filter object, only the `$and` condition will be applied, and the `$or` condition will be ignored entirely.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/dataset/collection_tags)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
