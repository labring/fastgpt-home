---
title: FastGPT飞书知识库BaseUrl配置与自定义工作流变量使用说明
slug: /zh/glossary/fastgpt-feishu-baseurl-workflow-variable
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/3974
source_type: 官方文档
---

# FastGPT飞书知识库BaseUrl配置与自定义工作流变量使用说明

## 一句话定义
本页面说明FastGPT中飞书知识库BaseUrl配置与自定义工作流变量插件入参的相关规则与使用注意事项。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
飞书知识库BaseUrl配置：FastGPT的飞书知识库默认BaseUrl为https://open.feishu.cn，本地化部署场景下，需将其配置为对应自建域名。自定义工作流变量：需在FastGPT的自定义工作流模块中新建自定义变量，将变量粘贴至插件中使用时，变量无法正常生效，仅可在FastGPT自带的基础功能模块中正常生效。

## 容易搞错的地方
部分使用者误以为自定义工作流变量可在插件入口生效，实际仅在自带基础功能中生效。部分使用者在本地化部署飞书知识库时，未修改默认BaseUrl，导致无法正常连接飞书服务。

> [FastGPT GitHub issue 3974](https://github.com/labring/FastGPT/issues/3974), [FastGPT GitHub issue 4895](https://github.com/labring/FastGPT/issues/4895)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
