---
title: Fix Multi-Turn Question Classification Accuracy Issues
slug: /en/tutorial/fastgpt-multi-turn-classification-fixes
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/build/faq
source_type: Official documentation
---

# Fix Multi-Turn Question Classification Accuracy Issues

## Context-Driven Multi-Turn Question Classification
The FastGPT Question Classification node natively accesses conversation context to enhance classification accuracy for sequential user queries. When consecutive questions share a tight logical connection, the model can leverage prior conversation history to correctly interpret ambiguous references. For example, if a user first asks "How do I use this feature?" followed by "What are the limitations?", the model uses the shared context of the initial feature-related query to accurately classify the second question without additional input.

## Accuracy Limitations for Unrelated Sequential Queries
While context-aware classification improves performance for related queries, accuracy can decline significantly when consecutive user questions have minimal or no logical overlap. In these cases, the model may incorrectly tie the second query to the prior conversation context, leading to misclassification that fails to align with the user’s actual intent.

## Global Variable Mitigation Workflow
This structured workflow addresses reduced accuracy for unrelated sequential queries using persistent global variables:
1. Configure a global variable to store classification results across the entire conversation flow.
2. For each execution of the Question Classification node:
   a. Check the global variable for a pre-existing classification result.
   b. If a valid result is detected, reuse the stored classification output directly to avoid redundant processing and context-based errors.
   c. If no stored result exists, run the model’s native question classification process on the current user input.
3. Update the global variable with the newly generated classification result after processing each query to maintain consistent state for subsequent steps.

## Accuracy Validation Testing
To formally evaluate classification performance, users can build batch test scripts to systematically assess question classification accuracy across diverse query sequences, including both related and unrelated consecutive questions. This testing enables identification of edge cases where the mitigation workflow may need refinement to align with specific use case requirements.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/faq)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
