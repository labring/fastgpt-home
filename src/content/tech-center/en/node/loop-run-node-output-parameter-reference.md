---
title: Loop Run Node Output Parameter Reference
slug: /en/node/loop-run-node-output-parameter-reference
page_type: Workflow nodes
source: https://doc.fastgpt.cn/en/guide/build/workflow/nodes/loop_run
source_type: Official documentation
---

# Loop Run Node Output Parameter Reference

This documentation details the official output parameters and custom output configuration for the FastGPT loop run workflow node, based on the official workflow node documentation.

# Output Parameter Table
| Parameter          | Type     | Description                                                                                                                                                                                                                                         |
| :----------------- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Error Text**     | `string` | The error message if the loop terminates abnormally due to an error.                                                                                                                                                                                |
| **Custom Outputs** | Any      | Users can add custom outputs by typing a variable name in the node's **Output area** and binding it to an internal node's variable reference. When the node finishes running, it outputs the values from the final iteration (or upon termination). |

# Custom Output Configuration Steps
1. Access the loop run node’s configuration panel in the FastGPT workflow editor.
2. Enter a unique variable name into the node’s Output area.
3. Bind the entered variable name to a variable reference from an internal node within the workflow loop.
4. Save the updated node configuration. Once the loop run node finishes running, either after completing the final iteration or terminating early, it will emit the configured custom output values and any generated error text.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/workflow/nodes/loop_run)

## Applicability and version scope

Use this page for the documented Workflow nodes scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
