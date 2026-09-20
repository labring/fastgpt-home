---
title: Citation Source and Traceability for Coking Coal Investment Research Knowledge Base Construction
slug: /en/industry/finance-d006-c097-f009
page_type: Industry scenario page
article_section: Research Knowledge Base Governance
is_part_of: FastGPT Tech Center
meta_title: Citation Source and Traceability for Coking Coal Investment
meta_description: Coking coal investment research data mainly comes from the National Energy Administration, China Coal Industry Association, local industry and
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Source and Traceability for Coking Coal Investment Research Knowledge Base Construction

## What the Data for This Category Looks Like
Coking coal investment research data mainly comes from the National Energy Administration, China Coal Industry Association, local industry and information departments of major producing areas, Dalian Commodity Exchange, and third-party bulk commodity information platforms. Update cycles cover daily spot quotes, weekly port inventory, monthly production and import data, and quarterly industry analysis reports. Document formats include structured time-series tables (CSV/Excel), PDF research reports with charts, and real-time API interface data. Fields include delivery grade (main coking coal/1/3 coking coal), ash content, sulfur content, bonding index G value, colloidal layer thickness Y value. Common units are yuan/ton, ten thousand tons, and %.

## Constraints on Citation Source and Traceability
Multi-dimensional structured coking coal data requires precise field dimension matching during traceability to avoid generalized recall. Frequently updated data sources need regular refresh configurations to maintain cited data timeliness. Variations in field naming across source documents (for example, ash content labeled as Ad or dry basis ash) require unified mapping, otherwise accurate data association during traceability will fail. Multiple related data groups in long research reports (such as origin quotes, port inventory, and futures trends) require retaining context during text segmentation. Otherwise, citation traceability will disrupt data logic. Investment research scenarios have strict requirements for data release times. Traceability information must include release institutions and time, rather than only file names.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `recall count` | `8-12 results` | Coking coal investment research requires covering multi-dimensional data (quotes, inventory, futures, analysis). Sufficient recall counts support complete conclusions and avoid information gaps |
| `similarity threshold` | `0.75-0.85` | Coking coal and similar categories such as thermal coal have similar terminology. A threshold that is too low will introduce confusing data, while a threshold that is too high will lose valid associated content |
| `segment length` | `1000-1500 characters` | Coking coal research reports often contain multiple groups of related data paragraphs. Excessively long segments will lose context association, while excessively short segments will disrupt data logic |
| `PARSE_FILE_TIMEOUT_SECONDS` | `600 seconds` | Large monthly coking coal analysis reports contain complex charts and multi-page data. Sufficient time is required to complete structured parsing and field extraction |
| `citation source display fields` | `["report title", "release institution", "release time", "document path"]` | Investment research personnel need core traceability information. Only file names cannot meet the needs of accurate data source tracing |
| `context recall sorting method` | `weighted by relevance + release time` | Coking coal data has strong timeliness. Recent spot and futures data has more reference value than old research reports. Weighted sorting optimizes citation priority

## Three Common Misconfigurations
- Phenomenon: Returned citation entries are sorted differently from the preset relevance sort. Cause: The weighted sorting method based on relevance + release time is not configured. Results are only returned in the original recall order.
- Phenomenon: The `source_info` field in API call return results is empty or does not include file names. Cause: Citation source export configuration is not enabled, or file name related parameters are not specified in `citation source display fields`.
- Phenomenon: Only a single document fragment can be selected as a citation source, and multiple related data segments cannot be merged. Cause: Multi-fragment recall merge configuration is not enabled, or the segment length is set too short, causing fragment association to fail.

## How to Confirm Successful Configuration
- Upload a coking coal spot quote document, trigger a query, and check the citation source module to confirm that it includes report title, release institution, release time, and document path information.
- Call the API interface, check whether the `source_info` field exists in the return results, and whether the field contains file names and corresponding data dimensions.
- Upload a thermal coal related document, adjust the similarity threshold to 0.78, and test whether non-coking coal category recall results can be filtered out.
- Upload a coking coal research report containing multiple groups of related data, and test whether multiple related fragments can be recalled and displayed as a complete citation source.

> The parameter values provided on this page are conventional recommendations for starting configuration points. Actual values are affected by material form, data volume, and business rules. Specific issues require specific analysis. It is recommended to test on your own samples before finalizing.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
