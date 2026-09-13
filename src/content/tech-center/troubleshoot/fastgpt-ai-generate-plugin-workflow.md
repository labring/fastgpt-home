---
title: 说明FastGPT AI生成插件与工作流功能的实现情况
slug: /zh/troubleshoot/fastgpt-ai-generate-plugin-workflow
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3073
source_type: GitHub issue
---

# 说明FastGPT AI生成插件与工作流功能的实现情况

## 现象
用户希望FastGPT支持AI自动生成插件与工作流，具体为输入外部应用API网址，由AI读取API文档并通过自然语言生成对应插件或工作流，以降低插件制作门槛。该需求的应用场景为提升功能生成效率，降低手动制作的复杂度。当前该功能未集成，插件制作需手动完成，门槛较高。

## 可能原因
当前版本未集成AI自动生成插件与工作流的相关功能，插件制作流程需手动配置，导致门槛较高。目前未发现官方提供的相关自动生成功能入口，需按实际环境确认具体限制因素。

## 排查步骤
1. 确认当前FastGPT版本是否支持AI生成插件与工作流功能；
2. 检查是否存在相关配置项可开启该功能；
3. 核对官方文档中是否有该功能的部署或使用说明；
4. 若无法确认相关信息，可查看项目官方资源或提交相关咨询。

## 解决与验证
根据相关回复，自动设计工作流功能存在实现可能性。若需实现相关功能，可提交功能实现请求或尝试开发。针对插件生成功能，存在相关实现限制，需结合实际需求评估可行性。需按实际环境确认具体实现方案。

> 来源: [FastGPT GitHub issue #3073](https://github.com/labring/FastGPT/issues/3073)
