---
title: Add MiniMax Models to FastGPT Self-Hosted Deployments
slug: /en/deploy/fastgpt-minimax-model-config-3
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/config/model/minimax
source_type: Official documentation
---

# Add MiniMax Models to FastGPT Self-Hosted Deployments

**Adding MiniMax Models to FastGPT Self-Hosted Deployments**
This documentation covers the official built-in MiniMax large language model options for self-hosted FastGPT instances, including their technical specifications and setup requirements. All listed models are pre-configured for seamless integration with FastGPT’s model framework, requiring only basic input to activate within your deployment environment.

**Built-in MiniMax Model Specifications**
The following table outlines all officially supported built-in MiniMax models, with their core technical parameters and official descriptions:
| Model ID                 | Context | Max Output | Description                                                  |
| ------------------------ | ------- | ---------- | ------------------------------------------------------------ |
| `MiniMax-M3`             | 512K    | 128K       | Latest flagship model with image input support (**default**) |
| `MiniMax-M2.7`           | 128K    | 8K         | Previous generation model                                    |
| `MiniMax-M2.7-highspeed` | 128K    | 8K         | Previous generation low-latency variant                      |

**Configuration and Usage Notes**
When setting up models in the FastGPT administrative interface, each listed Model ID can be directly entered into the custom model ID or selection field. The `MiniMax-M3` model is automatically designated as the default MiniMax model unless a different model is explicitly specified in your deployment’s configuration files. All context window and maximum output token limits defined in the table are enforced natively by FastGPT’s model handling logic, so no manual adjustment of these parameters is needed for standard deployments. Administrators can reference the Description column to select the optimal model for their workload, whether prioritizing large context capacity, low latency, or legacy model compatibility.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/config/model/minimax)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
