---
title: FastGPT V4.15.0-beta3版本升级说明与操作指南
slug: /zh/deploy/upgrade-v4-15-0-beta3
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/41503
source_type: 官方文档
---

# FastGPT V4.15.0-beta3版本升级说明与操作指南

## 这个版本改了什么
本次版本更新fastgpt-app、fastgpt-pro、fastgpt-code-sandbox的镜像tag均为v4.15.0-beta3。Code Sandbox新增SANDBOX_API_MAX_BODY_MB、SANDBOX_MAX_OUTPUT_MB等安全相关环境变量，支持通过queueId对运行接口分组排队，完整默认配置包括SANDBOX_API_MAX_BODY_MB为8MB、SANDBOX_MAX_OUTPUT_MB为10MB、CHECK_INTERNAL_IP为true、SANDBOX_MAX_TIMEOUT为60000毫秒、SANDBOX_MAX_MEMORY_MB为256MB、SANDBOX_POOL_SIZE为20等多项参数。新增功能包括多模态模型支持音视频输入，分享链接与门户页支持语言切换，不再强制自动识别浏览器语言。优化内容涵盖Skill模块弹窗样式、Skill list接口性能、工作流节点名称与介绍输入、工作流编辑页登录失效后自动保存草稿、登录页UI。修复问题包括TTS语音播放适配最新OpenAI SDK避免报错，修复知识库数据分块遇代码块时的超大分块问题。代码优化包括调整token计算依赖提升性能，重写对话框代码实现模块化细分，优化单测性能将全量测试从10分支降至5分钟，升级ts6，增强GitHub action安全性。

## 升级前要确认的事
需确认当前部署的服务为fastgpt-app、fastgpt-pro、fastgpt-code-sandbox，且需同步更新这三个服务的镜像tag。需确认Code Sandbox的现有配置，避免新增环境变量与原有配置产生冲突，如需自定义安全参数或启用接口排队，可提前规划新增环境变量的配置内容。

## 升级步骤（照做）
按照原有部署配置，更新fastgpt-app、fastgpt-pro、fastgpt-code-sandbox的镜像tag为v4.15.0-beta3。根据业务需求配置Code Sandbox新增的安全相关环境变量，如需启用接口分组排队功能，可配置SANDBOX_QUEUE_ID_CONCURRENCY参数。

## 升级后怎么验证
验证多模态模型是否支持音视频输入功能；验证分享链接或门户页是否支持语言切换，不再自动识别浏览器语言；验证Skill模块弹窗样式是否更新、Skill list接口性能是否正常；验证工作流编辑页登录失效后是否自动保存草稿；验证登录页UI是否更新；验证TTS语音播放是否适配最新OpenAI SDK无报错；验证知识库数据分块处理代码块时是否避免超大分块；验证Code Sandbox的新增环境变量配置是否按预期生效。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/41503)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
