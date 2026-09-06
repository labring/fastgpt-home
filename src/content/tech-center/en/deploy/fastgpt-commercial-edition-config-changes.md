---
title: FastGPT Commercial Edition 4.6.6 Configuration Changes
slug: /en/deploy/fastgpt-commercial-edition-config-changes
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/466
source_type: 官方文档
---

# FastGPT Commercial Edition 4.6.6 Configuration Changes

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Key Changes in FastGPT Commercial Edition 4.6.6
This document outlines the mandatory configuration adjustments for self-hosted FastGPT Commercial Edition when upgrading to version 4.6.6. Three core changes apply to all deployments: updating the commercial edition container image, relocating a critical plugin configuration to an environment variable, and removing a legacy configuration section from the `config.json` file.

## Step-by-Step Configuration Migration
Follow these exact steps to complete the configuration update without disruption:
1.  Update your FastGPT Commercial Edition container image to the 4.6.6 release.
2.  Locate the `SystemParams.pluginBaseUrl` entry in your existing `config.json` file and remove it entirely, as this setting is no longer read from the configuration file.
3.  Configure the new `PRO_URL` environment variable with your commercial edition plugin service address. This variable replaces the former `SystemParams.pluginBaseUrl` setting. Note that the address must not end with `/api`. A valid example is: `PRO_URL=http://fastgpt-plugin.ns-hsss5d.svc.cluster.local:3000`. Add this variable to your deployment configuration, such as a Docker run command, Kubernetes manifest, or `.env` file.
4.  Delete the entire `FeConfig` section from your `config.json` file, as this section has been fully removed and is no longer supported.
5.  Restart your FastGPT Commercial Edition services to apply all configuration changes.

## Centralized Dashboard Configuration
All platform parameters and model configurations that were previously managed via the `FeConfig` section or other `config.json` entries can now be adjusted directly through the FastGPT Commercial Edition web dashboard. Users are no longer required to edit the `config.json` file for standard platform setup or parameter tweaks, reducing manual configuration errors and simplifying future maintenance.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/466)
