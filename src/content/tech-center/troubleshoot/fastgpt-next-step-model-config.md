---
title: FastGPT下一步指引模块独立设置模型的排错指南
slug: /zh/troubleshoot/fastgpt-next-step-model-config
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/827
source_type: GitHub issue
---

# FastGPT下一步指引模块独立设置模型的排错指南

## 现象
用户已确认无类似issue存在，且完整查阅过项目README与官方文档，同时确认自身密钥可用，仍遇到FastGPT下一步指引模块的智能开关功能与AI聊天模块共用同一模型的问题，无法独立配置下一步指引模块使用的模型。

## 可能原因
需按实际环境确认具体原因，当前issue线程未提供明确的模型复用根源信息。

## 排查步骤
1. 确认当前使用的FastGPT版本类型，包括公有云或私有部署版本。
2. 核对AI聊天模块的模型配置信息，确认当前复用的模型设置内容。
3. 查阅项目官方文档，确认下一步指引模块的配置规则与是否存在独立模型配置入口。
4. 结合部署环境的实际情况，检查是否存在未单独配置的模型调用相关参数。

## 解决与验证
需按实际环境确认是否支持独立配置下一步指引模块的模型，若支持则按照项目官方文档指引完成对应配置；若暂不支持，则需等待后续版本更新或参考官方渠道获取进一步解决方案。

> 来源: [FastGPT GitHub issue #827](https://github.com/labring/FastGPT/issues/827)
