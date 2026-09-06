---
title: Implement Repeated Sub-Workflows With Loop Nodes
slug: /en/node/fastgpt-workflow-loop-nodes
page_type: Workflow nodes
source: https://doc.fastgpt.cn/en/guide/build/workflow/nodes/loop_run
source_type: Official documentation
---

# Implement Repeated Sub-Workflows With Loop Nodes

# Loop Node Overview
The FastGPT Loop Node is a dedicated workflow building block that enables repeated execution of a nested sub-workflow. It supports two standardized use case patterns to streamline repetitive automation tasks. An official visual reference for the node is available at `/imgs/fastgpt-loop-run-node.png` in the FastGPT documentation library. This node eliminates manual duplication of workflow steps for repeated tasks, reducing configuration overhead for repetitive automation workflows.

# Core Loop Functionality Modes
There are two native loop modes available within the Loop Node, aligned to common automation needs:
1.  **Array Loop**: Processes each individual entry within a provided data array sequentially, running the attached sub-workflow once per array item. This mode is purpose-built for batch processing structured list data.
2.  **Conditional Loop**: Executes the nested sub-workflow repeatedly, terminating only when a predefined success condition is satisfied. This mode supports iterative task refinement until output meets required quality or operational standards.

# Step-by-Step Configuration Guide
This configuration workflow uses only native FastGPT Loop Node parameters as defined in official documentation:
1.  Navigate to the workflow canvas in your FastGPT project, and add the Loop Node from the official component library.
2.  Select your desired loop mode from the node's configuration menu: either Array Loop or Conditional Loop.
3.  For Array Loop setups: Attach your pre-defined array data input to the node, then configure the nested sub-workflow to run for each individual array entry.
4.  For Conditional Loop setups: Build the nested sub-workflow to include a condition check step (e.g., validating an AI draft quality score). Connect the condition check output to restart the sub-workflow until the predefined termination condition is satisfied.
5.  Validate the configured workflow to confirm all connections are correctly aligned, then save the final workflow setup.

# Typical Deployment Scenarios
The Loop Node is optimized for three common developer and enterprise automation scenarios: first, summarizing individual paragraph chunks from a long-form article to produce a consolidated, cohesive summary; second, iteratively refining an AI-generated draft until a specified quality threshold (e.g., score ≥80) is achieved; third, sequentially calling external APIs in batch to process multiple data entries without manual intervention.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/workflow/nodes/loop_run)

## Applicability and version scope

Use this page for the documented Workflow nodes scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
