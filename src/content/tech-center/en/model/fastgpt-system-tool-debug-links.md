---
title: Generate and Use FastGPT System Tool Debug Links
slug: /en/model/fastgpt-system-tool-debug-links
page_type: Model guides
source: https://doc.fastgpt.cn/en/plugin/system-tool-development
source_type: Official documentation
---

# Generate and Use FastGPT System Tool Debug Links

## Remote Debugging Overview
FastGPT system tool remote debugging enables local development and validation of custom system tools by establishing a connection between your local CLI and the FastGPT test environment. This workflow avoids the need for early deployment to live environments, supporting efficient iterative testing for engineering teams.

## Step-by-Step Debug Link Generation
Follow these structured steps to create a valid debug link for your system tool testing:
1. Sign in to the FastGPT test environment.
2. Navigate to the System Tools page, then click the Local Debug entry point.
   ![System Tools local debug entry](/imgs/plugins/system-tool-debug-entry.png)
3. In the modal window that opens, select Generate Link and copy the generated debug link to your local development clipboard.
4. If an active debug session already exists, click Refresh Link to generate a new connection key. The prior debug link will be immediately invalidated once a new one is created.
   ![Generate local debug link](/imgs/plugins/system-tool-debug-link.png)

## Critical Usage Restrictions
All generated debug links are strictly limited to connecting your local CLI to the FastGPT test environment. To protect the integrity of your test environment, follow these mandatory rules: do not commit debug links to code repositories, do not include debug links in documentation examples, and do not share debug links in chat logs. This ensures that only authorized local developers can utilize the debug link to access the test environment.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/plugin/system-tool-development)

## Applicability and version scope

Use this page for the documented Model guides scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
