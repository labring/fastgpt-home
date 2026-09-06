---
title: FastGPT V4.14.28版本升级操作与变更说明
slug: /zh/deploy/upgrade-v4-14-28
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41428
source_type: 官方文档
---

# FastGPT V4.14.28版本升级操作与变更说明

## 这个版本改了什么
本版本仅包含一项针对性修复内容，修复admin服务Node.js版本兼容问题。该问题会导致因运行环境Node.js版本不匹配，进而引发admin服务异常。本次升级未新增其他功能或变更其他非必要配置项，仅针对该兼容性问题进行优化修复。

## 升级前要确认的事
升级前需确认当前部署的fastgpt-app与fastgpt-pro服务的现有镜像版本，确保未使用v4.14.28版本的镜像。同时需确认当前运行环境中，是否存在因Node.js版本不匹配导致的admin服务异常场景，以便后续验证本次升级的修复效果。

## 升级步骤（照做）
本次升级仅需执行镜像tag更新操作，具体步骤如下：
1. 更新fastgpt-app（fastgpt 主服务）的镜像tag为v4.14.28。
2. 更新fastgpt-pro（fastgpt 商业版）的镜像tag为v4.14.28。
执行上述镜像更新操作后，无需额外修改其他配置或执行其他初始化步骤，直接完成更新即可。

## 升级后怎么验证
升级完成后，可通过检查admin服务的运行日志，确认无因Node.js版本不匹配导致的服务异常报错。同时可验证admin服务的基础功能是否正常运行，确保服务未出现因版本兼容问题引发的异常状态。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41428)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
