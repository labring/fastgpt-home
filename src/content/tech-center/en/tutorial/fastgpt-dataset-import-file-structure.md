---
title: Define FastGPT Dataset Import File Structure
slug: /en/tutorial/fastgpt-dataset-import-file-structure
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/dataset/template
source_type: Official documentation
---

# Define FastGPT Dataset Import File Structure

## Overview of FastGPT Dataset Import Files
FastGPT enables importing custom dataset entries via a structured text file with a standardized header row. This specification defines the required and optional fields for the file, ensuring the platform correctly parses and indexes all submitted dataset content without errors.

## Standard Field Specification Table
The following table lists all supported headers, their requirement status, allowed count per row, and purpose:
| Header     | Required | Count      | Description                                                     |
| ---------- | -------- | ---------- | --------------------------------------------------------------- |
| `q`        | Yes      | Exactly 1  | Content or a question                                           |
| `a`        | Yes      | Exactly 1  | The answer; it can be empty when importing standalone content   |
| `index`    | No       | Repeatable | A custom index. A row can contain multiple indexes              |
| `metadata` | No       | At most 1  | A JSON object for custom information such as source or category |

## Mandatory Validation Rules
All rows in the import file must follow these core rules:
1. Only the headers listed in the table are permitted; no unsupported headers may be added to the file.
2. Header order does not impact platform parsing.
3. Each individual row represents exactly one dataset entry.
4. The `q` and `a` fields cannot both be empty for any row.
5. Every row must contain exactly one instance of the required `q` and `a` fields.
For optional fields: the `index` field may be repeated multiple times per row to assign multiple custom identifiers, while the `metadata` field may appear at most once per row, and must be a valid JSON object when used to store custom metadata such as content source or content category.

## Valid Entry Examples
Two valid row examples demonstrate proper usage:
1. A standard question-and-answer entry: `q="How to configure API access", a="Follow the steps in the admin panel", index="api_001", metadata={"source":"admin_guide"}`
2. A standalone content entry with empty answer field: `q="Official FastGPT release notes v2.4", a="", index="rel_024", metadata={"category":"release_updates"}`

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/dataset/template)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
