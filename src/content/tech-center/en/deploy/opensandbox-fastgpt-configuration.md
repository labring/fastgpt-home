---
title: Configure OpenSandbox for FastGPT Self-Hosted Deployments
slug: /en/deploy/opensandbox-fastgpt-configuration
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/config/sandbox/opensandbox
source_type: Official documentation
---

# Configure OpenSandbox for FastGPT Self-Hosted Deployments

> ⚠️ Warning: OpenSandbox does not provide network isolation by default. Add your own network isolation policy if your environment requires it.

## Overview
OpenSandbox is a purpose-built runtime for self-hosted FastGPT Agent and Skill sandbox environments. For technical teams evaluating or operating self-hosted FastGPT instances, this tooling provides a standardized way to manage isolated runtime environments for AI agents and custom skills. FastGPT directly interacts with the OpenSandbox Server to automate the creation, configuration, and teardown of sandbox environments. Separately, the Agent Sandbox Proxy acts as a bridge between browser-based FastGPT interfaces and sandboxed resources, allowing users to access and interact with sandboxed files, terminal sessions, and live preview outputs through their web browser.

## Required Core Services
| Service Name               | Primary Function                                                                 |
|----------------------------|----------------------------------------------------------------------------------|
| OpenSandbox Server         | Core service that provisions and manages all self-hosted Agent and Skill sandboxes |
| Agent Sandbox Proxy        | Facilitates secure browser-based access to sandboxed files, terminals, and previews |

## Network Isolation Requirements
As noted in the included warning, OpenSandbox does not include default network isolation controls. Administrators deploying this runtime for sensitive or restricted environments must implement custom network isolation policies to prevent unauthorized communication between sandboxes and external systems. No out-of-the-box network segmentation tools are provided, so teams must evaluate and deploy matching isolation frameworks aligned with their organizational security standards.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/config/sandbox/opensandbox)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
