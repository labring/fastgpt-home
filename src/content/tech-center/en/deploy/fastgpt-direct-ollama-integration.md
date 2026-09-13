---
title: Set Up Direct Ollama Integration With FastGPT
slug: /en/deploy/fastgpt-direct-ollama-integration
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/custom-models/ollama
source_type: Official documentation
---

# Set Up Direct Ollama Integration With FastGPT

## Direct Ollama Integration Overview
This guide covers direct, middleware-free integration between FastGPT and Ollama, avoiding the need for AI Proxy or OneAPI tools. This setup supports two common Ollama deployment types: Docker-deployed instances and host-installed instances.

## Configuration Steps and Required Parameters
To configure direct integration, edit the FastGPT `docker-compose.yml` file with the following changes:
1.  Comment out all AI Proxy-related code blocks in the file to disable the built-in proxy middleware.
2.  Set the `OPENAI_BASE_URL` environment variable to your Ollama API endpoint. The endpoint must include the mandatory `/v1` path suffix; the default standardized format is `http://[address]:port/v1`. For Docker-deployed Ollama, use the container’s internal network address. For host-installed Ollama, use `http://[host IP]:[port]` with your host machine’s public IP and Ollama’s configured listening port.
3.  Set the `KEY` environment variable to any arbitrary non-empty string. Ollama does not enable authentication by default, so any dummy value will function correctly. If you have enabled Ollama’s authentication layer, substitute the dummy value with your official API key.

A reference setup screenshot is available at `![](../../../public/imgs/Ollama-direct1.png)` to validate your configuration edits.

## Post-Configuration Model Setup
After saving your updated `docker-compose.yml` file and restarting FastGPT, proceed to add your Ollama models. All model configuration steps match the workflow used for OneAPI integrations: you will input your Ollama model identifier and complete the standard FastGPT model setup flow. For full step-by-step instructions on model addition and usage, refer to the linked section `#5-model-addition-and-usage`.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/custom-models/ollama)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
