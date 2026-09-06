---
title: Launch Xinference Models via Command Line Interface
slug: /en/deploy/xinference-model-launch-cli
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/custom-models/xinference
source_type: Official documentation
---

# Launch Xinference Models via Command Line Interface

## Overview
Xinference supports multiple methods for deploying large language models, including the web UI, command line interface (CLI), Python SDK, and RESTful API. This page focuses on the CLI deployment workflow, using the Qwen-14B chat model as a reference example. When using the CLI to launch this model, the default Model UID is qwen-chat, which eliminates the need for manual UID configuration in most standard deployments. CLI-based model deployment is ideal for automated scripting, headless server environments, or users who prefer terminal-based operations without a graphical interface.

## CLI Deployment Command and Parameters
The core command for launching a Qwen-14B chat model via the Xinference CLI is provided below, with explicit parameter breakdowns:
```bash
xinference launch -n qwen-chat -s 14 -f pytorch
```
The following table defines each required flag and its corresponding value for this deployment:
| Command Flag | Purpose | Exact Value |
|--------------|---------|-------------|
| `-n` | Specify the target model identifier name | `qwen-chat` |
| `-s` | Declare the model's parameter scale (in billions) | `14` |
| `-f` | Select the inference framework for model execution | `pytorch` |
Each flag is mandatory for this standard Qwen-14B chat model deployment, and omitting any will result in a validation error from the Xinference CLI.

## Alternative Deployment Methods
In addition to the CLI, Xinference offers two additional deployment pathways for model hosting: the Python SDK and RESTful API. These methods are designed for developers integrating model deployment into custom applications, or teams needing programmatic control over deployment workflows. For full documentation on these alternative tools, including authentication, endpoint configuration, and error handling, refer to the official Xinference documentation at [https://inference.readthedocs.io/en/latest/getting_started/index.html](https://inference.readthedocs.io/en/latest/getting_started/index.html).

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/custom-models/xinference)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
