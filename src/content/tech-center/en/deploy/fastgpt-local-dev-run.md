---
title: Set up and run FastGPT local development server
slug: /en/deploy/fastgpt-local-dev-run
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/dev
source_type: Official documentation
---

# Set up and run FastGPT local development server

## Pre-Run Preparation
Before initiating the local development setup, review the `dev.md` file stored in the project root directory for project-specific guidance. The first compilation of the FastGPT codebase may require additional time; allow for a longer wait period during this initial setup. If the `isolate-vm` dependency fails to install during the dependency installation step, consult the official requirements documentation at https://github.com/laverdet/isolated-vm?tab=readme-ov-file#requirements for resolution steps.

## Step-by-Step Execution Commands
Follow these exact commands in order to start the local development environment, ensuring each command is run from the correct directory:
1.  Verify your current working directory is the project root by executing the `pwd` command. The terminal output must confirm you are located in the code root directory to avoid file path errors.
2.  Install all required project dependencies using the package manager command:
    ```bash
    pnpm i
    ```
3.  Change to the dedicated application subdirectory with the following command:
    ```bash
    cd projects/app
    ```
4.  Launch the local development server using the development script:
    ```bash
    pnpm dev
    ```

## Access the Running Instance
After the compilation process completes and the server starts, the FastGPT local development instance will use the default Next.js port, 3000. To access the web interface, open a web browser and navigate to `http://localhost:3000`.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/dev)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
