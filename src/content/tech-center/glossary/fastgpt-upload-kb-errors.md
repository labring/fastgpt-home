---
title: 解决FastGPT上传文件报错与知识库简介更新异常问题
slug: /zh/glossary/fastgpt-upload-kb-errors
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/379
source_type: 官方文档
---

# 解决FastGPT上传文件报错与知识库简介更新异常问题

## 一句话定义
本内容针对FastGPT中上传文件触发413请求实体过大报错、知识库简介无法正常更新两类异常的说明。
## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
上传csv文件时，若出现413 Request Entity Too Large报错，可核对文件内容数量（示例中为1万多条新闻文章），排查是否因文件体积超限。在docker-compose部署的4.6.3版本FastGPT中，进入知识库配置页配置intro字段，点击保存后，需关注列表页的显示状态。
## 容易搞错的地方
上传文件时，仅将报错归因于文件条目数，未考虑相关配置限制。知识库简介更新时，误以为保存成功即完成配置，忽略了特定版本部署环境下的已知异常。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/379)

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/579)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
