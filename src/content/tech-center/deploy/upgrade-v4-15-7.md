---
title: FastGPT V4.15.7版本升级内容与操作指南
slug: /zh/deploy/upgrade-v4-15-7
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/4157
source_type: 官方文档
---

# FastGPT V4.15.7版本升级内容与操作指南

## 这个版本改了什么
本版本更新了fastgpt-app与fastgpt-pro的镜像tag至v4.15.7。同时修复三类问题：修复MCP使用Streamable HTTP连接失败并回退到SSE时，请求头可能被重复发送的问题；将门户页快捷应用数量上限调整为3个，并兼容校验历史配置中超过上限的快捷应用；修复应用发布后，文件变量配置允许上传文件，但预签名上传接口错误判断为未开启文件上传的问题。

## 升级前要确认的事
确认所部署的服务为fastgpt-app与fastgpt-pro，且当前可获取对应v4.15.7版本的镜像文件。

## 升级步骤（照做）
按照现有部署流程，更新fastgpt-app的镜像tag为v4.15.7，同步更新fastgpt-pro的镜像tag为v4.15.7，完成服务重启即可。

## 升级后怎么验证
依次完成三项验证：测试MCP使用Streamable HTTP连接，确认连接失败回退到SSE时无请求头重复发送的问题；访问门户页，确认快捷应用数量上限为3个，且历史配置中超过上限的快捷应用可正常展示；发布应用并配置文件变量，尝试上传文件，确认预签名上传接口可正确识别文件上传功能已开启，上传流程正常。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/4157)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
