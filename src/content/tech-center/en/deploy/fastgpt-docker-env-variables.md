---
title: Configure FastGPT Docker Environment Variables
slug: /en/deploy/fastgpt-docker-env-variables
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/deploy/docker
source_type: Official documentation
---

# Configure FastGPT Docker Environment Variables

## Core Mandatory Environment Variable
The `fastgpt-app` service requires a properly configured `FE_DOMAIN` environment variable. This value must be the full public URL that end users use to access FastGPT, including the protocol scheme (such as `http://` or `https://`), domain host, and optional port number. Do not leave this variable empty, and never use an internal container-only address as the value. A valid example of this variable is `https://fastgpt.example.com`.

## Sandbox Environment Variables (For Enabled Agent/Skill Workflows)
If you enable the Agent/Skill Sandbox feature for your FastGPT deployment, you must add two additional environment variables. First, `AGENT_SANDBOX_PROXY_URL`: this is a browser-accessible WebSocket URL using either `ws://` or `wss://` protocols, pointing to the sandbox proxy service running on port 3006. A valid example is `wss://sandbox-proxy.example.com`. For FastGPT version 4.16 and later releases, you must also configure `AGENT_SANDBOX_PREVIEW_PROXY_URL`: this is a browser-accessible HTTP or HTTPS URL pointing to the same sandbox proxy service on port 3006, with a valid example being `https://sandbox-proxy.example.com`. The interactive FastGPT install script will automatically prompt for these sandbox-related addresses before the final deployment confirmation step.

## Zilliz Version Specific Configuration
FastGPT’s Zilliz version requires additional credential setup beyond the base environment variables. All other FastGPT deployment versions do not require this additional configuration. To complete this setup, refer to the dedicated [Deploy Zilliz Version: Get Account and Credentials](#deploy-zilliz-version-get-account-and-credentials) documentation section to obtain and configure the required credentials.

## Step-by-Step Environment Variable Application
1.  Access your FastGPT Docker deployment configuration files, including environment variable files or service definition blocks.
2.  Update the `FE_DOMAIN` variable for the `fastgpt-app` service to your public user access URL.
3.  If using Agent/Skill Sandbox:
    a.  Add the `AGENT_SANDBOX_PROXY_URL` variable with your browser-accessible WebSocket sandbox proxy URL.
    b.  If running FastGPT 4.16 or a later version, add the `AGENT_SANDBOX_PREVIEW_PROXY_URL` variable with your sandbox preview HTTP(S) URL.
4.  If deploying the Zilliz version of FastGPT, add the required credentials as specified in the linked documentation section.
5.  Save your configuration changes, or proceed through the interactive install script prompts to input the required addresses when prompted.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/deploy/docker)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
