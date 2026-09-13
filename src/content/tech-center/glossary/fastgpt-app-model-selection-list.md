---
title: FastGPT应用设置模型选择列表为空问题处理
slug: /zh/glossary/fastgpt-app-model-selection-list
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/toc
source_type: 官方文档
---

# FastGPT应用设置模型选择列表为空问题处理

## 一句话定义
模型选择列表是FastGPT应用设置中用于配置应用调用AI模型的下拉选择组件，用于指定应用与大语言模型的绑定关系。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
该组件位于应用设置页面，可通过下拉菜单的形式展示当前可用的AI模型列表，用户可从中选择目标模型完成应用的AI能力配置。根据官方issue记录，当通过pull命令升级到4.6.7版本后，该列表可能出现为空的异常情况，无法正常展示可用模型选项。该组件无需额外配置参数，仅需从下拉列表中选择对应模型即可完成绑定。

## 容易搞错的地方
该列表仅存在于应用设置的配置场景中，与工作流编排中的user-selection节点功能不同，二者属于不同的功能模块，不可混用。部分用户可能将应用设置的模型选择列表与其他场景的模型选择功能混淆，导致配置错误。升级4.6.7版本后出现列表为空时，官方未提供具体恢复步骤，需等待官方后续更新。

> [FastGPT 文档目录](https://doc.fastgpt.cn/zh-CN/toc), [FastGPT GitHub issue 790](https://github.com/labring/FastGPT/issues/790)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
