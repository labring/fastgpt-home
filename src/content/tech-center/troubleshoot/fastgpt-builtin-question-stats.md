---
title: 说明FastGPT未内置提问统计与问题管理功能
slug: /zh/troubleshoot/fastgpt-builtin-question-stats
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3009
source_type: GitHub issue
---

# 说明FastGPT未内置提问统计与问题管理功能

## 现象
需使用FastGPT的提问统计、问题打标签等管理功能，包括统计高频提问问题、为问题添加标签等场景，查询系统是否具备对应内置功能及相关开发计划。

## 可能原因
FastGPT未内置提问统计与问题管理相关功能，相关数据采集与管理能力将通过独立日志采集系统实现。

## 排查步骤
1. 检索FastGPT内置功能模块，确认是否存在提问统计、问题打标签相关功能入口。
2. 查看官方发布的系统功能规划说明，确认是否有相关内置功能的开发计划。
3. 确认独立日志采集系统的部署与使用流程，需按实际环境确认。

## 解决与验证
FastGPT未内置提问统计、问题打标签等管理功能。相关能力将通过独立日志采集系统提供。如需实现相关统计与管理，需等待独立日志采集系统上线并按对应流程配置使用，相关具体配置与部署步骤需按实际环境确认。

> 来源: [FastGPT GitHub issue #3009](https://github.com/labring/FastGPT/issues/3009)
