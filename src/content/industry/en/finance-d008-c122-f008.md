---
title: Tool Calling and Plugins for Joint-Stock Bank Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c122-f008
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Tool Calling and Plugins for Joint-Stock Bank Intelligent
meta_description: Data sources for joint-stock bank intelligent due diligence reports include internal credit files, quarterly/annual financial reports, regulatory
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Tool Calling and Plugins for Joint-Stock Bank Intelligent Due Diligence Reports

## What the data for this category looks like
Data sources for joint-stock bank intelligent due diligence reports include internal credit files, quarterly/annual financial reports, regulatory submission ledgers, and external credit reporting and industrial and commercial public API interfaces. Data update frequencies differ. Credit files update in real time as customer credit status changes. Financial reports update on a quarterly and annual basis. Regulatory ledgers update with monthly submissions.

Document structures typically include modules such as basic due diligence subject information, detailed financial indicators, risk control rating results, related party transaction records, and collateral contract summaries. Most fields are structured numerical values and text labels. Numerical fields uniformly use ten thousand yuan and hundred million yuan as units. Rating fields use standardized letter grades such as AA and BBB.

## How these characteristics impose constraints on tool calling and plugins
Mixed access to multi-source data requires tool plugins to support unified calls for internal interfaces and external APIs. This prevents data format incompatibility issues. Differently timed data updates require differentiated caching configurations. For example, real-time credit data must disable local caching. Quarterly financial report data can use daily caching.

Standardized field units require tool calls to automatically verify parameter unit matching. This prevents parsing errors where values and units do not align. The presence of long documents and multi-modal attachments requires plugin calls to support pagination parsing and chunked processing. This prevents single-call timeouts or memory overflow.

## How to set configurations
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `UPLOAD_FILE_MAX_SIZE` | `500 MB` | Joint-stock bank due diligence reports often include multi-page financial report scans and attachments. This value covers file upload requirements for most conventional scenarios |
| `TOOL_CALL_TIMEOUT` | `120 seconds` | A single due diligence report requires calls to multiple tools such as financial parsing, related party query, and risk control rating. This duration covers average cross-interface call latency |
| `PARSE_TABLE_STRICT_MODE` | Enabled | Financial table fields in due diligence reports have strict unit requirements. Strict mode prevents unit parsing errors and improves structured data accuracy |
| `SESSION_PERSIST_DURATION` | `7 days` | Joint-stock bank due diligence processes often span multiple working days. This configuration retains complete session context to ensure consistent tool calling |
| `MAX_TOOL_CALL_STEPS` | `8 times` | The tool calling chain for a single due diligence report typically includes 5-7 steps. This upper limit avoids invalid circular calls while covering full workflow requirements |

> The parameter values provided on this page are common starting points for configuration setup. Actual values are affected by material format, data volume, and business rules. Each case requires specific analysis. It is recommended to test on your own samples before finalizing settings.

## Three common configuration mistakes
- Symptom: A `400 <400> InternalError.Algo.InvalidParameter: Multimodal file size is` error is returned when calling multi-modal parsing plugins. Cause: The `UPLOAD_FILE_MAX_SIZE` configuration was not adjusted, and the uploaded due diligence report scan exceeded the platform default limit.
- Symptom: Outputs from the tool calling module in a workflow are forcibly returned to the conversation interface and cannot be hidden. Cause: The `show_tool_output` switch for tool calling was not disabled. The default configuration is enabled.
- Symptom: Input text "分享" is parsed as "分交" when calling a tool. Cause: The `INPUT_NORMALIZE` configuration was not enabled. Candidate words from Chinese input methods were not properly truncated, leading to input escaping errors.

## How to confirm configurations are set correctly
- Upload the largest-sized single due diligence report scan, verify that plugin calls have no parameter errors, and adjust `UPLOAD_FILE_MAX_SIZE` based on actual file sizes.
- Run a test workflow that includes multiple tool calls, confirm that session context remains consistent across multiple calls, and adjust `SESSION_PERSIST_DURATION` based on the due diligence process cycle.
- Input test text containing easily confused words, verify the input parsing result during tool calling, and confirm whether the `INPUT_NORMALIZE` configuration is suitable for the scenario.
- Run a test after disabling the tool output switch, confirm that the conversation interface only displays the final conclusion with no intermediate tool calling content.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
