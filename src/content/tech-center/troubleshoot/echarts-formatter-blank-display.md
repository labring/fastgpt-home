---
title: 解决FastGPT中ECharts配置含formatter函数后图表空白问题
slug: /zh/troubleshoot/echarts-formatter-blank-display
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6536
source_type: GitHub issue
---

# 解决FastGPT中ECharts配置含formatter函数后图表空白问题

## 现象
在FastGPT私有部署V4.14.5版本中，使用包含`formatter`函数的ECharts JSON配置时，图表无法正常渲染，页面呈现空白状态。用户提供的配置中，`tooltip`字段内的`formatter`为自定义JavaScript函数，移除该函数后图表可正常显示。

## 可能原因
FastGPT的ECharts渲染模块对JSON配置中的函数类型参数存在限制。由于JSON格式本身不支持序列化JavaScript函数，直接传入`formatter`函数会导致配置解析失败，进而引发图表空白。

## 排查步骤
1.  确认当前使用的FastGPT版本为私有部署V4.14.5，与问题场景匹配。
2.  提取ECharts配置中的`formatter`字段，确认其为自定义JavaScript函数类型。
3.  临时移除`formatter`函数配置，测试图表是否可以正常加载，排查是否为该字段导致的渲染异常。
4.  查看FastGPT前端控制台的报错信息，确认是否存在配置解析或渲染相关的错误，需按实际环境确认。

## 解决与验证
将ECharts配置中的`formatter`函数替换为FastGPT兼容的非函数形式，或调整配置逻辑以避免直接传入JavaScript函数。修改完成后重新提交配置，验证图表可正常显示且tooltip内容符合预期。若需保留自定义格式化逻辑，需确认FastGPT是否支持通过其他方式注入自定义渲染函数，需按实际环境确认。

> 来源：[FastGPT GitHub Issue #6536](https://github.com/labring/FastGPT/issues/6536)
