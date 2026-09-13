---
title: Configure FastGPT Parallel Run Deployment Parameters
slug: /en/node/fastgpt-parallel-run-settings
page_type: Workflow nodes
source: https://doc.fastgpt.cn/en/guide/build/workflow/nodes/parallel_run
source_type: Official documentation
---

# Configure FastGPT Parallel Run Deployment Parameters

# Overview
For self-hosted FastGPT deployments, administrators can adjust dedicated environment variables to control the behavior of Parallel Run and Batch Processing workflow nodes. These settings let you align workflow performance with your infrastructure’s available resources, preventing overload from overly large input arrays or excessive concurrent tasks.

# Tunable Environment Variables
The following environment variables are available for configuration in self-hosted FastGPT instances:

| Environment variable                | Default | Description                                                                                 |
| ----------------------------------- | ------- | ------------------------------------------------------------------------------------------- |
| `WORKFLOW_MAX_LOOP_TIMES`           | 100     | Maximum length of the input array (shared by Batch Processing and Parallel Run)             |
| `WORKFLOW_PARALLEL_MAX_CONCURRENCY` | 10      | Upper bound of the Max concurrency setting. Must not exceed `WORKFLOW_MAX_LOOP_TIMES`       |

# Deployment Configuration Steps
To apply custom values for these environment variables:
1. Locate your self-hosted FastGPT deployment’s environment variable configuration storage. Common locations include a `.env` file in the deployment root, Docker Compose `environment` sections, or Kubernetes pod config maps.
2. Add or update the target environment variable entries with your desired values.
3. Validate that `WORKFLOW_PARALLEL_MAX_CONCURRENCY` does not exceed the value set for `WORKFLOW_MAX_LOOP_TIMES`, as required by the platform constraints.
4. Restart your FastGPT deployment services to apply the updated configuration.

# Critical Constraint Notes
The two environment variables have a required dependency: the maximum concurrency limit cannot be larger than the maximum input array length. Violating this constraint will result in unexpected behavior during Parallel Run or Batch Processing node execution, as the platform will enforce the lower of the two configured values automatically, or reject invalid configuration loads during startup.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/workflow/nodes/parallel_run)

## Applicability and version scope

Use this page for the documented Workflow nodes scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
