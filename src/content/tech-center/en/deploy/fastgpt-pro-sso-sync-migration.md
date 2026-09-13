---
title: Migrate FastGPT Pro SSO and Sync Configurations
slug: /en/deploy/fastgpt-pro-sso-sync-migration
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/492
source_type: 官方文档
---

# Migrate FastGPT Pro SSO and Sync Configurations

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Migrate FastGPT Pro SSO and Sync Configurations

## Overview
FastGPT Pro edition users utilizing SSO authentication or external member synchronization with DingTalk or WeChat Work (WeCom) must complete a targeted configuration migration before upgrading their container images. This process preserves uninterrupted SSO and team sync functionality post-upgrade. All deployment and configuration steps for the new `sso-service` are detailed in the official [SSO & External Member Sync](../../../guide/admin/sso.en.mdx) guide.

## Pre-Upgrade Configuration Backup
Before pulling updated FastGPT container images, back up all existing SSO and sync configuration data from the FastGPT Pro admin panel. For WeCom integrations, copy critical values including the AppId, Secret, and any other configured integration parameters. Store these backups in a secure, accessible location to avoid permanent data loss during the upgrade.

## Step-by-Step Migration Workflow
Follow these required steps to complete the migration:
1.  Complete the pre-upgrade backup of your existing SSO configuration from the FastGPT Pro admin panel.
2.  Follow the official SSO & External Member Sync documentation to deploy the `sso-service`, and configure all relevant environment variables for your DingTalk or WeCom integration.
3.  If you previously used WeCom organizational structure synchronization, after completing the container image upgrade, navigate to the FastGPT Pro admin panel and switch the team mode to "Sync Mode".

## Validation and Post-Upgrade Checks
After deploying the updated `sso-service` and upgrading your FastGPT images, verify that your SSO login flow and member sync functionality operate as expected. If you used WeCom org sync, confirm the team mode is set to "Sync Mode" in the Pro admin panel to restore full organizational structure synchronization.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/492)
