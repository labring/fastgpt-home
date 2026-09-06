---
title: 解决FastGPT中MCP配置更新后关联应用未同步的问题
slug: /zh/troubleshoot/fastgpt-mcp-config-updated
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5125
source_type: GitHub issue
---

# 解决FastGPT中MCP配置更新后关联应用未同步的问题

## 现象
开发MCP服务器修改后，在FastGPT点击"解析"并保存，MCP管理界面的内容会更新，但调用该MCP的应用未同步更新。存在两类典型场景：1. 修改MCP工具的说明内容，解析保存后管理界面更新，但已有的简易应用的工具调用界面中该工具说明未更新，删除原工具并重新配置后仍无变化；2. 修改MCP服务器地址后不点击"解析"直接保存，简易应用仍调用原MCP地址。

## 可能原因
该问题的根本原因未在当前线程中明确说明，推测为关联应用的MCP配置缓存未随管理端的配置更新同步。

## 排查步骤
1. 确认当前FastGPT的版本，检查是否为v4.11.1之前的版本。
2. 核对MCP配置更新后的操作流程，确认是否执行了点击"解析"按钮后再保存的操作。
3. 查看关联的简易应用，确认是否仍使用旧的MCP配置参数。

## 解决与验证
1. 升级FastGPT到v4.11.1及以上版本。
2. 若已升级版本，可手动删除原MCP配置，重新添加并配置后保存。
3. 验证操作：进入简易应用的工具调用界面，查看MCP工具的说明内容或服务器地址是否已更新为最新配置。

> 来源: [FastGPT GitHub issue #5125](https://github.com/labring/FastGPT/issues/5125)
