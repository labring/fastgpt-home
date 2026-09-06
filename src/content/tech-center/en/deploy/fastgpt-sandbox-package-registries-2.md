---
title: Configure Custom Package Registries for FastGPT Sandboxes
slug: /en/deploy/fastgpt-sandbox-package-registries-2
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/config/sandbox/sealosdevbox
source_type: Official documentation
---

# Configure Custom Package Registries for FastGPT Sandboxes

# Overview
FastGPT’s sandbox environments share identical package registry configuration between OpenSandbox and Sealos Devbox. The APT mirror setting only applies to root Agent sandboxes. Below is the sample dotenv configuration for custom package registries:
```dotenv
AGENT_SANDBOX_NPM_REGISTRY=https://registry.npmmirror.com
AGENT_SANDBOX_PYPI_INDEX_URL=https://pypi.tuna.tsinghua.edu.cn/simple
AGENT_SANDBOX_APT_MIRROR=https://mirrors.tuna.tsinghua.edu.cn/debian
```

# Configuration Parameters
The following environment variables control package registry behavior for FastGPT sandboxes:
| Environment Variable | Purpose | Example Value |
|----------------------|---------|---------------|
| `AGENT_SANDBOX_NPM_REGISTRY` | Sets the custom NPM registry URL for sandbox JavaScript and TypeScript packages | `https://registry.npmmirror.com` |
| `AGENT_SANDBOX_PYPI_INDEX_URL` | Defines the custom PyPI index URL for sandbox Python packages | `https://pypi.tuna.tsinghua.edu.cn/simple` |
| `AGENT_SANDBOX_APT_MIRROR` | Configures the APT mirror for Debian or Ubuntu-based root Agent sandboxes | `https://mirrors.tuna.tsinghua.edu.cn/debian` |

# APT Mirror Behavior for Root Agent Sandboxes
When the `AGENT_SANDBOX_APT_MIRROR` variable is enabled for a root Agent sandbox, FastGPT automatically generates and overwrites the standard Ubuntu or Debian `.sources` file for the detected host distribution. A `.copy` backup of the original file is created before any overwriting occurs to prevent data loss. If the environment variable is later removed from the configuration, FastGPT restores any files with a `.copy` backup; files without an existing backup are left unchanged. Importantly, sandbox initialization does not automatically run `apt-get update` after applying the new mirror configuration. For arm64 runtime images, you must use a mirror URL that provides packages compatible with the arm64 architecture to avoid installation failures.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/config/sandbox/sealosdevbox)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
