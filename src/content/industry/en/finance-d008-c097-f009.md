---
title: Citation Sources and Traceability for Coke Intelligence Due Diligence Reports
slug: /en/industry/finance-d008-c097-f009
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Citation Sources and Traceability for Coke Intelligence Due
meta_description: Core data sources for coke coal include monthly industry operation data released by the China Coal Industry Association, public quality inspection
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Sources and Traceability for Coke Intelligence Due Diligence Reports

## What the data for this category looks like
Core data sources for coke coal include monthly industry operation data released by the China Coal Industry Association, public quality inspection reports from mining enterprises in major producing areas of Shanxi and Inner Mongolia, coke coal futures delivery standard documents from the Dalian Commodity Exchange, weekly import and export statistical reports from the General Administration of Customs, and spot quotation data from third-party bulk commodity information platforms.
Most data documents are tables or structured parameter pages. Core fields include ash content, sulfur content, colloidal layer thickness (Y value), and volatile matter. Units are uniformly percentage or millimeters. Some mining enterprise reports also mark sampling batch and testing institution information.
Industry association data is updated monthly. Futures delivery documents are updated quarterly. Mining enterprise quality inspection reports are released in real time alongside shipment batches.

## Constraints on Citation Sources and Traceability
Coke coal data sources are scattered and have inconsistent update cycles. It is necessary to strictly distinguish the update cycles of different data sources to avoid overwriting real-time mining enterprise quality inspection reports with expired monthly data.
Core indicators have industry-specific fields, such as colloidal layer thickness Y value. Precise field matching rules must be configured to avoid confusion with indicators of other coal categories.
Since indicators change significantly with sampling batches, traceability must bind sampling batch and testing institution metadata to ensure data timeliness and accuracy.
In addition, coke coal due diligence prioritizes compliance. Official standard documents with mandatory binding force must be cited first, which requires the traceability link to clarify data source priorities.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `recall count` | `top 8` | Coke coal data sources are scattered, covering industry associations, mining enterprises, futures, customs and other types of data sources. 8 entries balances recall coverage and result redundancy |
| `similarity threshold` | `0.72–0.78` | There are many indicator fields for coke coal and similar naming, such as ash content and volatile matter. A medium threshold must be set to avoid mismatching |
| `PARSE_FILE_TIMEOUT_SECONDS` | `900 seconds` | Some mining enterprise quality inspection reports are multi-page PDFs, which take a long time to parse. 900 seconds covers the complete parsing process |
| `chunk length` | `1000–1200 characters` | Most coke coal industry documents are long tables and parameter descriptions. Chunk length adapts to the average length of table rows and paragraphs |
| `reserved metadata fields` | `publish time, sampling batch, testing institution, document type` | Coke coal indicators change significantly with batch and production area. Core traceability metadata must be reserved |
| `data source priority` | `official standard documents > industry association data > mining enterprise quality inspection reports > third-party information` | Coke coal due diligence prioritizes compliance. Official documents with mandatory binding force are cited first |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require specific analysis, and it is recommended to test on your own samples before finalizing.

## Three Common Configuration Mistakes
- When passing a local file path variable to the file upload node of a custom workflow, a `400 Bad Request` error is returned. The reason is that this node only supports passing publicly accessible data source links, and cannot directly reference local variables.
- When configuring, no dedicated matching rule is set for colloidal layer thickness Y value, and recall results mix indicator data from other coal categories, leading to incorrect parameters in the due diligence report. The reason is that dedicated fields of coke coal and other coal categories are not distinguished, and precise field matching logic is not configured.
- Setting `PARSE_FILE_TIMEOUT_SECONDS` to `300 seconds` results in a `PARSE_FAILED` error when parsing long documents. The reason is that the short timeout period cannot complete the complete parsing of multi-page mining enterprise quality inspection reports.

## How to Verify Successful Configuration
- Upload a PDF of a coke coal quality inspection report from a Shanxi mining enterprise, and check whether the parsed reserved metadata includes publish time, sampling batch and testing institution.
- Initiate a coke coal due diligence report generation request, view the data source list of recall results, and confirm that official standard documents and industry association data are ranked first.
- Call the file upload node of the custom workflow, pass the publicly available coke coal futures delivery standard document link from the Dalian Commodity Exchange, and confirm that a `200 OK` status code is returned.
- Adjust the similarity threshold to `0.75`, test whether the recall results cover both official data and mining enterprise quality inspection reports, and there is no obvious cross-category indicator mismatching.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
