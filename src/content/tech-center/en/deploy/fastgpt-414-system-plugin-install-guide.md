---
title: Manually Install FastGPT 4.14+ System Plugins
slug: /en/deploy/fastgpt-414-system-plugin-install-guide
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-14/4140
source_type: 官方文档
---

# Manually Install FastGPT 4.14+ System Plugins

## Plugin Installation Changes for FastGPT 4.14.0+
Starting with version 4.14.0, the fastgpt-plugin container image only provides a runtime environment, and no longer includes pre-installed system plugins. All FastGPT deployments now require manual installation of system plugins to access available tool extensions.

## Critical Pre-Installation Guidelines
Before proceeding with plugin setup, review these mandatory notes:
- Previously manually installed JavaScript plugin packages are no longer compatible, and must be repackaged and reinstalled using the updated system plugin workflow.
- Installations initiated via the built-in Plugin Marketplace will default to pulling data from the public FastGPT Marketplace.
- For FastGPT instances unable to access the public marketplace: manually navigate to https://marketplace.fastgpt.cn, download the target plugin’s .pkg installation file, and import the file directly into your FastGPT system.
- The current plugin system only supports tool-type extensions. Future platform updates will add support for triggers, document parsers, data chunking strategies, and index enhancement strategies.
- In multi-tenant FastGPT deployments, team administrators can activate approved plugins from the plugin library to make them available for use in team applications. For the open-source edition, the root team has all system tools activated by default.

## Step-by-Step Plugin Installation Workflow
There are two supported methods for installing system plugins:
1. **Public Marketplace Installation**
   - Access the Plugin Marketplace page within your FastGPT admin dashboard.
   - Browse or search for the desired system plugin.
   - Complete the installation directly through the marketplace interface.
2. **Local .pkg File Import**
   - Open a browser and navigate to https://marketplace.fastgpt.cn.
   - Locate and download the .pkg installation file for your target plugin.
   - Return to your FastGPT admin dashboard, navigate to the plugin import section, and upload the downloaded .pkg file to finalize installation.

After successful installation, you can perform additional management tasks including sorting tool listings, setting default plugin installations, and managing plugin tags to organize available extensions.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/4-14/4140)
