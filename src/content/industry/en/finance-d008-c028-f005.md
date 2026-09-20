---
title: Multi-turn Dialogue and Prompt Engineering for Thermal Coal Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c028-f005
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Multi-turn Dialogue and Prompt Engineering for Thermal Coal
meta_description: Thermal coal data sources include public reports from domestic coal industry associations, coastal port spot trading platforms, futures exchange
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Multi-turn Dialogue and Prompt Engineering for Thermal Coal Intelligent Due Diligence Reports

## What the data for this category looks like
Thermal coal data sources include public reports from domestic coal industry associations, coastal port spot trading platforms, futures exchange delivery warehouse receipt data, and key power plant procurement records. Update frequencies follow multiple tiers: spot prices are updated daily, regional supply and demand data is released weekly, import volume statistics are updated monthly, and capacity adjustment reports are released quarterly. Documents are primarily structured Excel and CSV tables, while some industry analysis materials are in PDF format with charts. Core fields include origin name, listed price, calorific value, dry basis sulfur content, port inventory, and transportation lead time, with corresponding units of yuan/ton, kilocalories per kilogram, milligrams per kilogram, ten thousand tons, and yuan per ton-kilometer.

## Constraints on multi-turn dialogue and prompt engineering imposed by these characteristics
Decentralized data sources and tiered update frequencies require multi-turn dialogue to guide users to supplement data gradually by cycle dimension, avoiding requests for excessive cross-cycle information at once. Coexistence of structured and unstructured documents means prompts must clearly distinguish rules for structured table extraction and unstructured chart parsing, to prevent confusion over field attribution. Multi-dimensional fields with diverse units require prompts to mandate that corresponding units are included in outputs, reducing manual proofreading costs. Strong logical correlations exist across different dimension data—for example, price fluctuates with calorific value and transportation costs. Multi-turn dialogue must gradually break down association conditions to ensure clear extraction logic.

## Configuration settings
| Configuration Item | Recommended Values | Rationale |
| --- | --- | --- |
| `maxContext` | 8000–12000 characters | Thermal coal due diligence data includes multi-dimensional historical records; longer context preserves complete analysis context |
| `chunkSize` | 1000–1500 characters | Matches the structured table length of thermal coal data, avoids splitting that breaks field associations |
| `similarityThreshold` | 0.75–0.85 | Filters low-relevance non-thermal coal category data, improves extraction accuracy |
| `enableMarkdownRender` | Enabled | Ensures markdown formats defined in prompts are correctly rendered for display |
| `showTokenCount` | Enabled | Displays input and output token counts separately, facilitates monitoring of call costs |
| `maxTokenOutput` | 3000 characters | Matches the standard output length of due diligence reports, avoids truncation of critical data |

> The parameter values provided on this page are conventional recommendations used as starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require targeted analysis, and it is recommended to test on your own samples before finalizing settings.

## Three common mistakes
- Phenomenon: Output is displayed as markdown source code, with unrendered formatting. Cause: The `enableMarkdownRender` configuration item is not enabled, and prompt formatting is output as plain text only.
- Phenomenon: Input and output token counts cannot be viewed during dialogue. Cause: The `showTokenCount` configuration item is not enabled; the platform does not display token statistics by default.
- Phenomenon: Valid thermal coal data for a specified cycle or dimension cannot be obtained after initiating a multi-turn dialogue. Cause: The prompt does not clearly define extraction rules, fails to guide users to supplement necessary parameters, or does not adjust recall parameters to fit thermal coal data volume.

## How to confirm proper configuration
- Upload a structured thermal coal data document, trigger the preset prompt-based question-and-answer process, and check the output to confirm that markdown elements are correctly rendered into visual effects.
- Enter the settings panel of the dialogue interface, confirm that the `showTokenCount` switch is enabled, initiate a query, and check whether the interface displays input and output token statistics.
- Initiate multiple follow-up questions, query thermal coal data for different time cycles and dimensions respectively, and confirm that the system can accurately identify query conditions and return corresponding results.
- Adjust the `chunkSize` and `topK` parameters, test the completeness of recalled data, and confirm that no critical information is missing or results are truncated.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
