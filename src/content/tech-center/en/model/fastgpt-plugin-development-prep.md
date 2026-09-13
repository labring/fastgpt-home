---
title: Collect Required Data Before FastGPT Plugin Development
slug: /en/model/fastgpt-plugin-development-prep
page_type: Model guides
source: https://doc.fastgpt.cn/en/plugin/system-tool-development
source_type: Official documentation
---

# Collect Required Data Before FastGPT Plugin Development

## Pre-Development Planning Overview
Before starting coding for a FastGPT system plugin, teams must finalize core operational and metadata details to ensure stable deployment. Critical platform identifiers cannot be modified after publication, so all required information must be confirmed prior to initiating development work.

## Mandatory Pre-Development Information
The following table lists all required details to collect before coding:

| Information                      | Description                                                                                 |
| -------------------------------- | ------------------------------------------------------------------------------------------- |
| Plugin type                      | `tool` or `tool-suite`.                                                                     |
| Plugin ID                        | `pluginId`, globally stable and unique. Keep it unchanged after publishing.                 |
| Child tool ID                    | Required for Toolkits. `children[].id` stays unchanged after publishing.                    |
| Chinese and English names        | `name.en` and `name.zh-CN`.                                                                 |
| Chinese and English descriptions | `description.en` and `description.zh-CN`.                                                   |
| Inputs                           | Type, constraints, default value, UI title, and description for each field.                 |
| Outputs                          | Type, meaning, and downstream usage for each field.                                         |
| Secrets                          | API Key, Base URL, username/password, and similar values, described through `secretSchema`. |
| External API                     | Request method, auth method, timeout, rate limit, error response, and test account.         |
| File capability                  | Use `ctx.invoke.uploadFile()` when file upload is needed.                                   |
| Streaming output                 | Use `ctx.streamResponse()` when intermediate progress should be shown to the user.          |
| Test cases                       | Include at least success, invalid parameters, auth failure, and upstream failure.           |

## Critical Validation Rules
Any missing information that impacts plugin ID, authentication method, billing, or listing security must be confirmed prior to coding. For all other non-critical missing details, teams may use reasonable default values, with all assumptions clearly recorded in submission notes for review. Additionally, two built-in helper functions are available for common plugin workflows: `ctx.invoke.uploadFile()` for handling file uploads, and `ctx.streamResponse()` for displaying real-time intermediate progress to end users. All plugins must include test cases covering four core scenarios: successful execution, invalid parameter inputs, authentication failure, and upstream service failure.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/plugin/system-tool-development)

## Applicability and version scope

Use this page for the documented Model guides scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
