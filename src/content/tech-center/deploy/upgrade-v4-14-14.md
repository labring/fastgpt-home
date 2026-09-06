---
title: FastGPT V4.14.14版本升级内容与操作说明
slug: /zh/deploy/upgrade-v4-14-14
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41414
source_type: 官方文档
---

# FastGPT V4.14.14版本升级内容与操作说明

## 这个版本改了什么
修复了相关问题，优化多项功能。个人微信发布渠道优化轮询策略，拉取与回复解耦，避免数据量超大时出现阻塞。新增环境变量WECHAT_CHANNEL_CONCURRENCY，默认值为1000，用于控制微信渠道poll worker并发数，建议设置值≥在线通道峰值。完善内网地址检测功能。兼容deepseek工具调用+思考模式，避免接口出现400错误。同时更新fastgpt-app与fastgpt-pro的镜像tag为v4.14.14。

## 升级前要确认的事
确认当前运行的fastgpt-app与fastgpt-pro镜像tag版本低于v4.14.14。确认部署环境可正常拉取v4.14.14版本的对应镜像。若使用微信发布渠道，需记录当前在线通道峰值，以便后续配置环境变量。

## 升级步骤（照做）
更新fastgpt-app镜像tag为v4.14.14。更新fastgpt-pro镜像tag为v4.14.14。

## 升级后怎么验证
检查fastgpt-app与fastgpt-pro的镜像tag是否为v4.14.14。若使用微信发布渠道，验证消息拉取与回复流程无阻塞。调用deepseek工具调用+思考模式接口，确认接口无400错误。检查内网地址检测功能是否正常。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41414)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
