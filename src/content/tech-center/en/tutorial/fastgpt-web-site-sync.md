---
title: Configure FastGPT Web Site Dataset Sync
slug: /en/tutorial/fastgpt-web-site-sync
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/dataset/websync
source_type: Official documentation
---

# Configure FastGPT Web Site Dataset Sync

# Overview
FastGPT Web Site Sync is a crawler-powered tool that automatically discovers all web pages under the same domain as a specified entry URL, streamlining the process of building FastGPT knowledge datasets. The tool is designed exclusively for static websites, with a primary use case of quickly generating datasets from technical documentation sites. It enforces a hard limit of 200 automatically discovered sub-pages per single sync operation to prevent excessive resource usage.

# Eligibility Restrictions
FastGPT Web Site Sync only supports static websites, which serve pre-rendered HTML content directly to client requests. Most Chinese-language media platforms are not compatible with this tool, including WeChat Official Accounts, CSDN, and Zhihu. These platforms typically use dynamic rendering or content delivery networks that block standard crawler requests, making them ineligible for sync.

# Static Site Validation
To confirm whether a target website supports FastGPT Web Site Sync, run the following curl command in a terminal:
```bash
curl https://doc.fastgpt.io/guide/getting-started
```
This command sends a direct HTTP GET request to the specified URL without additional client-side rendering tools. A valid static site will return fully formatted HTML content in the terminal response, confirming that the page can be crawled without additional processing.

# Core Configuration Rules
All FastGPT Web Site Sync operations follow fixed, platform-defined parameters:
| Parameter | Description | Limit |
|-----------|-------------|-------|
| Entry URL | The mandatory starting point for the crawl, which establishes the base domain for all discovered pages | No default, must be user-provided |
| Domain Matching | Only web pages sharing the exact domain of the entry URL will be included in the crawl | N/A |
| Maximum Sub-Pages | Total number of automatically discovered pages per sync | 200 |

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/dataset/websync)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
