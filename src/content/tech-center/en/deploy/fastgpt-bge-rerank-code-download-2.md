---
title: Download BGE Rerank Model Code for FastGPT
slug: /en/deploy/fastgpt-bge-rerank-code-download-2
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/custom-models/bge-rerank
source_type: Official documentation
---

# Download BGE Rerank Model Code for FastGPT

### Overview
This document covers retrieval of official BGE rerank model code repositories for self-hosted FastGPT deployments. Three dedicated model packages are available, each hosted in a standardized subdirectory of the FastGPT GitHub repository.

### Supported BGE Rerank Model Repositories
Three official code repositories are provided for BGE rerank models:
1.  BGE Reranker Base: https://github.com/labring/FastGPT/tree/main/plugins/model/rerank-bge/bge-reranker-base
2.  BGE Reranker Large: https://github.com/labring/FastGPT/tree/main/plugins/model/rerank-bge/bge-reranker-large
3.  BGE Reranker v2-m3: https://github.com/labring/FastGPT/tree/main/plugins/model/rerank-bge/bge-reranker-v2-m3

Each repository contains the full code required to integrate the corresponding rerank model into a self-hosted FastGPT instance.

### Step-by-Step Code Retrieval
Follow these concrete steps to download the desired model code:
1.  Select the target BGE rerank model repository from the list provided above.
2.  Use Git sparse checkout to retrieve only the target model directory, minimizing local storage usage:
    ```bash
    # Replace bge-reranker-base with your target model directory name
    mkdir -p /tmp/fastgpt-rerank && cd /tmp/fastgpt-rerank
    git init
    git remote add origin https://github.com/labring/FastGPT.git
    git config core.sparseCheckout true
    echo "plugins/model/rerank-bge/bge-reranker-base/*" >> .git/info/sparse-checkout
    git pull --depth=1
    ```
3.  Move the downloaded model directory to your local FastGPT plugins model directory. Replace `/path/to/your/fastgpt` with your actual FastGPT deployment path:
    ```bash
    mv /tmp/fastgpt-rerank/plugins/model/rerank-bge/bge-reranker-base /path/to/your/fastgpt/plugins/model/rerank-bge/
    ```
4.  Remove the temporary retrieval directory:
    ```bash
    rm -rf /tmp/fastgpt-rerank
    ```
5.  Validate the download by listing the contents of the installed model directory:
    ```bash
    ls /path/to/your/fastgpt/plugins/model/rerank-bge/bge-reranker-base
    ```

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/custom-models/bge-rerank)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Limit the operation to the named workspace and confirm a recent backup.

## Rollback guidance

Restore the prior image or configuration and rerun bounded verification. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
