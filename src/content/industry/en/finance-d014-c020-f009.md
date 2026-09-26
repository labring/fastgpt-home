---
title: Citation Source and Traceability for Ordnance and Equipment Financial Report Analysis
slug: /en/industry/finance-d014-c020-f009
page_type: Industry scenario page
article_section: Financial Statement Analysis and Reporting
is_part_of: FastGPT Tech Center
meta_title: Citation Source and Traceability for Ordnance and Equipment
meta_description: Ordnance and equipment industry financial report data primarily comes from publicly disclosed periodic reports and temporary announcements of the
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Source and Traceability for Ordnance and Equipment Financial Report Analysis

## What the data for this category looks like
Ordnance and equipment industry financial report data primarily comes from publicly disclosed periodic reports and temporary announcements of the Shanghai and Shenzhen Stock Exchanges and the Hong Kong Stock Exchange, plus public information released by industry regulatory authorities. Data updates follow the core rhythm of annual, semi-annual, and quarterly periodic reports, supplemented by temporary announcements such as major asset changes and equipment induction progress. Document structures include consolidated financial statements, notes to financial statements, and business operation status descriptions. Core fields include military order amounts, equipment induction quantities, national defense supporting business revenue, and more. Units mostly use ten thousand yuan, hundred million yuan, and physical measurement units such as units and sets.

## Constraints on citation source and traceability
The multi-type data sources and specialized field characteristics of ordnance and equipment financial reports impose multiple constraints on the traceability link. Mixed release of periodic reports and temporary announcements requires precise matching of announcement release times and disclosure channels during traceability, to avoid confusing financial report content from different periods. Military-specific fields such as equipment induction quantities have no universal financial report analysis standards. Exact wording from the original announcement must be retained, and generic templates cannot be used to convert field content. Temporary announcement update frequencies fluctuate widely. The recall scope must cover all relevant announcements from the past 12 months, to avoid missing citation sources for major business changes. Physical measurement units such as units and sets must be fully retained during traceability, and cannot be uniformly converted to monetary units, to ensure cited content matches the original text.

## How to configure
| Configuration Item | Recommended Value Range | Rationale |
| --- | --- | --- |
| `recall_top_k` | `Top 10–15 results` | Single ordnance and equipment financial report documents have high word counts. A sufficient number of retrieved segments is required to cover specialized fields and temporary announcement content, to avoid missing key information |
| `similarity_threshold` | `0.72–0.80` | Matching requirements for military-specific terminology are high. A threshold that is too low will introduce irrelevant financial report segments. A threshold that is too high will miss associated business announcements under the same category |
| `chunk_size` | `800–1200 characters` | Notes to financial statements and business description paragraphs are lengthy. Excessively large chunk sizes will lose contextual connections. Excessively small chunk sizes will split complete specialized field descriptions |
| `source_display_mode` | `Display full announcement path and release time` | Citations for ordnance and equipment financial reports must clearly specify disclosure channels and times, to comply with compliance requirements for industry information traceability |
| `rag_timeout` | `120 seconds` | Parsing a single financial report requires loading multiple sections of notes. An excessively long timeout setting will block workflows. An excessively short timeout will prevent uncompleted parsed documents from being retrieved |
| `filter_repeat_source` | `Enabled` | The same announcement may be parsed into different segments multiple times. Duplicate removal is required to retain only the latest version of the citation source |

> The parameter values provided on this page are standard recommended starting points for configuration. Actual values are affected by material format, data volume, and business rules. Individual analysis is required for specific scenarios. Testing on internal samples is recommended before finalizing settings.

## Three Common Misconfigurations
- Phenomenon: Unrelated ordnance and equipment financial report citation segments appear in dialogue responses, not associated with the current knowledge base. Cause: The `filter_unrelated_source` parameter is not enabled, or the `similarity_threshold` is set too low, causing content from non-target data sources to be retrieved.
- Phenomenon: Source annotations still appear in dialogues after citation display is disabled. Cause: `source_display_mode` was incorrectly set to `full path` instead of `hidden`, or service restart was not completed after configuration changes.
- Phenomenon: Non-financial report military industry news content cannot be filtered during hybrid retrieval. Cause: A dedicated `data_source_tag` was not set for financial report data sources, or tag filtering conditions were not added to retrieval rules.

## How to Confirm Correct Configuration
- Upload a single ordnance and equipment annual financial report, initiate a query that includes specialized fields, and verify that the citation sources in the returned results include the report's disclosure channel and release time.
- Adjust the `similarity_threshold` value, observe changes in the relevance of retrieved results, and confirm the value meets business requirements.
- After enabling the `filter_repeat_source` parameter, upload different parsed versions of the same financial report repeatedly, and verify that only the latest version is retained in the returned citations.
- Initiate a query that does not include ordnance and equipment financial report keywords, and confirm that irrelevant financial report citation segments are not returned.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
