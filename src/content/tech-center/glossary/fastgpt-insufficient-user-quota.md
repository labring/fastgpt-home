---
title: 详细讲解FastGPT中insufficient_user_quota报错的具体配置与管理方法
slug: /zh/glossary/fastgpt-insufficient-user-quota
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/916
source_type: 官方文档
---

# 详细讲解FastGPT中insufficient_user_quota报错的具体配置与管理方法

## 一句话定义
insufficient_user_quota是FastGPT中提示用户API调用额度不足的报错，完整报错文本为insufficient_user_quota user quota is not enough，该报错通常在长时间调用API后触发。

## 在 FastGPT 里怎么用
该报错适用于私有部署版本的FastGPT场景。当触发该报错时，可尝试修改相关配置文件调整root用户默认API调用额度，也可探索在管理页面配置多用户的API调用额度，实现多用户额度的实时修改。

## 容易搞错的地方
该报错仅指向用户API调用额度不足的问题，不应与API密钥异常等其他调用问题混淆。部分用户可能误将该报错归因于API密钥问题，但根据官方文档的例行检查要求，出现该报错时需先确认API密钥正常，因此报错根源为额度不足。当前片段未提供具体的配置文件路径与完整修改步骤，需参考官方完整文档。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/916)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
