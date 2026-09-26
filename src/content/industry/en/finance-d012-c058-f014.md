---
title: Forms and Interactions for Minor Metals Marketing Content
slug: /en/industry/finance-d012-c058-f014
page_type: Industry scenario page
article_section: Marketing Content and Lead Generation
is_part_of: FastGPT Tech Center
meta_title: Forms and Interactions for Minor Metals Marketing Content
meta_description: Minor metals-related data primarily comes from the Minor Metals Branch of China Nonferrous Metals Industry Association, Shanghai Futures Exchange
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Forms and Interactions for Minor Metals Marketing Content

## What Data for This Category Looks Like
Minor metals-related data primarily comes from the Minor Metals Branch of China Nonferrous Metals Industry Association, Shanghai Futures Exchange, General Administration of Customs import and export statistics, and public reports from leading mining enterprises. Spot market data is updated daily. Inventory data is updated weekly. Import and export data is updated monthly. Industry production capacity data is updated annually. Most related documents are structured tables, with fields including product name, specification, origin, quotation, price change, trading volume, and more. Units include yuan/kilogram, yuan/ton, and ton. A single industry weekly report is approximately 10 to 20 pages long, covering 15 to 20 common minor metals varieties.

## What Constraints Do These Characteristics Impose on Forms and Interactions
Multiple data sources and differentiated update rhythms require forms to support scheduled pull rules configured by data type. During interaction, data update times must be clearly marked to prevent users from accessing expired information. Many fields and inconsistent units require forms to include a built-in unit automatic conversion component, with real-time unit labels during input to reduce input errors. Coverage of multiple varieties requires the category selection component in forms to support linked filtering; selecting a category automatically loads corresponding specification and origin options. High density of proper nouns requires the intent recognition module to be optimized specifically for minor metals categories, to avoid generic recognition confusing similar category names.

## How to Configure Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `Recall Count` | `Top 10-15 entries` | Minor metals data has high information density per entry. Too many recalled entries will exceed the context window, and users' core focus on market data is concentrated in the first few entries. |
| `Similarity Threshold` | `0.75-0.85` | Minor metals category names have many near-synonyms, such as "cobalt" and "lithium cobalt oxide". A threshold that is too low will introduce irrelevant data, while a threshold that is too high will miss precisely matched segmented category data. |
| `PARSE_FILE_TIMEOUT_SECONDS` | `600 seconds` | Minor metals industry weekly reports contain data for multiple varieties, leading to long parsing times. Default timeout settings may cause parsing failures. |
| `Segment Length` | `800-1200 characters` | The combination of field descriptions and market data for minor metals results in a moderate single segment length, avoiding splitting that breaks data relevance. |
| `Reranked Return Count` | `Top 3-5 entries` | Marketing content needs to focus on core market data. Too many entries will distract users. |
| `Data Source Scheduled Update Interval` | `Configured by category group` | Different minor metals data has different update frequencies. Corresponding intervals can be set by types such as spot, inventory, and import and export. |

> The parameter values provided on this page are all conventional recommendations, used as starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require specific analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Misconfigurations
- Phenomenon: After configuring the `LLM_MODEL` to the v2 version, billing records for the v1 version are still generated during calls. Cause: The model name was only set in the global configuration, and the model key for the corresponding version was not bound in the LLM call node of the workflow.
- Phenomenon: Empty values are returned when extracting minor metals category fields in forms. Cause: Custom entity recognition rules for minor metals proper nouns were not configured, and generic entity recognition cannot cover naming differences for segmented categories.
- Phenomenon: After enabling the reranking model, the number of returned results does not match the configured value. Cause: The result display count prompt was not updated synchronously in the interaction node, leading to a mismatch between user expectations and actual output.

## How to Confirm the Configuration Is Complete
- Submit test input containing specific minor metals category names, and check whether the fields extracted by the form include correct product names, specifications, and unit information.
- Trigger the data source pull task, and check whether all configured minor metals variety data is loaded normally in the parsing logs.
- Enable workflow debug mode, and check the context parameters during LLM calls to confirm that the model version matches the configured value.
- Simulate user queries for minor metals data with different update frequencies, and check whether the interaction reply correctly marks the update time of the corresponding data.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
