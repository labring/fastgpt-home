---
title: Knowledge Base Retrieval and Recall for Chemical Raw Material Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c032-f013
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Knowledge Base Retrieval and Recall for Chemical Raw
meta_description: Chemical raw material-related data is mainly sourced from public reports of industry associations, quality inspection reports of production
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Knowledge Base Retrieval and Recall for Chemical Raw Material Intelligent Due Diligence Reports

## What Data Looks Like for This Category
Chemical raw material-related data is mainly sourced from public reports of industry associations, quality inspection reports of production enterprises, Material Safety Data Sheets (MSDS), customs import and export statistics, and national and industry standard documents. The update rhythm varies by source: national and industry standards are revised annually or quarterly, MSDS is updated synchronously with changes in raw material formulas or safety standards, enterprise quality inspection reports are updated per production batch, and industry reports are released monthly or quarterly. Document structures include two parts: standardized fields and free text. Standardized fields include raw material name, CAS number, molecular formula, purity, density, melting point, boiling point, packaging specification, origin, etc. Units are mostly %, g/cm³, ℃, yuan/ton, and similar units.

## Constraints Imposed on Knowledge Base Retrieval and Recall
Data sources from different origins have varying levels of credibility. It is necessary to distinguish between public authoritative data sources and internal private enterprise data during retrieval to avoid introducing low-quality or outdated information. The mixed document structure requires the retrieval system to support both exact matching of structured fields and semantic retrieval of semi-structured/free text; a single retrieval method cannot cover all requirements. The specific units of standardized fields require matching unit information during retrieval to avoid confusing similar data with different units. The CAS number, as a unique identifier, can be used to accurately recall all information for a specific raw material, reducing ambiguity in semantic retrieval. Regularly updated data sources require the knowledge base to be configured with an automatic synchronization mechanism to ensure the timeliness of retrieval results.

## Configuration Parameters
| Configuration Parameter | Recommended Setting | Rationale |
| --- | --- | --- |
| `chunk_size` | 800–1200 characters | Chemical raw material documents are mostly a mix of structured and semi-structured content. This length covers complete single-component information or full row groups of a single table, avoiding splitting that disrupts field relevance |
| `similarity_threshold` | 0.72–0.85 | Chemical raw material professional terminology has high discernibility. This threshold filters low-relevance data while retaining similar but compliant raw material information |
| `recall_top_k` | Top 10 entries | Due diligence reports need to cover multiple dimensions including raw material safety, quality, supply chain, etc. 10 entries provide sufficient contextual material |
| `rerank_top_n` | Top 3 entries | Reranking filters semantically similar but irrelevant recall results. 3 entries ensure the accuracy of core information for due diligence reports |
| `parse_file_timeout_seconds` | 300 seconds | Long documents such as MSDS require sufficient parsing time to avoid timeout truncation of critical safety and quality information |
| `rag_prompt_template` | Based on the {doc_type} from {source}, extract the {value} for the {field} field | Chemical raw material retrieval requires accurate matching of specific fields. This template guides the model to extract target information, improving the specificity of retrieval results |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require specific analysis; it is recommended to test on your own samples before finalizing settings.

## Three Common Mistakes
- Phenomenon: When using the `bge-m3` embedding model, semantic retrieval similarity scores are generally higher than 0.9. Cause: No separate weight configuration is applied for chemical raw material professional terminology such as CAS number and molecular formula, leading to excessive overlap of terminology vector spaces, which amplifies semantic similarity calculation results.
- Phenomenon: Images in MSDS documents stored in the knowledge base cannot be displayed properly, only blank placeholders are shown. Cause: The image storage domain name was not added to the knowledge base's accessible whitelist, resulting in failure to load image resources during retrieval.
- Phenomenon: The number of returned results after retrieval far exceeds the preset value. Cause: The `similarity_threshold` parameter is not configured, or the threshold is set below 0.6, leading to the recall of a large number of low-relevance non-target chemical raw material data.

## How to Verify Correct Configuration
- Upload one standard MSDS document, check that the parsed text blocks retain the complete 16-item structure with no obvious truncation or splitting errors.
- Enter a query containing a specific CAS number, verify that the retrieval results preferentially return documents containing that CAS number, and that the similarity scores fall within the preset range.
- Enable log tracking, check the number of vector retrieval returns and the number of reranked outputs to confirm they match the configured `recall_top_k` and `rerank_top_n` parameters.
- Upload a document containing embedded images, check that images in the retrieval results load normally with no placeholders or loading failure prompts.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
