---
title: Configure FastGPT Agent V2 Virtual Machine Sandbox
slug: /en/tutorial/fastgpt-agent-v2-vm-sandbox
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/build/agentv2/vm
source_type: Official documentation
---

# Configure FastGPT Agent V2 Virtual Machine Sandbox

## Overview of FastGPT Agent V2 Virtual Machine
The FastGPT Agent V2 Virtual Machine is a dedicated, physically isolated, secure lightweight Linux sandbox environment provisioned automatically for every individual chat session. This isolated context eliminates cross-session data leakage risks while providing the agent with tangible, real-world computational resources.

import { Alert } from '@/components/docs/Alert';
<Alert type="info">All sandbox environments are tied exclusively to their parent chat session, with no persistent shared state between separate interactions.</Alert>

![Virtual Machine Sandbox](/imgs/agent_vm_intro.png)

## Core Functional Capabilities
This sandbox equips Agent V2 with three critical operational capabilities that extend beyond standard AI passive reasoning:
1.  Real-world computation resources to support resource-intensive task execution
2.  Native code execution functionality, allowing the AI to run code to solve complex, hands-on tasks analogous to a human programmer
3.  Sandboxed file read and write access for data import, manipulation, and export during active chat sessions

These capabilities enable the agent to move beyond generating theoretical solutions to executing actionable code and handling file-based data directly within the chat workflow.

## Step-by-Step Configuration Workflow
Follow this structured workflow to integrate the Virtual Machine sandbox with your Agent V2 deployment:
1.  Navigate to the Agent V2 configuration settings in your FastGPT workspace
2.  Locate the Virtual Machine sandbox toggle and enable the feature
3.  Assign the enabled sandbox to specific agent workflows that require code execution or file operations
4.  Save the configuration changes and deploy the updated agent
5.  Test the sandbox functionality by submitting a prompt requesting code-based task completion, such as writing and running a simple script

## Session Validation
Once configured, you can verify proper sandbox operation by reviewing session logs for code execution events and file system changes. All sandbox activity is tied to individual chat sessions, making it easy to trace operations back to specific user interactions.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/agentv2/vm)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
