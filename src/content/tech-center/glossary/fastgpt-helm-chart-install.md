---
title: 说明FastGPT通过Helm Chart部署的相关配置与操作方法
slug: /zh/glossary/fastgpt-helm-chart-install
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/1013
source_type: 官方文档
---

# 说明FastGPT通过Helm Chart部署的相关配置与操作方法

## 一句话定义
Helm Chart是用于在Kubernetes环境中部署FastGPT的打包配置文件集合。

## 在 FastGPT 里怎么用
目前FastGPT官方未提供官方的Helm Chart部署配置文件。有部署需求的用户可通过查阅项目README等官方文档确认，现有版本未包含Helm Chart部署的相关描述。该部署方式的需求由社区用户提出，社区用户计划自行编写对应的Helm Chart配置文件，编写完成后可提交至FastGPT官方仓库，由维护者评估是否纳入官方支持。

## 容易搞错的地方
部分用户会误以为FastGPT当前版本已支持官方Helm Chart部署方式，实际需自行编写配置文件或等待官方更新相关部署支持内容。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1013)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
