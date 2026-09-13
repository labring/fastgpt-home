---
title: Determine Hardware Requirements for ChatGLM2 on FastGPT
slug: /en/deploy/fastgpt-chatglm2-hardware-requirements
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/custom-models/chatglm2
source_type: Official documentation
---

# Determine Hardware Requirements for ChatGLM2 on FastGPT

## VRAM Consumption Overview
Per official ChatGLM2 technical specifications, generating 8192 tokens requires a specific amount of video RAM (VRAM) based on the selected quantization precision. FP16 precision mode uses 12.8GB of VRAM, int8 quantization reduces this to 8.1GB, and int4 quantization further lowers VRAM usage to 5.1GB. Quantization slightly impacts model performance, but this effect is not significant.

## Recommended Hardware Configurations
The following table outlines validated hardware and startup command parameters for deploying ChatGLM2 with FastGPT:

| Quantization Type | Minimum System RAM | Minimum VRAM | Minimum Disk Space | Startup Command           |
|-------------------|--------------------|--------------|--------------------|-------------------------|
| fp16              | >=16GB             | >=16GB       | >=25GB             | python openai_api.py 16 |
| int8              | >=16GB             | >=9GB        | >=25GB             | python openai_api.py 8  |
| int4              | >=16GB             | >=6GB        | >=25GB             | python openai_api.py 4  |

All configuration profiles share a minimum 16GB system RAM requirement and 25GB of persistent disk space for model files and supporting dependencies.

## Startup Command Reference
The provided startup command `python openai_api.py` requires a single integer argument that defines the model's quantization bit depth. This argument directly maps to the quantization type in the configuration table: passing 16 enables FP16 precision, 8 enables int8 quantization, and 4 enables int4 quantization. Omitting this parameter may cause improper model loading, so the specified integer must be included for successful deployment.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/custom-models/chatglm2)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
