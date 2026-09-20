---
title: Knowledge Base Retrieval and Recall for Cosmetic Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c030-f013
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Knowledge Base Retrieval and Recall for Cosmetic Intelligent
meta_description: The data required for cosmetic intelligent due diligence reports comes from four main sources: brand filing documents, COA/COF test reports from raw
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Knowledge Base Retrieval and Recall for Cosmetic Intelligent Due Diligence Reports

## What the data for this category looks like
The data required for cosmetic intelligent due diligence reports comes from four main sources: brand filing documents, COA/COF test reports from raw material suppliers, third-party compliance databases, and product manuals. This data supports financial institutions’ due diligence needs for cosmetic enterprises.

Filing documents include product names, filing numbers, production enterprise details, full ingredient lists (with INCI names and content ranges), and safety assessment conclusions. Test reports include raw material batch numbers, physicochemical indicators, test dates, and test results.

Data updates trigger when newly launched products complete filing. Raw material compliance terms adjust alongside regulatory updates. Product manuals update when formulas are revised.

Document structures vary widely. Ingredient lists may only be a few lines long, while safety assessment reports can span dozens of pages. Fields include Chinese and English names, content units (% and mg/kg), sensitization levels, and other professional details.

## Constraints on knowledge base retrieval and recall
These characteristics create clear constraints for the knowledge base retrieval and recall process in financial due diligence scenarios.

Cosmetic data has dense professional terminology and strict compliance requirements. Retrieval and recall must prioritize precise terminology and compliance-related content to avoid due diligence information bias from vague recall.

Ingredient content is listed as a range, so interval matching must be supported instead of exact value matching. Exact matching would miss valid compliance information.

When multiple data sources are present, weights must be assigned to different sources such as filing documents and test reports. This ensures core compliance data is recalled first.

Coexisting long and short documents require a chunking strategy that balances contextual integrity and retrieval accuracy. Splitting must not break the logical connection between ingredients and compliance terms.

Data update frequency changes dynamically with regulations and product launches. An incremental synchronization mechanism must be used to avoid resource costs and delays from full updates, and to keep due diligence data timely.

## How to set configurations
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `recall_top_k` | Top 10–15 results | Cosmetic data contains numerous similar documents within the same category. A sufficient initial recall pool must be established before reranking to filter core content, preventing missed key compliance or ingredient information |
| `similarity_threshold` | 0.75–0.85 | Cosmetic ingredients and compliance terms are highly specialized. A higher threshold filters low-match irrelevant documents, ensuring recalled content is highly relevant to the query |
| `chunk_size` | 800–1200 characters | Cosmetic safety assessment reports contain long paragraphs. Chunk length is adjusted to fit the contextual connections of professional text, avoiding splitting that breaks logical links between ingredients and compliance terms |
| `PARSE_FILE_TIMEOUT_SECONDS` | 600 seconds | Some safety assessment report files have large file sizes and long parsing times. Extending the timeout prevents parsing failures for large documents |
| `rerank_top_n` | Top 5–8 results | Reranking retains core compliance and ingredient information, adapts to model input length limits, and covers key decision points required for intelligent due diligence |
| `UPLOAD_FILE_MAX_SIZE` | 1000 MB | Supports bulk import of large safety assessment reports and batch test documents, adapting to enterprise needs for importing full filing datasets |

> The parameter values provided on this page are common starting points for configuration setup. Actual values are affected by material format, data volume, and business rules. Each scenario requires individual analysis. It is recommended to test on your own samples before finalizing values.

## Three common errors
- Scenario: After calling the API to connect Confluence for data synchronization, the knowledge base does not update the corresponding cosmetic filing document content. Cause: No incremental synchronization trigger rule is configured for Confluence. Only full synchronization is performed, and file update timestamps are not verified. This results in duplicate or outdated data not being updated correctly.
- Scenario: The intelligent agent does not reference cosmetic compliance content from the knowledge base, instead generating irrelevant information. Cause: The `similarity_threshold` is set too low. A large number of low-match non-target documents are recalled, interfering with the model’s generation of compliance-aligned due diligence content.
- Scenario: Knowledge base responses are truncated, only outputting partial due diligence content. Cause: The `maxContext` parameter is set too small. It cannot accommodate all valid recalled document content, exceeding the model’s input length limit.

## How to confirm correct configuration
- Upload a single cosmetic filing document, review the parsed chunked content to confirm that ingredient lists and corresponding content information are not split apart.
- Enter a query containing a specific INCI name, verify that the similarity scores of the recalled results fall within the preset 0.75–0.85 range.
- Initiate a query containing cosmetic compliance terms, confirm that the top 5–8 reranked results include core compliance-related documents.
- Upload a single large safety assessment report, confirm that the parsing task does not trigger a timeout error and that all chunked content is fully generated.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
