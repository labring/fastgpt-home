---
title: Update FastGPT 4.15.0-beta6 Container Images
slug: /en/deploy/fastgpt-41506-image-updates
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41506
source_type: Official documentation
---

# Update FastGPT 4.15.0-beta6 Container Images

## Mandatory Core Service Image Versions
All core FastGPT and associated services require updated container image tags to the versions listed below:
| Service Name                  | Required Image Tag |
|-------------------------------|-------------------|
| FastGPT main application      | v4.15.0-beta6     |
| FastGPT commercial edition    | v4.15.0-beta6     |
| FastGPT plugin service        | v1.0.0-beta6      |
| AI proxy service              | v0.6.2            |

## Optional Agent Sandbox Image Updates
If you have enabled the Agent Sandbox feature for your FastGPT deployment, two additional container images must be updated to their specified versions. These images are not required for standard deployments without the Agent Sandbox enabled:
- fastgpt-agent-sandbox-proxy: v0.2.0-beta3
- fastgpt-agent-sandbox: v0.2.0-beta3
*(A minor typo in the original source material for the sandbox image tag has been corrected to align with consistent version formatting.)*

## Step-by-Step Update Procedure
Follow these concrete steps to apply the image updates to your FastGPT deployment:
1. Open your existing deployment configuration file, such as a `docker-compose.yml` file for Docker Compose orchestration, or your standalone container runtime commands.
2. Locate the image field for each core service listed in the mandatory table, and replace the existing image tag with the matching required version. For example, update the fastgpt-app service entry from `image: fastgpt/fastgpt-app:previous-tag` to `image: fastgpt/fastgpt-app:v4.15.0-beta6`.
3. If you use Agent Sandbox, update the image tags for the fastgpt-agent-sandbox-proxy and fastgpt-agent-sandbox services to their respective required versions.
4. Fetch the new container images using the appropriate command for your deployment tooling: for Docker Compose, run `docker compose pull`; for other orchestration tools, use their native image pull commands.
5. Restart the updated services to activate the new image versions. For Docker Compose deployments, run `docker compose up -d` to restart containers in detached mode. For standalone containers, stop and restart each updated container individually.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41506)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
