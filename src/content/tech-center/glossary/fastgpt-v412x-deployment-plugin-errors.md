---
title: FastGPT v4.12.x版本部署与插件配置问题说明
slug: /zh/glossary/fastgpt-v412x-deployment-plugin-errors
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/5459
source_type: 官方文档
---

# FastGPT v4.12.x版本部署与插件配置问题说明

## 一句话定义
本页说明FastGPT v4.12.x版本中邮件插件SSL配置异常与OceanBase部署知识库导入报错的相关问题。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
v4.12.0私有部署版本的邮件插件存在SSL配置相关问题，配置时可选择启用或禁用SSL。v4.12.1私有部署版本使用OceanBase的docker-compose部署后，可进入知识库管理页面选择备份导入功能，导入文件可使用官方模板csv格式。

## 容易搞错的地方
邮件插件配置SSL时，存在两个异常场景：禁用SSL时无法保存密钥，开启SSL会导致outlook smtp邮件发送报错，该问题出现在v4.12.0版本。使用OceanBase部署的v4.12.1私有部署版本中，备份导入知识库时，即使使用原封不动的模板csv文件，仍会出现训练异常，该问题出现在v4.12.1版本。

> [FastGPT GitHub issue 5459](https://github.com/labring/FastGPT/issues/5459), [FastGPT GitHub issue 5508](https://github.com/labring/FastGPT/issues/5508)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
