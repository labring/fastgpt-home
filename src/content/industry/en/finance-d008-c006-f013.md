---
title: Knowledge Base Retrieval and Recall for Traditional Chinese Medicine Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c006-f013
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Knowledge Base Retrieval and Recall for Traditional Chinese
meta_description: Data sources include the Pharmacopoeia of the People's Republic of China (all editions), provincial traditional Chinese medicine (TCM) processing
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Knowledge Base Retrieval and Recall for Traditional Chinese Medicine Intelligent Due Diligence Reports

## What this category of data looks like
Data sources include the Pharmacopoeia of the People's Republic of China (all editions), provincial traditional Chinese medicine (TCM) processing specifications, TCM decoction pieces quality standards, publicly available clinical research literature, and pharmaceutical factory inspection reports. The national pharmacopoeia is revised every 5 years, and local specifications release supplementary announcements annually. Each document is a complete profile for a single ingredient, with fields including original source, nature, taste and meridian tropism, functions and indications, processing methods, dosage and administration, quality inspection items, and others. Quality inspection items mostly use units such as mg/kg, g/100g, while dosage and administration use grams and milliliters as units.

## What constraints these characteristics impose on knowledge base retrieval and recall
TCM data sources have strong authority but fixed update cycles. This requires the knowledge base to synchronize new editions of the pharmacopoeia and local specifications on a regular basis to avoid using outdated compliant data. Each single document has a complete structure and is lengthy, containing professional inspection fields and units. This requires retrieval and recall to retain field-associated context, avoiding segment splitting that damages the integrity of professional information. There are large differences in multi-source data formats, so unified parsed field mapping rules are needed to ensure that TCM compliance and quality data from different sources can be accurately matched and retrieved. Additionally, the due diligence scenario requires coverage of full-dimensional compliance information, so recall results must cover core fields.

## How to set configurations
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `PARSE_CHUNK_SIZE` | `800–1200 characters` | Adapts to the characteristics of TCM documents containing long sections of processing methods and quality inspection descriptions, avoiding splitting professional terms or losing context |
| `RECALL_TOP_K` | `Top 8–12 results` | Covers compliance data for the same ingredient from multiple sources, avoiding redundancy or missing core due diligence information |
| `SIMILARITY_THRESHOLD` | `0.75–0.85` | Balances precise matching of professional terms and multi-source data recall needs, adapting to diverse expressions of terms in the TCM field |
| `UPLOAD_FILE_MAX_SIZE` | `500 MB` | Allows batch uploading of large collection documents such as multiple editions of the pharmacopoeia and local specifications |
| `PARSE_FILE_TIMEOUT_SECONDS` | `600 seconds` | Reserves sufficient time for parsing multi-page scanned documents or large compliance profiles |
| `WORKFLOW_API_TIMEOUT` | `120 seconds` | Matches the multi-round retrieval and parsing process of nested knowledge base assistants, avoiding early timeouts that return empty values |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require individual analysis, and it is recommended to test on internal samples before finalizing settings.

## Three common errors
- Empty values are returned when calling the workflow API. This is caused by not using version v4.8.10 or higher, or setting the timeout period too short, which prevents the retrieval process from completing.
- An error "quote type error" is reported when referencing knowledge base variables. This is caused by not using double quotes to wrap variable parameters as required, or the variable contains unescaped special characters.
- The number of retrieved results does not match the configured settings. This is caused by not correctly linking the settings of `RECALL_TOP_K` and `SIMILARITY_THRESHOLD`, or losing context fragments containing retrieval keywords during segment splitting.

## How to confirm the configuration is properly set
- Upload the standard document for a single TCM ingredient, check if the parsed fields cover the core content required for due diligence, and confirm that segments do not split professional inspection terms and dosage and administration descriptions.
- Enter professional search terms to initiate a test, verify the field completeness and source coverage of returned results, and confirm that they meet scenario requirements.
- Test the variable reference and API call process, confirm that there are no format errors or empty value returns, and match the configured timeout and recall rules.
- Regularly synchronize new editions of the pharmacopoeia and local specification data, confirm that the knowledge base update process triggers normally, and there is no data lag issue.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
