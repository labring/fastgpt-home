---
title: Tool Calling and Plugins for Insurance Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c013-f008
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Tool Calling and Plugins for Insurance Intelligent Due
meta_description: Data for insurance intelligent due diligence comes from four sources: insurance institution internal underwriting systems, claim ledgers, industry
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Tool Calling and Plugins for Insurance Intelligent Due Diligence Reports

## What the data for this category looks like
Data for insurance intelligent due diligence comes from four sources: insurance institution internal underwriting systems, claim ledgers, industry regulatory public documents, and third-party credit reporting agency subject credit data. Update frequencies vary:
- Internal underwriting and claim data updates in real time alongside business processes
- Regulatory documents are published quarterly
- Third-party credit data updates monthly

Document structure includes four modules: basic information, insurance policy clauses, underwriting rules, and historical claims. Fields include: insured person identity identifier, insurance product name, sum insured (unit: ten thousand yuan), premium (unit: yuan), claim amount (unit: yuan), and underwriting result status.

## What constraints these characteristics impose on tool calling and plugins
Multiple scattered data sources require tool calling plugins to support integration with internal systems, external regulatory APIs, and third-party credit reporting channels. Multi-source data aggregation scheduling rules must be configured.

Differences in update frequencies require plugins to support both scheduled pull and real-time trigger modes. Update cycles for different data sources must be configured separately.

Many structured fields have clear units. Preset field validation rules must be added during tool calling to avoid unit confusion or missing fields.

Insurance due diligence involves compliance-sensitive data. Plugins must be configured with data desensitization and permission verification parameters to ensure calling processes comply with industry regulatory requirements.

## How to set the configurations
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `tool_call_timeout` | `300 seconds` | Insurance due diligence requires integration with multiple data source APIs, and single calls take longer. 300 seconds covers most compliant data pull processes |
| `max_tool_call_rounds` | `8 rounds` | Insurance due diligence requires pulling underwriting, claim, and regulatory data sequentially. 8 rounds cover complete data aggregation requirements |
| `plugin_auth_type` | `api_key authentication` | Most insurance institutions and third-party credit reporting APIs use api_key authentication, which aligns with industry general access specifications |
| `plugin_data_filter_rule` | `Filter by insured person identity identifier` | Insurance due diligence data must accurately match the target subject to avoid cross-subject data confusion |
| `tool_call_prompt_template` | `{query}, prioritize pulling underwriting and claim data from the past 12 months` | Insurance due diligence focuses on recent business data. Limiting the time range improves calling accuracy |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material format, data volume, and business rules. Specific issues require case-by-case analysis. It is recommended to test on your own samples before finalizing settings.

## Three common mistakes
- Phenomenon: In a Docker-deployed FastGPT instance, the system plugin configuration page has no `packages/plugins/register` file entry, and plugin calls return a 404 error. Cause: The plugin directory was not mounted according to specifications, or the initialization script did not automatically generate the registration file. Manually create the corresponding directory and configuration file.
- Phenomenon: In FastGPT version 4.9.10, the code running tool cannot be selected in the tool calling node, and no corresponding option appears in the connection configuration area. Cause: Advanced tool permissions for the workflow were not enabled, or code running plugin dependencies were not installed during deployment.
- Phenomenon: When calling the API to retrieve a knowledge base, response speed does not improve with increased server memory. Cause: Retrieval speed is affected by model inference computing power and vector database index efficiency, and has no direct correlation with server memory. 192GB of memory meets requirements for most scenarios.

## How to confirm the configuration is complete
- Navigate to the FastGPT plugin management page, check that the configured insurance due diligence plugin status is "Connected", with no authentication failure prompts.
- Initiate a test call, enter the query instruction for the target insured person, verify that the returned results include underwriting, claim, and regulatory data, and that field units match the preset rules.
- View the tool calling logs, confirm that the number of calling rounds does not exceed the preset `max_tool_call_rounds` value, and no timeout errors occur.
- Verify the data filtering rule: enter a query for a non-target subject, confirm that the returned results only include data matching the identity identifier.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
