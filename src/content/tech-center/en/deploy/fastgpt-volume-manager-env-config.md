---
title: Configure FastGPT Volume Manager Environment Variables
slug: /en/deploy/fastgpt-volume-manager-env-config
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/config/env
source_type: Official documentation
---

# Configure FastGPT Volume Manager Environment Variables

## Overview
This page details the environment variables for the FastGPT Volume Manager, which are loaded and validated by `projects/volume-manager/src/env.ts`. The `AGENT_SANDBOX_OPENSANDBOX_VOLUME_MANAGER_TOKEN` used by FastGPT for persistent OpenSandbox volumes must exactly match the `VM_AUTH_TOKEN` value configured here to enable successful API authentication between connected services.

## Environment Variable Reference
The following table lists all supported Volume Manager environment variables, including their default values and official usage descriptions:

| Variable                   | Default                | Description                                                      |
| -------------------------- | ---------------------- | ---------------------------------------------------------------- |
| `PORT`                     | `3000`                 | Volume Manager listening port.                                   |
| `VM_AUTH_TOKEN`            | None, **required**     | API authentication token for Volume Manager.                     |
| `VM_RUNTIME`               | `kubernetes`           | Runtime type, either `docker` or `kubernetes`.                   |
| `VM_DOCKER_SOCKET`         | `/var/run/docker.sock` | Docker socket path. Required only in `docker` mode.              |
| `VM_DOCKER_API_VERSION`    | `v1.44`                | Docker API version. Required only in `docker` mode.              |
| `VM_K8S_NAMESPACE`         | `opensandbox`          | Kubernetes namespace. Required only in `kubernetes` mode.        |
| `VM_K8S_PVC_STORAGE_CLASS` | `standard`             | Kubernetes PVC StorageClass. Required only in `kubernetes` mode. |
| `VM_LOG_LEVEL`             | `info`                 | Log level. Supported values are `debug`, `info`, and `none`.     |

## Runtime-Specific Configuration
Certain environment variables are mandatory only for the selected `VM_RUNTIME` type. The default runtime is `kubernetes`.
- For `docker` mode: You must configure `VM_DOCKER_SOCKET` and `VM_DOCKER_API_VERSION`; these variables have specified fallback defaults but are required for docker-based volume management.
- For `kubernetes` mode: You must configure `VM_K8S_NAMESPACE` and `VM_K8S_PVC_STORAGE_CLASS`; these variables replace docker-specific settings and are required for orchestrated volume provisioning.

Additional standard configuration notes: The `PORT` variable defines the local listening port for the Volume Manager API, with a default value of `3000`. The `VM_LOG_LEVEL` controls log verbosity, with supported values of `debug`, `info`, and `none`, and a default of `info`. The `VM_AUTH_TOKEN` is a universally required variable with no default value, as it secures all Volume Manager API endpoints.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/config/env)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
