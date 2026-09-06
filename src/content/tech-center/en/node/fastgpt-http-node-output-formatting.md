---
title: Configure FastGPT HTTP Node Output Formatting
slug: /en/node/fastgpt-http-node-output-formatting
page_type: Workflow nodes
source: https://doc.fastgpt.cn/en/guide/build/workflow/nodes/http
source_type: Official documentation
---

# Configure FastGPT HTTP Node Output Formatting

## Feature Overview
Starting from FastGPT v4.6.8, the HTTP node includes a parameter structure auto-format output feature. This built-in functionality simplifies data handling between HTTP data retrieval steps and other workflow components by standardizing output formatting.

## Auto-format Behavior Specifications
The core function of this feature is converting JSON data to string format. When the `string` output type is selected for the HTTP node, the platform will automatically convert the value of the configured target key into a valid JSON string. This removes the need for manual data stringification, enabling a streamlined workflow pipeline: users can pipe the HTTP node’s raw output directly into a Text Processing node, append custom prompts to refine the input, then feed the finalized data into an AI Chat node for downstream AI-driven processing.

## Step-by-Step Configuration Workflow
1. Launch the target FastGPT workflow editor and add an HTTP node to the workflow canvas.
2. Open the HTTP node’s configuration panel to access its output settings.
3. Locate the output type dropdown menu and select `string` as the desired output format.
4. Specify the target key whose values will be converted to a JSON string via the auto-format feature.
5. Connect the HTTP node’s output port to the input port of an adjacent Text Processing node.
6. Add custom prompt text within the Text Processing node to tailor the input data for AI processing.
7. Connect the output port of the Text Processing node to an AI Chat node to complete the integrated workflow pipeline.

## Critical Usage Warning
> ⚠️ Warning
> The HTTP node is extremely versatile. You can integrate public APIs to extend your workflow capabilities.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/workflow/nodes/http)

## Applicability and version scope

Use this page for the documented Workflow nodes scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
