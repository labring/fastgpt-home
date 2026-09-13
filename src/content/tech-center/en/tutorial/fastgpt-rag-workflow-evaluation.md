---
title: Configure and Evaluate FastGPT RAG Workflows
slug: /en/tutorial/fastgpt-rag-workflow-evaluation
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/dataset/rag
source_type: Official documentation
---

# Configure and Evaluate FastGPT RAG Workflows

# FastGPT RAG Core Capabilities
FastGPT’s Retrieval-Augmented Generation (RAG) system unites targeted document retrieval and natural language generation to deliver coherent, accurate outputs. Beyond basic information retrieval, it supports summarization, report creation, and document abstract generation, enhancing output coherence and factual accuracy. In the legal domain, it integrates relevant statutes and case law to generate detailed, rigorous legal opinions, supporting improved efficiency for legal practitioners.

# Standard RAG Workflow Steps
The standard FastGPT RAG workflow follows a structured, repeatable process:
| Step Number | Core Action | Detailed Description |
|---|---|---|
| 1 | Query Submission | End users input a question through the FastGPT interface |
| 2 | Vector Embedding & Similarity Search | The system converts the user’s query into a vector embedding, then runs a similarity search across connected external datasets or uploaded document corpora |
| 3 | Contextual Answer Generation | The generation model produces a natural language answer using only the most relevant retrieved content to ensure factual alignment |
| 4 | Result Validation & Delivery | The generated answer is compared against prior related answers before being returned to the end user |

# Legal Domain RAG Benchmark Details
FastGPT RAG can be calibrated for specialized use cases such as legal document processing, aligned with frameworks like LegalBench-RAG. This is the first publicly available benchmark dedicated to legal retrieval systems, providing a standardized framework for evaluating retrieval performance in high-precision legal tasks including citation lookup and clause interpretation.

The benchmark is built on the LegalBench dataset, which includes 6,858 query-answer pairs tied to exact locations within original legal documents. It covers multiple legal document types including contracts and privacy policies, ensuring coverage across diverse legal scenarios. LegalBench-RAG prioritizes precise retrieval of small, contextually relevant text passages rather than broad, irrelevant fragments. Key challenges for legal RAG implementations include reliance of generation quality on accurate retrieval (with incorrect retrieval leading to flawed outputs) and the complexity of legal document length and specialized terminology. Quality control for the benchmark uses multiple rounds of manual verification when mapping annotation categories and document IDs to specific text fragments to ensure high textual precision.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/dataset/rag)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
