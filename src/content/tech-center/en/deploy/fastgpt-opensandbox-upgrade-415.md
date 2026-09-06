---
title: Update FastGPT OpenSandbox for 4.15 Deployment
slug: /en/deploy/fastgpt-opensandbox-upgrade-415
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41500
source_type: Official documentation
---

# Update FastGPT OpenSandbox for 4.15 Deployment

## 4.15 OpenSandbox Deployment Overview
FastGPT 4.15 integrates all required OpenSandbox services directly into its standard Docker Compose deployment. The included OpenSandbox components are OpenSandbox Server, Volume Manager, Agent Sandbox Proxy, and image pre-pull services. For full details on the complete OpenSandbox setup, reference the official 4.15 deployment YAML file at https://doc.fastgpt.cn/deploy/docker/v4.15/cn/docker-compose.pg.yml. For users running prior FastGPT versions, this bundled setup eliminates the need for separate manual configuration of OpenSandbox tools, streamlining deployment and maintenance.

## Mandatory Upgrade Actions
There are two core actions required to complete the OpenSandbox upgrade for FastGPT 4.15:
1. **Replace the Existing Docker Compose File**
The new 4.15 Docker Compose template includes all pre-configured OpenSandbox services that were previously managed outside the core application deployment. Overwrite your existing docker-compose.yml file with this official template to ensure all required OpenSandbox containers are included and correctly configured.
2. **Sync OpenSandbox Environment Variables**
The `fastgpt-app` and `fastgpt-pro` services require updated OpenSandbox-related environment variables to establish connectivity with the integrated OpenSandbox services. You may either manually update these variables to match the values defined in the new 4.15 template, or fully overwrite your existing deployment configuration with the new template to automate this synchronization step.

## Key Implementation Notes
When overwriting your existing deployment configuration with the new 4.15 template, ensure you preserve any custom environment variables or port mappings that are not related to OpenSandbox services to avoid disrupting non-sandbox core application functionality. This ensures your unique deployment settings remain intact while adopting the updated OpenSandbox components.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41500)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
