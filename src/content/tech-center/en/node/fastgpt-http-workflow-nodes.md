---
title: Configure and use FastGPT HTTP workflow nodes
slug: /en/node/fastgpt-http-workflow-nodes
page_type: Workflow nodes
source: https://doc.fastgpt.cn/en/guide/build/workflow/nodes/http
source_type: Official documentation
---

# Configure and use FastGPT HTTP workflow nodes

# HTTP Workflow Node Overview
The HTTP node enables sending standardized HTTP requests to a specified URL within a FastGPT workflow. It supports full configuration of core request components, with flexible variable integration for dynamic data handling. This node is designed to align with standard HTTP request conventions, with tailored options for different request methods and use cases.

# Core Configuration Parameters
All configurable fields for the HTTP node support dynamic variable injection via `{{}}` syntax. Below is a breakdown of the core parameters:

| Parameter Name | Typical Usage Context | Key Features |
|----------------|------------------------|--------------|
| URL | Target endpoint for the HTTP request | Supports `{{}}` variable references |
| Params | Query string parameters, most commonly used with GET requests | Supports `{{}}` variable references |
| Body | Request payload data, most commonly used with POST or PUT requests | Supports `{{}}` variable references |
| Headers | Additional metadata or authentication details for the request | Supports `{{}}` variable references |

Variables used in these fields are limited to three approved inputs: global workflow variables, system variables, and output data from immediately preceding upstream workflow nodes.

# Step-by-Step Configuration Workflow
1. Add the HTTP node to your FastGPT workflow canvas from the available node library.
2. Input the target URL for the request, using `{{}}` syntax to inject dynamic variables as needed.
3. Configure additional request components based on your selected HTTP method: add query parameters for GET requests, or define a request body for POST or PUT requests, with full support for variable references.
4. Add custom request headers to pass required context such as content type specifications or authentication tokens, again supporting variable injection.
5. Connect upstream workflow nodes to the HTTP node to pass their output data as variables, or use preconfigured global or system variables directly in the configuration fields.
6. Validate the configured HTTP node by running a test execution of the workflow to confirm the request sends correctly and returns expected data.

> [FastGPT public documentation](https://doc.fastgpt.cn/en/guide/build/workflow/nodes/http)

## Applicability and version scope

Use this page for the documented Workflow nodes scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
