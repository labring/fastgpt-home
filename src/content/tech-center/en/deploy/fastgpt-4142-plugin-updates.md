---
title: FastGPT 4.14.2 Plugin Update Fixes and Additions
slug: /en/deploy/fastgpt-4142-plugin-updates
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-14/4142
source_type: Official documentation
---

# FastGPT 4.14.2 Plugin Update Fixes and Additions

## Plugin Update Overview
This document outlines plugin-specific changes included in FastGPT version 4.14.2 for self-hosted instances. The changes address existing bugs, optimize development workflows, and expand the range of available plugin tools. These updates apply exclusively to plugin functionality, with no core platform modifications outside the listed optimizations. Operators can deploy these changes to enhance plugin reliability and add new functional capabilities to their FastGPT deployments.

## Resolved Bugs and Performance Improvements
Four targeted improvements are included in this update:
1.  Restored missing avatars for both sub-tools and individual models, fixing inconsistent visual branding across plugin interfaces.
2.  Corrected an incorrect Mongoose dependency reference in the Worker module, which previously threw runtime errors for tools executing longer than 10 seconds. This resolves a critical failure point for long-running plugin workflows.
3.  Optimized hot reload behavior in development mode: static files are no longer re-uploaded during hot reload, reducing unnecessary resource consumption and speeding up local plugin development cycles.

## New Plugin Integrations
The following new plugins and configuration options are added:
| Plugin Name | Key Details |
|-------------|-------------|
| 5118 SEO Keyword Mining Tool | Native tool for automated SEO keyword research |
| Tavily Content Extraction | Adds advanced configuration options for Tavily integration, plus a website sitemap generation tool |
| WeChat Official Account Toolkit | Full toolkit for integrating workflows with WeChat Official Accounts |
| Document Comparison Tool | Tool for side-by-side content comparison across multiple documents |
| Model Presets | Pre-configured presets for Kimi V2 and GPT 5.1 models |

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-14/4142)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
