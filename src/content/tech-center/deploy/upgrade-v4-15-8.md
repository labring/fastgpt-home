---
title: FastGPT V4.15.8版本升级说明与操作指引
slug: /zh/deploy/upgrade-v4-15-8
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/4158
source_type: 官方文档
---

# FastGPT V4.15.8版本升级说明与操作指引

## 这个版本改了什么
本版本更新了FastGPT相关服务的镜像tag，其中fastgpt-app（FastGPT主服务）与fastgpt-pro（FastGPT商业版）的镜像tag均为v4.15.8。同时修复了系统默认模型未进行敏感信息过滤的问题，避免系统初始化接口响应返回模型API Key、请求地址及内部配置。

## 升级前要确认的事
确认需要升级的服务为fastgpt-app或fastgpt-pro，确认当前服务使用的镜像tag并非v4.15.8。

## 升级步骤（照做）
拉取fastgpt-app:v4.15.8与fastgpt-pro:v4.15.8镜像，更新对应服务的镜像配置，重启相关服务。

## 升级后怎么验证
调用系统初始化接口，检查响应结果未包含模型API Key、请求地址及内部配置。查看服务运行日志，确认无异常报错。确认服务可正常对外提供相关功能。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/4158)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
