---
title: Citation Source and Traceability for Water Treatment Research Reports
slug: /en/industry/finance-d009-c084-f009
page_type: Industry scenario page
article_section: Research Report Search and Q&A
is_part_of: FastGPT Tech Center
meta_title: Citation Source and Traceability for Water Treatment
meta_description: Data sources for water treatment research reports mainly include public industry research reports from the environmental protection sector, project
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Source and Traceability for Water Treatment Research Reports

## What the Data for This Category Looks Like
Data sources for water treatment research reports mainly include public industry research reports from the environmental protection sector, project documents from water utility operators, operation logs of water treatment facilities, and national and local environmental compliance standard documents. Update cycles are divided into quarterly updated industry trend reports, monthly updated project operation data, and irregularly updated compliance policy documents. Document structures typically include basic project information, water quality indicator parameters, treatment processes, cost accounting and compliance reports. Fields include water quality indicators such as COD and ammonia nitrogen (unit: mg/L), treatment scale (unit: m³/d), publishing organization, publishing date, project location, and more.

## Constraints Imposed by These Characteristics on Citation Source and Traceability
Water treatment research reports have strict requirements for professional parameters and units. When conducting citation and traceability, it is necessary to accurately match specific indicators and process descriptions in fragments, to avoid data deviation caused by vague citations. Documents with different update frequencies must be distinguished by their historical versions; for example, monthly operation data reports need to mark the update time to prevent citing expired project parameters. Documents contain a large number of tables and continuous paragraphs, so traceability must locate specific chapters and page numbers, rather than only using file names as the positioning target, to ensure compliance and accuracy. In addition, some research reports involve internal enterprise project data, which must be strictly associated with the originally uploaded document source to avoid confusion of parameter information across different projects.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `dataset_search_top_k` | `Top 8-12 results` | Water treatment research reports are dense with professional terminology and parameters, requiring sufficient recall coverage of relevant fragments to avoid missing key process or indicator data |
| `rerank_top_n` | `Top 3-5 results` | Retain the most relevant sources after reranking, filter redundant non-core fragments, and ensure the cited content highly matches the retrieval requirements |
| `reference_chunk_length` | `800-1200 characters` | Process descriptions and indicator data in water treatment research reports are usually continuous paragraphs; this length avoids splitting parameter context while reducing irrelevant content |
| `parse_file_timeout_seconds` | `300 seconds` | Large water treatment research reports contain multi-page tables and process drawing analyses, requiring sufficient time for text splitting and metadata extraction |
| `enable_reference_citation` | `Enabled` | The water treatment industry has strict compliance requirements, requiring clear marking of sources for parameters and processes to avoid compliance risks |
| `reference_display_mode` | `Associate fragments to documents` | A single document may contain multiple relevant fragments; it is necessary to associate with specific chapters, not just file names, to improve traceability accuracy |

> The parameter values provided on this page are common recommended starting points for configuration setup. Actual values are affected by material format, data volume and business rules. Specific issues require individual analysis, and it is recommended to test on your own samples before finalizing settings.

## Three Common Errors
- Issue: When calling the API with the `detail: true` parameter, the returned citation metadata does not correspond to the fragments in the streaming output. Cause: The `reference_source_mode` parameter was not specified as `full` in the call parameters, resulting in the returned citation information not being bound to the specific fragments in the streaming output.
- Issue: The citation files returned by the knowledge base do not match the actually retrieved sources. Cause: No reasonable `rerank_top_n` value was set, causing the reranking logic to overwrite the correctly retrieved sources from the initial recall, or the `reference_validate` parameter was not enabled to validate source validity.
- Issue: In FastGPT 4.9.4, citation content is still returned even when the `enable_reference_citation` configuration is disabled. Cause: There is a default configuration override issue in this version; you must manually reset the default values of citation-related parameters in the system settings.

## How to Confirm the Configuration Is Correct
- Initiate a test retrieval, check if the returned results include the `reference` field, and the field contains metadata such as document name, fragment content, page number, etc.
- Extract the citation fragments from the returned results, compare them with the originally uploaded water treatment research reports, and confirm that the fragment content fully matches the process parameters and indicator data in the reports.
- Adjust the values of `dataset_search_top_k` and `rerank_top_n`, observe changes in the number of returned citations, and confirm that the configuration parameters have taken effect.
- Call the API with the `detail: true` parameter, check if the streaming output content corresponds one-to-one with the citation information in the metadata.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
