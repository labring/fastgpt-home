---
title: Test FastGPT App Chat and Image Recognition with SiliconCloud
slug: /en/deploy/fastgpt-siliconcloud-app-testing
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/config/model/siliconCloud
source_type: Official documentation
---

# Test FastGPT App Chat and Image Recognition with SiliconCloud

## Overview
This section provides structured guidance for validating chat and image recognition workflows using SiliconCloud integrated models within self-hosted FastGPT applications. It includes actionable setup steps, visual reference checkpoints, and performance observations for high-capacity model variants.

## Step-by-Step Test Workflow
Complete these sequential steps to validate your configured SiliconCloud model functionality:
1. Create a new basic FastGPT application via your deployment’s administrative interface.
2. Select the pre-configured SiliconCloud model from the available model dropdown menu.
3. Navigate to the application’s feature settings and enable the image upload toggle to activate image recognition capabilities.
4. Open the public or internal application chat interface to begin testing.
5. Submit text-only prompts and text prompts paired with uploaded images to verify both chat and image recognition functionality.

A two-column visual reference for key test stages is provided below, matching the official documentation assets:
| Application Configuration Stage | Active Test Session Stage |
|----------------------------------|--------------------------|
| ![Application setup and model selection](../../../../public/imgs/image-68.png) | ![Chat session with image upload enabled](../../../../public/imgs/image-70.png) |

## 72B Model Performance Observations
The 72B parameter variant of the SiliconCloud model delivers strong throughput when hosted via the platform. For teams unable to deploy local infrastructure with multiple 4090 GPUs, direct local execution of this model variant incurs substantial latency: just generating raw model output takes approximately 30 seconds, not including the time required for initial environment setup and dependency configuration. This demonstrates the operational efficiency of leveraging cloud-hosted SiliconCloud models for high-capacity AI workloads within FastGPT.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/config/model/siliconCloud)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
