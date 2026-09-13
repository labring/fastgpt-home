---
title: Set Up Ollama AI Proxy Integration for FastGPT
slug: /en/deploy/fastgpt-ollama-aiproxy-integration
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/custom-models/ollama
source_type: Official documentation
---

# Set Up Ollama AI Proxy Integration for FastGPT

## Prerequisites
When using the default FastGPT Docker deployment configuration from the official deployment guide, the AI Proxy service is enabled by default. Before proceeding, confirm that your FastGPT instance can establish network connectivity to your Ollama instance. If connectivity fails, verify that the Ollama host is listening on `0.0.0.0` and that both FastGPT and Ollama containers share the same network if running in containerized environments.

## Step-by-Step Configuration Workflow
1.  **Configure Model Basics**: Log into your FastGPT dashboard, navigate to `Account > Model Providers > Model Configuration > Add Model`. Ensure the model ID exactly matches the model name defined in OneAPI, per the official model introduction documentation at `../config/model/intro.en.mdx`.
2.  **Add Ollama Channel**: Navigate to `Account > Model Providers > Model Providers > Add Channel`. Select `Ollama` as the channel type. Enter the name of the locally pulled Ollama model, then input the proxy address using the correct format:
    - For container-deployed Ollama: Use `http://[container-name]:[port]`
    - For host-installed Ollama: Use `http://[host-ip-address]:[port]` (do not use `localhost` for host-based deployments)
3.  **Test the Configured Model**: Restart your FastGPT instance if required. Create a new application in the FastGPT Studio, then select the newly added Ollama model. The model name displayed in the application selector will match the alias you configured during channel setup.
4.  **Duplicate Model Note**: You cannot add the same base Ollama model multiple times. The FastGPT system will use the alias from the most recent model entry if duplicate configurations exist.

## Troubleshooting Connectivity
If your FastGPT instance fails to connect to the Ollama instance, revisit the network validation steps outlined in the prerequisites section. Confirm the Ollama host is not restricted to a loopback interface and that all relevant containers are attached to the same shared network.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/custom-models/ollama)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
