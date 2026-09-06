---
title: Upgrade FastGPT System Plugins for 4.14.7
slug: /en/deploy/fastgpt-system-plugins-upgrade
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-14/4147
source_type: Official documentation
---

# Upgrade FastGPT System Plugins for 4.14.7

## System Plugin Update Requirements
This section outlines the required system plugin updates for FastGPT 4.14.7. This step may be skipped if your FastGPT instance has already been upgraded to version 4.14.6 or later. The following system tools require updates:
- base64Decode: Base64 decode conversion
- dallle3: DALL-E 3 image generation
- docDiff: Document diff comparison
- drawing: BI charts
- gptImage: GPT image generation
- markdownTransform: Markdown file conversion
- mineru: MinerU PDF parsing
- minimax: MiniMax chat
- openrouterMultiModal: OpenRouter multimodal
- stability: Stability image generation

## Update via Plugin Marketplace
To update using the built-in Plugin Marketplace:
1. Access your self-hosted FastGPT admin interface.
2. Navigate to the Plugin Marketplace page.
3. Locate each of the system tools listed above.
4. Select the available update option for each tool to install the latest version.

## Manual Zip Package Installation
For manual updates, use the official upgrade zip package:
1. Download the upgrade zip package from the official GitHub asset: https://github.com/labring/fastgpt-plugin/raw/refs/heads/main/.github/assets/upgrade_pkg.zip.
2. Navigate to your FastGPT plugin installation directory on your host server.
3. Extract the downloaded zip package to the plugin directory to overwrite existing outdated files.
4. Restart your FastGPT service to apply the updated plugins.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-14/4147)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
