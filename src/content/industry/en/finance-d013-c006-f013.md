---
title: Knowledge Base Retrieval and Recall for Traditional Chinese Medicine Financing Daily Reports
slug: /en/industry/finance-d013-c006-f013
page_type: Industry scenario page
article_section: Financing Daily Report
is_part_of: FastGPT Tech Center
meta_title: Knowledge Base Retrieval and Recall for Traditional Chinese
meta_description: Data for traditional Chinese medicine financing daily reports comes from public disclosed announcements of listed companies on the Shanghai, Shenzhen
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Knowledge Base Retrieval and Recall for Traditional Chinese Medicine Financing Daily Reports

## What the data for this category looks like
Data for traditional Chinese medicine financing daily reports comes from public disclosed announcements of listed companies on the Shanghai, Shenzhen, and Beijing Stock Exchanges, information of listed companies on the National Equities Exchange and Quotations, financing filing public notices from local financial supervision departments, and industry financing updates released by traditional Chinese medicine industry associations. Updates run daily on trading days, and are paused on non-trading days.
Each data document includes full enterprise name, unified social credit code, financing round, financing amount (mostly denominated in RMB ten thousand yuan), investor list, financing completion time, affiliated traditional Chinese medicine sub-sector, and original announcement link. Fields note whether an enterprise is a full traditional Chinese medicine industry chain layout entity. Some data also includes core product category descriptions of the financing party.

## What constraints these characteristics impose on the knowledge base retrieval and recall link
Dispersed data sources lead to inconsistent field formats across different channels. Some announcements only provide vague amount descriptions, so standardization and cleaning must be completed before data is added to the knowledge base.
The daily update schedule on trading days requires configuring incremental synchronization tasks for the knowledge base to avoid recalling outdated data older than 24 hours.
Fields include precise identifiers such as unified social credit code and traditional Chinese medicine sub-sector, which requires supporting filtering and recall by enterprise entity and sector during retrieval.
The coexistence of vague and exact amounts requires adjusting the weight of similarity matching, prioritizing recall of entries with clear amounts.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
| ---- | ---- | ---- |
| `UPLOAD_FILE_MAX_SIZE` | `500 MB` | Single announcement documents for traditional Chinese medicine financing daily reports are usually under 10 MB. Setting a total batch upload size limit of 500 MB meets daily batch import needs |
| `PARSE_FILE_TIMEOUT_SECONDS` | `600 seconds` | Some long announcements include multi-page financial tables and attachments, with long parsing times. 600 seconds covers most parsing scenarios |
| `maxContext` | `800–1200 characters` | The core information length of a single traditional Chinese medicine financing daily report falls within this range. Exceeding this range introduces redundant content and reduces retrieval relevance |
| `Recall Count` | `Top 8 entries` | New entries added on trading days for traditional Chinese medicine financing daily reports are usually under 10. Recalling 8 entries covers major financing updates while avoiding result overload |
| `Similarity Threshold` | `0.72–0.85` | Matching degrees for vague and exact amounts need to be distinguished. A threshold that is too low introduces irrelevant entries, while a threshold that is too high misses some valid fuzzy matching results |
| `Reranked Return Count` | `Top 3 entries` | The core retrieval need for traditional Chinese medicine financing daily reports is the latest financing dynamics. Returning the top 3 reranked results prioritizes the most relevant outcomes |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require individual analysis, and it is recommended to test against your own samples before finalizing settings.

## Three Common Mistakes
- Phenomenon: When uploading a DOCX document containing embedded images, the interface returns a `400 Bad Request` error, prompting that the file format is incorrect. Cause: The image OCR switch for the knowledge base parsing module is not enabled, so embedded images cannot have their text extracted, triggering a format verification failure.
- Phenomenon: When calling the knowledge base file list interface, the returned `file_list` field is an empty array. Cause: The authentication header information for the interface request is not configured correctly, or the request address does not point to the deployment node of the corresponding knowledge base.
- Phenomenon: Core fields are missing from traditional Chinese medicine financing daily report data imported after creating a new knowledge base. Cause: The imported file is not organized according to the preset data source field structure, so required fields such as financing round and amount are not recognized by the system.

## How to Confirm Proper Configuration
- Perform an upload test for a single DOCX document containing images, confirm that the parsing task has no errors.
- Call the knowledge base file list interface, verify that the returned file metadata includes the preset data source fields.
- Initiate a core keyword search, check that the number of returned results matches the preset recall rules.
- Trigger a manual incremental synchronization, verify that the number of entries added to the knowledge base after synchronization matches the number of entries updated in the data source on that day.
- Attempt to batch download files in the knowledge base, confirm that the download function works properly.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
