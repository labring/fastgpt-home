---
title: 解决FastGPT中Claude模型无法调用文档解析的问题
slug: /zh/troubleshoot/fastgpt-claude-document-parsing-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2978
source_type: GitHub issue
---

# 解决FastGPT中Claude模型无法调用文档解析的问题

## 现象
使用claude-3-5-sonnet-20241022模型时，无法调用文档解析功能。此前图片解析功能存在异常，当前图片解析功能已恢复正常。

## 可能原因
1. 配置了工具调用相关功能；
2. 所使用的OneAPI版本（0.6.7及更早）不支持Claude模型的工具调用；
3. FastGPT版本过低，未适配读取文件不走工具调用的逻辑。

## 排查步骤
1. 确认当前使用的Claude模型为claude-3-5-sonnet-20241022。
2. 检查是否开启了工具调用相关的配置项。
3. 确认所使用的OneAPI版本，若为0.6.7及更早版本，需验证其是否支持Claude模型的工具调用。
4. 确认FastGPT当前运行的版本信息。

## 解决与验证
若因配置了工具调用导致问题，需调整相关配置。若因OneAPI版本不支持Claude模型工具调用，需按实际环境更新OneAPI版本或调整对应配置。FastGPT v4.8.13-alpha版本支持读取文件不走工具调用，可升级至该版本或更新版本以适配功能需求。验证时，重新尝试调用文档解析功能，确认功能可正常运行。

> 来源: [FastGPT GitHub issue #2978](https://github.com/labring/FastGPT/issues/2978)
