---
title: 解决FastGPT私有部署版内容提取和问题分类模块无法选择模型的问题
slug: /zh/troubleshoot/fastgpt-module-model-selection-failure
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1132
source_type: GitHub issue
---

# 解决FastGPT私有部署版内容提取和问题分类模块无法选择模型的问题

## 现象
私有部署版本4.7.1-alpha的FastGPT，更新至对应版本后，内容提取模块与问题分类模块无法选择模型，AI模块可正常使用模型选择功能。

## 可能原因
目前无明确已知触发原因，需结合实际部署环境与更新日志进一步排查，具体触发因素需按实际环境确认。

## 排查步骤
1. 确认当前FastGPT版本为4.7.1-alpha私有部署版。
2. 验证AI模块的模型选择功能是否可正常运行。
3. 对比内容提取、问题分类模块与AI模块的配置项差异。
4. 查阅本次更新的变更日志，确认与模型选择相关的代码或配置变更。
5. 检查部署环境的网络连接与密钥配置是否正常。

## 解决与验证
需根据排查步骤确认的具体问题进行对应修复。验证方式为：进入内容提取模块与问题分类模块，尝试选择模型，确认选项可正常加载并选择。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1132)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
