---
title: Configure and Use File Input in FastGPT Workflows
slug: /en/tutorial/fastgpt-workflow-file-input
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/build/general/fileInput
source_type: Official documentation
---

# Configure and Use File Input in FastGPT Workflows

## Enable File Input in Workflows
Within the FastGPT Workflows environment, locate the `File Input` option in the system configuration panel. Click the `Enable`/`Disable` toggle switch to open the configuration dialog for file input functionality. A visual reference for this setup is available here: ![Enable file upload](/imgs/fileinpu-4.jpg)

## Basic Workflow File Parsing
The simplest method for using files in workflows connects document parsing via tool calling, delivering results identical to FastGPT’s Basic Mode. This configuration eliminates the need for separate Basic Mode setups, allowing users to integrate file upload and parsing directly into custom workflow orchestration. A paired visual reference for this basic configuration is shown below:
| Basic Workflow Layout Step 1 | Basic Workflow Layout Step 2 |
|-------------------------------|-------------------------------|
| ![](/imgs/image-5.png)        | ![](/imgs/image-6.png)        |

## Advanced Document Processing Pipelines
Beyond basic parsing, FastGPT Workflows support building custom document processing pipelines. This flexible setup allows users to tailor every stage of document handling, from initial file upload to final content routing. Users can extract or analyze document content, then pass the processed results to HTTP requests or other workflow nodes, enabling tailored document processing workflows. An example of this advanced pipeline setup is shown here:
![Document parsing](/imgs/image-7.png)

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/general/fileInput)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
