---
title: Set Up Third-Party File Library Hook Files
slug: /en/integration/fastgpt-third-party-hook-files
page_type: Integrations
source: https://doc.fastgpt.cn/en/guide/dataset/third-party/third_dataset
source_type: Official documentation
---

# Set Up Third-Party File Library Hook Files

## Overview of Third-Party File Library Hooks
FastGPT’s third-party document library integrations rely on a standardized Hook pattern to expose consistent API endpoints for file access. This pattern ensures compatibility with FastGPT’s core dataset processing workflows, regardless of the underlying third-party storage system. All valid third-party library integrations require implementing exactly five core functions within a dedicated hook file, eliminating the need for custom adjustments to FastGPT’s core dataset logic.

## Required Directory Structure
Follow these concrete steps to set up the correct file structure for your hook implementation:
1. Navigate to the official FastGPT core dataset API directory: `FastGPT\packages\service\core\dataset\apiDataset\`
2. Create a new, uniquely named folder to contain your third-party library’s hook code. Use a name that clearly identifies your integration (e.g., `sharepoint-library` for a Microsoft SharePoint integration).
3. Inside the newly created folder, create an `api.ts` file. This file will host all five required hook function implementations.

## Mandatory Hook Functions
All hook implementations must include the following five functions, each with a defined purpose aligned with FastGPT’s dataset requirements. The table below lists each required function and its intended use case:

| Function Name         | Purpose                                                                 |
|-----------------------|-------------------------------------------------------------------------|
| `listFiles`           | Retrieve a full or paginated list of files available in the third-party library |
| `getFileContent`      | Fetch the raw file content or generate a direct temporary access link for a target file |
| `getFileDetail`       | Retrieve detailed metadata such as file name, size, and last updated time for a specified file |
| `getFilePreviewUrl`   | Generate the original public preview URL for the third-party file |
| `getFileId`           | Extract the unique real identifier of the original file from the third-party storage system |

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/dataset/third-party/third_dataset)

## Applicability and version scope

Use this page for the documented Integrations scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
