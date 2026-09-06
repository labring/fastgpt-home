---
title: 解决FastGPT中SQL结果图表与HTML内容展示问题
slug: /zh/troubleshoot/fastgpt-chart-html-display
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1220
source_type: GitHub issue
---

# 解决FastGPT中SQL结果图表与HTML内容展示问题

## 现象
在FastGPT 4.7.1版本中，完成基于大语言模型分析用户意图、结合库表结构生成SQL的流程后，无法实现SQL结果的图表展示或HTML内容展示，需借助外部组件完成相关展示，希望获取FastGPT内置的对应展示能力。

## 可能原因
未掌握FastGPT内置的图表与HTML内容展示格式，导致输出内容无法被平台直接渲染展示。

## 排查步骤
1. 确认当前FastGPT版本为4.7.1及以上，确保已升级到最新版本。
2. 检查输出内容的格式是否符合FastGPT内置的展示规范。
3. 验证输出的代码块标记与内容是否正确匹配要求。

## 解决与验证
FastGPT已内置图表与HTML内容展示能力。图表展示可通过携带ECharts配置的代码块实现，格式为使用三个波浪线包裹的代码块，标记为echarts，后跟符合规范的ECharts配置JSON数据，示例格式为`~~~echarts
{"title":{"text":"测试图表"},"xAxis":{"type":"category","data":["A","B","C"]},"series":[{"data":[10,20,30],"type":"bar"}]}`。HTML内容展示能力已内置，具体格式需按实际环境确认。完成格式配置后，输出对应格式的内容即可在FastGPT中直接展示图表或HTML内容。

> 来源: [FastGPT GitHub issue #1220](https://github.com/labring/FastGPT/issues/1220)
