---
title: 指导使用Xinference为FastGPT部署Qwen-14B模型
slug: /zh/deploy/fastgpt-xinference-qwen-deployment
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/custom-models/xinference
source_type: 官方文档
---

# 指导使用Xinference为FastGPT部署Qwen-14B模型

在FastGPT自托管部署流程中，可通过Xinference接入自定义大模型，该流程以Qwen-14B模型为例展开说明。

## 模型部署操作步骤
1. 启动Xinference后，在浏览器中访问http://127.0.0.1:9997，进入Web管理界面。
2. 打开"Launch Model"标签，搜索qwen-chat模型。
3. 选择模型启动相关参数，点击模型卡片左下方的小火箭🚀按钮完成部署。
默认Model UID为qwen-chat，后续可通过该ID访问模型。

首次启动Qwen模型时，Xinference会从HuggingFace下载模型参数，耗时约数分钟。下载的模型文件会被本地缓存，后续启动无需重复下载。Xinference支持从modelscope等其他模型站点下载模型文件。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/custom-models/xinference)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
