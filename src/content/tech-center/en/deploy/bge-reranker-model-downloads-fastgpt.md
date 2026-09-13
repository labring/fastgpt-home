---
title: Download BGE Reranker Models for FastGPT Deployment
slug: /en/deploy/bge-reranker-model-downloads-fastgpt
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/custom-models/bge-rerank
source_type: Official documentation
---

# Download BGE Reranker Models for FastGPT Deployment

## Supported BGE Reranker Model Repositories
Three official model repositories are provided for FastGPT custom model integration. Each repository contains full model assets and supporting deployment files:
1. https://huggingface.co/BAAI/bge-reranker-base
2. https://huggingface.co/BAAI/bge-reranker-large
3. https://huggingface.co/BAAI/bge-reranker-v2-m3

## Required Directory Structure
All cloned model files must be placed in a dedicated code directory matching the specified standard layout. The exact directory structure for a single model is:
```
bge-reranker-base/
app.py
Dockerfile
requirements.txt
```
Each cloned model directory will include the model’s native files alongside the mandatory supporting scripts and configuration files pulled directly from the target Hugging Face repository.

## Step-by-Step Model Download and Setup
Follow these concrete steps to download and prepare models for FastGPT deployment:
1. Open a terminal session and navigate to your FastGPT custom models code directory.
2. Select one of the three supported model repositories and run the official git clone command to retrieve the model files. Example clone commands for each supported model:
   - Base model: `git clone https://huggingface.co/BAAI/bge-reranker-base`
   - Large model: `git clone https://huggingface.co/BAAI/bge-reranker-large`
   - v2-m3 model: `git clone https://huggingface.co/BAAI/bge-reranker-v2-m3`
3. Validate that the cloned model directory matches the required structure. Confirm the directory includes both the model’s core files and the mandatory supporting files: `app.py`, `Dockerfile`, and `requirements.txt`.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/custom-models/bge-rerank)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
