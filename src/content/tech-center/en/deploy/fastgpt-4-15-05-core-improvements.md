---
title: FastGPT 4.15.05 Core Platform Improvements
slug: /en/deploy/fastgpt-4-15-05-core-improvements
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41505
source_type: Official documentation
---

# FastGPT 4.15.05 Core Platform Improvements

## UI & Frontend Usability Fixes
This update includes several frontend quality-of-life and display improvements. First, HTML output automatically switches to preview mode immediately after generation, removing the need for manual preview window opening. Second, app, dataset, file, and folder names now truncate to fit available container width, with full, untruncated names displayed when hovering over truncated text. Third, invalid dataset citation markers are filtered out to clean up displayed reference content and reduce visual clutter.

## LLM & Tooling Security & Compatibility Updates
Multiple improvements address LLM compatibility and tool execution security.

### Removed LLM Request Parameters
Built-in LLM requests no longer include the following optional parameters, resolving compatibility issues with certain models:
| Parameter | Action |
|-----------|--------|
| `temperature` | Removed from all built-in LLM requests |
| `max_tokens` | Removed from all built-in LLM requests |

When a connected tool returns an empty response, FastGPT automatically inserts the string "none" to prevent errors from models that require non-empty tool response inputs. A secondary permission check is now enforced prior to running any system tool, adding an extra layer of access validation before sensitive operations execute.

## Dataset Indexing & Error Handling Enhancements
Dataset management and error resolution workflows are streamlined in this update. Improved error prompts now provide clear, actionable details for dataset indexing failures, and include a one-click retry option for all failed indexing items. Additionally, SSRF checks are optimized to account for redirect responses, strengthening the security of outbound network requests made during dataset processing and other platform operations.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41505)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
