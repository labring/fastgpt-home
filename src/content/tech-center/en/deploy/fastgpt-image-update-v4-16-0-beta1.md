---
title: Update FastGPT Service Images for v4.16.0-beta1 Upgrade
slug: /en/deploy/fastgpt-image-update-v4-16-0-beta1
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-16/41601
source_type: 官方文档
---

# Update FastGPT Service Images for v4.16.0-beta1 Upgrade

## Image Update Overview
This document outlines the mandatory container image updates for a self-hosted FastGPT deployment targeting the v4.16.0-beta1 release. All core and auxiliary FastGPT services must use the exact version tags specified below to maintain compatibility and ensure proper functionality during the upgrade. Deployment configurations will need to reference these updated tags to pull the correct container images.

## Required Image Tags
Use the following table to confirm the precise tag for each FastGPT and auxiliary service image:
| Image Name | Required Tag | Deployment Notes |
|------------|--------------|------------------|
| fastgpt-app | v4.16.0-beta1 | Core FastGPT main service |
| fastgpt-pro | v4.16.0-beta1 | FastGPT commercial edition deployment |
| fastgpt-plugin | v1.1.0-beta1 | FastGPT plugin service |
| agent-sandbox-volumn | v0.3.0-beta4 | Only required for OpenSandbox-enabled deployments |
| agent-sandbox-proxy | v0.3.0-beta4 | Only required for Sandbox-enabled deployments |

## Step-by-Step Update Workflow
1.  Pull the updated container images to your local deployment registry or server node using the `docker pull` command for each validated image pair. For example, to pull the main FastGPT service image:
    ```bash
    docker pull fastgpt-app:v4.16.0-beta1
    ```
    Repeat this command for every image listed in the required tags table, substituting the correct image name and matching tag for each service.
2.  Edit your existing deployment configuration files (such as `docker-compose.yml`, Kubernetes pod manifests, or custom orchestration definitions) to replace the current image tags with the ones specified in the table above. Ensure commercial edition deployments exclusively use the `fastgpt-pro` image rather than the standard `fastgpt-app` image.
3.  Restart your FastGPT services to apply the new image versions. For sandbox-specific images, only restart the associated containers or pods if you have enabled OpenSandbox or Sandbox features in your deployment. Omit these images entirely if you do not use these sandbox capabilities.
4.  Validate successful deployment by checking container logs, service health endpoints, or orchestration platform status to confirm all services start without version mismatches or runtime errors.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/4-16/41601)
