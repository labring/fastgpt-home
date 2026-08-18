---
title: FastGPT升级后插件丢失问题的排查与解决方法
slug: /zh/troubleshoot/fastgpt-upgrade-custom-http-plugin-missing
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6161
source_type: GitHub issue
---

# FastGPT升级后插件丢失问题的排查与解决方法

## 现象
用户升级FastGPT原版后，所有自定义插件、MCP插件均在"我的工具"页面消失；运行商业版部署脚本后，自定义插件与MCP插件恢复显示，但http插件仍未出现在插件列表中。

## 可能原因
1. 官方升级文档仅提供了商业版的运行脚本，用户可能误用或未使用原版专属升级脚本，导致插件配置未正确保留；
2. 商业版脚本与原版的插件加载逻辑存在差异，http插件未被系统识别加载；
3. http插件的配置文件在升级过程中被覆盖或未完成迁移。

## 排查步骤
1. 确认当前使用的部署脚本是否为FastGPT原版专属脚本，避免混用商业版脚本；
2. 进入"我的工具"页面，确认仅http插件缺失，自定义与MCP插件是否已恢复显示；
3. 需按实际环境确认插件配置文件的存储路径，检查http插件的配置文件是否仍存在；
4. 重启FastGPT服务后，再次查看"我的工具"页面的插件列表。

## 解决与验证
针对第一个问题：FastGPT原版升级无需运行商业版部署脚本，需使用官方提供的原版专属升级脚本。针对http插件缺失问题：若已使用商业版脚本恢复了自定义与MCP插件，需手动检查http插件的配置文件是否完整，或重新导入http插件的配置；验证方法：重启服务后进入"我的工具"页面，确认http插件是否正常显示在插件列表中。

> 来源：[FastGPT GitHub Issue #6161](https://github.com/labring/FastGPT/issues/6161)
