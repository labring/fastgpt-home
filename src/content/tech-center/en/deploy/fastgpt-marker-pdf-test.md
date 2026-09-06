---
title: Test FastGPT Enhanced PDF Parsing with Marker
slug: /en/deploy/fastgpt-marker-pdf-test
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/custom-models/marker
source_type: Official documentation
---

# Test FastGPT Enhanced PDF Parsing with Marker

## Overview
This guide outlines the validated workflow for testing the enhanced PDF parsing feature powered by Marker in self-hosted FastGPT deployments. This process confirms proper integration of the external custom file parsing service, and covers both dataset file uploads and application-level file upload configurations. To access real-time parsing status updates, the FastGPT instance must have LOG_LEVEL set to either `info` or `debug`.

## Step-by-Step Parsing Validation
1.  Navigate to the FastGPT Dataset management dashboard.
2.  Upload a target PDF file, and enable the `Enhanced PDF Parsing` toggle before finalizing the upload request.
3.  Monitor the system logs for the following standard success log entries, which confirm the external parsing service ran correctly:
    ```
    [Info] 2024-12-05 15:04:42 Parsing files from an external service
    [Info] 2024-12-05 15:07:08 Custom file parsing is complete, time: 1316ms
    ```
These logs indicate the parsing process initiated via the external Marker service and completed in 1316 milliseconds for this test upload.

## Verify Parsed Content Output
After the parsing process completes, the processed PDF content will include embedded image links. Reference screenshots display the formatted dataset content with integrated image references extracted from the uploaded document, confirming that the Marker parser successfully preserved visual asset links alongside core textual data.

## Configure Application Upload Settings
The `Enhanced PDF Parsing` toggle is also available in the file upload configuration panel for FastGPT applications. A referenced screenshot shows the location of this setting within the application build interface, allowing users to enable enhanced parsing for files uploaded directly into chat-based FastGPT applications.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/custom-models/marker)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
