---
title: Citation Sources and Traceability for General Comprehensive Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c021-f009
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Citation Sources and Traceability for General Comprehensive
meta_description: Data sources for general comprehensive intelligent due diligence reports include due diligence workpapers submitted independently by enterprises
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Sources and Traceability for General Comprehensive Intelligent Due Diligence Reports

## What Data Looks Like for This Category
Data sources for general comprehensive intelligent due diligence reports include due diligence workpapers submitted independently by enterprises, public information published by industrial and commercial administrative departments, and comprehensive assessment documents from third-party compliance institutions. Update cycles differ by data source type. Public information syncs quarterly. Enterprise-submitted materials update on demand. Document structures are often mixed, including structured enterprise entity information tables, unstructured risk analysis paragraphs, attached scanned files, and electronic signature files. Fields include unified social credit code, report issuing institution, risk alert items, and data collection time. Units are mostly natural pages, character counts, number of compliance items, and similar metrics.

## Constraints on Citation Sources and Traceability
The mixed document structure requires the traceability process to support precise positioning of structured fields and context association of unstructured paragraphs. It cannot rely solely on a single text block identification rule. Differing update cycles for multi-source data require that traceability information marks the original data source and collection time for each piece of content. This prevents use of expired public information or unauthorized enterprise-submitted materials. For enterprise-submitted materials with electronic signatures, the traceability process must additionally associate signature verification information to ensure compliance of cited content. Diverse field types require traceability dimensions covering three categories: field name, paragraph location, and attachment file name. This meets verification needs for different scenarios. Citations of some third-party compliance documents must clearly mark authorized usage scope to prevent content dissemination beyond authorized terms.

## How to Configure Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `Recall count` | `Top 8–12 entries` | Data sources for general comprehensive due diligence reports are numerous and dispersed. Too many recall results cause redundant traceability information. Too few results fail to cover core risk items |
| `Chunk size` | `800–1200 characters` | Mixed format documents include both structured tables and long paragraph analyses. This segment length range balances the completeness of single block content and traceability accuracy |
| `Citation limit` | `1500–2000 characters` | Cited content from due diligence reports must retain sufficient context for risk verification, while controlling the length of traceability information in single responses |
| `PARSE_FILE_TIMEOUT_SECONDS` | `120 seconds` | Large comprehensive due diligence reports take longer to parse. This duration prevents missing traceability information caused by parsing timeouts |
| `Similarity threshold` | `0.72–0.8` | The similarity difference between data sources of comprehensive due diligence reports is large. This range filters irrelevant redundant data while retaining core compliance items |
| `ENABLE_CITATION_AUTHOR` | `Enabled` | Citations of due diligence reports must clearly mark source institutions, which meets basic requirements for compliance verification |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material format, data volume and business rules. Each case should be analyzed individually. It is recommended to test on your own samples before finalizing.

## Three Common Misconfiguration Issues
- Phenomenon: After setting the `Citation limit` configuration to 1500 characters, traceability content exceeding this length is still returned. Cause: The `Chunk size` parameter was not adjusted synchronously. Content blocks set to 5000 tokens cannot be truncated by the 1500-character citation limit, resulting in content overflow.
- Phenomenon: No local storage address or external link address of the cited file is displayed in the response. Cause: The `ENABLE_CITATION_URL` configuration item was not enabled, or the accessible address of the file was not correctly bound when uploading to the knowledge base.
- Phenomenon: Structured fields of the due diligence report are not traced, only citations of unstructured paragraphs are displayed. Cause: The traceability switch for structured data was not enabled, only the recall rule for text paragraphs was configured.

## How to Confirm Configuration is Successfully Applied
- Upload a single test comprehensive due diligence report, initiate a query containing core risk items, check the citation identifiers in the response, confirm that each citation marks the source institution, collection time and file path.
- Modify the `Recall count` configuration value, re-initiate the same query, compare the change in the number of returned citation entries, confirm the configuration has taken effect.
- View the platform's parsing task logs, confirm that the test report has no timeout or parsing failure status codes, and all fields have been correctly identified.
- Manually set a low `Citation limit` value, initiate a query and verify that the total length of returned citation content does not exceed the configured value.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
