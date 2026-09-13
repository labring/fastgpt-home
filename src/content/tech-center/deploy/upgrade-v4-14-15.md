---
title: FastGPT V4.14.15版本升级操作与变更说明
slug: /zh/deploy/upgrade-v4-14-15
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41415
source_type: 官方文档
---

# FastGPT V4.14.15版本升级操作与变更说明

## 这个版本改了什么
本次版本为FastGPT V4.14.15，变更内容聚焦于系统工具相关的稳定性修复，旨在提升平台工具调用的兼容性与稳定性。具体包含两项修复项：修复兼容旧版的系统工具相关问题，修复选中系统组件为系统工具时的异常问题。本次版本未新增明确的优化功能内容。

## 升级前要确认的事
升级前需确认当前部署环境可正常拉取镜像，确保能够获取到fastgpt-app与fastgpt-pro的v4.14.15版本镜像。

## 升级步骤（照做）
1. 更新fastgpt-app（fastgpt主服务）镜像tag为v4.14.15
2. 更新fastgpt-pro（fastgpt商业版）镜像tag为v4.14.15

## 升级后怎么验证
升级完成后，可通过访问FastGPT平台界面确认服务正常启动，验证系统工具与系统组件的调用功能无异常。若出现服务无法启动或功能异常的情况，可查看服务运行日志排查具体报错信息。

> [FastGPT 4.14.15 升级说明](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41415)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
