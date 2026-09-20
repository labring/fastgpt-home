---
title: Citation Source and Traceability for Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c047-f009
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Citation Source and Traceability for Intelligent Due
meta_description: The data sources for intelligent due diligence reports primarily include internal credit approval systems, public credit reporting submission files
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Source and Traceability for Intelligent Due Diligence Reports
## What the Data for This Category Looks Like
The data sources for intelligent due diligence reports primarily include internal credit approval systems, public credit reporting submission files, regulatory agency notifications, listed companies' public financial reports, and internal compliance audit archives. The update rhythm of data varies by type: credit data is updated in real time or T+1 as business occurs, financial report data is updated on a fixed schedule quarterly and annually, and regulatory notification data is updated irregularly per regulatory requirements. Document structures include structured tables (such as credit limit detail sheets, overdue ledgers), semi-structured PDFs (such as regulatory rating reports), and plain text compliance documents. For fields and units, core fields include customer unified social credit code, credit balance (unit: ten thousand yuan), overdue days (unit: days), and regulatory rating (with fixed values such as A, B, C). Some fields require linking multiple documents to fully trace their origin.

## Constraints on Citation Source and Traceability From These Characteristics
Decentralized multi-source data requires the traceability system to support cross-system and cross-document association matching, to avoid limitations of single data sources. Data with different update frequencies requires configured incremental sync and full update switching logic, to ensure cited content is the latest version. Mixed structured and semi-structured document types require the parsing link to distinguish field extraction rules: automatically bind fields and units for structured data, and retain citation markers from the original text layout for semi-structured data. Strict compliance requirements mean traceability information must include file name, extracted field, field value, and unique identifier at the same time; missing information in any link will affect compliance. In addition, the large volume of historical due diligence data requires the traceability system to support quick location of associated documents, to avoid query timeouts.

## Configuration Settings
| Configuration Item | Recommended Setting | Rationale |
| --- | --- | --- |
| `recall_top_k` | Top 10 entries | The volume of due diligence data is large, so enough candidate documents must be recalled to cover multi-dimensional questions in due diligence scenarios |
| `rerank_top_n` | Top 3 entries | Precise matching of core fields of due diligence questions is required; excessive recall will lead to redundant traceability information, which meets the conciseness required by regulatory requirements |
| `cite_source_type` | `file+metadata+field` | Citation information must display the referenced file name, associated metadata, and extracted specific fields and units, to meet compliance traceability requirements |
| `parse_structured_field` | Enabled | Structured credit and overdue ledgers require accurate extraction of fields and their corresponding units, to avoid missing unit information in traceability content |
| `api_return_cite` | Enabled | Complete citation IDs and details must be returned via the interface, to adapt to the traceability display requirements of tool calls in workflows |
| `cite_format` | `[{{index}}] {{filename}} ({{field}}: {{value}} {{unit}})` | Display traceability information in the format required by regulations, clearly mark fields and units to avoid ambiguity |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material format, data volume, and business rules. Specific issues require specific analysis, and it is recommended to test on your own samples before finalizing settings.

## Three Common Misconfigurations
- Symptom: After a workflow tool calls a knowledge base, no citation sources are displayed in the output content. Cause: The `api_return_cite` configuration is not enabled, and the tool node does not check the return citation parameter, resulting in the interface not returning citation fields.
- Symptom: When outputting in an AI chat, the end of a sentence has abnormally formatted citation markers, which automatically convert to normal quotation marks afterward. Cause: Special characters in the `cite_format` configuration are not properly escaped, or field extraction errors occur when parsing semi-structured documents, leading to format errors during citation splicing.
- Symptom: When querying a due diligence question that does not exist in the knowledge base, citation content from historical documents is still returned. Cause: The `recall_threshold` setting is too low, and the logic to clear citations when no matching content is found is not enabled, so the system still returns default recalled historical documents.

## How to Confirm Proper Configuration
- Send a test request with a clear field query, check if the `citations` field returned by the interface includes file names, extracted fields, field values, and corresponding units.
- Manually upload a structured due diligence document, trigger a parsing task, and check if the extracted fields are correctly labeled with units, with no missing or incorrect information.
- Send a test query for content that does not match the knowledge base, check if the `citations` field returned by the interface is empty, or if no citation content is generated in the workflow.
- Check the configuration of the workflow's tool call node, confirm that the return citation parameter is checked, and that the `cite_format` configuration has no syntax errors.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
