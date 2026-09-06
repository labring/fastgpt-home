---
title: FastGPT中Marker自定义模型的PDF解析效果与使用规范
slug: /zh/deploy/fastgpt-marker-pdf-parser
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/custom-models/marker
source_type: 官方文档
---

# FastGPT中Marker自定义模型的PDF解析效果与使用规范

## 解析效果展示
以清华大学提交的ChatDev Communicative Agents for Software Develop.pdf为例，可展示Marker解析PDF的效果。页面包含6组对比图片，左侧为解析后的分块结果，右侧为PDF原文，可完整提取文档中的整体图片、公式与表格内容，解析效果满足常规业务使用需求。

## 使用操作步骤
1. 准备待解析的PDF文件，可选取公开学术论文作为测试案例，例如ChatDev Communicative Agents for Software Develop.pdf。
2. 部署并调用Marker工具执行PDF解析流程。
3. 查看解析生成的分块内容，对比原始PDF原文，确认图片、公式、表格等元素的提取完整性。
4. 整理解析后的内容，用于后续的业务处理环节。

## 使用合规说明
Marker工具采用GPL-3.0 license协议，使用该工具及相关解析内容时，需严格遵守该协议的各项条款，确保所有使用行为均符合协议规定，避免违规使用带来的风险。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/custom-models/marker)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
