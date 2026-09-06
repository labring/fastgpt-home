---
title: 解决FastGPT中GLM系列模型think标签未正确渲染的问题
slug: /zh/troubleshoot/fastgpt-glm-think-tag-issue
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4613
source_type: GitHub issue
---

# 解决FastGPT中GLM系列模型think标签未正确渲染的问题

## 现象
在FastGPT私有部署v4.9.6版本中，使用GLM-Z1、GLM-Z1-AIR、GLM-Z1-AIRX或GLM-Z1-FLASH模型时，即使已开启"支持思考输出"配置，仍出现两类问题：
1. 开启流输出功能时，模型输出的`<think></think>`标签被当作正式回答内容渲染，未作为思考过程展示。
2. 关闭流输出功能时，前端无内容展示且无报错，但后台日志可看到正常的模型输出内容。

## 可能原因
暂未明确官方根因，需结合FastGPT源码的输出解析与渲染模块进一步排查。

## 排查步骤
1. 确认FastGPT版本为私有部署v4.9.6，接入的模型为GLM-Z1、GLM-Z1-AIR、GLM-Z1-AIRX或GLM-Z1-FLASH。
2. 检查模型配置页面，确认已开启"支持思考输出"开关。
3. 创建工作流或简易应用，分别开启和关闭流输出功能，发起测试请求。
4. 观察前端展示的输出内容，记录流输出与非流输出场景下的表现差异。
5. 查看FastGPT后台日志，确认非流输出场景下是否存在正常的模型返回内容。

## 解决与验证
目前暂无官方公开的快速修复方案，可通过以下方向排查与验证：
1. 检查FastGPT的输出解析模块，确认是否对`<think>`标签做了特殊提取与渲染处理。
2. 针对流输出场景，调整内容解析逻辑，将`<think>`标签内的内容单独作为思考过程展示，剩余内容作为正式回答。
3. 针对非流输出场景，修复结果渲染逻辑，确保解析后的思考内容与正式回答均可正常展示。
验证方式为：重新配置模型并发起测试，确认流输出时`<think>`标签内的内容被正确展示为思考过程，非流输出时可正常显示解析后的内容。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/4613)
