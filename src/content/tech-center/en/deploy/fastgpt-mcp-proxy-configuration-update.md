---
title: Update FastGPT MCP Proxy Server Configuration
slug: /en/deploy/fastgpt-mcp-proxy-configuration-update
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/496
source_type: 官方文档
---

# Update FastGPT MCP Proxy Server Configuration

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Community Edition Configuration
For FastGPT Community Edition, update the `config.json` configuration file by adding the field `"feconfigs.mcpServerProxyEndpoint": "<fastgpt-mcp-server access URL>"` to the `feConfigs` object. The provided URL must not include a trailing slash. A sample updated configuration snippet is:
```json
{
  "feConfigs": {
    "lafEnv": "https://laf.dev",
    "mcpServerProxyEndpoint": "https://mcp.fastgpt.cn"
  }
}
```
After editing the file, restart the FastGPT container to apply the changes.

## Pro Edition Configuration
For FastGPT Pro Edition, configure the MCP proxy server URL through the admin panel. Complete these steps:
1.  Access the FastGPT Pro Edition admin panel.
2.  Go to `System Configuration > Basic Settings > System Parameters`.
3.  Locate the `MCP Proxy Server URL` parameter.
4.  Enter the public access URL of your `fastgpt-mcp-server`, with no trailing slash on the URL.
5.  Save the updated parameter to apply the configuration.

## Configuration Validation
To confirm the update was successful, verify the configuration for your edition. For Community Edition, check that the `config.json` file contains the correct `mcpServerProxyEndpoint` field with no trailing slash in the URL. For Pro Edition, confirm the `MCP Proxy Server URL` field in the admin panel matches the intended public access URL, and that the setting is retained after saving.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/496)
