---
title: 解决FastGPT分类模块无法正确分配分类结果的问题
slug: /zh/troubleshoot/fastgpt-classification-module-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/923
source_type: GitHub issue
---

# 解决FastGPT分类模块无法正确分配分类结果的问题

## 现象
FastGPT分类模块无法正确完成分类。本地搭建部署时，分类结果始终分配到最后一个问题；使用GLM3模型时，分类结果始终分配到第一个分类项。

## 可能原因
使用的模型并非GPT系列，但开启了工具模式，导致分类逻辑异常。

## 排查步骤
1.  执行docker logs命令查看FastGPT容器的运行日志，获取具体错误提示。
2.  查看当前分类模块使用的模型配置参数，核对模型类型与工具模式的配置匹配情况。
3.  检查模型配置中的工具模式相关参数，确认是否与模型支持能力一致。

## 解决与验证
1.  调整模型配置，关闭与模型类型不匹配的工具模式，或更换适配工具模式的模型。
2.  查阅项目文档FAQ，获取对应场景的配置说明。
3.  重新执行分类操作，验证分类结果是否正确分配到对应分类项。

> 来源: [FastGPT GitHub issue #923](https://github.com/labring/FastGPT/issues/923)
