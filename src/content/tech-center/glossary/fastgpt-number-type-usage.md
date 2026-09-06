---
title: FastGPT中number类型字段的定义、用法及异常处理
slug: /zh/glossary/fastgpt-number-type-usage
page_type: 术语速查
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-16/4160
source_type: 官方文档
---

# FastGPT中number类型字段的定义、用法及异常处理

## 一句话定义
FastGPT中的number是4.16版本起引入的严格数值数据类型，用于系统模型配置的数值字段与前端数值输入交互组件。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
系统模型配置场景：在FastGPT 4.16及以上版本，系统模型配置需遵循严格Schema的number类型。旧版本保存的数字字符串、字符串形式价格梯度或缺失字段可能导致初始化校验失败，需执行数据清洗脚本。清洗步骤为：1. 运行dry-run模式的curl命令：`curl -X POST 'https://你的域名/api/admin/dataClean/cleanSystemModelConfigs' -H 'Content-Type: application/json' -H 'rootkey: 你的ROOT_KEY' -d '{"dryRun":true}'`，查看`invalidSamples`中的待处理数据。2. 确认`invalidSamples`无人工处理数据后，运行正式清洗命令：`curl -X POST 'https://你的域名/api/admin/dataClean/cleanSystemModelConfigs' -H 'Content-Type: application/json' -H 'rootkey: 你的ROOT_KEY' -d '{"dryRun":false}'`。清洗规则包括将合法数字字符串转换为number、字符串形式的`priceTiers`转换为数组、删除非法可选数字；缺失的必填数字使用系统默认值，LLM的`maxContext/maxResponse/quoteMaxToken`分别为`16000/16000/13000`，Embedding的`defaultToken/maxToken`分别为`500/3000`，价格为`0`，Embedding缺失的`weight`补为`0`。接口可安全重复执行，再次dry-run时`wouldUpdate`应为`0`，无法通过Schema的记录会返回在`invalidSamples`中。前端交互场景：number类型输入组件用于Agent配置的数值输入，需避免在生成和手动输入之间切换。

## 容易搞错的地方
旧版本保存的数字字符串、字符串形式价格梯度或缺失字段会导致初始化校验失败，需通过清洗脚本处理，不可直接跳过。正式清洗会立即刷新系统模型缓存，即使无数据更新也会重构运行时缓存，需确认执行时机。无法通过当前完整模型Schema的记录不会被写入，相关信息会返回在`invalidSamples`中，需提前检查该字段。前端number输入组件在Agent生成和手动输入之间切换后，可能异常变为普通文本框，需留意使用场景。

> 来源: [FastGPT 官方文档与源码](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-16/4160)
