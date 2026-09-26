---
title: Citation Sources and Traceability for Securities Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c133-f009
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Citation Sources and Traceability for Securities Intelligent
meta_description: Data for securities intelligent due diligence reports primarily comes from publicly disclosed annual reports, quarterly reports, regulatory inquiry
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Sources and Traceability for Securities Intelligent Due Diligence Reports

## What the data for this category looks like
Data for securities intelligent due diligence reports primarily comes from publicly disclosed annual reports, quarterly reports, regulatory inquiry letter responses, major event announcements, and broker compliance research reports issued by the Shanghai, Shenzhen, and Beijing stock exchanges. Update cycles vary across data types: annual reports update at fixed times each year, quarterly reports update at the end of each quarter, regulatory announcements update in real time as events occur, and research reports are released irregularly based on market trends. Document structures are mostly based on structured fields, including full disclosure entity name, unified social credit code, disclosure date, announcement number, core business data such as revenue scale, number of compliance records, amount of connected transactions. Units are mostly ten thousand yuan and count. Some public documents are PDF scans or structured HTML pages.

## What constraints do these characteristics impose on the "citation sources and traceability" link
Compliance requirements for securities due diligence data mean that traceability must be accurately bound to original disclosure documents, and cannot rely solely on summaries or secondary processed content. The characteristics of multiple sources and widely varying update cycles require the recall stage to match the disclosure entity, time range, and announcement type simultaneously, to avoid mixing in irrelevant industry research reports or announcements from other entities. The presence of structured fields means citations must accurately target specific fields; citing entire paragraphs will lead to vague traceability information. Real-time updated regulatory announcements require the traceability chain to support fast retrieval of the latest documents, ensuring that due diligence reports use the latest compliant basis. In addition, securities regulatory requirements mean disclosure documents must be traceable back to their original release channels, so the citation link must include key identifiers such as announcement number and disclosure date, and cannot rely solely on file names for traceability.

## How to configure the settings
| Configuration Item | Recommended Value Range | Rationale |
| --- | --- | --- |
| `recall_top_k` | 8-12 results | Securities due diligence requires sufficient coverage of compliant basis, while avoiding excessive redundant content that distracts from core conclusions |
| `similarity_threshold` | 0.75-0.85 | Securities data has high professionality; a higher threshold filters irrelevant announcements and ensures recalled content is strongly relevant to the due diligence topic |
| `chunk_size` | 1500-2000 characters | Securities announcements have long paragraphs; this segment length preserves complete compliant fields and context, avoiding splitting critical information |
| `reference_source_required` | Enabled | Meets the compliance traceability requirements of securities due diligence, ensuring returned results include original document information |
| `api_reference_fields` | `["source_path", "publish_date", "announcement_no"]` | Accurately returns traceability fields required by regulatory requirements, meeting traceability needs during API calls |
| `reference_export_enabled` | Enabled (supported in version 4.8.22 and above) | Supports batch export of citation sources, meeting compliance archiving requirements for securities due diligence |
| `reference_export_limit` | No more than 20 entries per question-answer pair | Controls the volume of exported content, avoiding loading or transmission errors caused by too many files |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material format, data volume, and business rules. Specific issues require individual analysis. It is recommended to test on in-house samples before finalizing settings.

## Three common configuration errors
- Insufficient citations returned per question-answer pair, failing to cover the compliant basis required for due diligence. The cause is that the `recall_top_k` configuration value is set too low.
- Citation files cannot be downloaded, returning a 404 error, or blank exports occur in version 4.8.22. The cause is that the `reference_export_enabled` configuration is not enabled, or the storage path of the original files is not correctly configured.
- API calls do not return citation source fields. The cause is that required fields are not specified in `api_reference_fields`, or the `reference_source_required` configuration is not enabled.

## How to verify correct configuration
- Upload a securities annual announcement, initiate a question containing the keywords "compliance records" and "connected transactions", and check whether returned results include traceability information such as disclosure date and announcement number.
- Call the question-answer API, and check whether the returned `references` field includes specified fields such as `source_path`, `publish_date`, and `announcement_no`.
- Adjust `recall_top_k` to 10 entries, initiate a test question-answer pair, and confirm that the number of returned citations matches the configured value.
- Attempt to export the citation sources for the current question-answer pair, and check that the exported file format meets preset requirements and includes complete traceability information.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
