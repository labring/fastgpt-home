---
title: Multi-turn Dialogue and Prompting for Advertising and Marketing Financial Report Analysis
slug: /en/industry/finance-d014-c062-f005
page_type: Industry scenario page
article_section: Financial Statement Analysis and Reporting
is_part_of: FastGPT Tech Center
meta_title: Multi-turn Dialogue and Prompting for Advertising and
meta_description: Advertising and marketing financial report data primarily comes from internal enterprise marketing campaign systems, media partner settlement files
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Multi-turn Dialogue and Prompting for Advertising and Marketing Financial Report Analysis

## What the Data for This Category Looks Like
Advertising and marketing financial report data primarily comes from internal enterprise marketing campaign systems, media partner settlement files, and export files from third-party advertising monitoring platforms. Data update cadence aligns with campaign cycles. Available report formats include daily campaign reports, monthly summary reports, and quarterly/annual summary reports. A single document typically includes fields such as campaign date, media channel, campaign format, impressions, clicks, conversions, per-channel cost, total budget, and actual spend. Corresponding units for these fields include impressions, clicks, yuan, and others. Some reports also include associated information for campaign assets.

## What Constraints These Characteristics Impose on Multi-turn Dialogue and Prompting
Multiple data sources require multi-turn dialogue to support cross-data source context association. Prompts must clearly distinguish field definitions across different channels. Varying data update frequencies require prompts to support dynamic specification of analysis periods, to avoid mixing campaign data from different timeframes. Dense fields and diverse unit structures in documents require prompts to predefine standard meanings for fields, to prevent unit confusion during context parsing. Large document volumes require reasonable configuration of context window and segmentation parameters, to avoid parsing interruptions caused by exceeding model token limits.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
| ---- | ---- | ---- |
| `maxContext` | `8000–16000 characters` | Advertising and marketing financial reports often include multi-channel campaign details, requiring space for multi-turn dialogue context and parsed text snippets |
| `UPLOAD_FILE_MAX_SIZE` | `500 MB` | Advertising and marketing financial reports often include bulk media settlement attachments and monitoring screenshots, requiring support for large file uploads |
| `PARSE_FILE_TIMEOUT_SECONDS` | `300 seconds` | Parsing multi-page structured reports takes longer, to avoid mid-process timeout interruptions |
| `Chunk size` | `1000–1500 characters` | Advertising and marketing financial reports have dense fields. Segments that are too long cause context confusion, while segments that are too short lose field association logic |
| `Recall count` | `Top 8 entries` | Only a limited number of historical data entries need to be associated during multi-turn dialogue. Excessive entries will crowd out context space |
| `Similarity threshold` | `0.75` | Requires precise matching of financial report fields corresponding to user questions, to avoid mixing irrelevant data into context |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material format, data volume, and business rules. Specific issues require individual analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Configuration Mistakes
- Phenomenon: Only some connected models are displayed in the model selection dropdown of the dialogue module, and custom connected GLM series models are not visible. Cause: The dialogue module permission for the corresponding model is not enabled in the system configuration, or the model is not bound to the current application's knowledge base and dialogue chain.
- Phenomenon: File upload can be enabled in the front-end interface, but the file parameter cannot be carried when calling the dialogue interface, and the interface returns empty results. Cause: File upload parameter passthrough is not enabled in the interface configuration, and the file storage callback address is not correctly configured.
- Phenomenon: After configuring both image and file uploads, the parsing result only includes text file content, and images cannot be recognized. Cause: The image OCR switch is not enabled in the parsing configuration, and corresponding parameters for image parsing are not configured.

## How to Confirm Configuration is Valid
- After connecting a custom model, check if the target model is included in the model dropdown of the dialogue test interface, to confirm the configuration has taken effect.
- Upload a sample advertising and marketing financial report file, check if the parsed fields match the original document, to confirm file upload and parsing configurations are working properly.
- Initiate a multi-turn dialogue, ask for campaign data from different periods in sequence, check if the context can correctly associate parameters from previous questions, to confirm context and recall configurations are reasonable.
- Run a workflow test, check if the final output only includes results from the dialogue stage, and intermediate step processing results are not displayed, to confirm the hidden configuration of workflow nodes is correct.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
