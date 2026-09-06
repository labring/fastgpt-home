---
title: Adjust FastGPT Environment Variables for 4.15.04 Upgrade
slug: /en/deploy/fastgpt-upgrade-environment-variables
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41504
source_type: 官方文档
---

# Adjust FastGPT Environment Variables for 4.15.04 Upgrade

## Overview
Self-hosted FastGPT deployments upgrading to version 4.15.04 require three mandatory environment variable adjustments to maintain secure authentication and prevent database conflicts between the core fastgpt service and the fastgpt-plugin extension. These changes ensure proper service communication and stable operation following the upgrade.

## Mandatory Environment Variable Specifications
The following table lists all required environment variable updates, their associated services, and mandatory configuration rules:

| Service Name       | Environment Variable | Configuration Requirements                                                                 |
|---------------------|----------------------|-------------------------------------------------------------------------------------------|
| fastgpt-plugin      | `AUTH_TOKEN`         | Must be a string of at least 32 characters for secure service authentication              |
| fastgpt             | `PLUGIN_TOKEN`       | Must exactly match the `AUTH_TOKEN` value configured for the fastgpt-plugin service        |
| fastgpt-plugin      | `MONGODB_URI`        | Must use a unique MongoDB database name that does not conflict with the core fastgpt service’s database. A valid example connection string is: `mongodb://myusername:mypassword@fastgpt-mongo:27017/fastgpt-plugin?authSource=admin` |

## Step-by-Step Implementation
Follow these steps to apply the required environment variable changes:
1. Locate the environment variable configuration files for both the fastgpt and fastgpt-plugin services. These are typically stored in `.env` files, container environment variable definitions, or orchestration service settings.
2. Create or select a secure string of at least 32 characters to use as the `AUTH_TOKEN` for the fastgpt-plugin service.
3. Update the `PLUGIN_TOKEN` environment variable in the fastgpt service’s configuration to exactly match the `AUTH_TOKEN` value set for fastgpt-plugin.
4. Modify the `MONGODB_URI` environment variable for fastgpt-plugin to use a unique MongoDB database name, ensuring it does not share a name with the database used by the core fastgpt service. Use the provided example connection string format as a reference for structuring the updated URI.
5. Restart both the fastgpt and fastgpt-plugin services to apply the new environment variables and activate the changes.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41504)
