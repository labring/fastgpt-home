---
title: Configure and run FastGPT RAG generation phase
slug: /en/tutorial/fastgpt-rag-generation-phase
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/dataset/rag
source_type: Official documentation
---

# Configure and run FastGPT RAG generation phase

# Overview of FastGPT RAG Generation Phase
The generation phase is the foundational core of the FastGPT Retrieval-Augmented Generation (RAG) workflow. Its primary function is to produce coherent, natural language responses that directly address a user’s query by synthesizing input from two inputs: the original user question and pre-retrieved, verified document fragments. Unlike standalone generative models that rely exclusively on their pre-trained training data, FastGPT’s RAG generator integrates factual information directly from external datasets linked to the active workflow. This integration eliminates ungrounded hallucinations and significantly improves the factual accuracy of generated outputs, ensuring responses align with curated, real-world content rather than only pre-trained model knowledge.

# Supported Generator Configurations
FastGPT’s generation phase natively supports two industry-standard generative model architectures: BART and GPT. All configured generators adhere to a standardized input requirement: they must receive both the original user query and a structured set of high-confidence retrieved document snippets as explicit contextual input. The generator processes this combined prompt to synthesize responses that are both relevant to the user’s intent and fully grounded in the provided factual context. No standalone generation occurs without attached retrieved context, as the system is designed to prioritize grounded, verified content over unsubstantiated pre-trained claims.

# Step-by-Step Generation Execution Workflow
1.  Accept the finalized user query and the full curated set of retrieved document fragments from the preceding retrieval phase of the RAG workflow.
2.  Format the input prompt for the selected generative model, inserting the retrieved fragments as explicit contextual content directly before the user’s original query to align with model input expectations.
3.  Submit the formatted prompt to the configured generative model (either BART or GPT) via the model’s approved execution interface.
4.  Capture the model’s raw generated output, perform minimal post-processing to remove extraneous formatting artifacts, and return the polished, coherent response to the requesting system or end user.

> [FastGPT public documentation](https://doc.fastgpt.cn/en/guide/dataset/rag)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
