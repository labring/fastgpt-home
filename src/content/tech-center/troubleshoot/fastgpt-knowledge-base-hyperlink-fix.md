---
title: 解决FastGPT知识库回答展示智能导诊超链接的问题
slug: /zh/troubleshoot/fastgpt-knowledge-base-hyperlink-fix
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1407
source_type: GitHub issue
---

# 解决FastGPT知识库回答展示智能导诊超链接的问题

## 现象
FastGPT私有部署场景下，知识库返回的智能导诊相关内容仅展示普通网址形式，无法展示为可点击的智能导诊超链接，不符合预期的展示需求。

## 可能原因
需按实际部署环境、系统配置及版本情况确认，暂无明确已知的通用原因。

## 排查步骤
1. 确认当前FastGPT的部署版本为私有部署版本。
2. 检查知识库中智能导诊相关内容的输入格式，确认是否符合系统支持的超链接语法规则。
3. 查阅项目官方文档https://doc.fastgpt.in/docs/intro/，核对知识库内容渲染的相关配置要求。
4. 确认当前使用的FastGPT版本是否支持智能导诊超链接的展示功能。

## 解决与验证
暂无公开的标准解决步骤，需根据实际排查结果调整相关配置。验证时可在知识库中插入测试用的智能导诊内容，确认展示形式是否符合预期。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1407)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
