---
title: Reinstall FastGPT System Tools During Upgrade
slug: /en/deploy/fastgpt-system-tools-reinstall
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41504
source_type: Official documentation
---

# Reinstall FastGPT System Tools During Upgrade

## System Tool Reinstallation Overview
This section covers the required process to reinstall or update FastGPT’s built-in system plugins, a necessary step during certain FastGPT version upgrades including the 4.15.x release family. Two official supported methods are available: a bulk import workflow using a pre-packaged zip archive, or individual tool installation via the FastGPT plugin marketplace.

## Bulk Reinstall via Official Plugin Zip Package
This streamlined workflow reinstalls all legacy system tools in a single action, with the following concrete steps:
1. Download the complete set of official system tools zip package from the provided source URL: `https://github.com/labring/fastgpt-img/raw/refs/heads/main/fastgpt-official-plugins(1).zip`
2. Launch the FastGPT web application, then navigate to the `Admin` panel via the top navigation bar.
3. Select the add plugin option, followed by the `Import/Update Plugin` menu selection.
4. Upload the downloaded zip package when prompted, then confirm the action to complete the bulk reinstallation of all system tools.

## Individual Plugin Installation via Marketplace
For users who prefer to install system tools individually rather than using the bulk zip package, separate plugin downloads are available through the FastGPT plugin marketplace. Before the official stable release of this upgrade, the valid marketplace URL is `https://v2.marketplace.fastgpt.cn`. All available system tools can be browsed and installed one at a time through this platform.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41504)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
