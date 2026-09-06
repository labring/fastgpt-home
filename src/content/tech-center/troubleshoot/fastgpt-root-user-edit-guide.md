---
title: FastGPT root用户额度修改与新建用户操作指南
slug: /zh/troubleshoot/fastgpt-root-user-edit-guide
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1054
source_type: GitHub issue
---

# FastGPT root用户额度修改与新建用户操作指南

## 现象
部署Docker版4.6.9的FastGPT，使用本地部署的模型与配置了永不过期的OneAPI令牌，在尝试修改root用户额度或新建用户时，发现官方文档仅提及可手动修改，但未给出具体操作步骤，无法完成对应操作，此前已查阅FAQ文档但未找到相关说明。

## 可能原因
官方文档及FAQ文档均未提供手动修改root用户额度与新建用户的具体操作指引，仅提及可手动修改，导致无法直接获取操作步骤。

## 排查步骤
1. 确认FastGPT的部署方式为Docker，版本为4.6.9。
2. 核对已查阅的官方文档及FAQ文档内容，确认未包含手动修改root用户额度或新建用户的具体步骤。
3. 确认当前使用的OneAPI令牌状态为永不过期。

## 解决与验证
官方文档明确提及可通过手动方式修改root用户额度或新建用户，需结合实际部署环境找到对应的操作入口完成修改。完成操作后，登录FastGPT后台验证root用户额度是否更新，或新用户是否成功创建。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1054)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
