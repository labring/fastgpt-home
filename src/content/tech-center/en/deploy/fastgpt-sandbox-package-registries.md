---
title: Configure Package Registries for FastGPT Sandboxes
slug: /en/deploy/fastgpt-sandbox-package-registries
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/config/sandbox/opensandbox
source_type: Official documentation
---

# Configure Package Registries for FastGPT Sandboxes

## Overview
FastGPT agent sandboxes may require Node.js (npm), Python, or system-level apt dependencies during execution. To ensure reliable dependency installation, or to use regional package mirrors instead of public global registries, configure registry settings for both the `fastgpt-app` and `fastgpt-pro` self-hosted services.

## Core Configuration Variables
Use the following environment variables to define package registry endpoints. All variables are set in the service configuration files for `fastgpt-app` and `fastgpt-pro`:

| Environment Variable | Purpose | Example Value |
|----------------------|---------|---------------|
| `AGENT_SANDBOX_NPM_REGISTRY` | Sets the npm registry for all sandbox runtime images, used for installing Node.js package dependencies | `https://registry.npmmirror.com` |
| `AGENT_SANDBOX_PYPI_INDEX_URL` | Sets the PyPI index URL for all sandbox runtime images, used for installing Python package dependencies | `https://pypi.tuna.tsinghua.edu.cn/simple` |
| `AGENT_SANDBOX_APT_MIRROR` | Sets the Ubuntu apt repository mirror for root agent sandboxes. Must point to the repository root, not a `dists` path or specific release directory | `https://mirrors.tuna.tsinghua.edu.cn/ubuntu` |

## APT Mirror Architecture & File Management
The `AGENT_SANDBOX_APT_MIRROR` variable does not auto-select based on runtime image architecture. You must explicitly choose the correct repository path for your target architecture:
- For Ubuntu amd64 / x86_64: Use the standard Ubuntu repository path, e.g., `https://mirrors.tuna.tsinghua.edu.cn/ubuntu`
- For Ubuntu arm64 / aarch64: Use the Ubuntu Ports repository path, e.g., `https://mirrors.tuna.tsinghua.edu.cn/ubuntu-ports`

FastGPT reads the `/etc/os-release` file to detect the Ubuntu version and codename, then generates or overwrites `/etc/apt/sources.list.d/ubuntu.sources`. This file includes the main repository, security updates, backports, and standard release updates. Before overwriting an existing file, FastGPT creates a `.copy` backup. If the `AGENT_SANDBOX_APT_MIRROR` variable is removed from the configuration, FastGPT restores any backed-up sources files, and leaves non-backed-up files unchanged. Note that initialization does not automatically run `apt-get update`.

## Validating Mirror Paths
To confirm correct repository paths for other Ubuntu releases, reference the official [Ubuntu mirror guide](https://mirrors.tuna.tsinghua.edu.cn/help/ubuntu/) and [Ubuntu Ports mirror guide](https://mirrors.tuna.tsinghua.edu.cn/help/ubuntu-ports/). For third-party mirror providers, use their standard Ubuntu or Ubuntu Ports repository path matching your target architecture.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/config/sandbox/opensandbox)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
