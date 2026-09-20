---
title: Multi-turn Dialogue and Prompting for Refining Financial Report Analysis
slug: /en/industry/finance-d014-c094-f005
page_type: Industry scenario page
article_section: Financial Statement Analysis and Reporting
is_part_of: FastGPT Tech Center
meta_title: Multi-turn Dialogue and Prompting for Refining Financial
meta_description: Refining sector financial report data is sourced primarily from annual and quarterly regulatory filings publicly disclosed by domestic and overseas
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Multi-turn Dialogue and Prompting for Refining Financial Report Analysis

## What Refining Sector Financial Report Data Looks Like
Refining sector financial report data is sourced primarily from annual and quarterly regulatory filings publicly disclosed by domestic and overseas listed companies, plus monthly operational monitoring data published by industry self-regulatory organizations. Data updates follow quarterly and annual core cycles, with monthly supplementary updates issued as needed. Document structures include fields such as crude oil processing volume, refined oil output share, chemical product revenue share, unit processing cost, and capacity utilization rate. Common units include tons, yuan per ton, and 100 million yuan, standard across industrial and financial reporting. A complete single financial report document includes multi-dimensional cross-referenced business and financial data.

## Constraints for Multi-turn Dialogue and Prompting
The multi-source data structure and long-document format of refining financial reports require multi-turn dialogue to maintain consistent data standards across conversation turns. This prevents deviations caused by lost context.
Multi-dimensional combinations of industrial and financial fields require prompts to clearly specify data statistical scope, such as consolidated statements or parent company-only data.
Long document lengths introduce contextual redundancy. Effective recalled document fragments must be limited to only refining sector data relevant to the current conversation topic.
Data sources with varying update cycles require the dialogue workflow to support parameter configuration for filtering data by quarter or month. This ensures returned data time ranges match user query needs.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `maxContext` | `8000–12000 characters` | Single refining financial report document fragments are lengthy, so sufficient context must be retained to support consistent data standards across multi-turn dialogue |
| `recallTopK` | `Top 6–8 results` | Refining data has many fields, so enough relevant fragments must be recalled to cover cross-referenced business and financial dimensions |
| `similarityThreshold` | `0.75–0.85` | Balance recall precision and coverage, to avoid mixing in irrelevant non-refining sector data |
| `PARSE_FILE_TIMEOUT_SECONDS` | `300 seconds` | Parsing long financial report documents takes significant time, preventing dialogue workflow interruptions from timeouts |
| `promptTemplate` | `Organize data according to refining financial report standards, retain units and statistical scope` | Clearly specify industrial and financial units for fields, align with user industry query requirements |
| `sessionHistoryMaxLength` | `First 10 conversation turns` | Control contextual redundancy in multi-turn dialogue, retaining only key data standards and related questions |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material format, data volume, and business rules. Specific issues require individual analysis, and it is recommended to test on your own samples before finalizing settings.

## Three Common Mistakes
- Symptom: A `408 Request Timeout` error code is returned when calling the dialogue interface, and workflow execution interrupts after the knowledge base search step. Cause: `PARSE_FILE_TIMEOUT_SECONDS` is not configured to a duration suitable for parsing long financial reports, causing document parsing to fail to complete before a timeout is triggered.
- Symptom: Returned refining data uses inconsistent units, including tons and kilograms, yuan and 10,000 yuan simultaneously. Cause: The prompt template does not clearly specify standard units and statistical scope for fields, causing the AI to mix unit data from different standards.
- Symptom: No built-in like interaction component is present in the dialogue interface, preventing official like feedback from being triggered. Cause: Official dialogue interfaces in v4.8.10 and earlier versions do not include built-in like functionality. This interaction must be implemented independently using dialogue event callbacks.

## How to Confirm Configuration is Correct
- Upload a complete refining financial report document to trigger knowledge base parsing, check that the timeout time of the parsing task matches the configured `PARSE_FILE_TIMEOUT_SECONDS` value.
- Initiate a multi-turn dialogue: first ask about total refining revenue for a specific quarter, then follow up with a question about refined oil gross margin for the corresponding segment, verify that the AI retains the previously specified quarter data standards.
- Test dialogue interaction, confirm that the like function can be implemented using interface events, or check that the corresponding component has been loaded in the interface.
- Review conversation log storage configuration, confirm that the session history retention rules meet business requirements, with no abnormal automatic deletion settings.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
