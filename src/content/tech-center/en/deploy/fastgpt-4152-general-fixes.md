---
title: FastGPT v4.15.2 General Fixes and Improvements
slug: /en/deploy/fastgpt-4152-general-fixes
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-15/4152
source_type: Official documentation
---

# FastGPT v4.15.2 General Fixes and Improvements

## Security and Infrastructure Hardening
This release includes targeted updates to reduce security risks and improve infrastructure reliability. First, the CI workflow was updated to pin all action step versions to explicit commit hashes, eliminating exposure to supply-chain attacks stemming from mutable, tag-based package versioning. Second, the high-risk archive extraction library previously used for PPTX document parsing was removed entirely, replaced with a streaming decompression and parsing workflow. This change directly mitigates the risk of arbitrary code execution via maliciously crafted archive files embedded in PPTX uploads.

## Parsing and Runtime Accuracy Fixes
Two key fixes address parsing errors and misleading runtime reporting:
1.  Custom chunk delimiter validation was updated to reject single `|` characters and consecutive `||` sequences, preventing unintended splitting of large content blocks into fragmented, unusable chunks. A reference for restricted delimiter patterns is provided below:
    | Restricted Delimiter | Mitigation Goal |
    |----------------------|-----------------|
    | Single `|`           | Prevents accidental chunk splitting |
    | Consecutive `||`     | Blocks large-scale incorrect chunk parsing |
2.  Runtime calculation logic for LoopRun iterations and ParallelRun tasks was corrected. Prior to this update, these task types summed the elapsed runtimes of all child steps to report a total value; the fix ensures each individual task item reports its own dedicated elapsed time, delivering more accurate performance metrics for debugging and monitoring.

## Application and File Handling Resolutions
Multiple backend and user-facing issues were resolved across the platform:
-  Automatic license purchase logic for WeCom edition customers was refined to eliminate duplicate or missing license purchases following successful payment.
-  Empty Tag labels in the Plugin Marketplace were fixed, restoring consistent and correct tag display for all marketplace listings.
-  Deleting a chat file while it is actively uploading now aborts both the presign and upload requests, preventing deleted files from reappearing in the chat interface or incorrectly overwriting other uploaded files.
-  File persistence, type detection, and metadata retention issues were resolved across standard uploads, draft uploads, and first-turn media messages, ensuring uploaded file data is correctly stored and accessible without corruption.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-15/4152)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
