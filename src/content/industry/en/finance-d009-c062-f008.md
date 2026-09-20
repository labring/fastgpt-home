---
title: Tool Calling and Plugins for Advertising and Marketing Research Report Retrieval
slug: /en/industry/finance-d009-c062-f008
page_type: Industry scenario page
article_section: Research Report Search and Q&A
is_part_of: FastGPT Tech Center
meta_title: Tool Calling and Plugins for Advertising and Marketing
meta_description: Data sources for advertising and marketing research reports include third-party media monitoring platforms, advertiser internal marketing campaign
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Tool Calling and Plugins for Advertising and Marketing Research Report Retrieval

## What the data for this category looks like
Data sources for advertising and marketing research reports include third-party media monitoring platforms, advertiser internal marketing campaign ledgers, and industry association public reports. Update cycles cover monthly regular analysis reports, weekly campaign fluctuation briefings, and real-time bidding and campaign data.
Document structures typically include modules such as campaign channel classification, budget allocation ratio, audience profile fields, and conversion effect metrics.
Fields involved include campaign amount, impressions, clicks, audience scale, and more. Units include ten thousand yuan, cost per thousand impressions (CPM), ten thousand people, times, and others. Some specialized reports also include custom metrics like segmented channel ROI and conversion rate.

## Constraints imposed on tool calling and plugins by these characteristics
Multi-source data requires tool calling to support integration with different types of external data source plugins, adapting to different interface formats such as ledgers and monitoring platforms.
Differences in update cycles require plugins to support custom pull frequencies, adapting to different update periods of weekly briefings and real-time bidding data.
The complex field and unit system requires the tool calling link to support custom field mapping and unit conversion configurations, avoiding metric mismatches during retrieval or analysis.
Long documents and multi-dimensional content require plugins and knowledge base configurations to adapt to research reports of varying lengths, avoiding context overflow or information fragmentation.

## How to set configurations
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `Recall count` | `Top 8–12 entries` | Advertising and marketing research reports contain multi-dimensional metrics. Too many recalled entries will introduce irrelevant data, while too few will fail to cover all business scenarios |
| `Similarity threshold` | `0.72–0.80` | Research report content has high professionality. A higher threshold is needed to filter low-relevance retrieval results and avoid interference with marketing campaign analysis |
| `PARSE_FILE_TIMEOUT_SECONDS` | `120 seconds` | Long research reports can span dozens of pages, with long parsing times. The timeout setting must be adjusted to accommodate long document parsing |
| `Chunk size` | `800–1200 characters` | Research reports contain dense metrics and cases. Too short a segment length will split metric associations, while too long will exceed model context limits |
| `Plugin API Timeout` | `60 seconds` | Some third-party media data source interfaces have slow response times. Sufficient time must be reserved for data pulling and format conversion |
| `Custom Field Mapping` | `Enabled` | Advertising and marketing research reports have non-standard fields such as CPM and campaign ROI. These must be mapped to unified retrieval fields |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require specific analysis. It is recommended to test on your own samples before finalizing settings.

## Three common misconfigurations
- Phenomenon: Calling an external custom model API returns `400 Bad Request` with the prompt `model not in allowed list`. Cause: No access configuration for the custom model was added in the FastGPT plugin settings, and only the platform's built-in model list was used.
- Phenomenon: Calling the FastGPT chat interface, specifying a knowledge base parameter still returns results from an unrelated knowledge base, and the `kb_ids` field return value does not match expectations. Cause: The knowledge base ID parameter in the API request was not formatted correctly, or the parameter was not URL-encoded.
- Phenomenon: Parsing streaming results with the `detail: true` parameter fails to obtain both knowledge base recall data and streaming output content. Cause: The `stream` and `return_knowledge` parameters were not both enabled in the API request, resulting in the two types of data not being returned together.

## How to confirm proper configuration
- Call the test interface, pass in advertising and marketing related keywords, and check if the returned results include matching channel and budget related fields.
- View plugin operation logs, confirm that the API request status codes for custom models or external data sources are `200 OK`, with no `400` or `500` level errors.
- Manually trigger a long research report parsing task, check if parsing time is within the preset timeout range, and no timeout interruptions occur.
- Initiate a request with the `stream` and `return_knowledge` parameters, verify that streaming output and knowledge base recall data can be parsed simultaneously.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
