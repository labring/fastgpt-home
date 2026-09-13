---
title: Reinstall FastGPT System Tools During Upgrade
slug: /en/deploy/fastgpt-reinstall-system-tools-upgrade
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41500
source_type: Official documentation
---

# Reinstall FastGPT System Tools During Upgrade

## Overview
After upgrading the FastGPT plugin service for self-hosted deployments, reinstalling all legacy system tools is a required step to maintain full feature compatibility and operational stability. This page outlines two official, supported methods for completing this reinstallation workflow.

## Bulk Reinstallation via Official Zip Package
This streamlined batch method installs all pre-packaged system tools in a single operation:
1. Download the official zip package containing all system tools from the fixed public URL: `https://github.com/labring/fastgpt-img/raw/refs/heads/main/fastgpt-official-plugins(1).zip`
2. Launch the FastGPT web application, then navigate to the `Admin` panel via the top navigation bar.
3. Select the `Add Plugin` option, then choose the `Import/Update Plugin` menu item to access the bulk installation interface.
4. Upload the downloaded zip package to the FastGPT web interface, then confirm the installation to finalize the bulk reinstall of all system tools.

## Individual Marketplace Installation
For teams that prefer to deploy system tools individually rather than using the bulk zip package, you can access the official FastGPT plugin marketplace at `https://v2.marketplace.fastgpt.cn`. The default environment variable for FastGPT now automatically resolves to this marketplace address, so no additional marketplace-related environment variables need to be configured to use this workflow. Each individual system tool can be selected and installed directly from the marketplace interface.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41500)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
