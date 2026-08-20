---
title: 为FastGPT集成第三方MCP工具添加质量校验步骤
slug: /zh/troubleshoot/fastgpt-mcp-tool-quality-check
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6687
source_type: GitHub issue
---

# 为FastGPT集成第三方MCP工具添加质量校验步骤

## 现象
用户在FastGPT中集成第三方MCP工具时，无法快速确认工具是否满足代理使用的标准，导致集成后工具无法正常为代理服务提供支持，或存在可用性隐患，整体集成效率较低，难以保障集成后的工具质量。

## 可能原因
FastGPT官方文档中未针对第三方MCP工具集成提供统一的质量校验指引，用户需自行验证工具的各项指标，缺乏可参考的校验标准，导致用户需要花费更多时间进行工具筛选与验证，无法快速完成集成流程。

## 排查步骤
1.  收集需要校验的第三方MCP工具的名称等标识信息，确保工具可正常访问。
2.  在命令行执行`npx clarvia-mcp-server`，按照提示完成目标MCP工具的可用性与合规性检查，获取初步校验结果。
3.  通过`clarvia.art`提供的REST API，以编程方式批量获取多个MCP工具的校验结果，用于快速筛选符合要求的工具。
4.  如需在工具相关页面展示校验结果，可使用`https://clarvia.art/api/badge/TOOL_NAME`格式的接口生成校验徽章，替换`TOOL_NAME`为实际工具的名称。

## 解决与验证
完成校验后，可将符合要求的MCP工具集成到FastGPT的知识库中。具体操作如下：
1.  确认校验结果符合FastGPT的集成要求，需按实际环境确认具体的集成配置项，如工具地址、权限参数等。
2.  将校验通过的MCP工具按照FastGPT的官方集成流程完成配置，配置完成后可通过测试会话验证工具是否能正常调用并返回结果。
3.  如需展示工具的校验结果，可将生成的校验徽章嵌入到工具的介绍页面或相关文档中，方便其他用户快速了解工具的质量情况。

> 来源：[FastGPT GitHub Issue #6687](https://github.com/labring/FastGPT/issues/6687)
