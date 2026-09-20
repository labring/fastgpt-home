---
title: Citation Sources and Traceability for Insurance Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c013-f009
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Citation Sources and Traceability for Insurance Intelligent
meta_description: The data sources for insurance intelligent due diligence reports include insurance product terms, applicant health declaration documents, underwriting
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Sources and Traceability for Insurance Intelligent Due Diligence Reports

## What the Data for This Category Looks Like
The data sources for insurance intelligent due diligence reports include insurance product terms, applicant health declaration documents, underwriting approval records, claims history archives, and regulatory announcement documents from banking and insurance regulatory authorities.
Update cycles follow these rules: product terms are updated when new insurance products launch or regulatory requirements change; application and claims data is generated in real time alongside business processes; regulatory documents are updated following the regulatory release schedule.
For document structure: A single report typically includes fields such as product liability scope, rate schedule, health declaration items, underwriting conclusions, and claim payout ratios. Some regulatory documents include fields such as document number, release date, and applicable insurance product scope, along with unitized identifiers like "10-year payment term" or "500,000 insured amount".

## What Constraints These Characteristics Impose on the "Citation Sources and Traceability" Link
The multi-source mixed data characteristics of insurance due diligence reports require the traceability chain to support dual positioning of structured and unstructured content.
Real-time generated application and claims data require the traceability system to retain complete version tracking capabilities, to avoid referencing expired underwriting conclusions or payout records.
Regulatory documents carry clear compliance identifiers, so traceability needs to link to the corresponding regulatory entity and release time, to ensure citations comply with industry compliance requirements.
The multi-dimensional field document structure requires traceability to accurately match specific items; matching only the entire document will lead to ambiguous citation scope and cause information deviation.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `referenceChunkSize` | `800–1200 characters` | The core business items of insurance due diligence reports are usually short paragraphs. This length ensures that a single citation covers complete content such as rate schedules and health declaration items, avoiding semantic splitting breaks |
| `topNRecall` | `Top 3–5 items` | Key information of insurance due diligence reports is concentrated in 3-5 core modules. This value filters irrelevant recalled content and improves citation accuracy |
| `enableSourceVersion` | `Enabled` | Insurance product terms and regulatory documents have version iterations. Enabling version tracking avoids referencing expired product liability descriptions or invalid regulatory requirements |
| `referenceDisplayMode` | `Associate by item` | Insurance due diligence reports include multi-dimensional business fields. Associating by item can accurately point to specific underwriting conclusions or claim ratios; returning only the entire document cannot achieve this precise pointing |
| `PARSE_FILE_TIMEOUT_SECONDS` | `120 seconds` | A single insurance due diligence report usually contains multiple pages of structured data. 120 seconds ensures complete parsing of all fields, avoiding citation missing caused by parsing timeout |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material format, data volume and business rules. Specific issues require case-by-case analysis, and it is recommended to test on your own samples before finalizing.

## Three Common Mistakes
- Phenomenon: Empty fields are returned when calling the API to obtain citation sources. Cause: The `enableSourceReference` configuration item is not enabled, or the recalled text block is not associated with original document metadata.
- Phenomenon: Knowledge base export granularity only supports overall dimensions, and single due diligence items cannot be exported. Cause: `chunkExportEnabled` is not configured to enabled, or the export template does not enable item-level splitting.
- Phenomenon: Knowledge base original document links cannot be accessed via nginx proxy. Cause: For the open-source version v4.8.21, the `X-Reference-Path` request header is not added to the proxy configuration, causing FastGPT to fail to map the local storage path of the original document.

## How to Confirm Configuration Is Complete
- Initiate a test question-and-answer call, check whether the `reference` field in the returned result includes the original document's path, item location and release time.
- Export the knowledge base data, check whether item-level files for single due diligence reports are included. Results containing only entire document compressed packages require troubleshooting.
- After configuring the nginx proxy, access the knowledge base original document link to confirm normal redirection to the original document page.
- Trigger a question-and-answer process for insurance terms, check whether the output citation sources accurately match the specific term items involved in the question.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
