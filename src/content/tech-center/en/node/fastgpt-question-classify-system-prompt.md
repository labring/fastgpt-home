---
title: Configure FastGPT Question Classification System Prompt
slug: /en/node/fastgpt-question-classify-system-prompt
page_type: Workflow nodes
source: https://doc.fastgpt.cn/en/guide/build/workflow/nodes/question_classify
source_type: Official documentation
---

# Configure FastGPT Question Classification System Prompt

# Purpose of Question Classification System Prompt
FastGPT’s question classify workflow nodes rely on clear category definitions to accurately route user queries to predefined classes. The System Prompt parameter is inserted at the start of the conversation context to provide explicit supplementary definitions for ambiguous classification categories, ensuring the underlying model interprets category boundaries consistently. Without this prompt, vague category labels may lead to inconsistent or incorrect query classification. A common use case involves three core categories: Greetings, Billing FAQs, and Other questions, where the term "Billing FAQs" requires additional clarification to avoid misassignment of relevant queries like account recharges or invoice reviews to incorrect categories.

# Official Configuration Example & Parameter Reference
The System Prompt parameter accepts plain text definitions that outline valid inclusions, concrete qualifying examples, and explicit exclusions for each classification category. Below is the official reusable example for clarifying billing-related query categories:
```
Billing FAQs include plan prices, balance, point usage, renewals, invoices, and refunds
Questions about why points were deducted, how to recharge, or where to view bills should be classified as Billing FAQs
General product feature questions or greetings should not be classified as Billing FAQs
```
The following table summarizes key details about the System Prompt parameter:
| Parameter Name | Required | Placement | Primary Function |
|----------------|----------|-----------|------------------|
| System Prompt | Yes | Start of conversation context | Standardize model interpretation of classification category boundaries |

# Step-by-Step Implementation
1. Identify the question classify node within your FastGPT workflow.
2. Draft a custom System Prompt using the official example structure to clarify any ambiguous classification categories in your workflow.
3. Input the completed System Prompt into the node’s configuration settings.
4. Validate the configuration by running test queries against the node to confirm accurate classification of sample inputs.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/workflow/nodes/question_classify)

## Applicability and version scope

Use this page for the documented Workflow nodes scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
