---
title: Integrate Local Models via Xinference with FastGPT
slug: /en/deploy/fastgpt-xinference-local-model-integration
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/custom-models/xinference
source_type: Official documentation
---

# Integrate Local Models via Xinference with FastGPT

## Xinference Integration Overview
Xinference is an open-source model inference platform that integrates with FastGPT for local model deployment. Per official documentation, it supports deployment of large language models (LLMs), embedding models, and rerank models—all critical components for enterprise-grade retrieval-augmented generation (RAG) workflows. The platform also includes advanced features such as native Function Calling support, and a distributed deployment architecture that enables horizontal scaling as workload volumes grow.

## Supported Model Categories
Three core model types are compatible for use with FastGPT via Xinference:
1. **Large Language Models**: Generate text responses using input prompts and retrieved contextual data
2. **Embedding Models**: Convert text into numerical vector embeddings to enable semantic search and similarity matching over document datasets
3. **Rerank Models**: Reorder initially retrieved search results to prioritize more relevant content before passing results to the LLM for final response generation

## Step-by-Step Integration Workflow
1. Deploy a Xinference inference service, either as a standalone instance or distributed cluster for horizontal scaling
2. Deploy your target model via the Xinference platform, selecting from the supported LLM, embedding, or rerank model categories
3. Obtain the deployed model’s endpoint URL and unique identifier from the Xinference dashboard or API response
4. Configure FastGPT to connect to the local Xinference endpoint, specifying the deployed model type and associated identifier

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/custom-models/xinference)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
