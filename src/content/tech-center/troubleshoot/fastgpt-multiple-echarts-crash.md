---
title: 解决FastGPT中添加多个ECharts配置引发页面崩溃的问题
slug: /zh/troubleshoot/fastgpt-multiple-echarts-crash
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2439
source_type: GitHub issue
---

# 解决FastGPT中添加多个ECharts配置引发页面崩溃的问题

## 现象
在FastGPT平台中，当添加超过三个ECharts可视化配置时，会触发页面崩溃问题。具体表现为完成第三个ECharts配置的添加后，页面无法正常加载或直接无响应。本次用户测试的三个配置分别为时间趋势图、平台对比图、地域分布图的ECharts JSON配置。

## 可能原因
目前暂无官方公开的根因说明，需结合前端控制台的报错日志与实际部署环境进一步定位。已知触发该问题的明确条件为添加数量超过三个的ECharts配置项，暂未发现与配置内容直接相关的固定触发规则。

## 排查步骤
1.  打开浏览器的开发者工具，切换至控制台面板，记录页面崩溃时出现的具体报错文本。
2.  逐步减少添加的ECharts配置数量，测试仅添加1个、2个配置时页面是否正常运行，确认崩溃的触发阈值。
3.  逐一检查每个ECharts配置的JSON格式，确认无语法错误、未遗漏必要的配置字段。
4.  临时禁用部分自定义配置项，验证是否因配置项之间的冲突引发崩溃。

## 解决与验证
1.  临时将添加的ECharts配置数量控制在三个以内，验证页面是否恢复正常加载与使用。
2.  修正所有ECharts配置中的语法错误，确保每个配置的JSON结构完整合规。
3.  若仍存在崩溃问题，需整理前端控制台的完整报错日志，提交至项目官方仓库获取进一步支持。
验证方式：重新添加多个ECharts配置，确认页面不再出现崩溃，所有可视化图表均可正常渲染展示。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/2439)
