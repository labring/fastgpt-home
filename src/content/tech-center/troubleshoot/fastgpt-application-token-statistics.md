---
title: 解决FastGPT按应用维度统计模型token消耗的问题
slug: /zh/troubleshoot/fastgpt-application-token-statistics
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6120
source_type: GitHub issue
---

# 解决FastGPT按应用维度统计模型token消耗的问题

## 现象
当前仅能获取单个模型使用的token量，无法统计多应用场景下每个应用的token消耗。当存在数百个应用且单个应用内使用多个模型时，无法完成各应用的token消耗汇总统计。

## 可能原因
系统采用积分替代token进行消耗统计，未开发应用维度的单独token统计功能，未针对多应用及多模型场景设计对应的汇总统计逻辑。

## 排查步骤
1. 登录FastGPT系统，进入目标应用的管理页面。
2. 在管理页面中找到节点运行详情入口并进入。
3. 提取该页面内各模型对应的token消耗数据。
4. 将提取的各模型token消耗数据进行汇总，得到该应用的token消耗总量。

## 解决与验证
当前系统未内置应用维度的token统计功能，可通过节点运行详情手动计算。若需统计多个应用的token消耗，可重复上述步骤完成各应用的计算后再进行汇总。验证时，可选择仅使用单个模型的应用，对比节点运行详情中的token数据与汇总结果，确认计算逻辑正确。

> 来源: [FastGPT GitHub issue #6120](https://github.com/labring/FastGPT/issues/6120)
