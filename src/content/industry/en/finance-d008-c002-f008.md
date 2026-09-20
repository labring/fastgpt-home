---
title: Tool Calling and Plugins for Professional Services Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c002-f008
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Tool Calling and Plugins for Professional Services
meta_description: The data for professional services intelligent due diligence reports is primarily sourced from public industrial and commercial disclosure systems
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Tool Calling and Plugins for Professional Services Intelligent Due Diligence Reports

## What the data for this category looks like
The data for professional services intelligent due diligence reports is primarily sourced from public industrial and commercial disclosure systems, third-party credit reporting agencies, publicly available industry association information, and due diligence workpapers provided by project clients. Public data sources are updated in real time in accordance with regulatory requirements. Workpapers provided by clients are submitted on demand based on project progress.
Document structures typically include four core modules: basic entity information, related party relationships, compliance risk records, and financial overview. Standardized identifier fields include unified social credit code, establishment date, administrative penalty amount (unit: yuan), registered capital (unit: ten thousand yuan), among others. Customized projects may add industry-specific supplementary fields.

## What constraints these characteristics impose on tool calling and plugins
The real-time update feature of public data sources requires tool calling to be configured with scheduled snapshot pull logic, to avoid generating reports using expired data.
Workpapers provided by clients have inconsistent formats. Plugins must support multi-format unstructured file parsing, adapting to common workpaper formats such as Word and PDF.
Fields include both standardized identifiers and customized industry-specific items. Tool calling must support dynamic field mapping to prevent adaptation failures caused by hardcoding.
The large content volume from long document structures requires plugins to configure reasonable segmentation thresholds, to prevent single call timeouts.

## How to set configurations
| Configuration Item | Recommended Value | Rationale |
|---|---|---|
| `PARSE_FILE_TIMEOUT_SECONDS` | `300–600 seconds` | Professional services due diligence report workpapers usually contain multiple pages of financial data and compliance documents, with long parsing times. This interval covers the parsing needs of most conventional workpapers. |
| `UPLOAD_FILE_MAX_SIZE` | `500 MB` | A single due diligence workpaper may include multiple attachments. This upper limit covers the total attachment size of most projects, preventing upload failures. |
| `maxContext` | `8000–12000 characters` | The core content segments of due diligence reports are lengthy. This interval retains sufficient context information for tool calling and result integration. |
| `Recall Count` | `Top 8–12 entries` | Due diligence reports need to cover multi-dimensional risk points. Too many recalled entries increase processing load, while too few lead to missing key information. |
| `Similarity Threshold` | `0.75–0.85` | Precise matching of entity information from public data sources and workpapers is required, to avoid low-match irrelevant data being included in reports. |
| `Plugin Trigger Mode` | `Trigger by node` | Due diligence report generation requires step-by-step tool calls for processes including entity information collection, risk screening, and compliance verification. Triggering by node allows precise control of tool calling logic for each step.

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material format, data volume, and business rules. Specific issues require targeted analysis. It is recommended to test on your own samples before finalizing settings.

## Three common mistakes
- The symptom is that the `chatId` parameter cannot be passed continuously during API calls, causing the due diligence report generation process for the same project to fail to associate with historical context. The cause is failing to include the `chatId` field returned from the previous round in every API request, or failing to enable the session persistence switch in the configuration.
- The symptom is that a `504 Gateway Timeout` error is returned when executing a custom Python plugin. The cause is failing to adjust the `PARSE_FILE_TIMEOUT_SECONDS` parameter to match the execution duration of the Python script. The default timeout threshold cannot cover the processing flow for complex due diligence data.
- The symptom is that detailed records of internal application tool calls cannot be viewed on the conversation details page. The cause is failing to enable the "Record Tool Call Logs" switch in the application configuration, causing the system to not retain execution data from intermediate steps.

## How to confirm configurations are set correctly
- Initiate a parsing test for a single workpaper, check if the fields returned by the tool match the entity information in the workpaper, and verify that the dynamic field mapping configuration is effective.
- Call the API with the `chatId` parameter, check if the returned results include this parameter, and confirm that the session persistence logic is operating normally.
- View the log panel in the application configuration, confirm that each step of tool calling has a corresponding execution record, and verify that the "Record Tool Call Logs" switch is enabled.
- Run a custom Python plugin test script, check if the returned results meet expectations, and confirm that the binding logic between the plugin and workflow nodes is correct.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
