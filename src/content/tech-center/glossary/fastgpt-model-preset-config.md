---
title: 详细说明FastGPT中模型预设的定义与使用方法
slug: /zh/glossary/fastgpt-model-preset-config
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/plugin/model-presets
source_type: 官方文档
---

# 详细说明FastGPT中模型预设的定义与使用方法

## 一句话定义
模型预设是FastGPT中用于统一注册、管理不同模型供应商及对应模型配置的标准化数据集合，包含供应商配置、模型列表及相关元数据。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
模型预设的核心文件位于`packages/infrastructure/src/static-data/models/`目录下。其中`index.ts`用于注册所有供应商，生成`staticModelList`和供应商列表；`model.ts`维护供应商显示名`ModelProviderMap`和AIProxy渠道`aiproxyChannels`；`type.ts`定义供应商配置和模型预设的输入schema；每个供应商的专属模型预设列表存放在`provider/{Provider}/index.ts`，对应供应商Logo存放在`provider/{Provider}/logo.svg`，AIProxy渠道头像存放在`channel-avatar/`目录下。所有模型预设相关的配置需遵循`type.ts`中定义的输入schema，确保格式合规。

## 容易搞错的地方
一是混淆全局注册文件与单个供应商预设文件，全局注册逻辑在`index.ts`，单个供应商的模型预设列表配置在`provider/{Provider}/index.ts`；二是混淆`model.ts`维护的两类配置，`ModelProviderMap`与`aiproxyChannels`均在该文件中维护，需注意各自的配置场景；三是误将`channel-avatar/`目录用于存放非AIProxy渠道的头像，该目录仅用于AIProxy渠道头像存储。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/plugin/model-presets)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
