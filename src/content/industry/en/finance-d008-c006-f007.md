---
title: Workflow Orchestration for Traditional Chinese Medicine Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c006-f007
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Workflow Orchestration for Traditional Chinese Medicine
meta_description: Traditional Chinese medicine due diligence report data sources include the Chinese Pharmacopoeia, local processing specifications, batch inspection
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Workflow Orchestration for Traditional Chinese Medicine Intelligent Due Diligence Reports

## What the Data for This Category Looks Like
Traditional Chinese medicine due diligence report data sources include the Chinese Pharmacopoeia, local processing specifications, batch inspection reports, planting traceability archives, and more. Update rhythms vary significantly: the Chinese Pharmacopoeia is officially revised every five years, local processing specifications are adjusted per regional regulatory requirements, and batch inspection reports and traceability archives are updated in real time with production batches. Document structures include structured fields such as product name, batch number, and content determination value, as well as unstructured text such as property descriptions and processing methods. Field units use professional measurement standards including mg/g, g/kg, mm, and the length of individual documents varies widely.

## Constraints Imposed on Workflow Orchestration by These Characteristics
The multi-source nature and format differences of traditional Chinese medicine data sources require workflows to be configured with multi-source data access nodes to achieve unified parsing of structured inspection data and unstructured pharmacopoeia text. The professional nature of field units requires workflows to include built-in unit verification and normalization nodes to avoid data analysis deviations caused by unit mismatches. Differences in update rhythms require workflows to support a combined mode of scheduled full synchronization and manual incremental triggering to adapt to the update frequencies of different data sources. The wide variation in document length requires workflows to be configured with flexible segmentation rules to balance the integrity of long-text parsing and context token limits.

## How to Set Configurations

| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| Segment Length | `800–1200 characters` | Traditional Chinese medicine due diligence reports include long-text property descriptions and content determination data. Excessively long segments will destroy semantic coherence, while excessively short segments will lead to fragmented context |
| Knowledge Base Retrieval Count | `Top 8–12 entries` | Traditional Chinese medicine data sources include multiple categories such as pharmacopoeia, inspection reports, and traceability data. Too many retrievals will trigger token limit exceedance, while too few will miss key identification information |
| Similarity Threshold | `0.75–0.85` | Semantic similarity of traditional Chinese medicine professional terms is relatively high. A threshold that is too low will introduce irrelevant data, while a threshold that is too high will miss valid information for different batches of the same category |
| `PARSE_FILE_TIMEOUT_SECONDS` | `300 seconds` | Parsing a single batch of traditional Chinese medicine inspection reports or traceability archives takes a long time. Timeouts will cause workflow node interruptions |
| Citation Limit | `1000–1500 characters` | Traditional Chinese medicine due diligence reports need to integrate multi-source fields. An excessively low citation limit will lose complete content determination or processing specification data |
| Workflow Trigger Method | `Scheduled trigger + manual trigger` | Pharmacopoeia data has a fixed update cycle, while batch reports are updated with production rhythm. This needs to balance automatic incremental synchronization and temporary manual due diligence requirements |

> The parameter values provided on this page are common recommendations used to set the starting point for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require specific analysis, and it is recommended to test on your own samples before finalizing the settings.

## Three Common Mistakes
- Phenomenon: When configuring a workflow within a single Bot, only a single top-level workflow can be called, and multiple independent workflows cannot be added directly. Cause: The "sub-workflow call" node is not used, and the workflow nesting permission is not enabled, making it impossible to realize multi-workflow combination.
- Phenomenon: After importing a workflow JSON shared by others, the text processing module cannot be found in the local canvas. Cause: The local FastGPT version is lower than v1.12.0. The text processing module was included in the official default workflow node library only after this version.
- Phenomenon: After setting the `citation_limit` to 2000, the generated due diligence report still triggers a token limit exceedance prompt. Cause: The `segment_length` parameter is not adjusted in combination with the average text length of traditional Chinese medicine data sources, and the excessively long single segment leads to cumulative tokens exceeding the model limit.

## How to Confirm the Configuration Is Complete
- Execute a single test workflow, check whether the returned due diligence report includes all configured data source fields, and confirm that there are no missing field mappings.
- Adjust the `similarity_threshold` and `knowledge_base_retrieval_count` parameters, execute multiple batches of tests, and confirm that the retrieval results cover the three core data source categories of pharmacopoeia, inspection reports, and traceability data.
- Upload the longest single traditional Chinese medicine due diligence document, check whether the workflow execution duration is within the range set by `PARSE_FILE_TIMEOUT_SECONDS`, and there are no timeout errors.
- Export the workflow JSON file, check whether the text processing node and sub-workflow call node have been correctly configured, and there are no missing node configurations.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
