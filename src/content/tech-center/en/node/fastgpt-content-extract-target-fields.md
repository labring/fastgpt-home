---
title: Configure FastGPT content extraction target fields
slug: /en/node/fastgpt-content-extract-target-fields
page_type: Workflow nodes
source: https://doc.fastgpt.cn/en/guide/build/workflow/nodes/content_extract
source_type: Official documentation
---

# Configure FastGPT content extraction target fields

# Target Fields Overview
Target fields define the structured output schema for the FastGPT content extraction workflow node. Each configured target field generates a unique named output variable, enabling downstream workflow nodes to reference extracted data directly. This configuration converts unstructured input text into a standardized, machine-readable format for consistent processing.

# Target Field Parameter Reference
The following table lists all official parameters for target field configuration, as specified in FastGPT documentation:

| Parameter Name       | Official Purpose                                                                 | Critical Constraints                                                                 |
|----------------------|----------------------------------------------------------------------------------|--------------------------------------------------------------------------------------|
| Key                  | Unique identifier for the extraction field                                        | Must not be duplicated across all target fields in a single content extract node      |
| Field Description    | Describes the specific data the field is intended to capture                      | Examples include product name, event timestamp, search keyword, or similar identifiers |
| Required             | Indicates if the language model is obligated to attempt extraction for the field  | Even when enabled, the model may return an empty string if no matching data exists in the input |

# Step-by-Step Configuration
Follow these official steps to set up target fields for a content extraction node:
1. Open the FastGPT workflow editor and add a content extraction node to your workflow.
2. Access the node’s configuration panel to locate the Target Fields configuration section.
3. Click the add button to create a new target field entry.
4. Assign a unique, non-duplicate key to the new field to avoid configuration conflicts.
5. Write a clear field description to specify the type of data the field should extract.
6. Toggle the Required switch to set whether the model must attempt extraction for this field.
7. Repeat steps 3–6 for all required target fields, then save the node’s configuration to apply changes.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/workflow/nodes/content_extract)

## Applicability and version scope

Use this page for the documented Workflow nodes scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
