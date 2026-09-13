---
title: Configure FastGPT Loop Run Node Input Parameters
slug: /en/node/fastgpt-loop-run-node-inputs
page_type: Workflow nodes
source: https://doc.fastgpt.cn/en/guide/build/workflow/nodes/loop_run
source_type: Official documentation
---

# Configure FastGPT Loop Run Node Input Parameters

## Overview
The Loop Run node is a workflow component within FastGPT that enables iterative execution of a sub-workflow. Loop nodes are critical for processing batch data, automating repeated tasks, and controlling iterative workflow logic within the platform. This document covers the required input parameters for configuring the Loop Run node, as defined in the official FastGPT workflow documentation. All details below align directly with the official parameter specifications for the node.

## Parameter Reference
The following table lists all required input parameters for the Loop Run node, including their required status, default values, and functional descriptions:
| Parameter     | Required | Default    | Description                                                                                                                          |
| :------------ | :------- | :--------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| **Loop Type** | Yes      | Array Loop | Choose between `Array Loop` (array) or `Conditional Loop` (conditional).                                                             |
| **Array**     | Yes      | -          | _(Visible only in Array Loop mode)_ The list of data to process. Typically referenced from a preceding node's array output.          |
| **Loop Body** | Yes      | -          | The sub-workflow to execute inside the container, starting from the **Loop Start** node (can be exited via the **Loop Break** node). |

## Configuration Steps
To configure the Loop Run node using its input parameters:
1.  Select the desired Loop Type. The default value for this parameter is `Array Loop`, and users may select either `Array Loop` or `Conditional Loop` based on their workflow needs.
2.  If the Array Loop type is selected, the Array parameter becomes visible. Populate this field with a list of data items, which is most often sourced from the array output of a preceding workflow node.
3.  Define the Loop Body parameter by configuring the sub-workflow that will execute during each loop iteration. This sub-workflow must begin with a **Loop Start** node, and may include a **Loop Break** node to terminate the loop before all iterations complete.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/workflow/nodes/loop_run)

## Applicability and version scope

Use this page for the documented Workflow nodes scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
