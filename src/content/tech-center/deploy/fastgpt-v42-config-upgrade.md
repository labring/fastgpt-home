---
title: FastGPT从旧版本升级到V4.2的配置变更与操作指南
slug: /zh/deploy/fastgpt-v42-config-upgrade
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/42
source_type: 官方文档
---

# FastGPT从旧版本升级到V4.2的配置变更与操作指南

本页面针对FastGPT从旧版本升级至V4.2的场景提供官方说明，根据官方披露的信息，99.9%的用户升级不会受到额外影响，本次升级的核心调整集中在配置文件的特定字段格式，仅部分自定义了相关配置的用户需要执行对应修改。

### 核心配置变更详情
本次升级的核心改动为配置文件中`QAModel`字段的格式调整：原格式为数组形式，现调整为对象格式。官方给出的标准示例配置为：
```
QAModel : { model : gpt-3.5-turbo-16k , name : GPT35-16k , maxToken : 16000 , price : 0 }
```
本次改动的目的为统一使用单个最合适的模型处理对应任务，无需保留多选项的配置逻辑，简化配置流程同时优化任务处理逻辑。仅当您此前在配置文件中配置了多模型的数组格式`QAModel`时，才需要进行本次格式调整。

### 升级操作步骤
1.  找到FastGPT部署对应的配置文件，定位到`QAModel`字段；
2.  若您此前配置的是数组格式的`QAModel`，则将其重构为上述示例的对象格式，确保每个字段的名称和参数值与您的实际部署需求匹配；
3.  保存修改后的配置文件，完成本次升级的配置调整。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/42)
