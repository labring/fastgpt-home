---
title: 解决FastGPT插件动态输入参数无法手动输入的问题
slug: /zh/troubleshoot/fastgpt-plugin-dynamic-params-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6211
source_type: GitHub issue
---

# 解决FastGPT插件动态输入参数无法手动输入的问题

## 现象
使用FastGPT插件时，动态输入参数仅支持引用已赋值的变量，无法直接手动输入固定参数值。当存在需要固定值的动态参数时，需提前在前置节点声明参数并赋予固定值，流程较为繁琐。

## 可能原因
FastGPT插件动态输入参数的当前配置逻辑仅开放变量引用功能，未内置手动输入固定值的功能入口。相关讨论提及当前变量功能的使用体验不佳，但未明确说明该限制的具体技术成因。

## 排查步骤
1. 进入目标FastGPT插件的配置界面，查看动态输入参数的配置项；
2. 检查配置界面是否存在手动输入参数值的入口，确认当前仅支持变量引用配置。

## 解决与验证
当前暂无官方提供的直接开启手动输入的配置方式。若需使用固定值参数，可通过两种替代方式实现：
1. 在前置节点声明参数并赋予固定值，再引用该变量到插件的动态输入参数中；
2. 使用JSON字符串的方式传递固定参数值。

> 来源: [FastGPT GitHub issue #6211](https://github.com/labring/FastGPT/issues/6211)
