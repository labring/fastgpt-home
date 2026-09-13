---
title: FastGPT V4.2.1版本向量模型配置项升级说明
slug: /zh/deploy/upgrade-v4-2-1
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/421
source_type: 官方文档
---

# FastGPT V4.2.1版本向量模型配置项升级说明

## 这个版本改了什么
私有部署场景下，VectorModels配置字段新增defaultToken和maxToken两个子项。defaultToken对应直接分段时的默认token数量，maxToken对应模型支持的token上限，通常不建议超过3000。示例配置如下：
```json
"VectorModels": [
    {
      "model": "text-embedding-ada-002",
      "name": "Embedding-2",
      "price": 0,
      "defaultToken": 500,
      "maxToken": 3000
    }
]
```
本次改动的目的是统一向量模型的选择逻辑，仅使用最合适的模型处理对应任务。

## 升级前要确认的事
需确认当前私有部署已添加自定义配置文件，且配置文件中存在VectorModels配置项。需明确当前使用的向量模型类型，以便配置对应的defaultToken和maxToken数值。

## 升级步骤（照做）
1. 打开私有部署使用的自定义配置文件。
2. 定位到VectorModels配置数组。
3. 为数组内的每个向量模型配置对象添加defaultToken和maxToken字段，字段数值参考官方示例配置。
4. 保存修改后的配置文件。

## 升级后怎么验证
打开修改后的自定义配置文件，确认VectorModels数组内的每个模型对象均包含defaultToken和maxToken字段，且数值与配置要求一致。进入系统向量模型管理页面，查看已配置的向量模型参数是否正确显示新增的两个配置项。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/421)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
