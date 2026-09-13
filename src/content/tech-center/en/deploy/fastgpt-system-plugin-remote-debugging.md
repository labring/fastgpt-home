---
title: Set Up FastGPT System Plugin Remote Debugging
slug: /en/deploy/fastgpt-system-plugin-remote-debugging
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/config/remote-debug-suite
source_type: Official documentation
---

# Set Up FastGPT System Plugin Remote Debugging

**Intended Use and Limitations**
The system plugin remote debugging suite temporarily connects FastGPT system plugins running on a local developer machine to a FastGPT test environment. It supports system plugin development, integration testing, and acceptance validation, and is not intended for use as a production plugin runtime.

> 🤖 Warning
> The system plugin remote debugging suite is exclusive to the commercial edition of FastGPT.
> FastGPT Cloud is the recommended starting point for remote debugging workflows. Self-hosted deployments require manual operation of the Plugin Server, Connection Gateway, Redis, reverse proxy, TLS encryption, and secret rotation processes.

**Default Deployment Gaps**
The standard Docker Compose deployment package for FastGPT includes only the core FastGPT main service and the standard `fastgpt-plugin` runtime. It does not include the public WebSocket configuration required by the Connection Gateway component of the remote debugging suite.

**Self-Hosted Deployment Steps**
1.  Confirm you are using the commercial FastGPT edition, as the remote debugging suite is not available for non-commercial deployments.
2.  If using FastGPT Cloud, use the official cloud-based remote debugging setup instead of self-hosted configuration.
3.  For self-hosted FastGPT instances, do not rely exclusively on the default Docker Compose deployment. Deploy the system plugin remote debugging suite as a separate, standalone component.
4.  Manually configure and launch all required supporting infrastructure: Plugin Server, Connection Gateway, Redis, reverse proxy, TLS encryption, and secret rotation tools.
5.  Establish a temporary secure connection between your local system plugin and the FastGPT test environment using the suite’s configured network endpoints.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/config/remote-debug-suite)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
