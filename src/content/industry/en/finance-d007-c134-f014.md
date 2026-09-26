---
title: Form and Interaction for Condiment Yield Rates
slug: /en/industry/finance-d007-c134-f014
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Form and Interaction for Condiment Yield Rates
meta_description: Data sources include dealer inventory and sales data from the national condiment industry monitoring platform, real-time transaction data from offline
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Form and Interaction for Condiment Yield Rates

## What this category's data looks like
Data sources include dealer inventory and sales data from the national condiment industry monitoring platform, real-time transaction data from offline supermarket POS terminals, and brand manufacturers' ex-factory quotation systems.
Update frequency: daily updates for terminal retail prices, weekly updates for average ex-factory prices and channel inventory data.
Document files use structured CSV or JSON format, and contain product SKU, brand name, sales region, statistical cycle, and price fields. For units: price fields use yuan/500g and yuan/bottle; inventory fields use box and piece. Some segmented categories such as soy sauce and vinegar will additionally add labels for brewing or preparation types.

## Constraints imposed on form and interaction by these characteristics
Daily updated terminal price data requires the form to include interactive components for quickly switching statistical cycles by day, week, or month. Multi-unit price and inventory fields require the form to have a built-in unit conversion module to prevent errors from manual user conversions. Structured documents with multiple SKU attributes require the form to support batch uploading of SKU lists and automatic matching of corresponding data fields. Cross-regional sales data requires the form to add a region filter dropdown box, which synchronously updates the available data range for the selected region during interaction. Weekly updated channel inventory data requires setting an automatic pull trigger node for weekly data in the form to avoid manual repeated imports.

## How to set configurations
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `maxContext` | `800–1200 characters` | A single structured record of condiment price data is approximately 100 characters. Sufficient context must be retained after batch import for the model to associate SKUs and prices, avoiding truncation of key fields. |
| `UPLOAD_FILE_MAX_SIZE` | `500 MB` | Monthly SKU price data files uploaded in a single batch typically do not exceed 300 MB. Redundant space is reserved to accommodate batch import requirements. |
| `PARSE_FILE_TIMEOUT_SECONDS` | `300 seconds` | Parsing time for structured CSV files increases with the number of SKUs. 300 seconds covers the parsing process for most batch import scenarios. |
| `recall count` | `top 8 entries` | There are many segmented condiment categories. Too many recalled entries will cause the model to lose focus, while too few will fail to cover the association between regions and prices. |
| `similarity threshold` | `0.75–0.85` | Accurate matching of SKU names and region labels is required. A threshold that is too low will introduce irrelevant category data, while a threshold that is too high will fail to match similar SKU names. |
| `workflow input field mapping` | `map by SKU + sales region` | The core association dimensions of condiment price data are SKU and sales region. This ensures precise matching between input data and model queries. |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require case-by-case analysis. It is recommended to test on your own samples before finalizing.

## Three common configuration errors
- Phenomenon: The AI model cannot be selected in the classify module when editing the workflow, but can be called normally after publishing. Reason: The model selection list in the editing interface only displays models currently bound to the project. The publishing process automatically inherits the global model configuration.
- Phenomenon: After setting the `maxContext` parameter, the content returned by the model is accidentally truncated. Reason: The context window threshold of the workflow was not adjusted synchronously, resulting in inconsistency between the local configuration and the workflow global parameters.
- Phenomenon: After chaining two AI chat nodes in a workflow, the final output includes the reply content from the first node. Reason: Non-target fields from the preceding node were not filtered in the input configuration of the second AI node, causing redundant content to be included.

## How to confirm successful configuration
- Upload a test structured data file, check whether the parsed field list matches the header of the uploaded file.
- Trigger workflow execution, verify that input parameters are correctly mapped to the preset core business fields.
- Initiate a price query request for a single SKU, check that the returned result fields and units conform to the preset configuration.
- Trigger the batch data import process, confirm that the system completes parsing within a reasonable time frame with no error messages.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
