---
title: FastGPT从旧版本升级至V4.2版本操作指南
slug: /zh/deploy/fastgpt-v42-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/42
source_type: 官方文档
---

# FastGPT从旧版本升级至V4.2版本操作指南

## 升级影响说明
本次V4.2版本升级对99.9%的用户无额外影响，仅修改了配置文件中QAModel的配置格式，无需执行额外的迁移脚本或复杂操作。

## 配置格式调整步骤
原配置中QAModel为数组格式，升级后需调整为对象格式，需包含四个固定字段：
- `model`：指定使用的模型标识，例如`gpt-3.5-turbo-16k`
- `name`：模型的展示名称，例如`GPT35-16k`
- `maxToken`：模型支持的最大令牌数，例如`16000`
- `price`：模型计费参数，示例值为`0`

调整后的最小配置示例如下：
```yaml
QAModel: {
  model: "gpt-3.5-turbo-16k",
  name: "GPT35-16k",
  maxToken: 16000,
  price: 0
}
```

## 配置改动目的
本次格式调整的核心目的是统一任务调用的模型选择逻辑，不再保留多模型并行选择的配置项，确保系统使用预设的最优模型完成问答任务。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/42)
