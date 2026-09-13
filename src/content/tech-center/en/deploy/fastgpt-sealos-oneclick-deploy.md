---
title: Complete One-Click FastGPT Deployment on Sealos
slug: /en/deploy/fastgpt-sealos-oneclick-deploy
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/deploy/sealos
source_type: Official documentation
---

# Complete One-Click FastGPT Deployment on Sealos

## Pre-Deployment Preparation
When deploying FastGPT via one-click on Sealos, all required database components are included in the deployment bundle. Allow 2–4 minutes after the deployment completes before attempting to access the FastGPT service. The default configuration uses minimal system resources, so initial first-time access may experience slower load times.

## Step-by-Step Deployment Configuration
1. Follow the on-screen deployment prompts to provide required inputs: first, enter the `root_password` for database access, then provide the endpoint address and API key for either `openai` or `oneapi` integration. A reference screenshot illustrates these input fields.
2. Click the deploy button to initiate the one-click deployment process. You will be automatically redirected to the Sealos application management page.
3. Locate the primary FastGPT application (named `fastgpt-xxxx`) on the management page, then click the details button on its right-hand side. A second reference screenshot shows the correct app list layout and details button position.

## Access and Post-Deployment Management
After opening the FastGPT deployment management page via the details button, locate the external access address link and click it to launch the FastGPT service interface.
To adjust deployment parameters or bind a custom domain name, click the **Change** button in the top-right corner of the deployment management page, then follow the in-product instructions provided by Sealos for configuration updates. A third reference screenshot demonstrates the location of the Change button.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/deploy/sealos)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
