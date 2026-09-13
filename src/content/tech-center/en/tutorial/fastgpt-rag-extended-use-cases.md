---
title: Extend FastGPT RAG to Diverse Use Cases
slug: /en/tutorial/fastgpt-rag-extended-use-cases
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/dataset/rag
source_type: Official documentation
---

# Extend FastGPT RAG to Diverse Use Cases

## Extended RAG Application Scenarios
FastGPT’s dataset-based retrieval-augmented generation (RAG) functionality extends beyond basic question answering and document retrieval to support specialized, industry-focused use cases. This documentation covers two core extended application areas enabled by FastGPT’s RAG framework.

## Multimodal Generation Workflows
RAG integrated with FastGPT can be applied to multimodal content generation, supporting creation of image, audio, and 3D content. Cross-modal generation systems including ReMoDiffuse and Make-An-Audio leverage FastGPT’s RAG technology to align retrieved contextual data with cross-modal output requirements. This integration ensures that generated multimodal content is grounded in relevant, pre-retrieved external context, reducing irrelevant or inconsistent output during generation workflows.

## Enterprise Decision Support Workflows
For enterprise strategic decision-making, FastGPT’s RAG system can rapidly retrieve external resources to generate high-quality forward-looking reports. Authorized users can configure the RAG pipeline to pull data from approved external sources such as industry reports and market data. The retrieved dataset is aggregated and structured to produce actionable, evidence-based forward-looking reports, which enhance an organization’s strategic decision-making capabilities.

## Step-by-Step Configuration for Extended Use Cases
1.  Access the FastGPT dataset management dashboard to configure your RAG retrieval library.
2.  Upload or connect external resource datasets, including industry reports and market data, to the retrieval library for decision support workflows.
3.  For multimodal generation: Enable cross-modal RAG integration to link retrieved context to supported generation tools such as ReMoDiffuse and Make-An-Audio.
4.  For enterprise decision support: Set the RAG retrieval trigger to prioritize real-time external resource queries, and enable the forward-looking report generation module to compile retrieved data into structured reports.
5.  Validate the configuration by running a test query to confirm successful retrieval of external resources and generation of targeted output.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/dataset/rag)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
