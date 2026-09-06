---
title: Define FastGPT Third-Party API Dataset Response Formats
slug: /en/integration/fastgpt-api-dataset-specs
page_type: Integrations
source: https://doc.fastgpt.cn/en/guide/dataset/third-party/api_dataset
source_type: Official documentation
---

# Define FastGPT Third-Party API Dataset Response Formats

## Standard API Response Format
All third-party FastGPT dataset API endpoints use a consistent top-level response structure defined by the `ResponseType` TypeScript alias. This envelope standardizes success status, context messages, and returned data across all API calls. The full structure includes three required fields:
- `success`: A boolean value indicating if the request completed without errors
- `message`: A human-readable string providing context about the request outcome, including error details for failed requests
- `data`: A generic container field holding endpoint-specific resource data, whose structure varies by called endpoint.

## File List Item Data Type
The `FileListItem` TypeScript type defines individual entries in dataset file and folder lists, used when retrieving directory data via third-party APIs. The complete set of fields for this type is outlined below:

| Field Name | Type | Details |
|------------|------|---------|
| `id` | `string` | Unique identifier for the file or folder |
| `parentId` | `string \| null` | Unique identifier of the parent folder; `null` for root-level items |
| `name` | `string` | Human-readable display name of the item |
| `type` | `'file' \| 'folder'` | Classification of the list item |
| `updateTime` | `Date` | Timestamp of the most recent item update |
| `createTime` | `Date` | Timestamp when the item was first created |
| `hasChild` | `boolean (optional)` | Flag for child nodes; defaults to `true` for folder-type items |

## Implementation Best Practices
When integrating with the FastGPT third-party dataset API, ensure client code properly parses responses against the defined TypeScript types. Handle optional fields gracefully to account for missing values in API returns, and validate all incoming data against the specified type constraints to prevent compatibility issues.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/dataset/third-party/api_dataset)

## Applicability and version scope

Use this page for the documented Integrations scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
