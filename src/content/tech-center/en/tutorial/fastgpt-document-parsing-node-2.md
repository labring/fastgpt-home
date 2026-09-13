---
title: Understand FastGPT Document Parsing Node Operation
slug: /en/tutorial/fastgpt-document-parsing-node-2
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/build/general/fileInput
source_type: Official documentation
---

# Understand FastGPT Document Parsing Node Operation

# Core Input and Output Specifications
The document parsing node has a standardized input and output structure. It accepts an array of file URL strings (`array<string>`) as its primary input, and returns a single concatenated string of parsed document content as its output. Two core processing rules govern all input handling:
- The node only parses URLs pointing to files with document-type file extensions. If both document and multimodal files are included in the input array, all multimodal files are automatically ignored during processing.
- The node only processes files that are part of the current active workflow run. It will not access or parse files retrieved from prior chat history.

# Multi-Document Concatenation Format
When multiple valid document files are provided as input, the node combines their parsed content using a fixed delimiter and template. Each individual file’s content block is separated from subsequent blocks by the exact delimiter `\n******\n`. The official template for each file’s content block is:
```
File: ${filename}
<Content>
${content}
</Content>
```
In this template, `${filename}` is replaced with the original name of the input file, and `${content}` is replaced with the full parsed text extracted from that file.

# Valid Usage Workflow Steps
Follow this step-by-step process to ensure correct use of the document parsing node per official specifications:
1. Compile an array of URLs exclusively pointing to files with document-type file extensions. Exclude any multimodal files from the input array to prevent unintended content exclusion.
2. Pass the compiled array as input to the document parsing node within the scope of the current active workflow run. Do not reference files stored in prior chat history.
3. Retrieve the node’s output string, which contains the concatenated parsed content of all valid input files, formatted per the official template and delimiter.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/general/fileInput)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
