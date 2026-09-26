---
title: Deployment and Upgrade for Advertising and Marketing Research Knowledge Base Construction
slug: /en/industry/finance-d006-c062-f015
page_type: Industry scenario page
article_section: Research Knowledge Base Governance
is_part_of: FastGPT Tech Center
meta_title: Deployment and Upgrade for Advertising and Marketing
meta_description: Advertising and marketing research data sources include ad backend real-time reports, third-party cross-platform media monitoring data, competitor
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Deployment and Upgrade for Advertising and Marketing Research Knowledge Base Construction

## What the data for this category looks like
Advertising and marketing research data sources include ad backend real-time reports, third-party cross-platform media monitoring data, competitor public marketing material libraries, industry marketing trend research reports, and in-house brand ad effect logs.

Update frequencies cover real-time (exposure and conversion data for individual ad placements), daily (cross-channel placement summary reports), and weekly (industry trend analysis documents).

Documents include structured fields such as placement ID, impressions, click-through rate, conversion cost, and material type. They also include unstructured content such as full ad scripts, landing page copy, and competitor material screenshots. Field units include yuan, cost per thousand impressions, clicks, conversions, and others.

## What constraints these characteristics impose on deployment and upgrade
Real-time placement data requires configuring high-concurrency vector retrieval services during deployment to avoid recall delays.
Daily batch-updated report documents need scheduled task configuration, and parsing timeout parameters must be adjusted to accommodate batch data.
Long documents such as full ad scripts require adjusting segment length parameters to prevent content truncation.
Structured data with multiple fields needs the custom metadata parsing switch enabled to ensure key business fields are retained during vector embedding.
For intranet deployment scenarios, all dependent images must be imported in advance to prevent service exceptions caused by failure to pull external dependencies.

## How to Set Configurations

| Configuration Item | Suggested Value | Rationale |
| --- | --- | --- |
| `UPLOAD_FILE_MAX_SIZE` | `2000 MB` | Advertising and marketing materials often include high-definition videos and long copy scripts, resulting in large single-file sizes |
| `PARSE_FILE_TIMEOUT_SECONDS` | `900 seconds` | Parsing long video materials and batch structured reports takes a long time, so the timeout threshold must be extended |
| `maxContext` | `8000–12000 characters` | Research documents include multi-dimensional business fields, requiring a longer context to ensure complete semantics |
| `Recall Count` | `Top 10 entries` | Research data has rich dimensions, and sufficient recall samples can cover query needs for different placement scenarios |
| `EMBEDDING_BATCH_SIZE` | `32` | Intranet deployment has limited hardware resources, adjusting the batch size to avoid memory overflow |
| `Similarity Threshold` | `0.75–0.85` | Filter low-relevance placement data to ensure the matching degree between recall results and research queries |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material formats, data volume, and business rules. Specific issues require case-by-case analysis, and it is recommended to test on your own samples before finalizing.

## Three Common Mistakes
- Symptom: OneAPI service restarts continuously, with logs displaying `failed`. Cause: Dependent images were not imported correctly during intranet deployment, or the intranet image source was not configured, leading to failed dependency retrieval.
- Symptom: When uploading ad report documents on version 4.8.9, the error `embed ding error` is thrown. Cause: The structured data parsing switch was not enabled, or the embedding model configuration does not match the document field format.
- Symptom: An error triggers after enabling the external search plugin, with logs showing `Exception: 'usage' Keye`. Cause: The plugin's API key was not configured correctly during deployment, or the intranet environment cannot access external services required by the plugin.

## How to Confirm Configuration is Complete
- Upload a single ad material document that matches the `UPLOAD_FILE_MAX_SIZE` configuration, confirm the parsing progress bar completes normally without errors.
- Submit a research-related query, confirm the number of returned recall entries matches the configured `Recall Count` parameter.
- Restart all service containers in the intranet environment, confirm there are no abnormal restart logs and port listening is operational.
- Configure a scheduled update task, confirm the task triggers automatically at the set update frequency without timeout errors.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
