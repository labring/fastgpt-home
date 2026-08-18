---
title: 解决FastGPT对话Agent调用模型后调用日志不显示问题
slug: /zh/troubleshoot/fastgpt-agent-call-log-missing
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6271
source_type: GitHub issue
---

# 解决FastGPT对话Agent调用模型后调用日志不显示问题

## 现象
在FastGPT私有部署v4.14.5版本中，用户配置了名为gptoss的OpenAI渠道模型（渠道命名为Local）。在模型渠道页面测试该模型时，测试成功且调用日志页面可展示对应记录；但创建对话Agent并使用该模型进行对话后，虽能获得正常的模型回复，调用日志页面却未显示此次对话的调用记录，仅展示模型渠道测试的三条日志。

## 可能原因
暂未明确官方根因，结合该问题场景，可能与对话Agent调用时的日志上报逻辑、日志页面的筛选规则或相关配置项有关，具体需按实际环境确认。

## 排查步骤
1. 确认对话Agent所使用的模型配置与模型渠道测试的配置一致，即渠道为Local、模型名称为gptoss。
2. 进入调用日志页面，检查页面的筛选条件（如时间范围、日志类型等），确认是否因筛选参数设置导致对话Agent的调用记录未被展示。
3. 查看FastGPT后端服务的运行日志，搜索与对话Agent调用相关的关键词，确认是否存在日志上报失败的异常信息。
4. 对比模型渠道测试与对话Agent调用的请求参数，排查两者调用链路是否存在差异。

## 解决与验证
首先按照排查步骤逐一确认问题点：若为筛选条件设置错误，调整筛选参数后刷新调用日志页面即可查看对应记录；若为日志上报异常，需结合官方文档排查服务运行状态与配置项。验证方式为：重新发起对话Agent的对话请求，确认能正常获取模型回复后，刷新调用日志页面，查看是否新增对应调用记录。

> 来源：[FastGPT GitHub Issue #6271](https://github.com/labring/FastGPT/issues/6271)
