---
title: Tool Calling and Plugins for Advertising and Marketing Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c062-f008
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Tool Calling and Plugins for Advertising and Marketing
meta_description: Data sources for advertising and marketing intelligent due diligence reports include exported data from advertising platform APIs, offline media rate
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Tool Calling and Plugins for Advertising and Marketing Intelligent Due Diligence Reports

## Data characteristics for this category
Data sources for advertising and marketing intelligent due diligence reports include exported data from advertising platform APIs, offline media rate card documents, structured third-party public opinion monitoring reports, and brand-side campaign execution ledgers.
Update cycles vary significantly. Real-time campaign data updates hourly. Media rate cards update quarterly. Public opinion monitoring data updates daily.
The structure of a single report includes advertising subject qualification fields, campaign material details fields, campaign performance data fields, and compliance audit record fields.
Units follow standard business units. For example, ad impressions use times as the unit, reached audience volume uses people as the unit, and campaign duration uses seconds as the unit.

## Constraints for tool calling and plugin workflows
Multi-source heterogeneous data formats require the tool calling chain to support parsing and adaptation of multiple input types, including API-structured data, PDF rate card documents, and image materials.
Differences in update cycles require flexible configuration of tool scheduled trigger parameters. This supports short-cycle pulling of real-time campaign data and regular synchronization of quarterly media rate cards.
Fields have a high degree of standardization with clear units. Tools need preset field mapping rules to avoid unit confusion during parsing.
Advertising materials often include base64-encoded images. The tool chain must integrate image parsing plugins to ensure normal recognition and display of material content.

## Configuration settings
| Configuration Key | Recommended Value | Rationale |
| --- | --- | --- |
| `PARSE_FILE_TIMEOUT_SECONDS` | `150 seconds` | Advertising due diligence reports involve multi-source data parsing, which takes longer than general documents. Extend the timeout period |
| `UPLOAD_FILE_MAX_SIZE` | `600 MB` | Advertising materials include high-definition images and video clips. Adapt to large attachment upload requirements |
| `TOOL_CALL_RETRY_COUNT` | `3 times` | Third-party advertising platform APIs may have temporary fluctuations. Retries reduce call failure rates |
| `IMAGE_BASE64_PARSE_ENABLE` | `Enabled` | Advertising due diligence reports often include base64-encoded materials. Support parsing and rendering |
| `FIELD_MAPPING_TEMPLATE` | `Advertising Marketing Due Diligence Standard Template` | Advertising due diligence data fields have a high degree of standardization. Preset templates reduce parsing deviations |
| `PLUGIN_EXEC_ORDER` | `Execute in sequence per node (serial execution)` | Due diligence report generation requires data pulling, parsing, and integration to be completed in order. Serial execution ensures process correctness |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material format, data volume, and business rules. Analyze specific cases individually, and test on your own samples before finalizing.

## Three common mistakes
- Phenomenon: After the tool calling node runs, the original request or response content output by the model is exposed in the chat window. Cause: The `TOOL_CALL_HIDE_OUTPUT` configuration item is not enabled, causing tool execution logs to be directly synchronized to the conversation window.
- Phenomenon: The tool calling node runs to the database connection step without a response, and the interface shows a timeout status. Cause: The database access whitelist is not configured, or the port number in the connection parameters does not match the actual deployment port, causing a connection timeout.
- Phenomenon: Base64-encoded advertising material images cannot be rendered normally in the chat window. Cause: The `IMAGE_BASE64_PARSE_ENABLE` configuration item is not enabled, or the base64 string prefix does not include the correct MIME type identifier.

## How to verify correct configuration
- Run a tool calling test, and check if the original logs of tool execution are hidden in the chat window. Confirm that the `TOOL_CALL_HIDE_OUTPUT` configuration takes effect.
- Upload advertising material attachments that fit the business scenario, and verify that the upload function operates normally. Confirm that the `UPLOAD_FILE_MAX_SIZE` configuration meets business requirements.
- Paste a compliant base64-encoded string of advertising materials, and check if it renders normally as an image. Confirm that the image parsing configuration is correct.
- Simulate a third-party advertising platform API call, and verify that the tool retry logic triggers. Confirm that the `TOOL_CALL_RETRY_COUNT` configuration aligns with actual call scenarios.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
