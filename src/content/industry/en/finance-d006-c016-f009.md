---
title: Citation Source and Traceability for Photovoltaic Investment Research Knowledge Base Construction
slug: /en/industry/finance-d006-c016-f009
page_type: Industry scenario page
article_section: Research Knowledge Base Governance
is_part_of: FastGPT Tech Center
meta_title: Citation Source and Traceability for Photovoltaic Investment
meta_description: Photovoltaic industry investment research data sources include public statistics from industry associations, quarterly financial reports of listed
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Source and Traceability for Photovoltaic Investment Research Knowledge Base Construction

## What this type of data looks like
Photovoltaic industry investment research data sources include public statistics from industry associations, quarterly financial reports of listed companies, weekly research reports from third-party institutions, real-time power station operation and maintenance logs, and specialized research reports.
Data update rhythms vary significantly. Financial reports are released quarterly. Association statistics are updated monthly. Real-time operation and maintenance logs refresh hourly. Research reports are released irregularly alongside industry developments.
Document structures include structured parameter tables, trend analysis charts, and long-text analysis chapters. Most fields have clear units. For example, installed capacity uses GW as the unit, irradiance uses W/㎡ as the unit, and technical parameters retain decimal precision.

## What constraints do these characteristics impose on the citation source and traceability workflow
The multi-source and decentralized nature of photovoltaic investment research data requires the traceability link to distinguish the identification rules of different data sources. This avoids confusing the authority of industry association data and corporate financial reports.
Data sources with different update frequencies need matching time filtering rules. For example, quarterly financial reports must be filtered by quarter. Real-time operation and maintenance data must retain hourly timestamps.
The chapterized document structure requires traceability to locate specific sections, not the entire document. Otherwise, it is impossible to accurately match the specific technical parameters or trend analysis focused on in investment research.
Fields with units require the traceability link to retain original unit information. This avoids unit conversion errors from different data sources affecting investment research conclusions.

## How to set configurations
| Configuration Item | Recommended Approach | Basis for This Approach |
| --- | --- | --- |
| `reference_source_type` | `Classify and tag by data source` | Distinguish three types of data sources for photovoltaic industry research reports, corporate financial reports, and operation and maintenance data, to match the need to judge source authority in investment research scenarios |
| `recall_top_k` | `Top 8-12 entries` | Photovoltaic investment research data has numerous detailed dimensions. Retaining sufficient recall volume can cover key information for different technical parameters and trend analysis needs |
| `reference_show_mode` | `Only retain document title + chapter + cited passage` | Adapt to the chapterized structure of photovoltaic research reports, accurately display the specific location of the citation, and avoid redundant overall document information |
| `parse_chunk_size` | `800-1200 characters` | Photovoltaic research reports contain a large number of technical parameter tables with units. This segment length can adapt to table splitting and accurate traceability positioning |
| `reference_time_filter` | `Match by data source update cycle` | Filter quarterly financial reports by quarter and association data by month, ensuring the timeliness of cited data meets the cycle requirements of investment research analysis |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require specific analysis, and it is recommended to test on your own samples before finalizing.

## Three common errors
- Phenomenon: The `Knowledge base search_input` and `Knowledge base search_response` fields appear in the results returned after workflow invocation. Cause: The citation display switch for tool calls in the workflow was not turned off, and the original input and output logs of tool calls are retained by default.
- Phenomenon: Citation traceability only displays the document name without marking specific chapters. Cause: `reference_show_mode` was not configured to the chapter-included display mode, and the default only extracts the root-level information of the document, which cannot match the chapterized structure of photovoltaic research reports.
- Phenomenon: There are no optional values for knowledge base variable references. Cause: The association configuration between global variables and the photovoltaic investment research dataset was not enabled, or the field mapping rules that can be referenced were not configured for the data source bound to the variable.

## How to confirm the configuration is correct
- Initiate an investment research query involving technical parameters or industry trends, check the citation area at the end of the returned results, and confirm that the document title, specific chapter, and accurate cited passage are displayed.
- View the workflow run logs, and confirm that no redundant citation fields of `Knowledge base search_input` or `Knowledge base search_response` appear.
- Invoke different types of photovoltaic investment research data, and confirm that citation tags can distinguish the source types of industry research reports, corporate financial reports, and operation and maintenance data.
- Adjust the value of `recall_top_k`, and verify that the number of citations in the returned results matches the configured value.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
