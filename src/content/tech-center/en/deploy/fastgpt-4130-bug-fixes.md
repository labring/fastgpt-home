---
title: Resolved Bugs for FastGPT 4.13.0 Upgrade
slug: /en/deploy/fastgpt-4130-bug-fixes
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-13/4130
source_type: Official documentation
---

# Resolved Bugs for FastGPT 4.13.0 Upgrade

This document details all resolved bugs included in the FastGPT 4.13.0 self-hosted upgrade. All fixes address core platform functionality across workflow automation, dataset management, UI editing, and media parsing, as documented below.

## Workflow & Debug Mode Fixes
This category includes bugs impacting workflow debugging, node management, and quick-add workflow tools. The following table outlines each resolved issue:

| Affected Feature | Resolved Bug Description |
| --- | --- |
| Debug Mode Global Variables | Global variables failed to pass into debug sessions |
| Debug Mode Node Parameter Transfer | Upstream node parameters did not propagate to downstream nodes during debug mode |
| Debug Mode Auto Execute | Enabling Auto Execute in debug mode skipped required external variable input |
| Workflow Node Copying | Error capture configuration was lost when copying workflow nodes |
| Suggested Questions Custom Prompt | Saved custom prompt values for the Suggested Questions tool were cleared on save |
| Workflow Quick-Add Popup | The toolbox displayed as empty on the second opening of the workflow quick-add node popup |

## Additional Core Functionality Fixes
This section covers remaining resolved bugs across voice reply, dataset handling, UI editing, and document parsing:
1. Auto voice reply functionality was fully restored, resolving non-functional voice response workflows
2. Dataset image URL assembly was corrected for deployments with a configured secondary route, fixing broken embedded image links in uploaded dataset content
3. The prompt editor no longer clears Markdown formatting during keyboard input, preserving all applied formatting as entered
4. The Dataset Collection page now auto-refreshes automatically during data processing, providing real-time updates on processing status
5. PPTX file parsing order was corrected, restoring the proper sequence of slide content during document ingestion and processing

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-13/4130)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
