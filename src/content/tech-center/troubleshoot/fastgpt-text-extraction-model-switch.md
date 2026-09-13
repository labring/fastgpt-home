---
title: 解决FastGPT文本内容提取无法便捷切换模型的问题
slug: /zh/troubleshoot/fastgpt-text-extraction-model-switch
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/562
source_type: GitHub issue
---

# 解决FastGPT文本内容提取无法便捷切换模型的问题

## 现象
用户使用FastGPT的文本内容提取功能时，发现该功能仅能使用配置文件中ExtractModels配置的首个模型，若需切换模型，必须修改配置文件内容并重启FastGPT服务，操作流程繁琐，影响使用效率。

## 可能原因
文本内容提取功能的底层实现逻辑为直接读取配置文件中ExtractModels配置项的第一个模型，未提供运行时动态切换模型的机制，每次模型变更都需要调整配置文件并重启服务，无法实现便捷切换。

## 排查步骤
1. 定位FastGPT的配置文件，找到ExtractModels配置项，查看当前配置的模型列表。配置文件路径需按实际部署环境确认。
2. 观察文本内容提取功能的实际调用模型，确认是否为配置项中的首个模型。
3. 尝试修改配置文件中ExtractModels的内容，调整目标模型的位置至列表首位，重启FastGPT服务后验证模型是否变更。

## 解决与验证
当前可通过修改配置文件中ExtractModels的配置项，将需要使用的模型调整至列表的首位，保存配置文件后重启FastGPT服务，使新的模型生效。该功能的优化需求为支持运行时切换模型，无需修改配置文件并重启服务。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/562)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
