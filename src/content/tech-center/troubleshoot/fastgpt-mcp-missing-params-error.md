---
title: 解决FastGPT 4.12.2版本MCP工具调用参数缺失报错问题
slug: /zh/troubleshoot/fastgpt-mcp-missing-params-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5580
source_type: GitHub issue
---

# 解决FastGPT 4.12.2版本MCP工具调用参数缺失报错问题

## 现象
用户在docker部署的FastGPT环境中，从4.9.11版本升级至4.12.2后，或全新安装4.12.2版本时，执行以下操作后出现异常：创建HTTP插件，通过MCP服务选择HTTP插件的接口创建服务，再创建MCP工具集，在应用中添加该工具后调用时，返回`{"content": [],"isError":true,"message": "error.missingParams"}`。此时HTTP插件与MCP工具集单独运行均可正常执行。

## 可能原因
暂未明确官方根因，结合报错信息与操作场景，推测该问题与4.12.2版本中MCP工具的参数传递逻辑变更有关，或存在配置未正确同步的情况。

## 排查步骤
1. 确认当前FastGPT版本为4.12.2，部署方式为docker。
2. 单独测试HTTP插件与MCP工具集，确认二者均可正常执行，排除插件本身的功能异常。
3. 检查应用中绑定MCP工具后的参数配置，确保与原版本的配置逻辑一致。
4. 查看MCP服务调用的详细日志，核对请求参数是否存在缺失情况。

## 解决与验证
由于该问题为版本升级后出现的异常，可通过以下方式验证与排查：
1. 回退至4.9.11版本，确认原功能是否正常恢复，以此定位问题与版本的关联性。
2. 按照官方文档重新创建HTTP插件、MCP服务与工具集，确保配置流程完全符合要求。
验证标准：在应用中调用MCP工具时，不再返回`{"content": [],"isError":true,"message": "error.missingParams"}`错误，且业务返回结果符合预期。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/5580)
