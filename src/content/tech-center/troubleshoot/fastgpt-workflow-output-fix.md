---
title: 解决FastGPT工作流输出格式异常及接入问题
slug: /zh/troubleshoot/fastgpt-workflow-output-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2576
source_type: GitHub issue
---

# 解决FastGPT工作流输出格式异常及接入问题

## 现象
FastGPT工作流的输出为JSON格式，其中包含名为reposeData的数组，响应格式不符合指定规范，导致无法正常接入。部分用户反馈该问题曾被关闭但未得到实际解决。

## 可能原因
该问题的可能原因包含三类。第一类为版本适配问题，工具调用场景下，FastGPT版本未达到v4.8.10-alpha2版本要求，导致输出格式不符合规范。第二类为配置格式问题，部署所用的yml配置文件格式存在错误。第三类为应用配置异常，现有应用的配置存在问题，引发输出格式不符合要求。

## 排查步骤
1. 确认当前使用的FastGPT版本，工具调用场景需核对版本是否符合v4.8.10-alpha2及以上的要求；
2. 检查部署过程中使用的yml配置文件格式是否符合规范，修正存在错误的配置项；
3. 尝试重新创建应用，复现当前问题以确认是否与原有应用的配置相关。

## 解决与验证
不使用工具调用时，可正常使用FastGPT工作流功能。工具调用场景下，需将FastGPT升级至v4.8.10-alpha2及以上版本。同时需修正部署所用yml配置文件的格式错误。若完成版本升级与配置修正后，问题仍未解决，重新创建应用后即可验证输出格式是否符合要求。

> 来源: [FastGPT GitHub issue #2576](https://github.com/labring/FastGPT/issues/2576)
