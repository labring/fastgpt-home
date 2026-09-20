---
title: Citation Sources and Traceability for Feed Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c155-f009
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Citation Sources and Traceability for Feed Intelligent Due
meta_description: Feed-related due diligence data sources include upstream supplier qualification documents, raw material batch test reports, breeding farm feeding
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Sources and Traceability for Feed Intelligent Due Diligence Reports

## What the Data for This Category Looks Like
Feed-related due diligence data sources include upstream supplier qualification documents, raw material batch test reports, breeding farm feeding logs, and industry regulatory inspection records. Data update cadence changes with business nodes: raw material test reports update with production batches, supply chain ledgers sync with procurement actions, and public industry data updates monthly. Each document typically includes fields such as raw material identifier, traceability batch number, test time, supplier information, and nutrient content values. Nutrient content values use units of grams per kilogram (g/kg) and milligrams per kilogram (mg/kg). Some documents include structured records of raw material origin and transportation routes.

## What Constraints These Characteristics Impose on the Citation Sources and Traceability Link
Feed category data sources are scattered, covering multiple entities such as suppliers, testing institutions, and breeding operators. Traceability links must associate corresponding relationships across multi-source documents, to avoid incomplete traceability caused by only recalling single fragments. Data update cadences vary significantly. Batch-level test reports and monthly industry data must be marked with timestamps per business nodes, to prevent cross-cycle data confusion. Some fields have unit differences, so unified conversion rules are required. Otherwise, numerical unit mismatches will occur during citation. Each document contains multi-dimensional structured information. Traceability must bind batch numbers, and avoid generic keywords, to ensure recalled content fully matches target due diligence items.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| Retrieval Count | `top 8–12 entries` | Feed due diligence data is often associated with multiple batch information. Too many retrievals will increase traceability screening costs, while too few will fail to cover all associated slices |
| Similarity Threshold | `0.75–0.85` | Fields such as feed batch numbers and test dates have strong identifying features. A threshold that is too high will miss accurately matched traceability fragments, while a threshold that is too low will introduce irrelevant batch data |
| `PARSE_FILE_TIMEOUT_SECONDS` | `300 seconds` | Feed test reports often contain multi-page structured tables, and parsing time is longer than general documents. Default timeout settings will easily cause parsing failures |
| Chunk Length | `800–1200 characters` | Feed due diligence documents include short fields and long text test content. Chunks that are too long will lose field association relationships, while chunks that are too short will split too many slices and increase matching difficulty |
| Reranked Return Count | `top 5–7 entries` | The most relevant traceability fragments for the current due diligence item must be returned first, to avoid non-core data interfering with citation display |
| `UPLOAD_FILE_MAX_SIZE` | `200 MB` | Individual feed test reports or supply chain ledger files are large in size. Too small a limit will prevent complete traceability documents from being uploaded |

## Three Common Configuration Mistakes
- Phenomenon: The terminal returned answer does not display the citation source module, and there is no traceability annotation for the corresponding fragment. Cause: The global switch for knowledge base citation display is not enabled, or the `SHOW_REFERENCE` parameter is not configured to the enabled state.
- Phenomenon: A string of red numeric error codes is returned when calling the interface, or a red error pop-up appears on the interface. Cause: The data source association rules are not configured correctly, or the `RECALL_SCORE_THRESHOLD` value exceeds the threshold interval supported by the model, resulting in abnormal recall result format.
- Phenomenon: The cited traceability fragment cannot match the complete batch information of the original document, only scattered nutrient value fragments are displayed. Cause: The chunk length is set unreasonably, causing key identification fields such as batch numbers and test dates in the original document to be split into multiple independent slices, and a complete traceability link cannot be formed.

## How to Confirm the Configuration Is Correct
- Access the knowledge base management interface, view uploaded feed-related document slices, and confirm that key identification fields (such as batch numbers, test dates) are not overly split.
- Initiate a test query for feed raw material batches, verify whether the answer displays citation source annotations, and whether the annotations can jump to the corresponding document slice.
- Call the test interface, check whether the returned result includes structured fields related to traceability, and whether the field content matches the original document.
- After adjusting a single configuration item, compare the correlation and completeness of recall results before and after, to confirm that the configuration value meets category requirements.

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require specific analysis, and it is recommended to test on your own samples before finalizing settings.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
