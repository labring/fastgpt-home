---
title: FastGPT 4910 Version New Feature Enhancements
slug: /en/deploy/fastgpt-4910-new-features
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4910
source_type: 官方文档
---

# FastGPT 4910 Version New Feature Enhancements

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## PostgreSQL Vector Search Tuning Parameter
This release introduces support for configuring the `systemEnv.hnswMaxScanTuples` parameter within PostgreSQL environments to adjust vector search scalability. The parameter controls the total volume of data processed during iterative HNSW searches, enabling administrators to tune search performance based on their dataset size. A reference table for this configuration is below:
| Parameter Name | Purpose | Deployment Context |
|----------------|---------|---------------------|
| `systemEnv.hnswMaxScanTuples` | Adjust total iterative search data volume | PostgreSQL environment variables |

## Dataset Preprocessing Improvements
Two key updates have been made to dataset preprocessing workflows. First, a new `Chunk Conditions` parameter has been added, allowing users to define criteria that skip document chunking during preprocessing. This is useful for pre-split documents or unsupported file formats that do not require automatic chunking.
Second, the preprocessing pipeline now includes a `Paragraph Priority` mode, which prioritizes semantic paragraph breaks during chunking, with a configurable maximum paragraph depth setting to control nested paragraph processing. The legacy `Length Priority` mode has been updated to remove embedded paragraph priority logic, focusing exclusively on aligning chunk lengths to configured limits.

## Workflow Interface Refinements
The workflow editor has been updated to enforce single-direction input and output connections for all nodes, eliminating bidirectional connection errors and simplifying visual workflow design. A quick `add next node` shortcut has also been implemented, allowing users to rapidly extend workflow sequences by selecting a target node type directly from the current node’s context menu. This change reduces manual connection setup time and streamlines the creation of linear and branching AI pipelines.

## Expanded Platform and Model Support
The Community Edition now includes native support for importing datasets from Lark and Yuque, expanding the range of compatible data sources for self-hosted FastGPT deployments. Additionally, the release adds official presets for the latest available Gemini and Claude model versions, eliminating the need for manual prompt configuration to align with current model capabilities.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4910)
