---
title: Tool Calling and Plugins for Software Development Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c143-f008
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Tool Calling and Plugins for Software Development
meta_description: Data sources for software development intelligent due diligence reports include code repository commit records from in-house financial systems
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Tool Calling and Plugins for Software Development Intelligent Due Diligence Reports

## What the data for this category looks like
Data sources for software development intelligent due diligence reports include code repository commit records from in-house financial systems, dependency package manifests, static code scan results, CI/CD execution logs, and open source compliance documents.
Data update frequency aligns with code commit rates. High-frequency scenarios can generate multiple updates per day. Dependency packages and compliance documents are updated on demand as projects change.
Document structure includes project metadata, dependency lists, code defect records, execution log snippets, and compliance check results. Fields include semantic version numbers, defect line counts, risk levels, and SPDX license identifiers. Single document size varies widely.

## What constraints these characteristics impose on tool calling and plugins
High-frequency updated code and dependency data requires tool calling to have low latency, to avoid disrupting compliance check workflows for financial systems.
Multi-format dependency manifests and code scan results require plugins to support parsing multiple file types, with supported file formats configured in advance.
Richly structured data requires precise filtering of core fields during tool calling, to meet disclosure requirements from financial regulators.
Cross-tool integration needs require support for batch plugin calls, with concurrency limits controlled to avoid overload.
Real-time requirements for compliance documents require balancing cache duration and data freshness, to meet compliance check timelines for financial institutions.

## How to set configurations
| Config Item | Recommended Value | Rationale |
| ---- | ---- | ---- |
| `PARSE_SUPPORTED_FILE_TYPES` | `["package.json", "requirements.txt", "pom.xml", "go.mod"]` | Covers dependency manifest formats for major programming languages, and adapts to in-house development projects common at financial institutions |
| `MCP_REQUEST_TIMEOUT` | `30 seconds` | Matches average response times for code scanning and dependency parsing, to avoid delaying compliance check workflows |
| `PLUGIN_CACHE_TTL` | `1800 seconds` | Balances freshness of dependency data and call overhead, aligns with dependency update frequencies for most financial projects |
| `RECALL_FIELD_FILTER` | `["packageName", "version", "licenseType", "riskLevel"]` | Extracts core required fields for due diligence reports, reduces invalid data transfer |
| `BATCH_PLUGIN_MAX_COUNT` | `5` | Controls the number of plugins called per request, avoids concurrent overload that impacts system stability |
| `UPLOAD_FILE_MAX_SIZE` | `500 MB` | Adapts to typical sizes of packaged code repositories, prevents upload failures |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require case-by-case analysis. It is recommended to test on your own samples before finalizing settings.

## Three common mistakes
- Symptom: Plugin call tasks get stuck in progress, with no related entries in call logs. Cause: `PARSE_SUPPORTED_FILE_TYPES` is not configured to include the target code manifest format, so no valid data flows into the parsing stage, and tasks make no progress.
- Symptom: Third-party API authentication fails, returning a `401 Unauthorized` status code. Cause: The platform's unified key management module is not used to store keys. Hardcoding keys in plugin configurations leads to leakage or failure to update expired keys.
- Symptom: Batch plugin calls return a `429 Too Many Requests` status code. Cause: `BATCH_PLUGIN_MAX_COUNT` is set too high, exceeding the concurrency limits of tool calls.

## How to confirm configurations are set correctly
- Upload a dependency manifest file for the target programming language, check if core preset fields are extracted in parsing logs to confirm the configuration takes effect.
- Trigger a single plugin call, check if corresponding request records are generated in platform call logs to confirm the timeout configuration meets business timeline requirements.
- Check plugin key configurations, confirm keys are stored via the platform's unified key management module, and are not directly exposed in configuration text.
- Upload code-related files in multiple formats, confirm parsing results cover all configured supported formats.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
