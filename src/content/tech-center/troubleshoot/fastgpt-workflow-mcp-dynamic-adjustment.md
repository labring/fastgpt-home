---
title: FastGPT工作流中MCP服务地址动态调整的问题解决方法
slug: /zh/troubleshoot/fastgpt-workflow-mcp-dynamic-adjustment
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5676
source_type: GitHub issue
---

# FastGPT工作流中MCP服务地址动态调整的问题解决方法

## 现象
在FastGPT工作流中使用工具调用MCP服务时，尝试动态更改MCP的地址，无法完成该配置操作。

## 可能原因
当前FastGPT工作流的MCP工具配置不支持动态修改地址，无法直接在调用节点中调整目标服务地址。

## 排查步骤
1. 进入FastGPT工作流的编辑界面，定位到已配置的MCP工具调用节点。
2. 查看该节点的所有配置参数，确认是否存在可动态修改MCP服务地址的交互选项或配置项。
3. 统计业务中需要调用的不同MCP服务的数量，评估所需独立工具节点的规模。
4. 检查是否存在其他未被明确说明的配置方式，相关细节需按实际环境确认。

## 解决与验证
若需在工作流中调用多个不同地址的MCP服务，无法直接在单个MCP工具节点中动态修改地址。若需调用20余个不同地址的MCP服务，需提前为每个目标MCP地址创建独立的MCP工具节点。在工作流编排阶段，根据业务逻辑判断需要调用的MCP服务，选择对应配置好的工具节点。验证方式：根据所需调用的MCP服务数量，创建对应数量的独立MCP工具节点，配置每个节点的目标地址，触发工作流运行，确认各工具可正常访问对应地址的MCP服务。

> 来源: [FastGPT GitHub issue #5676](https://github.com/labring/FastGPT/issues/5676)
