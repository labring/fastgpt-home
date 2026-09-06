---
title: FastGPT数据库连接BI报表生成功能使用问题排查
slug: /zh/troubleshoot/fastgpt-db-bi-report-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/774
source_type: GitHub issue
---

# FastGPT数据库连接BI报表生成功能使用问题排查

## 现象
用户在使用FastGPT开展数据分析工作时，发现无法通过连接数据库或知识库生成BI报表与统计图，经确认现有版本无法满足该类需求。

## 可能原因
FastGPT当前版本未内置数据库连接适配与BI报表生成相关功能，无法直接实现企业数据分析场景下的该类需求。

## 排查步骤
1. 确认当前FastGPT版本已升级至最新发布版本，排除因版本过旧导致的功能缺失问题。
2. 完整查阅项目官方README文档，确认是否存在数据库连接、BI报表生成相关的配置说明或功能支持项。
3. 核对目标功能需求，确认该需求是否属于当前FastGPT版本的支持范围。

## 解决与验证
目前无公开的内置配置项、命令或官方方案可直接实现该功能，需按实际环境确认后续官方功能更新计划或自定义开发的实现路径。

> 来源: [FastGPT GitHub issue #774](https://github.com/labring/FastGPT/issues/774)
