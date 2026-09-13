---
title: Execute FastGPT 4.8.8 Dataset Permission Initialization
slug: /en/deploy/fastgpt-488-dataset-initialization
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/488
source_type: 官方文档
---

# Execute FastGPT 4.8.8 Dataset Permission Initialization

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Overview
This document covers the mandatory initialization step for FastGPT version 4.8.8, which configures inherited permissions for datasets. This step is required during the self-hosted FastGPT upgrade process to ensure existing dataset permission structures operate correctly post-deployment. The initialization uses an authenticated administrative HTTP request to the FastGPT backend API.

## Required Configuration Values
Two placeholder values must be replaced prior to running the initialization command:
- `{{rootkey}}`: The root administrator API key stored in your FastGPT self-hosted environment variables. This key grants full administrative access to execute the initialization workflow.
- `{{host}}`: Your deployed FastGPT domain name, used to construct the full API endpoint URL.

## Step-by-Step Execution Command
To run the dataset permission initialization:
1.  Open a terminal session on any machine with network access to your FastGPT deployment.
2.  Copy the following curl command, then substitute the placeholder values with your actual environment details:
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv488' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
3.  Run the modified command in your terminal.

## Expected Outcome
Upon successful execution, the command will initialize the inherited permission structures for all FastGPT datasets linked to your deployment. No additional user input is required during the initialization process.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/488)
