---
title: Resolved FastGPT 492 Update Bug Fixes
slug: /en/deploy/fastgpt-492-bug-fixes
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/492
source_type: 官方文档
---

# Resolved FastGPT 492 Update Bug Fixes

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Overview of Fixed Bugs
This document outlines all resolved functional issues included in the FastGPT 492 self-hosted update. Each fix addresses a specific error or limitation present in prior FastGPT releases, improving overall platform reliability and the accuracy of core features.

## Detailed Bug Fix Breakdown
The following table lists each resolved issue, its associated affected feature, and the corresponding fix:

| Issue Description | Affected Feature | Fix Resolution |
| --- | --- | --- |
| Lark and Yuque datasets unable to sync | Third-party dataset synchronization | Resolved synchronization workflow for Lark and Yuque connected datasets |
| Channel testing used custom request URL instead of channel request URL when custom URL configured | Custom channel request testing | Corrected test URL resolution to use the assigned channel request URL when a custom URL is configured |
| Speech recognition model testing unable to test disabled models | Speech recognition model validation | Enabled testing of disabled speech recognition models during validation checks |
| Admin-configured system plugins failing authentication when plugin contains other system apps | System plugin authentication | Fixed authentication validation for system plugins that include nested system applications |
| Removing TTS custom request URL requiring the requestAuth field to be filled | TTS custom URL configuration | Removed requirement for requestAuth field when deleting a TTS custom request URL |

## Verification Steps
To confirm the fixes are applied correctly, follow these targeted steps:
1.  **Lark/Yuque Dataset Sync**: Navigate to the Dataset management page, select a connected Lark or Yuque dataset, trigger a manual sync, and confirm the sync completes without error messages.
2.  **Custom Channel Test**: Go to the Channel configuration page, create or edit a custom channel with a configured custom URL, run the channel test, and verify the test uses the channel-specific request URL instead of a global custom URL.
3.  **Disabled Speech Recognition Model Test**: Navigate to Speech Recognition > Model Management, disable an active speech recognition model, run a model test, and confirm the test executes successfully without blocking due to the model's disabled status.
4.  **System Plugin Authentication**: Access the Admin > Plugins page, create or edit a system plugin that includes nested system applications, save the configuration, and confirm the plugin authenticates successfully without errors.
5.  **TTS Custom URL Deletion**: Go to TTS > Custom URL settings, select an existing custom request URL for deletion, and confirm the deletion process completes without prompting for the `requestAuth` field.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/492)
