---
title: Citation Sources and Traceability for Medical Device Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c034-f009
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Citation Sources and Traceability for Medical Device
meta_description: Medical device-related data mainly comes from the National Medical Products Administration Medical Device Registration and Filing Information
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Sources and Traceability for Medical Device Intelligent Due Diligence Reports

## What data in this category looks like
Medical device-related data mainly comes from the National Medical Products Administration Medical Device Registration and Filing Information Platform, the Unique Device Identification (UDI) Database, official manufacturer compliance documents, and third-party industry compliance databases. The data update rhythm is as follows: registration certificate information is updated in real time with approval changes, industry reports are updated quarterly, and manufacturer documents are updated with product iterations. The document structure includes fields such as product name, model and specification, manufacturing enterprise, approval number, and validity period. The approval number is an 18-character alphanumeric combination, the validity period is marked in YYYY-MM-DD format, and the production batch is 6-10 characters.

## What constraints these characteristics impose on the "citation sources and traceability" link
The authority and timeliness of medical device data are directly linked to compliance audits, so the traceability link must prioritize official authoritative data sources. The unique identification requirement of UDI demands precise matching of product batches and codes during traceability, rather than broadly referencing general category data. The validity period of the registration certificate must be marked in the traceability information to avoid citing expired compliance documents. Segmentation of long documents must retain key fields such as product model and approval number to ensure accurate traceability, while also distinguishing the priority between official and third-party data sources to ensure the compliance of traceability results.

## How to set up configurations
| Configuration Item | Recommended Range | Rationale |
| --- | --- | --- |
| `Similarity Threshold` | `0.65–0.75` | Medical device data has strong professional characteristics, so low-relevance non-compliant documents must be filtered, while core data such as official registration certificates must be retained |
| `Number of Recalled Entries` | `Top 8–12 entries` | Medical device compliance documents contain multi-dimensional fields, so sufficient recall results are needed to cover different types of data such as registration certificates, UDI, and clinical trials |
| `Segment Length` | `800–1200 characters` | Key information per segment of medical device registration documents usually exceeds 500 characters. Excessively long segments will split field associations, while excessively short segments will lose context |
| `Number of Rearranged Returned Entries` | `Top 4–6 entries` | Results from official authoritative data sources must be prioritized to avoid interference from third-party non-compliant data on traceability accuracy |
| `PARSE_FILE_TIMEOUT_SECONDS` | `300 seconds` | Medical device registration documents usually contain multiple pages of compliance content, which take longer to parse, so sufficient time must be reserved for complete parsing |
| `Citation Source Display Fields` | `Data Source Name, Approval Number, Validity Period` | Medical device compliance audits require traceability information to clearly indicate authority and timeliness, to avoid citing expired or non-official data |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require specific analysis, and it is recommended to test on your own samples before finalizing settings.

## Three common mistakes
- Phenomenon: When filling in a knowledge base ID or original citation variable directly in the citation source template, a parameter verification error is triggered after saving, and empty results are returned after deployment. Cause: Citation variables in FastGPT must be called using the system's built-in syntax. Directly entering unescaped original formats will trigger parameter parsing failures.
- Phenomenon: After adjusting the `Similarity Threshold` to the minimum and the `Number of Recalled Entries` to the maximum, the number of recalled results remains fixed with no growth. Cause: The global recall pool switch for the knowledge base is not enabled, or a maximum number of recalls per document is set, preventing the single-document recall limit from being exceeded.
- Phenomenon: Attempting to directly call the historical conversation module in the citation source template results in a system prompt that the module is unavailable or returns empty content. Cause: Newer versions of FastGPT have adjusted the calling syntax for historical conversations, and the built-in historical conversation variable identifier must be used. Directly dragging and dropping old modules will not trigger the call.

## How to confirm the configuration is complete
- Enter the FastGPT knowledge base management interface, verify the configuration values of `Similarity Threshold` and `Number of Recalled Entries` to confirm they match the preset plan.
- Initiate a test query for medical device compliance information, check the citation source module in the returned results to confirm that key fields such as data source type, approval number, and validity period are included.
- Adjust the `Similarity Threshold` to different ranges, observe changes in the number of recalled results, and confirm that the configuration parameters take effect normally.
- Upload a medical device registration certificate document, check the segmented content after parsing to confirm that the segment length falls within the preset range.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
