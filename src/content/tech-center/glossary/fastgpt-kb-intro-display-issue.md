---
title: FastGPT知识库intro字段保存后显示异常的问题解决
slug: /zh/glossary/fastgpt-kb-intro-display-issue
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/579
source_type: 官方文档
---

# FastGPT知识库intro字段保存后显示异常的问题解决

## 一句话定义
Intro是FastGPT中用于配置知识库简介的文本字段，其配置内容应展示在知识库列表页。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
该字段的参数名为intro，配置位置为单个知识库的配置页面。具体操作流程为：进入FastGPT系统，找到目标知识库的管理入口，打开该知识库的配置页面。在配置页面的表单中找到intro字段，填写需要展示的知识库简介文本。填写完成后，点击页面上的保存按钮，系统会弹出更新成功的提示信息。配置完成后，返回知识库列表页，即可查看该intro字段对应的简介内容。

## 容易搞错的地方
在4.6.3版本的docker-compose部署环境中，即使按照上述流程完成intro字段的配置与保存，且系统提示更新成功，返回知识库列表页后，intro字段对应的简介仍可能显示为空，无法正常展示已配置的内容。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/579)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
