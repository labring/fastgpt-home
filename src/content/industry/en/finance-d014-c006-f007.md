---
title: Workflow Orchestration for Traditional Chinese Medicine Financial Report Analysis
slug: /en/industry/finance-d014-c006-f007
page_type: Industry scenario page
article_section: Financial Statement Analysis and Reporting
is_part_of: FastGPT Tech Center
meta_title: Workflow Orchestration for Traditional Chinese Medicine
meta_description: Publicly traded companies in the traditional Chinese medicine (TCM) industry release their financial report data primarily via the official disclosure
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Workflow Orchestration for Traditional Chinese Medicine Financial Report Analysis

## What the Data for This Category Looks Like
Publicly traded companies in the traditional Chinese medicine (TCM) industry release their financial report data primarily via the official disclosure platforms of the Shanghai Stock Exchange and Shenzhen Stock Exchange, as well as industry monitoring data published by TCM industry associations.
Quarterly reports are disclosed within 15 working days after the end of each quarter. Annual reports are disclosed within four months after the end of each fiscal year.
Document structures include consolidated financial statement main tables, financial statement notes, management's discussion and analysis, and other sections. The management's discussion and analysis section details exclusive business data such as Chinese medicinal material procurement, decoction piece production, and R&D investment.
Core financial indicators are denominated in Renminbi yuan. Business indicators related to Chinese medicinal materials use physical units such as tons and kilograms. Some segmented indicators include proportional data such as the cost proportion of single Chinese medicinal materials.

## Constraints on Workflow Orchestration From These Characteristics
Since disclosure times are fixed and split into quarterly and annual cycles, set the scheduled trigger node of the workflow to start after the corresponding disclosure window. This avoids crawling invalid data during non-disclosure periods.
Since both financial and physical units are mixed, configure field type validation rules for data parsing nodes. This prevents unit conversion errors.
Since exclusive TCM business data is scattered across notes and management's discussion sections, configure the document segmentation node to prioritize extracting business paragraphs from these sections. Do not limit extraction to only financial main table content.
Since formatting may change slightly across different reporting periods, configure workflow nodes to support dynamic field matching. Do not use hard-coded fixed field names.

## Configuration Recommendations
| Configuration Item | Recommended Value | Rationale |
|---|---|---|
| `PARSE_FILE_TIMEOUT_SECONDS` | `900 seconds` | The notes section of TCM financial reports is lengthy, so full parsing requires more time to avoid interrupting the parsing process due to timeout |
| `Segment Length` | `1000–1500 characters` | Professional paragraphs in the management's discussion and analysis section of TCM financial reports are long. Too-short segments will break business logic connections |
| `Model ID` | Domain-adapted pharmaceutical finance fine-tuned model version matched to the business scenario | TCM financial reports involve professional terms such as Chinese medicinal materials and decoction piece production, so a domain-adapted model version is required |
| `TOOL_CALL_VALIDATE_MODE` | `Strict Mode` | TCM financial reports have many fields and mixed units. Strict validation reduces invalid JSON output and avoids errors such as `Invalid JSON: Bad control character` |
| `RECALL_CHUNK_NUM` | `Top 8 chunks` | Business-related data in TCM financial reports is scattered across multiple paragraphs. Sufficient recalled chunks can cover core business information |
| `FILE_PARSE_EXTRACT_MODE` | `Extract by Paragraph` | Exclusive TCM business data is distributed by paragraph. Extracting by paragraph preserves context connections |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require case-by-case analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Configuration Mistakes
- Symptom: The tool call node outputs the error `Invalid JSON: Bad control character`. Cause: Strict mode for `TOOL_CALL_VALIDATE_MODE` is not enabled, leading to failure to correctly escape rare characters and special unit symbols in TCM financial reports.
- Symptom: Connection lines cannot be added to the workflow, and no connection circles appear on the right side of nodes. Cause: The currently edited node configuration has not been saved. The system automatically hides connection ports for unsaved nodes.
- Symptom: Copied workflow components cannot be pasted into other workflows. Cause: The confirmation operation for component copying was not completed in the source workflow, or the editing state of the target workflow was not switched when pasting.

## How to Verify Proper Configuration
- Upload a test TCM financial report PDF, run the workflow, and check if the parsed fields include exclusive business fields such as Chinese medicinal material procurement costs and decoction piece production capacity, and if field units match expectations.
- Trigger the tool call node, check if the output JSON format meets preset field requirements, and there are no control character-related errors.
- Copy a single workflow node, try pasting it into a new blank workflow, and confirm that the copy-paste function works correctly.
- View the connection ports of each node in the workflow, confirm that all saved nodes display connection circles, and that connection lines can be added normally.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
