---
title: 介绍MinerU在FastGPT中的文档解析效果与合规使用方法
slug: /zh/deploy/mineru-fastgpt-document-parsing
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/custom-models/mineru
source_type: 官方文档
---

# 介绍MinerU在FastGPT中的文档解析效果与合规使用方法

## 工具概述
MinerU可用于FastGPT的自定义模型文档解析，以清华团队发布的ChatDev相关学术论文为例展示解析效果。该工具可对PDF文档进行结构化解析，覆盖多种内容类型的提取需求。

## 解析效果示例
以下为解析效果对比表格，上方三行内容为MinerU解析后的分块结果，下方三行内容为原始PDF文档：
| 分块结果示例1 | 分块结果示例2 | 分块结果示例3 |
| --- | --- | --- |
| ![mineru3-1](../../../public/imgs/mineru3-1.png) | ![mineru4-1](../../../public/imgs/mineru4-1.png) | ![mineru5-1](../../../public/imgs/mineru5.png) |
| ![mineru3](../../../public/imgs/mineru3.png) | ![mineru4](../../../public/imgs/mineru4.png) | ![mineru5](../../../public/imgs/mineru5.png)

通过对比可发现，该工具可完整提取文档中的整体图片、公式以及OCR手写体内容，解析效果符合文档处理需求。

## 使用注意事项
使用MinerU需严格遵守其开源协议GPL-3.0 license。如需获取工具与更多相关文档，可访问MinerU官方仓库。在FastGPT中使用该工具时，需确保所有操作符合协议要求，避免违规使用。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/custom-models/mineru)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
