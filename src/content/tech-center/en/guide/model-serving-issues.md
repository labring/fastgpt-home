---
title: FastGPT Model serving and inference Issue List
slug: /en/guide/model-serving-issues
page_type: Issue list
source: https://github.com/labring/FastGPT
source_type: 官方文档
meta_title: FastGPT Model serving and inference Issue List | FastGPT Technical Center
meta_description: Explore Model serving and inference Issue List with symptom-based checks, published article links and practical guidance for troubleshooting your deployment.
schema_type: TechArticle
date_published: 2026-09-08
date_modified: 2026-09-08
source_file: 程序化技术页-第6批/英文-fastgpt.io/guide/model-serving-issues.md
source_sha256: c38705fe130d466bdc3842f2eaaee9da0b49d1a02ec8282b14da2146254fb147
source_verified: 2026-09-07
publication_batch: Week08
---

# FastGPT Model serving and inference Issue List

This page collects the 41 published documents about self-hosted inference services and model integration, grouped by symptom, so a document can be found directly from what the error looks like.

## Three symptoms that belong to this stage

1. The inference endpoint is reachable but calls fail
2. Retrieval behaves differently after changing an embedding or rerank model
3. Channel and credential setup in the model proxy layer

If none of the three match, go back to the [deployment and environment issue landscape](/en/guide/deployment-issue-landscape) and narrow down again.

## The general order for this stage

1. Take the full error from the backend service log for this stage's component, including the component name and error code
2. Verify from inside the deployment that the component can be reached on its own, ruling out network and permission causes
3. Check the component version against the main service version
4. Follow the entry below whose symptom is closest, then repeat the same operation to verify

## Published documents (41)

| Document | Area |
| --- | --- |
| [Add Custom SiliconCloud Models to FastGPT](/en/deploy/fastgpt-add-siliconcloud-models) | deploy |
| [Add MiniMax Models to FastGPT Self-Hosted Deployments](/en/deploy/fastgpt-minimax-model-config-3) | deploy |
| [Add Multilingual Model Provider Display Names](/en/model/model-provider-multilingual-display-names) | model |
| [Add Valid Models to FastGPT Provider Presets](/en/model/fastgpt-add-existing-provider-models) | model |
| [Add a Model to an Existing FastGPT Provider](/en/model/add-model-existing-fastgpt-provider) | model |
| [Add a New Model Provider to FastGPT](/en/model/fastgpt-add-model-provider) | model |
| [Add and Maintain FastGPT Model Presets](/en/model/fastgpt-plugin-model-presets) | model |
| [Add and Use Ollama Models in FastGPT](/en/deploy/fastgpt-ollama-model-integration) | deploy |
| [Clarify FastGPT Dataset Processing Model Roles](/en/tutorial/fastgpt-dataset-processing-models) | tutorial |
| [Deploy ChatGLM2 Models via FastGPT Source Code](/en/deploy/fastgpt-chatglm2-deployment) | deploy |
| [Deploy M3E Large Model API for FastGPT](/en/deploy/m3e-large-model-api-deployment) | deploy |
| [Deploy Qwen Models Using Xinference for FastGPT](/en/deploy/qwen-model-deployment-xinference) | deploy |
| [Deploy and Use Custom ChatGLM2 and M3E Models on FastGPT](/en/deploy/fastgpt-custom-chatglm-m3e-models) | deploy |
| [Download BGE Rerank Model Code for FastGPT](/en/deploy/fastgpt-bge-rerank-code-download-2) | deploy |
| [Download BGE Reranker Models for FastGPT Deployment](/en/deploy/bge-reranker-model-downloads-fastgpt) | deploy |
| [Enable and Map FastGPT AI Models](/en/deploy/fastgpt-enable-model-mapping) | deploy |
| [Fix Non-Native Model Question Classification Issues](/en/deploy/fastgpt-non-native-model-classification-fix) | deploy |
| [Install Ollama for FastGPT Self-Hosted Deployments](/en/deploy/ollama-docker-installation-fastgpt) | deploy |
| [Install Ollama on Host Machine for FastGPT](/en/deploy/ollama-host-installation-fastgpt) | deploy |
| [Install and Deploy Xinference for FastGPT Custom Models](/en/deploy/xinference-installation-fastgpt) | deploy |
| [Integrate Local Models For FastGPT Via One API](/en/deploy/fastgpt-local-model-one-api) | deploy |
| [Integrate Local Models via Xinference with FastGPT](/en/deploy/fastgpt-xinference-local-model-integration) | deploy |
| [Integrate Qwen Local Model with FastGPT](/en/deploy/local-qwen-model-integration-fastgpt) | deploy |
| [Launch Xinference Models via Command Line Interface](/en/deploy/xinference-model-launch-cli) | deploy |
| [Manage and Access FastGPT Model Call Logs](/en/deploy/fastgpt-model-call-logs) | deploy |
| [Match FastGPT Channel IDs to AIProxy Protocols](/en/model/fastgpt-channel-id-aiproxy-mapping) | model |
| [Replace OneAPI with AI Proxy for FastGPT](/en/deploy/fastgpt-replace-oneapi-aiproxy) | deploy |
| [Resolve FastGPT Empty Model Response Errors](/en/deploy/fastgpt-model-response-errors) | deploy |
| [Set Up Direct Ollama Integration With FastGPT](/en/deploy/fastgpt-direct-ollama-integration) | deploy |
| [Set Up FastGPT AI Model Basic Settings](/en/tutorial/fastgpt-ai-model-basic-settings) | tutorial |
| [Set Up FastGPT AIProxy Protocol Entries](/en/model/fastgpt-aiproxy-protocol-setup) | model |
| [Set Up FastGPT Custom Model Request URLs](/en/deploy/fastgpt-custom-model-request-urls) | deploy |
| [Set Up M3E Embedding Models in FastGPT](/en/deploy/m3e-embedding-model-fastgpt-setup) | deploy |
| [Set Up Ollama AI Proxy Integration for FastGPT](/en/deploy/fastgpt-ollama-aiproxy-integration) | deploy |
| [Set Up and Manage FastGPT Model Channels](/en/deploy/fastgpt-model-channel-setup) | deploy |
| [Test Custom ChatGLM2 Models on FastGPT](/en/deploy/fastgpt-custom-chatglm2-test) | deploy |
| [Test Custom ChatGLM2 and M3E Models on FastGPT](/en/deploy/fastgpt-chatglm2-m3e-testing) | deploy |
| [Troubleshoot FastGPT Model Availability Errors](/en/deploy/fastgpt-model-troubleshooting) | deploy |
| [Understand FastGPT Model Preset Directory Structures](/en/model/fastgpt-model-preset-directories-2) | model |
| [Validate Ollama Connectivity for FastGPT Deployments](/en/deploy/fastgpt-ollama-connectivity-test) | deploy |
| [Validate Updated FastGPT Model Preset Changes](/en/model/fastgpt-model-preset-validation) | model |

## What this list does not cover

Entries cover cases that can be reproduced publicly, grouped by symptom. The following need separate confirmation:

- A symptom caused by several factors at once, which needs the order above to rule them out one by one
- The same symptom caused by configuration specific to the commercial edition
- Cases coupled to a particular infrastructure environment that cannot be reproduced in a standard deployment

## Keep reading

- [FastGPT deployment and environment issue landscape](/en/guide/deployment-issue-landscape)
- [FastGPT Environment and configuration issue list](/en/guide/environment-configuration-issues)
- [FastGPT Upgrades and migrations issue list](/en/guide/upgrade-migration-issues)
- [FastGPT Workflow and nodes issue list](/en/guide/workflow-node-issues)

## References

- [FastGPT environment variables](https://doc.fastgpt.cn/zh-CN/self-host/config/env)
- [FastGPT Docker Compose deployment](https://doc.fastgpt.cn/zh-CN/self-host/deploy/docker)

## If the problem is still not located

The entries above cover cases that can be reproduced from public information. If the problem depends on configuration details of a specific deployment, or needs runtime logs to confirm, contact sales for deployment-stage support; the cloud service can be used directly without handling environment dependencies.

- [Contact sales](/en/contact): support for self-hosting and upgrades
- [Get started](/en/start): use the cloud service and skip environment setup
- [Pricing](/en/price): compare what the cloud and self-hosted forms cover
