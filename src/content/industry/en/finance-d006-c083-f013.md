---
title: Knowledge Base Retrieval and Recall for Water Industry Investment Research Knowledge Base Construction
slug: /en/industry/finance-d006-c083-f013
page_type: Industry scenario page
article_section: Research Knowledge Base Governance
is_part_of: FastGPT Tech Center
meta_title: Knowledge Base Retrieval and Recall for Water Industry
meta_description: Water industry investment research data sources include water utility group operation reports, real-time pipe network monitoring data, national and
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Knowledge Base Retrieval and Recall for Water Industry Investment Research Knowledge Base Construction

## What the data for this category looks like
Water industry investment research data sources include water utility group operation reports, real-time pipe network monitoring data, national and local water quality standard documents, urban water utility policies and regulations, industry research reports, and more. Update frequencies are split into three categories: real-time (pipe network pressure, water quality indicators), monthly/quarterly (operation reports), and irregular (policy updates). Document structures include structured numerical tables, semi-structured research report paragraphs, and PDF-format policy documents. Fields and units include water quality indicators in mg/L, pipe network pressure in MPa, flow rate in m³/h, as well as fields such as statistical cycle and region code.

## What Constraints These Characteristics Impose on Knowledge Base Retrieval and Recall
A high proportion of structured numerical data exists in water industry data. Retrieval must balance precise numerical matching and semantic association, and avoid relying solely on keyword matching.
Real-time monitoring data has a high update frequency. Incremental index updates must be configured instead of full reconstruction to reduce retrieval latency.
Documents mix short numerical entries and long policy paragraphs. Flexible segmentation rules must be adapted to avoid splitting professional term groups.
There are high requirements for unit and professional term standardization. Unit normalization and term expansion must be handled during retrieval, otherwise matching deviations will occur.
Investment research scenarios cover multi-dimensional data. Retrieval and recall must include policies, operation data and research report content, and avoid single-dimensional results.

## How to Configure Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `chunk_size` | `800–1200 characters` | Water industry documents include short numerical entries and long policy paragraphs. This range balances segmentation integrity and contextual association, and avoids splitting professional term groups |
| `similarity_threshold` | `0.75–0.85` | Water industry indicator numerical accuracy requirements are high. A threshold that is too low will introduce irrelevant monitoring data, while a threshold that is too high will miss semantically similar compliance requirements |
| `recall_top_k` | `Top 10 entries` | Water industry investment research needs to cover core policies, operation data and research report viewpoints. 10 entries can cover multi-dimensional retrieval results |
| `rerank_top_n` | `Top 3–5 entries` | Re-ranking must focus on the most relevant core data, and avoid redundant non-core entries interfering with investment research judgments |
| `PARSE_FILE_TIMEOUT_SECONDS` | `300 seconds` | Large water industry operation Excel files (including multi-sheet monitoring data) take a long time to parse. This duration covers the complete parsing process |
| `keyword_split_block` | `Retain complete professional term segments` | Avoid forcibly splitting paragraphs containing professional terms such as COD and total phosphorus, and adapt to the keyword generation rules of the fullTextTokens field |

> The parameter values provided on this page are all conventional recommendations used to determine the starting point for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require specific analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Misconfigurations
- Phenomenon: After adding a re-ranking model, the order of knowledge base retrieval results does not change. Cause: The enable switch for the re-ranking model is not turned on, or the call path configuration of the re-ranking model is incorrect. The system only executes the basic vector recall process.
- Phenomenon: After entering water industry professional data, the fullTextTokens field does not contain complete professional term groups. Cause: The `keyword_split_block` parameter is not configured, and paragraphs containing professional terms such as COD and ammonia nitrogen are forcibly split, resulting in incomplete keyword generation.
- Phenomenon: Retrieval speed is too slow, and computing resource usage exceeds expectations. Cause: The AI supplement link is not turned off, and the number of recall entries is set too high, which triggers a full model inference process for each retrieval.

## How to Confirm Successful Configuration
A water industry document containing professional terms and numerical data is uploaded. Parsed segmentation results are reviewed to confirm that long professional term segments are not forcibly split.
A retrieval related to water industry indicators is initiated. Sorting changes of returned results are checked to confirm that the re-ranking model has taken effect.
The fullTextTokens field in the dataset_datas table is reviewed to confirm that keywords of the target segment are not incorrectly split.
Retrieval parameters are adjusted. Retrieval speed and result quantity are compared to confirm that computing resource usage and recall range meet expectations.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
