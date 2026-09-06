---
title: Access Your Deployed FastGPT Web Instance
slug: /en/deploy/fastgpt-deployment-access
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/deploy/docker
source_type: Official documentation
---

# Access Your Deployed FastGPT Web Instance

## Access the FastGPT Web Interface
After completing the core deployment setup (including opening the required network port or configuring a custom domain as outlined in step 3 of the official deployment workflow), access the FastGPT web interface using the exposed endpoint. This endpoint will be either the public IP address of your host machine paired with the configured port, or your pre-configured custom domain name. Ensure your host machine’s firewall allows inbound traffic to the selected port to avoid connection issues.

## Default Login Credentials
All FastGPT deployments use a fixed administrative root username: `root`. The authentication password is dynamically pulled from the `DEFAULT_ROOT_PSW` environment variable specified in your `docker-compose.yml` configuration file. The source of this password value depends on your chosen deployment method:
- **Interactive Script Deployment**: The automated setup script generates a random secure password for `DEFAULT_ROOT_PSW`, and prints the complete login credentials (including the generated password) to your terminal immediately after the deployment finishes successfully.
- **Manual Docker Compose Deployment**: You must explicitly define or update the `DEFAULT_ROOT_PSW` environment variable in your `docker-compose.yml` file before starting the FastGPT container services.

## Manage Root User Passwords
This section covers critical password maintenance steps aligned with your deployment method:
1. For interactive script deployments: Record the printed root password immediately after deployment completes, as it is only displayed once in the final setup output.
2. For manual Docker Compose deployments: Follow these steps to configure a custom root password:
   [REDACTED_CREDENTIAL] Open your project’s `docker-compose.yml` file in a plain-text editor.
   2. Locate the `environment` block for the FastGPT core service.
   3. Add or update the `DEFAULT_ROOT_PSW` environment variable with your chosen secure password.
   4. Save the modified `docker-compose.yml` file.
   5. Restart the FastGPT container services to apply the new password configuration.

Important note: Every time the FastGPT container stack restarts, the root user’s password is automatically synchronized to match the current value of `DEFAULT_ROOT_PSW` in your `docker-compose.yml` file. This ensures consistent authentication credentials across container restarts and service updates.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/deploy/docker)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
