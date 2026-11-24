---
title: FastGPT从旧版本升级到V4.2的配置修改指南
slug: /zh/deploy/fastgpt-v42-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/self-host/upgrading/outdated/42
source_type: 官方文档小节
---

# FastGPT从旧版本升级到V4.2的配置修改指南

## 升级概况
FastGPT V4.2版本的升级操作属于轻量化配置调整，对99.9%的用户不会产生额外影响。本次升级仅涉及配置文件中QAModel字段的格式修改，无需调整其他部署相关的代码、环境变量或服务配置，整体操作难度极低。

## 配置修改步骤
1. 打开FastGPT的配置文件，定位到QAModel字段。
2. 将原数组格式的QAModel配置内容，替换为标准的对象格式配置。标准示例如下：
```json
"QAModel": {
  "model": "gpt-3.5-turbo-16k",
  "name": "GPT35-16k",
  "maxToken": 16000,
  "price": 0
}
```
原配置为数组形式，需严格按照上述示例完成格式转换，确保字段名称和参数值与示例保持一致。

## 调整逻辑说明
本次格式调整的核心目的是统一模型调用的配置逻辑，无需用户额外选择模型，仅保留一套适配性最优的配置用于执行相关任务。这一调整可以简化后续的模型管理流程，避免因多模型配置带来的潜在问题，同时确保任务执行的稳定性和一致性。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/outdated/42)
