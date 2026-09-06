---
title: FastGPT 4.14.6 List of Resolved Bug Fixes
slug: /en/deploy/fastgpt-4146-resolved-bug-fixes
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-14/4146
source_type: Official documentation
---

# FastGPT 4.14.6 List of Resolved Bug Fixes

This document outlines the bug fixes included in FastGPT version 4.14.6, addressing operational, UI, and asset path issues identified in prior releases. All fixes are targeted at improving reliability and user experience for self-hosted FastGPT deployments.

## System Tool Configuration Fixes
This section covers fixes related to system toolkit secret key access, tool tag validation, and workflow editor links:
1. Secret Key Access for Child Tools: After setting system secret keys for a system toolkit, child tools previously could not read the configured secret values. This release resolves the permission and retrieval logic to allow child tools to access the configured secrets correctly.
2. Tool Tag Empty Value Filtering: Prior to v4.14.6, empty values were not filtered when configuring tool tags, leading to unintended invalid tag entries. The update now automatically strips empty values during the tool tag configuration process to ensure only valid tags are saved.
3. Workflow Editor System Tool Link: The "Explore More" link for system tools on the workflow editor page had an incorrect target URL. This fix updates the link to point to the correct official resource location, ensuring users are directed to the proper documentation or tool repository.

## UI and Asset Path Corrections
This section addresses visual and asset loading issues:
1. Date Picker Overflow Fix: The date picker component previously overflowed its container on certain screen sizes, disrupting the user interface. The update implements dynamic position adaptation to automatically adjust the date picker's placement, ensuring it renders correctly within its designated space across all supported screen dimensions.
2. Default Model Avatar Path Fix: The default model avatar path `/imgs/model/huggingface.svg` was incorrect in prior versions, leading to broken image displays for Hugging Face models. This release updates the path to the correct asset location, restoring proper avatar rendering for default Hugging Face model entries.

## Post-Upgrade Verification Steps
To confirm all fixes are applied correctly in your self-hosted FastGPT deployment, follow these steps:
1. Navigate to the System Toolkit management page in the FastGPT admin interface.
2. Create a new system toolkit, add a valid secret key, and save the configuration.
3. Launch a child tool linked to the updated system toolkit, then check the tool's execution logs or configuration panel to confirm the secret key is accessible.
4. Open the workflow editor page, locate the system tools panel, and verify the "Explore More" link directs to the correct URL.
5. Access the tool tag configuration screen, input both valid tag names and empty values, then save the changes. Confirm that only non-empty tags are retained in the configuration.
6. View a model card that uses the default Hugging Face avatar, and check that the avatar image loads correctly without broken link errors.
7. Test the date picker component on any scheduling or configuration page, and confirm it does not overflow its container when resizing the browser window.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-14/4146)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
