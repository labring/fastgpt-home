---
title: Configure and Use FastGPT Basic Mode File Input
slug: /en/tutorial/fastgpt-basic-mode-file-input
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/build/general/fileInput
source_type: Official documentation
---

# Configure and Use FastGPT Basic Mode File Input

## Basic Mode File Input Overview
File upload functionality in FastGPT Basic Mode enables attachment and reference of external documents during chat interactions. When enabled, the core workflow uses tool-calling mode, where the deployed language model determines whether to retrieve and analyze the content of uploaded files.

## Step-by-Step Configuration Workflow
1. Locate the file upload configuration option in the left panel of the FastGPT Basic Mode build interface.
2. Click the `Enable`/`Disable` toggle switch to open the official configuration dialog, as shown in the accompanying asset: ![Enable file upload](/imgs/fileinpu-1.png)
3. After confirming and saving the configuration, a dedicated file selection icon will appear in the chat input area of the live application.
4. Click the file selection icon to browse and select local files for upload to the active chat session, as demonstrated in the accompanying asset: ![File Input Icon in Chat Area](/imgs/fileinpu-2.png)

## Core Behavioral Specifications
Two distinct behavioral modes apply to file uploads in Basic Mode, tied to FastGPT version 4.8.13:
- Pre-4.8.13: The system uses pure tool-calling mode, requiring the language model to explicitly invoke a file reading tool to access uploaded content. This could lead to instances where the model skips file content analysis during multi-turn conversations.
- 4.8.13 and later: The system automatically parses all uploaded file content and injects the parsed text directly into the system prompt. This removes the need for the model to call a file reading tool, ensuring consistent access to file context across all conversation turns and preventing skipped file content analysis.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/general/fileInput)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
