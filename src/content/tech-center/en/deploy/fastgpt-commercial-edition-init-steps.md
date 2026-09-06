---
title: Run FastGPT Commercial Edition Initialization Steps
slug: /en/deploy/fastgpt-commercial-edition-init-steps
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/489
source_type: 官方文档
---

# Run FastGPT Commercial Edition Initialization Steps

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Purpose of Initialization Command
This command supports the FastGPT Commercial Edition upgrade workflow by initializing multi-tenancy notification methods via the dedicated `/api/admin/init/489` administrative endpoint. This is an internal administrative procedure; no end-user action is required after successful execution of the request. The command only needs to be run once as part of the upgrade initialization process.

## Required Parameters
Two mandatory placeholders must be replaced before executing the command to ensure proper authentication and routing. The table explains how to supply each required parameter.
| Parameter | Description | Value Source |
|-----------|-------------|--------------|
| `{{rootkey}}` | Administrative root authentication token | Environment variable configured for the FastGPT deployment |
| `{{host}}` | Public domain name of the deployed FastGPT instance | Configured FastGPT domain |

## Execution Steps and Valid Command
Follow these steps to run the initialization request correctly:
1. Launch any terminal session, including local shell environments or remote server command lines, that has outbound network access to the configured FastGPT domain.
2. Replace the `{{rootkey}}` placeholder with the exact value of your deployment’s root key environment variable, and replace `{{host}}` with your public FastGPT domain (include the full protocol, e.g., `https://your-fastgpt-domain.com`).
3. Run the modified curl command in your active terminal session.

The official, unmodified curl command template is as follows:
```bash
curl --location --request POST 'https://{{host}}/api/admin/init/489' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
Upon successful execution, the FastGPT instance will complete initialization of multi-tenancy notification methods. As specified in the official documentation, this step is intended solely for internal administrative use and requires no additional end-user interaction following completion.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/489)
