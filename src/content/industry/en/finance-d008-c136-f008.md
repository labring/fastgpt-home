---
title: Tool Calling and Plugins for Precious Metals Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c136-f008
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Tool Calling and Plugins for Precious Metals Intelligent Due
meta_description: Data primarily originates from official trading platforms including the Shanghai Gold Exchange and the London Bullion Market Association, as well as
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Tool Calling and Plugins for Precious Metals Intelligent Due Diligence Reports

## What Data for This Category Looks Like
Data primarily originates from official trading platforms including the Shanghai Gold Exchange and the London Bullion Market Association, as well as industry authoritative inventory monitoring institutions. Update cycles are divided into two categories: real-time quote data, and daily inventory statistics data. Most documents use structured tables containing fields such as product name, purity, quote, trading volume, and inventory balance. Common units include yuan/gram, USD/ounce, kilogram, and similar. Some third-party data sources include additional fields such as delivery grade and storage location. Fields must be filtered and adapted based on due diligence report requirements.

## Constraints for Tool Calling and Plugins
Differences in update cycles between real-time and non-real-time data require tool calling configurations to distinguish between synchronous high-frequency requests and asynchronous batch pulling. This avoids triggering data source call frequency limits. Multiple fields and varying units require plugins to include precise field mapping and unit conversion logic. Without this, returned data cannot directly adapt to the standard format of due diligence reports. Calls to multiple official data sources require separate authentication parameter configurations. Interface specifications differ across data sources, so a unified data cleaning step must be added to tool orchestration. This ensures consistency of merged data.

## How to Set Configurations
| Configuration Item | Recommended Setting | Rationale |
| --- | --- | --- |
| `toolChoice` | `auto` or specify `["gold_price", "silver_inventory"]` | Models that support this parameter must have tool calling capabilities. Auto mode automatically selects appropriate tools, while specifying a tool list reduces model decision overhead |
| `PARSE_HTTP_PLUGIN_TIMEOUT` | `10-30 seconds` | Interfaces for precious metals data sources typically respond quickly. An overly long timeout will block due diligence report generation, while an overly short timeout will result in lost valid data |
| `plugin_field_mapping` | Configure one-to-one mapping following the rules: "quote → real-time quote", "inventory → ending inventory" | Naming differences exist between precious metals data fields and standard fields for due diligence reports. Precise matching prevents data misalignment |
| `unit_conversion_switch` | `enabled` | Units from different data sources (yuan/gram, USD/ounce) must be unified to the standard unit required by the report, otherwise data confusion will occur |
| `api_external_auth` | Configure independent API_KEY and request headers for each data source | Authentication parameters for the Shanghai Gold Exchange and London Bullion Market Association are not interchangeable. Independent configuration prevents call failures |
| `tool_call_batch_size` | `top 3 mainstream precious metal products` | Due diligence reports typically focus on mainstream products. An overly large batch increases computational overhead, while an overly small batch fails to cover core analysis requirements |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require individual analysis, and it is recommended to test on your own samples before finalizing settings.

## Three Common Misconfigurations
- Configuring `toolChoice` as `auto` results in the log error `model does not support toolChoice auto mode`. This occurs because the model's support for automatic tool selection mode was not confirmed in advance; only a subset of models with advanced tool calling capabilities support this configuration.
- After publishing the application, calling via the API returns no data, with an API status code of `400 Bad Request` and an empty `plugin_response` field. This occurs because external call permissions were not enabled in the plugin configuration, or data source API authentication parameters were not correctly configured.
- Tool calling results are output directly without being passed as context, so the large language model-generated due diligence report does not include structured data returned by tools. This occurs because tool calling results were not passed to the large language model via context parameters; tool calling was configured but not linked to the subsequent generation step.

## How to Confirm Successful Configuration
- Call the test interface, check if the `tool_call_results` field includes expected data such as precious metal quotes and inventory, and verify that field units match the report's requirements.
- Check the authentication status indicator on the plugin configuration page, confirm that authentication parameters for all data sources have passed verification, and there are no errors of the type `invalid api key`.
- Trigger a complete due diligence report generation process, check if the large language model-generated content references structured data returned by tools, rather than using generic descriptions.
- Adjust the `tool_call_batch_size` parameter, compare generation results across different batch sizes, and confirm that the batch setting meets the report's product coverage requirements.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
