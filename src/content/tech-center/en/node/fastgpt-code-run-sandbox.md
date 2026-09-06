---
title: Secure Code Execution via FastGPT Sandbox Node
slug: /en/node/fastgpt-code-run-sandbox
page_type: Workflow nodes
source: https://doc.fastgpt.cn/en/guide/build/workflow/nodes/sandbox-v2
source_type: Official documentation
---

# Secure Code Execution via FastGPT Sandbox Node

## Overview of Code Run Sandbox Node
The FastGPT Code Run node provides a secure, isolated environment for executing JavaScript and Python code as part of workflow automation. It supports targeted tasks including data processing, format conversion, and custom logic calculations, enabling users to extend FastGPT workflow functionality without direct access to underlying host systems. The node supports two programming languages: JavaScript executed via the Bun runtime, and Python 3.

## Core Constraints & Configuration Parameters
All code execution occurs within isolated process pools, with no access to the host file system or internal network resources. This isolation prevents unauthorized system modifications or internal network exposure during code runs. Below is a reference table of key configuration parameters tied to the sandbox:
| Parameter | Default Value | Description |
|-----------|---------------|-------------|
| `CODE_SANDBOX_URL` | Unset (required for self-hosted deployments) | Environment variable defining the network endpoint of the deployed sandbox service for FastGPT instances |
| Execution Timeout | 60 seconds | Maximum allowed duration for a single code execution job, with the option to configure a custom timeout value beyond the default limit.

## Self-Hosted Deployment Workflow
For self-hosted FastGPT deployments, two mandatory steps are required to enable the Code Run node:
1. Deploy the official `fastgpt-sandbox` container image to your infrastructure, ensuring the service is accessible over your configured network.
2. Set the `CODE_SANDBOX_URL` environment variable in your FastGPT deployment configuration, using the full network address of the deployed sandbox service.
Users may also adjust the default 60-second execution timeout to align with their specific workflow performance needs, if required.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/workflow/nodes/sandbox-v2)

## Applicability and version scope

Use this page for the documented Workflow nodes scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
