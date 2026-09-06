---
title: Configure FastGPT Self-Hosted Deployment Environment Variables
slug: /en/deploy/fastgpt-self-hosted-deployment-env-vars
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/config/env
source_type: Official documentation
---

# Configure FastGPT Self-Hosted Deployment Environment Variables

## Overview
This page documents environment variables for self-hosted FastGPT deployments. The `projects/app` and `pro/admin` components reuse most configuration settings defined in `packages/service/env.ts`, so shared variables for core infrastructure and service operations are grouped together, while component-specific variables are documented separately.

## Shared Environment Variables
Shared variables are sourced from `packages/service/env.ts` and used by both `projects/app` and `pro/admin`. These grouped variables cover five core areas: database configuration, secret management, object storage settings, vector database parameters, and general service-level configurations. This grouping consolidates all reusable settings that support shared FastGPT backend functionality.

A structured breakdown of the shared variable categories is below:
| Variable Category       | Core Purpose                                                                 |
|-------------------------|--------------------------------------------------------------------------------|
| Database Configuration  | Settings for connecting to the FastGPT primary database                        |
| Secret Management       | Security tokens, keys, and encryption configurations for service communications|
| Object Storage          | Settings for storing uploaded files, dataset exports, and media assets         |
| Vector Database         | Configuration parameters for integrated vector search infrastructure           |
| Core Service Settings   | Global operational parameters for core FastGPT backend services                |

## Component-Specific Variables
Some environment variables are only read by either `projects/app` or `pro/admin`, and are not shared between the two components. These variables are documented separately to ensure deployers can correctly configure only the components they have deployed, eliminating potential configuration conflicts or unintended behavior.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/config/env)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
