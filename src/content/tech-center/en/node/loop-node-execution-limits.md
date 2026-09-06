---
title: Adjust FastGPT Loop Node Execution Limits
slug: /en/node/loop-node-execution-limits
page_type: 工作流节点
source: https://doc.fastgpt.cn/en/guide/build/workflow/nodes/loop_run
source_type: 官方文档
---

# Adjust FastGPT Loop Node Execution Limits

## Overview
Self-hosted FastGPT operators and developers can adjust execution constraints for Loop and Parallel Run workflow nodes to control resource usage and prevent unintended long-running operations. This configuration is managed entirely via a single environment variable, with no modifications needed to individual workflow node definitions.

## Environment Variable Reference
The following environment variable controls core execution limits for both Loop and Parallel Run nodes:

| Environment Variable      | Default | Description                                                                                                                            |
| :------------------------ | :------ | :------------------------------------------------------------------------------------------------------------------------------------- |
| `WORKFLOW_MAX_LOOP_TIMES` | 100     | The maximum length of input arrays and the maximum iteration limit for Conditional Loops (shared by both Loop and Parallel Run nodes). |

## Configuration Steps
To update the loop execution limit for your self-hosted FastGPT deployment:
1. Locate your deployment's environment configuration files. For standard Docker or docker-compose setups, this is typically the `.env` file in your FastGPT installation directory. For Kubernetes deployments, edit the deployment manifest for the FastGPT workflow service.
2. Add or update the `WORKFLOW_MAX_LOOP_TIMES` variable with your desired integer value. For example, to set the maximum limit to 200, add the line `WORKFLOW_MAX_LOOP_TIMES=200`.
3. Save your configuration changes and restart the FastGPT workflow service to activate the new settings.

## Configuration Impact
When applied, the `WORKFLOW_MAX_LOOP_TIMES` value enforces two critical constraints: it caps the maximum number of iterations for conditional loop nodes, and it limits the maximum length of input arrays processed by both Loop and Parallel Run nodes. Any workflow operation that exceeds the configured limit will terminate automatically to prevent excessive resource consumption on your host infrastructure.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/guide/build/workflow/nodes/loop_run)
