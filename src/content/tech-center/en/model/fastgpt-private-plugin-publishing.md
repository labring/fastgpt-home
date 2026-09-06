---
title: Manage private FastGPT business plugin publication
slug: /en/model/fastgpt-private-plugin-publishing
page_type: Model guides
source: https://doc.fastgpt.cn/en/plugin/system-tool-development
source_type: Official documentation
---

# Manage private FastGPT business plugin publication

## Overview
This documentation covers the process for publishing FastGPT workflow business plugins to private repositories, as well as the required management and security practices for these deployments. It does not cover inclusion in the official FastGPT plugin repository, and provides guidance for self-hosted deployments when official inclusion is not required.

## Mandatory Management & Security Requirements
All private FastGPT business plugin publications must adhere to customer delivery process standards for four core operational areas: version control, secret management, installation package maintenance, and acceptance record tracking.
Version control ensures that all deployed plugin versions are traceable to approved release cycles. Secret management requires secure handling of all account credentials and sensitive values tied to the plugin’s functionality. Installation package maintenance involves storing verified, unmodified deployment packages to prevent inconsistent rollouts. Acceptance record tracking documents formal validation of plugin performance and compliance per customer requirements.
Separately, organizations must maintain documented security boundaries for three critical categories: external APIs integrated by the workflow plugin, customer private network addresses accessed by the plugin, and account secrets associated with the plugin’s integrations. These boundaries help clarify access permissions and reduce exposure risk for internal and customer environments.

## Step-by-Step Private Publication Workflow
1. Align all plugin release activities with the formal customer delivery process, including version tagging, secret configuration, package preparation, and acceptance validation.
2. Publish the finalized plugin to a private repository dedicated to internal or customer-specific plugin deployments.
3. For deployments that do not require official FastGPT repository inclusion, follow the official system tool upload guide to integrate the plugin into your self-hosted FastGPT environment. The official guide is located at [Upload System Tool](../guide/build/tools/system-plugins/upload_system_tool.en.mdx).

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/plugin/system-tool-development)

## Applicability and version scope

Use this page for the documented Model guides scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
