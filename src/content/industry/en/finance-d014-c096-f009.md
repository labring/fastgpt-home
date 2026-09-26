---
title: Citation Source and Traceability for Coke Financial Report Analysis
slug: /en/industry/finance-d014-c096-f009
page_type: Industry scenario page
article_section: Financial Statement Analysis and Reporting
is_part_of: FastGPT Tech Center
meta_title: Citation Source and Traceability for Coke Financial Report
meta_description: Public sources for coke-related financial reports and industry data include monthly statistical briefings from the China Coke Industry Association
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Source and Traceability for Coke Financial Report Analysis

## What the data for this category looks like
Public sources for coke-related financial reports and industry data include monthly statistical briefings from the China Coke Industry Association, periodic reports of domestic and overseas listed companies, and import and export statistical data from the General Administration of Customs. There are two update frequency categories: industry monthly data is released 10 to 15 days after the end of the statistical period, and listed company financial reports are disclosed at fixed quarterly and annual nodes.

Document structures include structured tables and unstructured analysis text. Structured fields cover production area capacity, spot price, port inventory, and monthly import and export volume, with units of ten thousand tons, yuan/ton, ten thousand tons, and ten thousand tons respectively. Unstructured text includes content such as main business proportion and cost structure analysis, with percentage-based indicators as unit types.

## What constraints do these characteristics impose on the citation source and traceability link
The multi-source and heterogeneous nature of coke data requires the traceability system to support precise matching of both structured tables and unstructured text, to avoid confusing field information from different sources. Data sources with different update cycles need recall priority configured by scenario, for example, listed company financial report data takes priority over general industry briefings, to ensure the authority of analysis results.

The uniformity of field units requires marking the measurement standard during traceability, to prevent unit matching errors. Additionally, coke industry terminology is highly specialized, so recalled segments must retain complete semantics, to avoid logical disconnect between traceability content and answers due to improper segmentation.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `Recall count` | Top 8 entries | Coke financial report data includes both structured tables and unstructured paragraphs. Too many recalled entries will cause context redundancy, while too few will fail to cover complete analysis logic |
| `Similarity threshold` | 0.72–0.85 | Coke industry terminology is highly specialized, requiring a relatively high threshold to filter irrelevant content while retaining precise matching results for targeted sub-scenarios |
| `PARSE_FILE_TIMEOUT_SECONDS` | 900 seconds | Coke financial report files usually contain multi-page structured tables, which take longer to parse. Extending the timeout period avoids parsing failure |
| `Enable Source Traceability` | Enabled | Financial report analysis requires clear marking of data sources, which complies with general requirements for industry information disclosure |
| `Chunk size` | 1000–1200 characters | The main business detail paragraphs in coke financial reports are relatively long. Excessively long segments will lead to incomplete recalled fragments, while excessively short segments will destroy semantic coherence |
| `MAX_CONTEXT` | 6000 characters | Matches the multi-source characteristics of coke data, controlling the total context length to avoid exceeding the model's processing limit |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require specific analysis, and it is recommended to test on your own samples before finalizing.

## Three Common Mistakes
- Phenomenon: Retrieved knowledge base entries are unrelated to the generated answer, and traceability links point to incorrect document fragments. Cause: The similarity threshold is set too low, recalling general coal data unrelated to coke financial report analysis, or the segment length is configured improperly leading to semantic fragmentation of recalled segments.
- Phenomenon: Some nodes in the workflow forcibly display source original text, and reference content cannot be hidden as required. Cause: The `Enabled溯源展示` parameter under `工作流节点可见度` is not configured correctly, or the configuration scope is not limited to the specified nodes.
- Phenomenon: After importing coke financial report files into the knowledge base, some structured table data is not generated into independent question-answer pairs, and is directly stored as full original text. Cause: The `结构化表格自动拆分` configuration is not enabled, or parsing timeout causes table data to not be fully extracted.

## How to Confirm Configuration is Correct
- Upload a single coke industry monthly briefing file, initiate a targeted test query, and verify that the traceability link in the returned results points to the corresponding text fragment in the file.
- Enter the workflow node configuration interface, check the switch status of the `Enabled溯源展示` parameter, and confirm that it meets the visibility requirements of the specified nodes.
- Initiate a test query containing core coke business fields, verify that the semantics of the recalled results match the knowledge base content, and no unrelated content is mixed in.
- View the system parsing log to confirm that no timeout error is triggered during the file parsing process, and structured data is fully split.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
