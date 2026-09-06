---
title: Proper Excel File Structure for FastGPT Dataset Imports
slug: /en/tutorial/fastgpt-dataset-excel-structure
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/dataset/template
source_type: Official documentation
---

# Proper Excel File Structure for FastGPT Dataset Imports

## Excel Dataset Import Structure Overview
FastGPT supports importing dataset content using Excel files, which follow the exact same header and data structure as CSV dataset imports. This consistent format ensures reliable field mapping between the source file and the FastGPT platform’s ingestion workflow.

## Standard Template Field Table
The required header row and valid sample dataset entries are as follows:
| q                             | a                                            | index            | index             | metadata                                         |
| ----------------------------- | -------------------------------------------- | ---------------- | ----------------- | ------------------------------------------------ |
| What is FastGPT?              | FastGPT is an AI agent development platform. | FastGPT overview | AI agent platform | `{"source":"product-doc","category":"overview"}` |
| How do I import Dataset data? | Use a CSV or Excel template.                 | Dataset import   | template import   | `{"source":"help-center"}`                       |

## Mandatory Excel File Requirements
To avoid import failures, all Excel files used for FastGPT dataset imports must adhere to these rules:
- Use only the `.xlsx` file extension; `.xls` format files are not supported.
- Contain exactly one worksheet; multiple worksheets will prevent successful ingestion.
- Contain no merged cells anywhere in the worksheet; merged cells disrupt automated parsing of field data.
- Reserve the first row of the worksheet exclusively for template headers; any content in this row will be treated as field names by the platform.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/dataset/template)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
