---
title: Configure and Use FastGPT RAG Generators
slug: /en/tutorial/fastgpt-rag-generator-usage
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/dataset/rag
source_type: Official documentation
---

# Configure and Use FastGPT RAG Generators

# Generator Core Functionality
The FastGPT RAG generator component produces final natural language answers for end-user queries. It operates by taking structured document fragments retrieved from the FastGPT dataset system, pairing these fragments as contextual knowledge with the original user input query, then generating a coherent, grounded response. This workflow ensures the final output integrates both the specialized retrieved external information and the general knowledge embedded in the generator model.

# Supported Generator Models
FastGPT RAG supports two primary categories of generator models aligned with standard RAG system design:
- **BART**: A sequence-to-sequence text generation model designed to improve output quality through specialized noise-handling techniques. It excels at transforming and generating structured text from input context.
- **GPT Series**: Pre-trained large language models optimized for fluent, natural language generation. These models deliver strong performance across general generation tasks due to their extensive large-scale training data sets.

# Generator Workflow and Configuration
Follow this standardized workflow to deploy the generator component in a FastGPT RAG pipeline:
1.  Retrieve relevant document fragments using the FastGPT dataset retriever, configured to align with the scope of the user’s query.
2.  Collect the original end-user input query and the full set of retrieved document fragments.
3.  Format the retrieved fragments into a structured context block paired with the user query for the generator model.
4.  Deploy the selected generator model (BART or GPT series) to process the combined context and query input.
5.  Extract the generated natural language response for delivery to the end user.

All generator deployments require the following core input parameters:
| Parameter Name | Required | Description |
|----------------|----------|-------------|
| `user_query` | Yes | The raw input query submitted by the end user, which guides the generator’s response framing |
| `retrieved_context` | Yes | The segmented document data returned by the FastGPT retriever, used as grounded contextual knowledge for the generation process |

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/dataset/rag)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
