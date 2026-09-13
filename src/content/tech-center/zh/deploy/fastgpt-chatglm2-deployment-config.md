---
title: FastGPT中ChatGLM2自定义模型的部署配置说明
slug: /zh/deploy/fastgpt-chatglm2-deployment-config
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/custom-models/chatglm2
source_type: 官方文档
---

# FastGPT中ChatGLM2自定义模型的部署配置说明

## 量化显存占用说明
依据官方数据，生成8192长度的内容时，不同量化等级的显存占用情况存在差异。FP16量化等级需占用12.8GB显存，int8量化等级需占用8.1GB显存，int4量化等级需占用5.1GB显存。量化操作会对性能产生轻微影响，影响程度有限。

## 推荐部署配置
根据实际可用的硬件资源，可选择以下对应配置进行部署，所有配置的硬盘空间要求均不低于25GB：

| 类型 | 内存 | 显存 | 硬盘空间 | 启动命令 |
|------|---------|---------|----------|--------------------------|
| fp16 | >=16GB | >=16GB | >=25GB | python openai_api.py 16 |
| int8 | >=16GB | >=9GB | >=25GB | python openai_api.py 8 |
| int4 | >=16GB | >=6GB | >=25GB | python openai_api.py 4 |

## 配置选型指引
不同量化等级的配置对应不同的硬件要求，可根据实际可用的内存、显存资源选择匹配的类型。启动命令直接使用表格内的对应指令即可，无需额外调整其他参数。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/custom-models/chatglm2)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
