---
title: FastGPT V4.14.13版本升级内容解读与操作指引
slug: /zh/deploy/upgrade-v4-14-13
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41413
source_type: 官方文档
---

# FastGPT V4.14.13版本升级内容解读与操作指引

## 这个版本改了什么
本版本包含2项修复与1项优化。修复内容包括分享链接获取单条引用接口鉴权失败问题，该问题会导致分享链接无法正常获取引用内容；以及opensandbox鉴权绕过风险，该风险可能导致未授权访问相关功能。优化内容为completions接口的chatId参数支持null类型，提升接口的兼容性与灵活性。

## 升级前要确认的事
确认当前部署的fastgpt-app服务可进行更新，部署环境可拉取官方fastgpt-app镜像，且当前使用的镜像tag非v4.14.13。同时确认已了解当前fastgpt-app服务的部署方式，确保可以完成镜像更新操作。

## 升级步骤（照做）
按照原有部署流程，将fastgpt-app镜像的tag更新为v4.14.13。若使用容器编排工具，需同步更新对应服务的镜像tag配置，确保部署后生效。完成镜像拉取后重启对应服务。

## 升级后怎么验证
1. 调用分享链接获取单条引用接口，确认鉴权流程正常，无失败报错。
2. 测试opensandbox相关功能，确认鉴权逻辑无绕过风险。
3. 调用completions接口，传入chatId为null，确认接口可正常响应请求。可通过前端页面或API调试工具完成上述验证操作，确保功能正常。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41413)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
