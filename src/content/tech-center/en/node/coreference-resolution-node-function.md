---
title: Resolves Coreferences to Improve Query Accuracy
slug: /en/node/coreference-resolution-node-function
page_type: Workflow nodes
source: https://doc.fastgpt.cn/en/guide/build/workflow/nodes/coreferenceResolution
source_type: Official documentation
---

# Resolves Coreferences to Improve Query Accuracy

## Coreference Resolution Node Overview
The FastGPT coreference resolution workflow node invokes an AI model to complete and refine a user’s current question. Its primary purpose is resolving coreferences—including pronouns and vague references that lack clear prior context—to produce more complete and reliable search queries. This enhancement directly improves the accuracy of dataset searches during multi-turn conversations, as unambiguous queries reduce irrelevant results and better align with a user’s actual intent.

## Operational Limitations
The primary challenge associated with this node stems from the underlying AI model’s behavior. The model may lack a clear, consistent understanding of what constitutes proper query completion, and frequently struggles to accurately refine queries when paired with long, multi-turn conversation context. This can lead to partially resolved or overly vague refined queries, undermining the intended improvement to search accuracy.

## Standard Processing Workflow
This node operates as a dedicated step within FastGPT’s workflow builder, with a linear, repeatable processing flow tailored to multi-turn conversation contexts:
1.  Accept input consisting of the current user query and associated multi-turn conversation history
2.  Submit the combined input to the integrated AI model to identify and resolve all coreferential references
3.  Generate a refined, fully unambiguous search query that incorporates all relevant context from prior conversation turns
4.  Pass the refined query to downstream workflow nodes, such as dataset search components, for execution

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/workflow/nodes/coreferenceResolution)

## Applicability and version scope

Use this page for the documented Workflow nodes scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
