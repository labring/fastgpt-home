---
title: FastGPT 4.14.8 Official Bug Fix Details
slug: /en/deploy/fastgpt-4-14-8-bug-fixes
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-14/4148
source_type: Official documentation
---

# FastGPT 4.14.8 Official Bug Fix Details

## FastGPT 4.14.8 Official Bug Fix Details
This document details the targeted technical resolutions included in the FastGPT 4.14.8 self-hosted update. Four specific issues affecting core platform functionality are addressed, with no additional non-technical changes included in this release.

## Detailed Bug Fix Breakdown
The following table lists each resolved issue and its corresponding fix:
| Issue Category               | Specific Problem                                                                 | Resolved Change                                                                 |
|-------------------------------|----------------------------------------------------------------------------------|---------------------------------------------------------------------------------|
| MCP Service Compatibility     | Errors caused by multiple consecutive connections to the same MCP service         | Fixed via updated SDK compatibility to properly handle repeated MCP service calls |
| Output Ordering               | Incorrect ordering of text and tool outputs when both are generated simultaneously and saved | Corrected output sequencing logic to preserve correct display and storage order |
| Variable Substitution         | Incorrect replacement of `$1` in input values using regex capture groups         | Fixed variable update logic to accurately handle regex capture group references  |
| API Dataset Response          | Inconsistent `title` field behavior for uploaded files in API Dataset responses  | Updated API to return the uploaded file's `title` field if provided; omit the field if no title was supplied |

## Technical Usage Notes
Each fix addresses a narrow, reproducible technical scenario:
1. The MCP service compatibility fix eliminates runtime errors that occurred when automating repeated calls to the same MCP service, improving reliability for automated workflow integrations.
2. The output ordering fix ensures that saved conversation or response data maintains the correct sequence of text and tool-generated outputs, preventing display inconsistencies in stored records.
3. The variable substitution fix resolves a common template rendering bug where `$1` references were incorrectly replaced, making input variable handling more predictable for users configuring custom prompts and workflows.
4. The API Dataset response fix standardizes the metadata returned for uploaded files, making it easier for external systems to parse file details without needing to handle missing or inconsistent field data.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-14/4148)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
