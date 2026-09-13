---
title: Update FastGPT System Plugins for 4.14.6 Upgrade
slug: /en/deploy/fastgpt-plugin-update-4146
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-14/4146
source_type: Official documentation
---

# Update FastGPT System Plugins for 4.14.6 Upgrade

## Mandatory System Plugins for 4.14.6
This section outlines the system plugins that require updates as part of the FastGPT 4.14.6 self-hosted upgrade process. Skip this step entirely if your FastGPT deployment is already running version 4.14.6, as these plugins will already be compatible with your current release. The required plugins and their core functions are:
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

## Step-by-Step Plugin Update Procedure
Follow these official steps to update the listed system plugins:
1. Log in to your self-hosted FastGPT admin dashboard.
2. Navigate to the Plugin Marketplace section in the dashboard’s main navigation menu.
3. Search for or locate each plugin from the mandatory list within the marketplace.
4. For any plugin that shows an available update, select the update option to install the latest compatible version.
5. Repeat steps 3 and 4 for all required plugins to complete the update workflow.

## Post-Update Verification
After updating all listed plugins, confirm that each plugin operates correctly within your FastGPT deployment. This can include running test workflows for each plugin type, such as decoding a Base64 string, generating a test image, or parsing a sample PDF document. If updates are not visible in the marketplace, refresh the marketplace cache or restart your FastGPT backend services to refresh available plugin data.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-14/4146)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
