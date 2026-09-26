---
title: Citation Sources and Traceability for Chemical Raw Material Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c032-f009
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Citation Sources and Traceability for Chemical Raw Material
meta_description: In chemical raw material intelligent due diligence scenarios for finance, insurance and wealth management, data sources include public reports from
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Sources and Traceability for Chemical Raw Material Intelligent Due Diligence Reports

## What This Category’s Data Looks Like
In chemical raw material intelligent due diligence scenarios for finance, insurance and wealth management, data sources include public reports from national chemical raw material quality testing platforms, archived customs clearance documents, and production capacity and transaction statistics documents released by industry associations.

Update frequency varies by data type: import and export clearance data is updated monthly, single batch test reports are archived as production batches are generated, and industry production capacity statistics are updated quarterly.

Each document typically includes four modules: basic information, batch details, test results, and transaction records. Core fields include CAS registry number, origin identifier, batch number, test parameter, transaction unit price, and supplier filing number. Their corresponding units are: no identifier (for CAS numbers), country/region code, batch number, quality parameter, yuan per ton, and filing number.

Document length varies significantly: some documents only contain a few lines of data for a single batch test, while others include full industry statistics spanning multiple years.

## What Constraints These Characteristics Impose on the "Citation Sources and Traceability" Link
The multi-source and dispersed nature of chemical raw material data requires the traceability system to support cross-platform field mapping. Different data sources use inconsistent field naming. For example, origin information may be labeled "origin place" or "country of origin". Unified association rules are needed to achieve accurate matching.

Batch numbers and CAS numbers are core association identifiers. Relying only on keyword matching can lead to incorrect cross-batch and cross-category associations. Core identifiers should be prioritized as the recall basis.

The wide variation in document length requires splitting rules to adapt to module integrity, avoiding splits that disrupt the association logic of test items and batch information.

Additionally, financial chemical raw material due diligence reports require association with multi-dimensional compliance data, such as multiple batch test results and import and export records for the same raw material. The traceability system must support multi-document associated citations to ensure due diligence content compliance and accuracy.

## How to Set Configurations
| Configuration Item | Recommended Approach | Rationale |
| --- | --- | --- |
| `Recall Field Matching Priority` | `CAS Number > Batch Number > Keywords` | Chemical raw material data uses CAS numbers and batches as core association identifiers; prioritizing matching reduces cross-batch false recalls |
| `Similarity Threshold` | `0.75–0.85` | Balances precision and recall coverage; avoids introducing irrelevant test data if the threshold is too low, and loses associated batch information if the threshold is too high |
| `Segment Length` | `800–1200 characters` | Adapts to the module length of chemical raw material reports, avoiding splitting that disrupts the integrity of test items and batch information |
| `Number of Reranked Returned Entries` | `Top 6` | Meets the multi-dimensional data requirements of due diligence reports while avoiding redundant non-core batch data in outputs |
| `UPLOAD_FILE_MAX_SIZE` | `500 MB` | Adapts to the upload requirements of single large-scale industry production capacity reports or batch test data |
| `PARSE_FILE_TIMEOUT_SECONDS` | `300 seconds` | Reserves sufficient parsing time for large multi-page test reports, avoiding mid-process timeout interruptions |

> The parameter values provided on this page are conventional starting points for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require case-by-case analysis, and testing on independent samples is recommended before finalizing settings.

## Three Common Mistakes
- Phenomenon: After adjusting the `similarity threshold` to the minimum and the recall upper limit to the maximum, the recalled content remains a fixed number. Cause: The `recall field matching priority` is not configured to prioritize core identifiers, so the system still uses global keyword matching, which is limited by the keyword distribution density of the data source.
- Phenomenon: When attempting to call the citation traceability module of a historical due diligence report, direct association with previously uploaded historical files is not possible. Cause: The configuration switch for `historical conversation associated data sources` is not enabled, and the system defaults to only reading files uploaded in the current session.
- Phenomenon: The output citation traceability content retains original markdown syntax markers such as `#` and `*`. Cause: The interface setting item for `output content rendering` is not enabled, and the system defaults to returning original matching text.

## How to Confirm the Configuration Is Correct
- Upload a chemical raw material test report containing CAS numbers and batch numbers, run a due diligence task, and check whether recall results preferentially match data sources with matching CAS numbers and batches.
- Adjust the `similarity threshold` to 0.7 and 0.9, compare the number of recalled contents in both instances, and confirm that results change with parameter adjustments.
- Review the output citation traceability module, and confirm that each citation entry includes the corresponding CAS number, batch number and file source field.
- Test uploading an industry report larger than 200 MB, and confirm that no timeout errors occur during upload and parsing.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
