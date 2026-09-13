---
title: FastGPT outLink模块unAuthUser错误码说明
slug: /zh/troubleshoot/fastgpt-outlink-unauthuser-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/outLink.ts
source_type: 官方文档
---

# FastGPT outLink模块unAuthUser错误码说明

## 这个错误是什么
该错误属于FastGPT的outLink模块，枚举名为OutLinkErrEnum.unAuthUser，对应的statusText为unAuthUser。错误码由系统自动分配为505003，对应国际化文案键为common:code_error.outlink_error.un_auth_user，错误提示信息为该键对应的国际化内容。

## 什么情况下会触发
当访问FastGPT的外部链接功能时，当前用户未获得该外部链接的访问授权，会触发该错误。

## 怎么定位（可照做的步骤）
1. 提取报错信息中的statusText字段，确认其值为unAuthUser，同时确认所属模块为outLink；2. 查看报错携带的code字段，确认其值为505003；3. 核对当前访问的外部链接的配置信息，确认相关权限设置是否符合预期。

## 处理与验证
处理该错误时，需确认当前用户是否在该外部链接的授权访问范围内，调整外部链接的授权配置以包含当前用户。验证时，重新访问该外部链接，确认不再触发该错误，且错误提示不再显示对应文案。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/outLink.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
