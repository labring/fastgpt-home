---
title: FastGPT私有部署图表插件数据过大展示不全的排错方案
slug: /zh/troubleshoot/fastgpt-chart-data-display-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3312
source_type: GitHub issue
---

# FastGPT私有部署图表插件数据过大展示不全的排错方案

## 现象
该问题出现在FastGPT 4.8.13私有部署版本中，使用内置折线图插件时，当横纵坐标数据量稍大，图表会出现展示不全的问题。

## 可能原因
当前使用的内置图表插件存在适配局限，无法适配数据量较大的横纵坐标展示场景。

## 排查步骤
1. 确认当前FastGPT版本为4.8.13且为私有部署模式
2. 复现折线图插件横纵坐标数据量较大的使用场景，观察图表展示异常情况
3. 排除密钥、基础部署配置等已确认正常的环境因素

## 解决与验证
可自行开发BI类插件，通过AI生成echarts代码实现图表展示，替代原有内置折线图插件。验证时使用较大数据量的横纵坐标数据，确认图表可完整展示。

> 来源: [FastGPT GitHub issue #3312](https://github.com/labring/FastGPT/issues/3312)
