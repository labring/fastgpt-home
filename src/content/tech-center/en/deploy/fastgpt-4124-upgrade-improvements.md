---
title: FastGPT 4.12.4 Key Functional Upgrade Improvements
slug: /en/deploy/fastgpt-4124-upgrade-improvements
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-12/4124
source_type: Official documentation
---

# FastGPT 4.12.4 Key Functional Upgrade Improvements

This document outlines the targeted improvements included in the FastGPT 4.12.4 self-hosted release, based on official release documentation.

### Permission Inheritance Optimization
Prior to version 4.12.4, any child resource with elevated permissions relative to its parent resource would forcibly break permission inheritance workflows. This update removes that restrictive behavior, allowing child resources to retain their higher permission levels while maintaining valid inheritance structures for all linked resources. No additional configuration is required to activate this change; it is enabled automatically after completing the 4.12.4 upgrade.

### UI and User Experience Refinements
Several UI and workflow improvements have been implemented to streamline daily operations:
- The prompt editor now supports native list rendering, enabling creation and display of structured bulleted or numbered list content within prompt templates.
- When navigating back from an individual dataset data page to the main Dataset list, the interface retains the previously selected pagination page, eliminating the need to re-navigate to the correct dataset entry after reviewing individual data items.
- Following successful file uploads to a Dataset, the interface returns to the directory where the files were uploaded, rather than resetting to the dataset root directory, simplifying sequential bulk upload tasks.
- The user selection UI has been refined to improve visibility of selected user entries and reduce load times for large user dropdown menus.

### Operational Performance and Summary Table
The app deletion workflow has been optimized to reduce unnecessary database transaction operations, lowering system resource contention and speeding up bulk app cleanup tasks. For a complete overview of all 4.12.4 improvements, see the table below:

| Improvement Category | Specific Change |
|----------------------|-----------------|
| Permission Control | Child resources with higher permissions than parents no longer forcibly break inheritance |
| UI/UX | Prompt editor supports list rendering |
| UI/UX | Dataset list pagination preserved when navigating back from data pages |
| UI/UX | Upload view returns to source directory after successful uploads |
| Performance | Reduced transaction operations during app deletion |
| UI/UX | User selection UI refined for better usability |

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-12/4124)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
