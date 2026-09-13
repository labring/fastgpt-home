---
title: Implement FastGPT Third-Party Dataset Unified APIs
slug: /en/integration/fastgpt-third-party-dataset-unified-api
page_type: Integrations
source: https://doc.fastgpt.cn/en/guide/dataset/third-party/third_dataset
source_type: Official documentation
---

# Implement FastGPT Third-Party Dataset Unified APIs

### Unified API Specification Overview
FastGPT defines a standardized API specification to enable consistent integration across all third-party document libraries. This unified interface removes the need for custom, one-off integration code for each unique data source. All official built-in document library integrations are extensions of this standard File Library API. To review the full formal API definition, refer to the [API File Library endpoints](./api_dataset.en.mdx) documentation. For a working reference implementation, examine the sample code located at `FastGPT/packages/service/core/dataset/apiDataset/yuqueDataset/api.ts` when building custom third-party library extensions.

### Required API Endpoints
All custom third-party integrations must implement four core standardized endpoints. The following table lists each required endpoint and its core purpose:

| Endpoint Name                  | Core Functional Purpose                                                                 |
|--------------------------------|----------------------------------------------------------------------------------------|
| Get file list                  | Retrieve the full or paginated list of available files from the connected third-party library |
| Get file content / file link    | Fetch the raw content of a specified file or generate a direct, authenticated access link |
| Get original file preview URL   | Generate a shareable, temporary preview URL for the original file’s native format        |
| Get file detail information     | Return structured metadata including file size, last updated timestamp, and file type    |

### Implementation Guidelines
To build a valid third-party dataset extension, developers must fully implement all four listed endpoints in alignment with the official API specification. The reference sample code for the Yuque dataset integration demonstrates how to map third-party library API responses to the FastGPT standard format. Each implemented endpoint must accept standard request parameters and return structured responses as defined in the official API file library documentation. No unsupported deviations from the specification are permitted for core integration functionality.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/dataset/third-party/third_dataset)

## Applicability and version scope

Use this page for the documented Integrations scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
