---
title: Deployment and Upgrade for Traditional Chinese Medicine Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c006-f015
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Deployment and Upgrade for Traditional Chinese Medicine
meta_description: The data sources for Traditional Chinese Medicine (TCM) intelligent due diligence reports include the Pharmacopoeia of the People's Republic of China
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Deployment and Upgrade for Traditional Chinese Medicine Intelligent Due Diligence Reports

## What the data for this category looks like
The data sources for Traditional Chinese Medicine (TCM) intelligent due diligence reports include the Pharmacopoeia of the People's Republic of China standard documents, original plant identification reports for Chinese medicinal materials, decoction piece processing records, batch traceability ledgers, and third-party sampling inspection data.
There are two update schedules: pharmacopoeia standards are updated on a fixed cycle, while daily sampling and traceability data are synchronized monthly.
Document structure mixes structured and unstructured content. Structured fields include original scientific name of the source material, processing method, extract content, pesticide residue amount, and similar items, with corresponding units such as mg/g, mg/kg. Unstructured content includes long-text processing step descriptions and traceability documentation.

## What constraints these characteristics impose on deployment and upgrade
Mixed structured and unstructured TCM data requires configuring both structured parsing and unstructured text splitting adaptation rules during deployment. This prevents long text parsing timeouts.
Strict field unit requirements mandate retaining original units during parsing. Failure to do so will compromise the professionalism of the due diligence report.
The multi-cycle data update schedule requires a layered synchronization mechanism. This mechanism distinguishes between major version upgrades of the pharmacopoeia standard library and incremental synchronization of daily sampling data. It also avoids knowledge base exceptions caused by conflicts between old and new version fields.

## How to set the configurations
| Configuration Item | Recommended Value | Rationale |
|---|---|---|
| `PARSE_FILE_TIMEOUT_SECONDS` | `600 seconds` | TCM inspection reports and pharmacopoeia documents are usually lengthy, with long single-file parsing times. This setting avoids interrupting the parsing process due to timeouts |
| `maxContext` | `8000–12000 characters` | Detailed descriptions of TCM processing techniques and content assays are long-text content. Sufficient context is required to maintain logical integrity |
| `Recall Count` | `Top 8 entries` | TCM due diligence requires covering data across source material, processing, and inspection dimensions. Too few entries will miss critical information, while too many will introduce redundant content |
| `Similarity Threshold` | `0.75–0.85` | TCM terminology is highly specialized. A high matching degree is required to avoid irrelevant decoction piece data being included in recall results |
| `UPLOAD_FILE_MAX_SIZE` | `500 MB` | Bulk uploaded pharmacopoeia scans and traceability ledger files have large file sizes. This setting relaxes the upload limit to support bulk imports |
| `AIProxy_ENABLE` | `Enabled` | Adapts to the access requirements of local large models in private deployment scenarios, ensuring normal model call routing |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require case-by-case analysis, and it is recommended to test on your own samples before finalizing settings.

## Three Common Mistakes
- Phenomenon: Calling the API only returns model responses, with no cited reference details. Cause: The knowledge base's citation source display configuration is not enabled, and the `Recall Count` setting is not sufficient to cover associated data.
- Phenomenon: The model channel test reports an error, but the server deployment status shows normal. Cause: The `AIProxy_ENABLE` parameter is not configured correctly, and the access route for the local large model is not connected.
- Phenomenon: Parsed TCM data loses the content assay unit field. Cause: The parsing switch to retain original units for structured data is not enabled, leading to loss of critical units such as mg/g and mg/kg during field standardization.

## How to confirm the configuration is correct
- Upload a single TCM inspection report file. Check if the parsed structured fields include content such as source material, extract content, and pesticide residue amount, and confirm that units have not been automatically removed.
- Call the test interface. Check if the returned results include a citation source field, and that the field contains the uploaded file's name and corresponding paragraph location.
- View server logs. Confirm that the `PARSE_FILE_TIMEOUT_SECONDS` parameter is in effect, and that no timeout errors occurred during large file parsing.
- After configuring a scheduled synchronization task, manually trigger the synchronization. Check if new pharmacopoeia standard data is automatically updated to the knowledge base.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
