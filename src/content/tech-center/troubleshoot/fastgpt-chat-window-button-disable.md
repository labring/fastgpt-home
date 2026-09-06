---
title: 关闭FastGPT聊天窗口的扫码进群与更新信息按钮
slug: /zh/troubleshoot/fastgpt-chat-window-button-disable
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3902
source_type: GitHub issue
---

# 关闭FastGPT聊天窗口的扫码进群与更新信息按钮

## 现象
面向FastGPT的工程师与技术选型人员，在使用聊天窗口功能时，发现默认展示"扫码进入交流群"和"更新信息"两个按钮，需找到关闭该类按钮的配置方法，以适配特定业务场景。

## 可能原因
当前FastGPT版本未内置关闭该默认按钮的功能配置项，经确认无同类功能的现有实现，同时官方README文档未提及相关配置方式，无法通过现有配置直接实现需求。

## 排查步骤
1. 确认当前FastGPT版本为最新正式版，已完成版本升级操作，排除因旧版本功能缺失导致的问题。
2. 完整查阅项目官方README文档，确认是否存在针对该类按钮的配置说明或相关参数。
3. 检查是否存在已提交的同类功能需求或相关issue，确认是否已有社区或官方给出的解决方案。
4. 确认自身已遵循项目提交流程，明确该需求未被现有版本覆盖，且未违反项目维护规则。

## 解决与验证
目前FastGPT版本未提供关闭该类默认按钮的直接配置方式。若需推进该功能需求，可重新打开对应issue并补充详细场景信息，或等待后续版本更新后查看相关配置项。同时，可通过跟进官方更新日志，确认是否有相关功能的新增或配置项开放。

> 来源: [FastGPT GitHub issue #3902](https://github.com/labring/FastGPT/issues/3902)
