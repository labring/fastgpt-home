---
title: Citation Sources and Traceability for Traditional Chinese Medicine Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c006-f009
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Citation Sources and Traceability for Traditional Chinese
meta_description: Data sources for TCM due diligence include national drug standards, local processing specifications, origin traceability archives, batch test reports
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Sources and Traceability for Traditional Chinese Medicine Intelligent Due Diligence Reports

## What This Category of Data Looks Like
Data sources for TCM due diligence include national drug standards, local processing specifications, origin traceability archives, batch test reports, and more. These sources are commonly used in scenarios such as traditional Chinese medicine supply chain due diligence for financial institutions, and medical material claim verification for insurance institutions.
Standard documents mostly use structured formats, containing fields including product name, original source, production origin, processing method, nature and tropism of Chinese medicinal materials, usage and dosage. Some fields include specific units: for example, processing specifications are marked as "slice/segment/powder", and test items are marked as "mg/kg".
Origin traceability documents are updated with each harvest batch. Batch test reports are mostly attached as supplementary files to the main document.

## Constraints for the Citation Sources and Traceability Link
TCM data sources are scattered. In financial or insurance due diligence scenarios, cited content must be compliant and traceable. This requires citation traceability to support multi-source data association.
Individual documents contain structured fields with specific units. Retrieval must fully retain field and unit information to avoid impacting due diligence judgments.
Some documents include batch test attachments. Traceability jumps must be supported at the attachment level.
Official standard data is updated on a fixed cycle. An incremental index update mechanism must be implemented to avoid citing expired content.

## How to Configure the Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `retrieval count` | `Top 8-12` | TCM due diligence data has many specialized fields. Too many retrieved results will introduce irrelevant content, while too few will fail to cover complete compliant information |
| `similarity threshold` | `0.75-0.85` | TCM terminology is highly specialized. It is necessary to retain precise content with sufficient matching degrees to avoid mixing in irrelevant standards with low matching scores |
| `PARSE_FILE_TIMEOUT_SECONDS` | `120 seconds` | Some batch test report documents are lengthy, with long parsing times. Default parameters may fail to complete parsing |
| `chunk length` | `600-800 characters` | TCM documents are mostly combinations of structured fields. Too long chunks will lose field association, while too short chunks will destroy the integrity of specialized terminology |
| `enable attachment traceability` | `Enabled` | Some due diligence reports need to associate batch test attachments. Enabling this allows traceability jumps at the attachment level |
| `incremental update trigger condition` | `By file update time` | TCM standard data is updated according to official release cycles. Triggering by update time ensures that indexes are synchronized with source data |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require targeted analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Configuration Mistakes
- Phenomenon: Only fragmentary content is displayed when citing source data, and the complete original source text cannot be output. Cause: The chunk length is not configured appropriately, causing specialized terminology or structured fields to be truncated, making it impossible to fully match the original content.
- Phenomenon: Index tasks get stuck for long periods without a response. Cause: The `PARSE_FILE_TIMEOUT_SECONDS` parameter is not adjusted. Long document test report parsing times out without triggering a retry mechanism.
- Phenomenon: Retrieval results include medicinal material information from non-target categories. Cause: The similarity threshold is set too low, introducing irrelevant standard data with low matching scores that interfere with due diligence judgments.

## How to Verify Correct Configuration
- Upload a single TCM standard document, and check if the parsed data fields fully retain specific units and structured content.
- Initiate a due diligence query for a single medicinal material, and confirm that the returned results include specific source identifiers for the source data.
- Test batch index updates, and confirm that only modified documents are updated, with no full reindexing triggered.
- Verify the attachment upload function, and confirm that query results can jump to the source file of the corresponding batch test report.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
