---
title: Upgrade FastGPT Docker Deployment to Version 4.10.0-fix
slug: /en/deploy/fastgpt-docker-upgrade-4100
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4100
source_type: 官方文档
---

# Upgrade FastGPT Docker Deployment to Version 4.10.0-fix

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

This technical document outlines the mandatory upgrade process for Docker-deployed FastGPT instances to version v4.10.0-fix, including required configuration adjustments for new and existing services.

## Configuration File Updates
All deployments must use the latest official docker-compose.yml file, which adds the fastgpt-plugin and minio services to the deployment stack. Retrieve the updated file from the official GitHub repository at https://github.com/labring/FastGPT/blob/main/document/public/deploy/docker/main/global/docker-compose.pg.yml, and merge your existing custom configurations into this new file as needed.

## Required Environment Variables
The following environment variables must be set for the updated services to function correctly:
| Service Name          | Variable Name           | Required Value                                                                 |
|-----------------------|-------------------------|---------------------------------------------------------------------------------|
| fastgpt-plugin        | AUTH_TOKEN              | A sufficiently complex, secure random string to authenticate plugin requests     |
| fastgpt-plugin        | MINIO_CUSTOM_ENDPOINT   | http://ip:port or a fully qualified domain name accessible to FastGPT end users |
| fastgpt, fastgpt-pro  | PLUGIN_BASE_URL         | http://fastgpt-plugin:3000                                                     |
| fastgpt, fastgpt-pro  | PLUGIN_TOKEN            | Exact same value as the fastgpt-plugin AUTH_TOKEN variable                      |

## Step-by-Step Upgrade Execution
Follow these ordered steps to complete the upgrade:
1.  Replace your existing docker-compose.yml file with the updated official version, or merge your custom configurations to include the fastgpt-plugin and minio services.
2.  Configure all required environment variables listed in the previous table for their respective services. Ensure the PLUGIN_TOKEN value matches the AUTH_TOKEN value set for the fastgpt-plugin service.
3.  Modify the image tags for the fastgpt and fastgpt-pro container definitions in your docker-compose.yml file to v4.10.0-fix.
4.  Run the following command in the directory containing your updated docker-compose.yml file to restart or update all running services:
    ```bash
    docker-compose up -d
    ```

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4100)
