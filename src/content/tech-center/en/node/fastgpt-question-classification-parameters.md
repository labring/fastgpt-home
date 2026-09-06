---
title: Configure FastGPT Question Classification Category Parameters
slug: /en/node/fastgpt-question-classification-parameters
page_type: Workflow nodes
source: https://doc.fastgpt.cn/en/guide/build/workflow/nodes/question_classify
source_type: Official documentation
---

# Configure FastGPT Question Classification Category Parameters

## Overview of Question Classification Category Parameters
The question classification node in FastGPT workflow design uses structured function calls to categorize user queries into predefined operational categories. This standardization enables automated routing of conversations to appropriate downstream workflow steps, such as dedicated response handlers or escalation paths. This documentation covers the core parameter configuration for defining these classification categories.

## Formal Configuration Schema
The official function composition schema for question classification is defined as a structured JavaScript object, with required and optional fields as specified below:
| Field Name | Type | Details |
|------------|------|---------|
| `name` | String | Unique identifier for the classification function, assigned via `agentFunName` |
| `description` | String | Explicit purpose statement: *"Determine which category the user question belongs to and return the corresponding enum value"* |
| `parameters` | Object | Container for classification output parameters |
| `parameters.type` | String | Output field for the classified category |
| `parameters.type.description` | String | Mapping of user question categories to their associated enum return values: `Greetings, return: abc; Billing FAQs, return: vvv; Other questions, return: aaa` |
| `parameters.type.enum` | Array | Predefined allowed return values: `["abc", "vvv", "aaa"]` |
| `required` | Array | List of mandatory parameters: `['type']` |

## Step-by-Step Implementation
1. Assign a unique valid function name to the `name` field of the classification function.
2. Populate the `description` field with the required purpose statement for category detection and enum return.
3. Configure the `parameters` object to include the `type` string property:
   - Add the category-to-enum mapping description to clarify expected output values for each classification group.
   - Define the allowed enum values to match the three predefined categories: `abc`, `vvv`, `aaa`.
   - Add `type` to the `required` array to ensure the function always returns a valid classification.
4. Integrate the completed function into the question classification node of your FastGPT workflow. The system will generate random test return values during setup, which do not affect the core classification logic and can be safely ignored.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/workflow/nodes/question_classify)

## Applicability and version scope

Use this page for the documented Workflow nodes scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
