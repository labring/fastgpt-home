---
title: Validate Mineru Enhanced PDF Parsing Workflows
slug: /en/deploy/fastgpt-mineru-pdf-parsing-test
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/custom-models/mineru
source_type: Official documentation
---

# Validate Mineru Enhanced PDF Parsing Workflows

## Required Log Configuration
To monitor the status of Mineru custom PDF parsing, you must set the FastGPT instance's `LOG_LEVEL` environment variable to `info` or `debug`. Without this configuration, parsing status logs will not be generated, and you will not be able to verify successful processing of uploaded PDF files.

## Test Parsing via Dataset Management
This workflow validates the enhanced parsing service through the core dataset management interface:
1. Navigate to the Dataset management page of your deployed FastGPT instance.
2. Begin uploading a PDF file, and enable the `Enhanced PDF Parsing` toggle in the upload configuration menu.
3. Reference the included UI screenshot `mineru1.png` to confirm the correct placement of the parsing toggle.
Once the upload and parsing process completes, check the FastGPT service logs. The following exact log entries will appear for a successful parsing run:
```
[Info] 2024-12-05 15:04:42 Parsing files from an external service
[Info] 2024-12-05 15:07:08 Custom file parsing is complete, time: 1316ms
```
The included timestamps are example values; the core log message structure will remain consistent for all successful parsing operations.

## Test Parsing via Application File Upload
You can also validate the enhanced PDF parsing workflow within individual FastGPT applications, to test parsing in a live application context:
1. Open the target FastGPT application, and access its file upload configuration settings.
2. Enable the `Enhanced PDF Parsing` option before initiating a PDF file upload.
3. Use the included UI screenshot `mineru2.png` to confirm the correct placement of the toggle in the application's upload workflow.
This workflow allows you to verify that parsing works as expected when using the application's file handling flow, separate from the dataset management interface.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/custom-models/mineru)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
