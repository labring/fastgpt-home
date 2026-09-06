---
title: Configure and Use FastGPT Specified Reply Nodes
slug: /en/node/fastgpt-specified-reply-nodes
page_type: Workflow nodes
source: https://doc.fastgpt.cn/en/guide/build/workflow/nodes/reply
source_type: Official documentation
---

# Configure and Use FastGPT Specified Reply Nodes

# Overview of Specified Reply Nodes
The Specified Reply node is a FastGPT workflow component typically used for special-case client responses. It can be added multiple times, which helps keep complex workflows visually clean by avoiding tangled connections between components. A visual reference for the node’s configuration interface is available below:
![Specified Reply Node Configuration Interface](/imgs/specialreply.png)

# Core Functional Features
All configured behavior of the Specified Reply node aligns with the following core features:
- Can be added multiple times (helps keep complex workflows visually clean by avoiding tangled connections)
- Supports manual input
- Supports external input
- Outputs results to the client

# Step-by-Step Configuration
Follow these steps to set up and deploy a Specified Reply node in your FastGPT workflow:
1. Add the Specified Reply node to your workflow canvas from the available component library.
2. Define the reply content using one of two approved methods:
   1. Manually enter fixed content: Type the exact response text you wish to send to clients directly into the configuration field.
   2. Use variable syntax: Integrate external input data into the reply content via supported variable syntax.
3. Connect the node to other workflow components as needed. Use multiple node instances if your workflow has complex response requirements to maintain clean visual organization.
4. Save and activate the workflow. The node will output the configured results directly to the client when triggered.

> [FastGPT public documentation](https://doc.fastgpt.cn/en/guide/build/workflow/nodes/reply)

## Applicability and version scope

Use this page for the documented Workflow nodes scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
