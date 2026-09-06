---
title: FastGPT模块重发prompt功能及相关规划说明
slug: /zh/troubleshoot/fastgpt-module-resend-prompt
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/737
source_type: GitHub issue
---

# FastGPT模块重发prompt功能及相关规划说明

## 现象
用户提出两项功能需求：其一，在FastGPT的指定模块中添加“重新发送”按钮，点击该按钮后可重新发送prompt，并基于新修改后的模块运行该请求；其二，在修改模块后，能够保留之前的会话数据，避免因模块修改导致已有的会话数据丢失。

## 可能原因
当前FastGPT版本未提供上述两项功能，相关功能的实现存在明确的规划排期或待评估的可能性。

## 排查步骤
1. 确认已将FastGPT升级至最新版本，该操作可确保不存在因版本过低导致的功能缺失问题，用户已在issue中提及需完成此确认步骤
2. 查阅FastGPT官方README文档，确认现有版本是否已支持所需功能，用户已在issue中提及已完成此查阅操作
3. 核对功能需求是否属于当前版本已公开的规划范围，确认是否有已发布或待发布的对应功能

## 解决与验证
针对debug模式的功能，计划在第二季度实现；修改模块后保留之前会话数据的功能将进行后续评估，暂无明确的实现排期。如需使用相关功能，需等待对应规划的功能版本发布后，通过升级FastGPT版本进行验证。

> 来源: [FastGPT GitHub issue #737](https://github.com/labring/FastGPT/issues/737)
