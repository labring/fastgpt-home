---
title: Tool Calling and Plugins for IT Service Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c001-f008
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Tool Calling and Plugins for IT Service Intelligent Due
meta_description: Data for IT service intelligent due diligence reports is primarily sourced from public government procurement platforms, industry association
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Tool Calling and Plugins for IT Service Intelligent Due Diligence Reports

## What the data for this category looks like
Data for IT service intelligent due diligence reports is primarily sourced from public government procurement platforms, industry association qualification announcements, enterprise-disclosed service cases, and compliance documents. Update frequency varies by content type: qualification certification data updates every 1 to 3 years. Project delivery records update in real time as services are launched. Bidding information is synchronized in real time. The document structure is fixed into four modules: main qualifications, service capabilities, past projects, and compliance records. Fields include service years (unit: years), winning bid amount (unit: yuan), qualification level, response time (unit: hours), and some fields use enumerated text.

## What constraints these characteristics impose on tool calling and plugin workflows
The multi-source, dispersed nature of IT service due diligence data requires tool calling to be configured with multi-source MCP aggregation logic to connect to different data sources such as government procurement platforms and qualification announcement databases. Differences in update frequencies across content types require differentiated cache durations to be set for different data sources, preventing expired data or overly frequent calls. The fixed document structure requires plugins to preset fixed field extraction rules to match the fixed formats of modules including main qualifications and service capabilities. Fields include numeric content with attached units and enumerated text, requiring automatic unit unification and field verification after tool calling to avoid format confusion.

## How to Configure Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `mcp_source_config` | `[{"name":"Government Procurement Platform","url":"https://xxx.gov.cn/api"},{"name":"Industry Association Qualification Database","url":"https://xxx.org/api"},{"name":"Enterprise Case Database","url":"https://xxx.com/api"}]` | Covers the three core data sources required for IT service due diligence. |
| `cache_ttl_per_source` | `{"Government Procurement Platform": 3600, "Industry Association Qualification Database": 2592000, "Enterprise Case Database": 86400}`, unit: seconds | Matches the actual update frequency of each data source. |
| `field_extract_schema` | `["Main Qualifications","Service Capabilities","Past Projects","Compliance Records"]` | Matches the fixed document structure of IT service due diligence reports. |
| `unit_conversion_rule` | `{"Winning Bid Amount":"yuan","Service Years":"years","Response Time":"hours"}` | Unifies unit formats across fields to avoid format confusion. |
| `tool_call_timeout` | `600 seconds` | Adapts to the total time limit for multi-source calls to prevent timeout failures. |
| `max_extract_items` | `Top 10 entries` | Controls the number of items returned per module, aligning with the reading logic of due diligence reports. |

> The parameter values provided on this page are all conventional recommendations used to determine the starting point for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require specific analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Configuration Errors
- Tool calls return status code 504 or no returned content. The cause is that timeout retry logic for multiple data sources is not configured, resulting in overall call failure due to a single-source timeout.
- Structured data returned by the tool uses the array<object> format and cannot be directly spliced into report text. The cause is that no formatting template is preset after field extraction, and structured data is not converted into natural language paragraphs.
- Image links returned by MCP calls cannot be rendered properly and display incompletely. The cause is that no proxy or format conversion rule is configured for image links, and original links have cross-domain or permission restrictions.

## How to Verify a Complete Configuration
- A test call can be initiated to check whether the returned content of each data source matches the preset field extraction template.
- Tool call logs can be reviewed to confirm that cache durations align with the update rhythm of each data source.
- Input parameter variable configurations can be verified to confirm that variables are not lost after saving and can be correctly passed to MCP requests.
- The formatting conversion process can be triggered to confirm that structured data in array<object> format is converted into natural language paragraphs.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
