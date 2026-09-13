---
title: Set Up FastGPT Integration With SiliconCloud
slug: /en/deploy/fastgpt-siliconcloud-integration
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/config/model/siliconCloud
source_type: Official documentation
---

# Set Up FastGPT Integration With SiliconCloud

## Overview
SiliconCloud provides a streamlined integration pathway for FastGPT, eliminating the need to request and manage API keys from multiple individual model providers. This solution is designed to support fast initial onboarding and experimentation with open source models via FastGPT, making it accessible for teams looking to evaluate FastGPT without navigating complex multi-provider API setup.

## Core Use Cases
Two primary scenarios deliver tangible value when using SiliconCloud with FastGPT:
### Rapid Initial Trials
Teams new to FastGPT can skip the time-consuming process of acquiring separate API keys for each model provider, instead using SiliconCloud to quickly deploy and test open source models within their FastGPT environment. This removes a key barrier to entry for initial evaluation.
### Pre-Self-Hosting Validation
For teams planning to self-host both models and FastGPT in the long term, SiliconCloud serves as a low-risk testing platform. Teams can conduct full validation of model integration, workflow performance, and user experience via SiliconCloud before procuring dedicated hardware for production deployments. This approach directly reduces proof-of-concept timeline and associated operational costs during the initial evaluation phase.

## Recommended Deployment Workflow
Follow this structured workflow to maximize the value of SiliconCloud with FastGPT:
1. Configure FastGPT to use SiliconCloud as the model provider, eliminating the need for multiple individual API keys.
2. Deploy and test a range of open source models via FastGPT using SiliconCloud to validate compatibility and performance for your use case.
3. Use the results from SiliconCloud-based testing to finalize requirements for full self-hosted hardware procurement.
4. Transition from SiliconCloud to the self-hosted model and FastGPT environment once dedicated hardware is available, building on the validation completed during the initial testing phase.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/config/model/siliconCloud)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
