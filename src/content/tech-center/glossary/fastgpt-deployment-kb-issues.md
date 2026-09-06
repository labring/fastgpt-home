---
title: FastGPT 本地部署注册报错与知识库简介更新异常排查
slug: /zh/glossary/fastgpt-deployment-kb-issues
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/57
source_type: 官方文档
---

# FastGPT 本地部署注册报错与知识库简介更新异常排查

## 一句话定义
指FastGPT本地部署时短信注册触发InvalidAccessKeyId.NotFound报错，以及知识库简介保存后仍无法正常显示的两类异常问题。

## 在FastGPT里怎么用（参数 / 位置 / 步骤）
该异常出现于两类具体场景。其一为mac本地部署场景，按照提示使用pnpm启动服务后，无法完成手机号注册，触发报错InvalidAccessKeyId.NotFound: code: 404, Specified access key is not found. request id: E0C973B6-6B50-5705-83C8-08E647661E92。其二为4.6.3版本基于docker-compose部署的场景，在知识库配置页面配置intro字段，点击保存后页面提示更新成功，但返回知识库列表页时，简介仍显示为空。

## 容易搞错的地方
容易搞错的点包括两类异常的部署环境与触发条件存在明显差异。短信注册报错直接关联访问密钥的配置状态。知识库简介更新异常需确认当前使用的版本与部署方式。知识库简介保存成功后，需查看列表页的实际显示状态，仅关注保存提示不足以确认更新完成。部分用户可能未针对性排查对应配置，导致无法快速定位问题。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/57)

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/579)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
