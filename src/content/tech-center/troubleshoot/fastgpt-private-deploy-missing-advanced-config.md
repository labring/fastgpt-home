---
title: 解决FastGPT私有部署后缺失AI高级配置项的问题
slug: /zh/troubleshoot/fastgpt-private-deploy-missing-advanced-config
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1887
source_type: GitHub issue
---

# 解决FastGPT私有部署后缺失AI高级配置项的问题

## 现象
部署FastGPT最新私有部署版本后，管理后台仅展示AI基本配置选项，未出现AI高级配置项，无法完成引用提示词的定义操作。相关截图显示配置页面仅包含基础AI配置模块，无高级配置相关入口。

## 可能原因
当前公开issue未提供明确关联诱因，具体原因需结合实际部署环境与流程确认，暂无统一的预设诱因结论。

## 排查步骤
1. 确认当前部署的FastGPT为私有部署版本，且为最新发布的官方版本。
2. 登录FastGPT管理后台，进入配置页面，查看展示的配置项类型，确认仅存在AI基本配置模块，无AI高级配置入口。
3. 核对已配置的API Key状态，确认其可正常调用相关服务，无失效、权限不足等问题。
4. 查阅FastGPT官方文档与当前issue的关联信息，确认配置项的展示逻辑与触发条件。

## 解决与验证
暂无公开的标准化解决流程，需结合实际排查结果针对性处理。验证方式为：完成排查后重新访问管理后台配置页面，确认AI高级配置项是否正常展示，可正常定义引用提示词。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1887)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
