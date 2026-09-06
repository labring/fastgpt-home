---
title: 解决FastGPT应用多次预约时重复发起HTTP调用的问题
slug: /zh/troubleshoot/fastgpt-repeated-http-calls-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2899
source_type: GitHub issue
---

# 解决FastGPT应用多次预约时重复发起HTTP调用的问题

## 现象
使用FastGPT搭建的实验室预约助手，在执行多次预约操作时，每发起第N次预约，就会对应执行N次HTTP调用。用户提供的应用流程配置中，流程开始节点的输入参数存在异常配置。

## 可能原因
核心问题来自流程开始节点的输入参数配置异常。根据用户提交的应用配置，nodeId为userChatInput的流程开始节点中，key为userChatInput的输入参数的value字段被设置为["userChatInput", "userChatInput"]，存在重复的数组元素，导致流程触发时输入参数被重复绑定，进而引发多次HTTP调用。其余潜在异常需按实际环境确认。

## 排查步骤
1.  登录FastGPT后台，进入应用管理页面并打开出现问题的应用的流程编辑器。
2.  定位到nodeId为userChatInput的流程开始节点，展开其inputs配置项。
3.  查看key为userChatInput的输入参数的value字段内容。
4.  对照issue中提供的配置，确认该字段是否存在重复的数组元素，例如是否为["userChatInput", "userChatInput"]这类重复配置。
5.  检查应用内其他节点的输入输出配置，排查是否存在同类重复绑定的问题。

## 解决与验证
1.  修改流程开始节点的userChatInput输入参数的value字段，删除重复的数组项，保留单个有效配置，例如调整为["userChatInput"]。
2.  保存应用配置并完成发布流程。
3.  发起多次预约测试，确认每次预约仅触发一次HTTP调用，问题得到修复。
4.  若测试仍未解决问题，需结合实际部署环境进一步排查流程执行逻辑。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/2899)
