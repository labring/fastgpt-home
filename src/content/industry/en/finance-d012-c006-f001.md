---
title: HTTP Interfaces and External Systems for Traditional Chinese Medicine (TCM) Marketing Content
slug: /en/industry/finance-d012-c006-f001
page_type: Industry scenario page
article_section: Marketing Content and Lead Generation
is_part_of: FastGPT Tech Center
meta_title: HTTP Interfaces and External Systems for Traditional Chinese
meta_description: Data for TCM marketing content primarily comes from pharmaceutical company official product filing documents, processing specification manuals
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# HTTP Interfaces and External Systems for Traditional Chinese Medicine (TCM) Marketing Content

## What data for this category looks like
Data for TCM marketing content primarily comes from pharmaceutical company official product filing documents, processing specification manuals, clinical application reference materials, and compliant advertising material libraries. Data updates are triggered when new drugs are approved, industry standards are revised, or marketing materials are updated. There is no fixed high-frequency update cycle. A single piece of content typically includes fields such as product common name, nature, taste,, taste, meridian tropism, functions and indications, usage and dosage, contraindicated groups, and compliant advertising approval number. Some scenario-based marketing content also includes applicable group scripts and solar term-specific health pairing suggestions. Field units are mostly traditional medical measurement standards such as grams, milliliters, or qualitative descriptions without units.

## Constraints imposed on HTTP interfaces and external systems
Fields in TCM marketing content include sensitive information such as compliance approval numbers and contraindicated groups. HTTP interfaces must support encrypted transmission and compliance verification for sensitive fields during data transfer, to prevent non-compliant content from being released. Since data updates have no fixed cycle, interfaces must support incremental pull mode. This mode only synchronizes updated content, reducing transmission bandwidth usage. Some content includes professional medical terms and scenario-based marketing scripts. When connecting external systems, support must be provided for requests classified by marketing scenario and compliance level. Request parameter scene identifiers must also be verified to ensure returned content matches business requirements.

## How to Configure
| Configuration Item | Recommended Value | Rationale |
|---|---|---|
| `metadata` | JSON structure containing `compliance approval number` and `contraindicated groups` fields | TCM marketing content must transmit compliant sensitive fields to enable external systems to verify compliance |
| `UPLOAD_FILE_MAX_SIZE` | `500 MB` | Single TCM product manual or processing specification document usually does not exceed 300 MB; reserved space supports uploading multi-page scanned documents |
| `PARSE_FILE_TIMEOUT_SECONDS` | `120 seconds` | Parsing long TCM marketing material documents requires extended time to prevent parsing failure due to timeout |
| `recall_count` | `top 8` | TCM marketing content must balance professional information and scenario-based scripts; excessive recall leads to content redundancy |
| `similarity_threshold` | `0.75` | Low-relevance generic marketing scripts must be filtered out to retain content strongly matched to TCM products |
| `MCP_TOOL_INVOKE_TIMEOUT` | `90 seconds` | Calling external compliance verification tools requires sufficient time to complete compliance checks for TCM marketing content |

> The parameter values provided on this page are common recommended starting points for configuration setup. Actual values are affected by material format, data volume and business rules. Specific scenarios require individual analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Mistakes
- When calling the knowledge base interface, a `400 Bad Request` error is returned, with an error message containing `invalid metadata field`. This occurs because required fields such as `compliance approval number` and `contraindicated groups` were not submitted in accordance with TCM marketing content field specifications, causing interface verification to fail.
- When downloading TCM marketing documents uploaded to the knowledge base, only the fixed link accessed via "view original content" can be used for download. A universal file download interface cannot be used to retrieve the documents. This occurs because the `FILE_DOWNLOAD_API_ENABLE` parameter was not configured to enable batch file download functionality, leaving only single-file original links available.
- When calling a workflow to retrieve MCP tool execution results, an empty value or timeout is returned. This occurs because the `MCP_TOOL_INVOKE_TIMEOUT` parameter was not set to a sufficient duration. Compliance verification for TCM marketing content requires calling external tools, and failure to complete verification within the timeout period results in no result being returned.

## How to Confirm Configurations Are Properly Set
- Call the knowledge base query interface, pass the specified marketing scenario parameter, and check if returned results match TCM marketing content for the corresponding scenario. Confirm that the scenario classification configuration is active.
- Upload a TCM product document, check if parsed fields include preset fields such as `nature, taste and meridian tropism` and `functions and indications`. Confirm that the document parsing configuration is working correctly.
- Trigger a workflow to call the MCP compliance verification tool, check if compliance verification results are generated in execution logs. Confirm that tool invocation parameter configuration is correct.
- Call the file download interface, attempt to retrieve the link for an uploaded TCM marketing document. Confirm that the download function has been enabled according to the configuration.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
