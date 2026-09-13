---
title: Modify FastGPT Env Vars and Configs on Sealos
slug: /en/deploy/fastgpt-sealos-config-env-adjustment
page_type: 部署场景
source: https://doc.fastgpt.cn/en/self-host/deploy/sealos
source_type: 官方文档
---

# Modify FastGPT Env Vars and Configs on Sealos

## Sealos FastGPT Deployment Structure
FastGPT deployed on Sealos operates with one dedicated application service and two associated databases. All deployed FastGPT instances and their matching data stores are accessible via dedicated sections within the Sealos dashboard: the App Launchpad for the application layer, and the Database section for linked storage resources. This standardized stack ensures consistent resource allocation and straightforward monitoring for technical teams managing self-hosted FastGPT environments.

## Accessing Configuration Interfaces
To modify environment variables or config files for a FastGPT deployment on Sealos, first navigate to the Sealos administrative dashboard. Open the App Launchpad to view a list of all currently deployed applications, including your FastGPT instance. Select the target FastGPT app, then click the Change button to reveal the full editing interface, where you can view, adjust, and save environment variables and config files directly. A reference screenshot is provided to support this navigation workflow.

## Step-by-Step Configuration Modification
Follow these structured steps to adjust deployment settings:
1. Open the Sealos administrative dashboard.
2. Navigate to the App Launchpad to locate your deployed FastGPT application.
3. Open the Database section to verify the two associated databases linked to your FastGPT instance.
4. Return to the App Launchpad, select your FastGPT app, and click the Change button.
5. Edit the required environment variables or modify config files in the exposed interface, then save your changes.

## Operational and Cost Guidance
A highlighted success alert outlines critical operational rules for this deployment: 🤖 On Sealos, FastGPT runs 1 service and 2 databases. When pausing or deleting the deployment, you must handle all three components together to avoid orphaned resources. To reduce operational costs, you can start the full stack during active work hours and pause all components during inactive periods, such as overnight or non-business days.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/deploy/sealos)
