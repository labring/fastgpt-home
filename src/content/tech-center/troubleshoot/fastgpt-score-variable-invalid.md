---
title: 解决FastGPT应用配置中{{score}}模板变量无效的问题
slug: /zh/troubleshoot/fastgpt-score-variable-invalid
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/996
source_type: GitHub issue
---

# 解决FastGPT应用配置中{{score}}模板变量无效的问题

## 现象
FastGPT 4.6.8版本中，在应用的配置->更多设置页面，引用内容模板内的{{score}}变量无法正常生效，其余变量可正常使用。

## 可能原因
该{{score}}变量已被移除。因混合检索与重排功能启用后，检索得分不再为单一值，参考该得分的实际应用价值较低，模型自身可完成内容判断。

## 排查步骤
1. 确认当前使用的FastGPT版本。
2. 进入应用的配置->更多设置页面，查看引用内容模板的变量配置。
3. 对比其他变量的使用效果，确认仅{{score}}变量无法正常生效。

## 解决与验证
不再在引用内容模板中使用{{score}}变量。可根据需求改用index变量，或依赖模型自身的内容判断能力。验证时，移除模板内的{{score}}变量，替换为其他可用变量后，测试引用内容模板的运行效果，确认变量正常生效。

> 来源: [FastGPT GitHub issue #996](https://github.com/labring/FastGPT/issues/996)
