---
title: 解决FastGPT接入搜索工具后流式AI结果不显示问题
slug: /zh/troubleshoot/fastgpt-search-tool-result-display
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4156
source_type: GitHub issue
---

# 解决FastGPT接入搜索工具后流式AI结果不显示问题

## 现象
FastGPT v4.9.0私有部署版本中，接入搜索工具后，流式打印的AI结果无法正常显示。需刷新页面才可展示完整结果。未接入搜索工具时，无该异常表现。

## 可能原因
暂未明确官方标注的具体成因，需结合部署环境、版本配置等实际情况进行排查确认。

## 排查步骤
1. 确认当前FastGPT私有部署版本号为v4.9.0。
2. 验证异常是否仅在接入搜索工具时出现。
3. 对比未接入搜索工具时的页面表现，确认异常触发条件。
4. 执行页面刷新操作，观察AI结果是否恢复正常展示。

## 解决与验证
1. 临时恢复：刷新页面，即可正常展示AI结果。
2. 永久修复：将FastGPT升级至最新版本，验证接入搜索工具后流式结果是否可正常展示，无需额外刷新操作。

> 来源: [FastGPT GitHub issue #4156](https://github.com/labring/FastGPT/issues/4156)
