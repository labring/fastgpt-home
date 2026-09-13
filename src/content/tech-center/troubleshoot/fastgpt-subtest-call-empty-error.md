---
title: 解决FastGPT调用子测试工具返回LLM_model_response_empty报错问题
slug: /zh/troubleshoot/fastgpt-subtest-call-empty-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4203
source_type: GitHub issue
---

# 解决FastGPT调用子测试工具返回LLM_model_response_empty报错问题

## 现象
用户在FastGPT私有部署v4.9.0版本中，先在测试1模块通过提示词让大模型提取性别，再在测试2模块的工具调用环节调用测试1模块，此时系统返回报错信息{"message": "chat:LLM_model_response_empty"}，无法正常完成工具调用。

## 可能原因
该报错的具体根因未在当前反馈中明确，仅能确认触发场景为调用子测试模块时出现空响应，具体原因需结合实际部署环境与配置细节确认。

## 排查步骤
1.  确认当前FastGPT版本为v4.9.0私有部署版本，核对已使用的API Key是否正常可用。
2.  检查测试1模块的提示词配置与运行结果，确认提取性别的流程是否能正常输出有效内容。
3.  查看测试2模块的工具调用配置，确认是否正确关联了测试1模块，调用链路是否存在配置错误。
4.  查看系统运行日志，定位{"message": "chat:LLM_model_response_empty"}报错的具体触发节点。

## 解决与验证
针对该报错，可先核对子测试模块的调用配置是否正确，确认测试1模块能正常输出有效结果。若配置无误，可检查系统运行日志定位报错触发节点。若问题仍未解决，需结合完整部署信息与日志进一步排查。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/4203)
