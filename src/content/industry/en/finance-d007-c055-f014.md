---
title: Forms and Interactions for Air Governance Revenue Yields
slug: /en/industry/finance-d007-c055-f014
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Forms and Interactions for Air Governance Revenue Yields
meta_description: Air governance-related revenue yield data mainly comes from real-time pollutant data from environmental monitoring stations, operation logs of
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Forms and Interactions for Air Governance Revenue Yields

## What this category's data looks like
Air governance-related revenue yield data mainly comes from real-time pollutant data from environmental monitoring stations, operation logs of corporate governance projects, and revenue records from third-party carbon trading and emission right trading platforms. Data update rhythms are divided into two categories: hourly real-time monitoring values and daily summary reports. The document structure is based on individual projects, and includes fields such as monitoring point code, pollutant concentration, governance energy consumption, emission reduction volume, project investment, operating cost, and trading revenue. Concentration units are μg/m³, energy consumption units are kWh, emission reduction volume units are tons, and cost and revenue units are yuan. Most supporting documents are stored in structured CSV and Markdown daily report formats.

## Constraints on forms and interactions
The multi-granularity data, multi-unit fields and associated attributes of this category impose multiple constraints on the forms and interactions link. Switching filtering between hourly and daily data must be supported to match query needs for different business scenarios. Multi-unit fields require automatic adaptation of display rules to avoid errors caused by manual unit conversion. Associated fields such as emission reduction volume and corresponding pollutant concentration need linkage verification to ensure data logic is self-consistent. Additionally, since most supporting documents contain hierarchical daily reports in Markdown format, the interaction link must retain the title hierarchy within documents to avoid loss of data logic during knowledge base retrieval.

## How to set configurations
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `PARSE_MARKDOWN_HEADING_LEVEL` | `2–6` | Markdown documents for air governance daily reports mostly use second-level titles for project classification, and third-level and below for detailed data items. Retaining levels 2 to 6 can fully restore hierarchical logic and avoid losing subordinate relationships |
| `RECALL_FIELD_WHITELIST` | `governance project ID, pollutant concentration, emission reduction revenue, operating cost` | Core query scenarios of this category revolve around revenue yield-related fields. Limiting recalled fields reduces irrelevant data returns and improves retrieval accuracy |
| `SIMILARITY_THRESHOLD` | `0.72–0.85` | Air governance data fields have strong correlation. A threshold that is too low introduces irrelevant data, while a threshold that is too high may miss matching detailed project data. Values need to be calibrated through actual testing based on actual business scenarios |
| `PARSE_FILE_TIMEOUT_SECONDS` | `600 seconds` | A single air governance daily summary document contains multi-project data, which takes a long time to parse. 600 seconds covers the complete parsing process for most documents |
| `ENABLE_CHAT_DIRECT_TRIGGER` | Enabled | Business scenarios require real-time response to revenue yield queries without requiring manual interaction button triggering, improving usage efficiency |
| `MODEL_SELECTION_WHITELIST` | `Tongyi Qianwen, Wenxin Yiyan, Spark Big Model` | This category of data requires support for references to Chinese and English literature. Domestic large models are more suitable for adapting to domestic data sources and terminology. Limiting the optional range avoids compatibility issues |

> The parameter values given on this page are all conventional recommendations used as starting points for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require specific analysis. It is recommended to test on your own samples before finalizing the settings.

## Three common mistakes
- Phenomenon: The title subordinate relationship of Markdown documents cannot be restored during knowledge base retrieval, resulting in chaotic data logic. Cause: The `PARSE_MARKDOWN_HEADING_LEVEL` parameter is not configured correctly, only first-level titles are retained, or Markdown hierarchical parsing is not enabled.
- Phenomenon: Users need to manually click interaction buttons to initiate queries, and cannot directly input questions to trigger responses. Cause: The `ENABLE_CHAT_DIRECT_TRIGGER` configuration item is not enabled, and the interaction mode is limited to button triggering.
- Phenomenon: Chinese questions cannot retrieve English literature data in the knowledge base. Cause: Parameters supporting cross-language Chinese and English retrieval are not configured, or the recalled fields do not include the title and abstract fields of English literature.

## How to confirm the configuration is correct
- Upload a standard air governance Markdown daily report, check whether the knowledge base retrieval results retain the subordinate relationship between titles and detailed data items, and confirm that the `PARSE_MARKDOWN_HEADING_LEVEL` configuration takes effect.
- Directly input a Chinese question containing "project revenue yield" without clicking the interaction button, check whether the response is automatically triggered and matching data is returned, and confirm that the `ENABLE_CHAT_DIRECT_TRIGGER` configuration takes effect.
- Try to select a domestic large model as the calling carrier, check whether it appears in the optional list, and confirm that the `MODEL_SELECTION_WHITELIST` configuration is correct.
- Input a Chinese question and specify a query for English literature, check whether English literature data in the knowledge base can be retrieved, and confirm that the cross-language retrieval configuration takes effect.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
