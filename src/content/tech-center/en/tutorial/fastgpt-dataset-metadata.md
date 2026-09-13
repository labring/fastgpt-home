---
title: Attach Structured Metadata to FastGPT Dataset Entries
slug: /en/tutorial/fastgpt-dataset-metadata
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/dataset/template
source_type: Official documentation
---

# Attach Structured Metadata to FastGPT Dataset Entries

## What is FastGPT Dataset Metadata
FastGPT enables attachment of structured, machine-readable contextual data to individual dataset entries using the dedicated `metadata` field. This metadata provides consistent, standardized context for each entry, supporting targeted filtering, sorting, and contextual processing of your uploaded dataset. Properly formatted metadata ensures that downstream workflows can reliably interpret and act on the attached contextual information.

## Valid Metadata Format Rules
All metadata attached to dataset entries must be a valid JSON object, with non-negotiable constraints:
- Must not use array structures, plain text, or syntactically invalid JSON
- Must exclusively use key-value pair objects (no standalone scalar values)
A correctly formatted example of valid metadata is:
```json
{ "source": "product-doc", "category": "overview", "version": 2 }
```
Avoid common invalid formats such as unquoted keys, missing closing brackets, or array-based metadata structures.

## File-Specific Implementation Guidelines
FastGPT supports two common dataset file formats for metadata attachment, each with specific handling requirements:
### CSV Files
1. First create a valid JSON metadata string for each dataset entry
2. Escape the JSON string per standard CSV escaping conventions: wrap the full JSON string in double quotation marks, and escape any internal double quotation marks with a preceding backslash
3. Insert the escaped JSON string into the `metadata` column of your CSV dataset file
### Excel Files
1. Prepare a valid JSON metadata string for the target dataset entry
2. Enter the raw, unescaped JSON string directly into the cell assigned to the `metadata` field
3. Confirm that no extraneous whitespace is added outside the JSON structure that could disrupt parsing when the file is imported

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/dataset/template)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
