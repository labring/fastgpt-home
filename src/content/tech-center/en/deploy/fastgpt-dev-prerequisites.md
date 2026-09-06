---
title: Install Required Dependencies for FastGPT Development
slug: /en/deploy/fastgpt-dev-prerequisites
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/dev
source_type: Official documentation
---

# Install Required Dependencies for FastGPT Development

## Prerequisite Overview
This document outlines the required software dependencies to set up a local FastGPT development environment. FastGPT recommends using *nix-based operating systems, including Linux, macOS, and Windows Subsystem for Linux (WSL), for optimal compatibility during development.

## Mandatory Dependencies
The following software must be installed and configured on your development machine:

| Dependency          | Required Specification       | Official Resource Link               |
|---------------------|-------------------------------|--------------------------------------|
| Git                 | No minimum version specified  | https://git-scm.com/                  |
| Docker              | No minimum version specified  | https://www.docker.com/              |
| Node.js             | v20.14.0 (match version closely)  | https://nodejs.org                   |
| pnpm                | 9.4.0 (official dev environment) | https://pnpm.io/                    |

For Node.js version management, use the Node Version Manager (nvm) tool to install and maintain the exact v20.14.0 release, as mismatched versions can lead to build or runtime inconsistencies.

## Step-by-Step Setup Instructions
1.  Complete the installation and initial configuration of Git using the official guide linked in the dependency table.
2.  Install Docker and ensure the Docker daemon is running on your local machine, following the official Docker setup documentation.
3.  Install Node.js v20.14.0 exactly, using nvm to manage your Node.js installations to ensure compliance with the required version.
4.  Install pnpm version 9.4.0, the official recommended package manager for FastGPT’s development environment, via the official pnpm setup guide.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/dev)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
