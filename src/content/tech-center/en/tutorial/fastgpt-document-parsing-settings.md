---
title: Configure FastGPT Document Parsing Workflow Settings
slug: /en/tutorial/fastgpt-document-parsing-settings
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/build/general/fileInput
source_type: Official documentation
---

# Configure FastGPT Document Parsing Workflow Settings

# Document Parsing Basics for AI Nodes
AI Chat and Tool Calling nodes include a dedicated document URL input field. This input accepts an `Array<string>` type value, consisting of valid file URLs. The FastGPT platform automatically parses the referenced files and injects their extracted content into the system message using a fixed prompt template:
```
Use the content in <FilesContent></FilesContent> as reference for this conversation:
<FilesContent>
{{quote}}
</FilesContent>
```

# 4.8.13 File Parsing Behavioral Updates
FastGPT 4.8.13 introduces critical changes to file parsing behavior, with full backward compatibility maintained for existing workflows. Compatibility code will be removed in future platform versions, and migration to the new rules is recommended for all existing workflows. Key updated rules include:
- Basic Mode now enforces file parsing rather than allowing the model to decide whether to reference documents, ensuring consistent document citation.
- Standalone document parsing no longer processes files attached to prior chat history.
- Tool Calling nodes now support direct document citation selection, eliminating the need for a separate document parsing node, and automatically parses files from chat history.
- AI Chat nodes now support direct document citation selection, removing the requirement to use a dedicated document parsing node, and automatically parses files from chat history.
- Standalone plugin execution no longer supports global file uploads; plugin inputs must use file-type configuration as a replacement for global file access.
- Workflows calling external plugins no longer automatically pass uploaded files to the plugin; users must manually specify the relevant variable for plugin input.
- Workflows calling sub-workflows no longer automatically pass uploaded files to the sub-workflow; users may manually select which file URLs to pass to the nested workflow.

# Implementation Guidelines
To align with the 4.8.13 updates:
1. Populate the document URL input field for AI Chat or Tool Calling nodes with an `Array<string>` of target file URLs to enable direct citation.
2. For workflows using plugins or sub-workflows, discontinue reliance on automatic file passing, and instead manually map uploaded file URLs to the appropriate input variables for the called component.
3. Validate existing workflows post-migration to confirm consistent document parsing and file passing behavior.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/general/fileInput)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
