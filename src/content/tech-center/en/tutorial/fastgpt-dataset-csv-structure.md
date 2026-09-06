---
title: Specify valid FastGPT dataset CSV file structure
slug: /en/tutorial/fastgpt-dataset-csv-structure
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/dataset/template
source_type: Official documentation
---

# Specify valid FastGPT dataset CSV file structure

This document outlines the mandatory structure for CSV files used to import dataset content into FastGPT, following the official template specifications provided by the platform.

## UTF-8 Encoding and Special Character Handling
All FastGPT dataset CSV files must be saved using UTF-8 encoding. Any cell containing commas, line breaks, or double quotation marks must be escaped per standard CSV formatting rules to prevent parsing failures during dataset import. Escaping requires enclosing affected cells in double quotation marks, and replacing any internal double quotes with two consecutive double quotation marks.

## Official CSV Field Schema
The required header row for the FastGPT dataset CSV is exactly `q,a,index,index,metadata`. Each column has a defined purpose:
- `q`: The user query that will match the associated response content
- `a`: The standardized response text delivered when the matching query is triggered
- `index`: Two categorical indexing fields for organizing and filtering dataset entries (the official template includes duplicate column headers for this field)
- `metadata`: A valid JSON object containing structured metadata tags for the dataset entry, including source and category identifiers where applicable.

## Sample Valid CSV Entries
The following table displays the official sample dataset entries, formatted correctly per the schema:

| q | a | index | index | metadata |
|---|---|---|---|---|
| "What is FastGPT?" | "FastGPT is an AI agent development platform." | "FastGPT overview" | "AI agent platform" | `{"source":"product-doc","category":"overview"}` |
| "How do I import Dataset data?" | "Use a CSV or Excel template." | "Dataset import" | "template import" | `{"source":"help-center"}` |

Each row in the CSV file represents a single standalone knowledge base entry, with all fields populated as required. No optional fields are included in the official template, and all columns must be present in every import file to avoid import errors.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/dataset/template)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
