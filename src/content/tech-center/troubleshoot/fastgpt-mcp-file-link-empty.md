---
title: 解决FastGPT通过MCP传递文件链接参数为空的问题
slug: /zh/troubleshoot/fastgpt-mcp-file-link-empty
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6309
source_type: GitHub issue
---

# 解决FastGPT通过MCP传递文件链接参数为空的问题

## 现象
在FastGPT私有部署v4.14.5.1版本中，用户通过MCP传递文件链接参数时，FastGPT应用最终收到的文件链接参数为空。具体场景为：创建开启文件上传功能的FastGPT应用，通过MCP服务暴露该应用，在MCP工具解析该MCP服务地址后，调用应用并传入文件链接，应用接收的链接参数为空。

## 可能原因
目前未明确具体技术原因，需按实际环境确认，可能的排查方向包括：MCP工具调用时的文件链接参数传递是否正确、FastGPT应用对MCP传入参数的解析是否正常、MCP服务暴露配置是否符合要求。

## 排查步骤
1.  确认已创建开启文件上传功能的FastGPT应用，且应用运行状态正常
2.  检查MCP服务的配置，确认已正确暴露FastGPT应用的访问地址
3.  在MCP工具中，核对传入的文件链接参数是否完整、格式无误
4.  查看FastGPT应用的运行日志，排查是否存在参数接收相关的异常日志
5.  若以上步骤未发现问题，需按实际环境进一步确认MCP服务与FastGPT应用的参数传递链路

## 解决与验证
若排查发现MCP工具传递的参数格式有误，调整参数格式后重新调用，确认FastGPT应用能正确接收文件链接参数；若MCP服务暴露配置存在问题，重新配置MCP服务的暴露地址，确保参数可正确传递到FastGPT应用；若FastGPT应用的参数解析逻辑存在异常，需按实际环境确认应用的参数接收配置，确保可正确解析MCP传入的文件链接参数。验证方式为：在MCP工具中传入有效的文件链接，调用FastGPT应用，检查应用是否能正常接收到文件链接参数，确认参数不为空。

> 来源：https://github.com/labring/FastGPT/issues/6309
