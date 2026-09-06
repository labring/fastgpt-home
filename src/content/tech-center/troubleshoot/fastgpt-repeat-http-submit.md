---
title: 解决FastGPT聊天过程中重复触发用户信息HTTP提交的问题
slug: /zh/troubleshoot/fastgpt-repeat-http-submit
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/779
source_type: GitHub issue
---

# 解决FastGPT聊天过程中重复触发用户信息HTTP提交的问题

## 现象
在聊天过程中抽取用户姓名、联系方式等用户信息，将抽取结果通过HTTP提交至后台系统。期望在提交成功后，不再重复执行用户信息抽取和HTTP提交操作，但实际每次发起聊天会话时，都会触发用户信息抽取成功，并再次执行一次HTTP提交操作。

## 可能原因
当前FastGPT的每个聊天流程均为独立运行，系统仅存储对话记录，未保留历史交互状态，无法记录已完成的用户信息提交状态，因此无法在后续会话中拦截重复的抽取和提交操作。

## 排查步骤
1. 确认当前使用的FastGPT版本为官方最新发布版本。
2. 检查聊天流程内配置的用户信息抽取规则与HTTP提交逻辑，确认是否存在用于存储提交状态的相关配置项。
3. 模拟多次聊天场景，统计每次聊天触发HTTP提交的次数，确认重复提交与聊天次数的对应关系。

## 解决与验证
当前版本暂不支持该需求，无法通过现有配置实现提交成功后不再重复抽取和提交用户信息。验证方式为：按照日常使用流程发起多次聊天会话，触发用户信息抽取与HTTP提交操作，确认后续每次聊天仍会重复触发抽取及提交流程，验证重复提交的现象是否持续存在。

> 来源: [FastGPT GitHub issue #779](https://github.com/labring/FastGPT/issues/779)
