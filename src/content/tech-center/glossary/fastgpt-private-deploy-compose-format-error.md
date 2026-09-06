---
title: 排查FastGPT私有部署的docker-compose配置格式错误问题
slug: /zh/glossary/fastgpt-private-deploy-compose-format-error
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/1073
source_type: 官方文档
---

# 排查FastGPT私有部署的docker-compose配置格式错误问题

## 一句话定义
该格式错误指在FastGPT私有部署时，docker-compose配置文件中服务参数的语法不符合要求，导致启动失败的问题。

## 在 FastGPT 里怎么用
部署FastGPT私有版本时，需编辑docker-compose.yml配置文件，正确配置各服务的参数。执行docker-compose up -d启动服务时，若出现以下报错则表示存在格式错误：
1. ERROR: Invalid interpolation format for "entrypoint" option in service "mongo": "openssl rand -base64 128 > /data/mongodb.key
2. Error response from daemon: invalid reference format
错误场景包括mongo服务的entrypoint命令格式有误，或镜像标签包含无效字符。

## 容易搞错的地方
一是mongo服务的entrypoint命令未正确闭合引号，或命令中的重定向符号导致插值解析失败；二是镜像标签中混入如#、空格等无效字符，例如V4.8.9-alpha# 阿里云这类格式会破坏镜像引用的合法性。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1073)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
