---
title: Tool Calling and Plugins for Dairy Product Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c007-f008
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Tool Calling and Plugins for Dairy Product Intelligent Due
meta_description: Data sources for dairy product intelligent due diligence include industry association monthly monitoring datasets, publicly available financial report
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Tool Calling and Plugins for Dairy Product Intelligent Due Diligence Reports

## What the data for this category looks like
Data sources for dairy product intelligent due diligence include industry association monthly monitoring datasets, publicly available financial report documents of dairy enterprises, spot check reports from third-party testing institutions, ranch breeding records, and more. Data update rhythms fall into three categories: industry association data is updated monthly, dairy enterprise financial reports are updated quarterly, and spot check reports are released irregularly alongside spot check batches. Document types include three categories: structured Excel spreadsheets, PDF test reports, and long-form industry research reports. Core fields include batch number, milk source location, milk protein content (unit: g/100g), total bacterial count (unit: CFU/mL), additive type and content (unit: mg/kg), and shelf life (unit: days).

## What constraints these characteristics impose on tool calling and plugins
The multi-source mixed structure of dairy product due diligence data requires tool calling to support both structured table parsing and unstructured document extraction, to avoid missing information. Differences in update rhythms across data sources require tools to support both scheduled pulling and on-demand pulling modes, to meet the needs of acquiring monthly industry data and temporary spot check reports. The exclusive units and naming rules for core fields require unified field mapping and unit conversion during tool calling, to prevent result errors caused by format mismatches. Batch number, as the core associated field, requires tools to support precise retrieval by batch, as generalized keywords cannot cover all data.

## How to set the configurations
| Configuration Item | Recommended Setting | Rationale |
|---|---|---|
| `MCP_SERVER_ENABLED` | `true` | MCP service deployment is supported in versions 4.9.6 and above. Dairy product due diligence requires connecting to third-party testing data sources, so this parameter must be enabled to activate tool calling capabilities |
| `TOOL_CALL_MAX_RETRIES` | `3` | Interfaces for dairy product testing data sources may experience temporary call failures due to fluctuations in spot check batches. Retrying 3 times covers most temporary exceptions |
| `KNOWLEDGE_RECALL_TOP_K` | `8–12` | Dairy product due diligence needs to cover multiple types of documents including industry standards, dairy enterprise financial reports, and spot check reports. Recalling 8 to 12 entries ensures comprehensive information |
| `PARSE_FILE_MAX_SIZE` | `200 MB` | PDF documents of dairy enterprise annual financial reports are usually large in size. This setting supports complete parsing of full document content |
| `TOKEN_LIMIT_PER_REQUEST` | `120000` | The context of dairy product due diligence reports includes multiple test reports and industry research reports. This threshold can carry complete context information |
| `OCR_ENABLED` | `true` | Dairy product test reports are often released in JPG image format. Enabling this parameter supports parsing image files and extracting fields |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require individual analysis, and it is recommended to test on your own samples before finalizing settings.

## Three common mistakes
- Phenomenon: When a workflow is run, the AI only returns content retrieved from the knowledge base, and does not call the configured test data tool. Cause: No trigger keywords for tool calling are configured in `TOOL_CONDITION`, such as "spot check report" or "batch test". This prevents the AI from determining when to call tools, and it only relies on existing knowledge base content.
- Phenomenon: After the MCP server is deployed, calling tools returns a `Connection refused` or `502 Bad Gateway` error. Cause: The listening port of the MCP service does not match the `MCP_SERVER_PORT` parameter configured in FastGPT, so cross-service communication connections cannot be established.
- Phenomenon: After a JPG file of a dairy product test report is uploaded, the conversation module cannot extract fields such as milk protein content. Cause: The `OCR_ENABLED` parameter is not enabled, and the image parsing function of the knowledge base is not configured, so test data in the image cannot be read.

## How to confirm the configuration is complete
- The test conversation interface of FastGPT can be accessed, and a due diligence query including "spot check batch" or "milk protein content" can be input. Observe whether both industry standard content retrieved from the knowledge base and test data from tool calling are returned.
- Running logs of the MCP service can be checked, to confirm that there are no `Connection refused` or `502 Bad Gateway` errors, and that updated data from dairy product testing data sources can be pulled normally.
- A JPG file of a dairy product test report can be uploaded to trigger the workflow, and confirmation can be made that the OCR tool can extract test fields and pass them to the conversation module.
- Token consumption logs of the conversation can be checked, to confirm that the token count of each call does not exceed the configured `TOKEN_LIMIT_PER_REQUEST` threshold.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
