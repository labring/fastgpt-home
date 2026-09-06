---
title: Complete FastGPT Dataset Template Import Workflows
slug: /en/tutorial/fastgpt-dataset-template-import
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/dataset/template
source_type: Official documentation
---

# Complete FastGPT Dataset Template Import Workflows

## Template Import Overview
Template Import is a bulk data ingestion workflow for FastGPT datasets, enabling simultaneous addition of multiple dataset entries using structured spreadsheet files. This method streamlines population of knowledge bases by eliminating manual entry of individual dataset items.

## Supported File Specifications
FastGPT template imports support two file formats: comma-separated values (CSV) and Microsoft Excel (.xlsx). Users may either download the official pre-formatted CSV template directly from the import dialog, or prepare a custom .xlsx file that exactly matches the column headers and data structure of the official template. Prior to initiating an import, users must validate the file’s headers, individual cell contents, and overall file format to ensure compliance with the template requirements.

## Step-by-Step Import Workflow
1.  Navigate to the target FastGPT dataset, open the dataset’s import menu, and select the **Template Import** option. A template import dialog will load to guide the process, as referenced in the associated documentation image.
2.  Either select the **Download CSV Template** button to obtain a pre-built reference file, or prepare a valid .xlsx file matching the official template’s structure.
3.  Populate the prepared file with custom dataset entries, then verify all headers, cell contents, and file format align with the template requirements.
4.  Upload the validated file through the import interface, then confirm the import request. Only one file may be imported per individual import operation.
5.  Once the import process completes, navigate to the Dataset Collection tab to review all imported dataset entries and their current indexing status, as shown in the post-import documentation image.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/dataset/template)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
