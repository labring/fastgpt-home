---
title: Model Access and Configuration for Refinery Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c094-f012
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Model Access and Configuration for Refinery Intelligent Due
meta_description: Refinery intelligent due diligence report data mainly comes from internal production operation logs of refinery enterprises, capacity filing
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Model Access and Configuration for Refinery Intelligent Due Diligence Reports

## What data for this category looks like
Refinery intelligent due diligence report data mainly comes from internal production operation logs of refinery enterprises, capacity filing documents, and publicly available industry plant operation parameter databases. There are two types of data update rhythms: production-related parameters are updated daily, and compliance filing parameters are updated quarterly or annually. The document structure is fixed into four modules: plant unit breakdown, material balance ledger, energy and material consumption indicators, and environmental compliance attachments. Core fields include crude oil processing volume, plant operating rate, product yield, and unit energy consumption. Each field has fixed industry standard units. Single documents have a large total length, and require adaptation to long-text processing workflows.

## What constraints these characteristics impose on the model access and configuration link
The fixed multi-module structure of refinery due diligence data requires model access configuration to support targeted recall based on preset document modules, to avoid irrelevant cross-module data mixing into the inference process. Frequently updated production data requires the configured data source refresh link to support daily trigger updates, and limit the processing duration of single-round document parsing. The fixed unit attribute of core fields requires the model output to retain the original unit identifiers, without additional conversion. The large length of single documents requires the configured context window to adapt to long-text processing, while setting a reasonable segment parsing threshold to prevent memory overload from single calls.

## How to set the configuration
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `maxContext` | `8000–16000 tokens` | Adapts to the long-text characteristics of single refinery due diligence documents, avoids context overflow |
| `PARSE_FILE_TIMEOUT_SECONDS` | `600 seconds` | Meets the parsing time requirements of multi-module documents, prevents premature data truncation |
| `RECALL_CHUNK_SIZE` | `800–1200 characters` | Retains complete core fields such as material balance and energy consumption indicators, avoids segment truncation |
| `RECALL_TOP_K` | `Top 3–5 entries` | Aligns with the module concentration characteristics of refinery due diligence data, reduces redundant recall |
| `UPLOAD_FILE_MAX_SIZE` | `2000 MB` | Adapts to the storage limit of single refinery due diligence documents, supports complete document import |
| `MAX_RETRY_TIMES` | `3 times` | Addresses network fluctuations or temporary parsing failures during large document parsing, improves call stability |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require separate analysis. It is recommended to test on your own samples before finalizing settings.

## Three common mistakes
- Phenomenon: The model only outputs thinking processes and does not generate final due diligence conclusions. Cause: No final result output rule for the model output format is configured, causing the model to only follow the thinking process for output.
- Phenomenon: A `413 Request Entity Too Large` error is returned when calling the model. Cause: The `UPLOAD_FILE_MAX_SIZE` parameter is not adjusted, exceeding the configured file upload limit.
- Phenomenon: Parsed document recall results include irrelevant environmental compliance module data. Cause: The configuration for targeted recall by document module is not enabled, causing the recall range to cover the entire document.

## How to confirm the configuration is complete
- Upload a single standard refinery due diligence document, check if the parsed module split matches the original document structure.
- Initiate a due diligence analysis call, verify that the output result retains the unit identifiers of the original data.
- Check the call log to confirm that the parsing time does not exceed the configured timeout threshold.
- Adjust the recall count configuration, verify that the number of returned recall results matches the preset recall count range.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
