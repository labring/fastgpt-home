---
title: 修复FastGPT QueryExtension历史记录拼接异常问题
slug: /zh/troubleshoot/fastgpt-queryextension-history-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1142
source_type: GitHub issue
---

# 修复FastGPT QueryExtension历史记录拼接异常问题

## 现象
在FastGPT 4.7.1-alpha私有部署版本及公有云版本中，QueryExtension模块的历史记录拼接逻辑存在错误。模型接收的提示词内，历史记录会显示为`\nQ: [object Object]\nA: [object Object]`，导致模型无法依据历史记录完成查询重写。

## 可能原因
问题根源为`FastGPT/packages/service/core/ai/functions/queryExtension.ts`文件第120行的代码逻辑：`return `${role}: ${item.value}`;`。由于`item.value`为对象类型，直接使用模板字符串拼接时，对象会被自动转换为`[object Object]`，最终生成错误格式的历史记录提示词。

## 排查步骤
1. 定位到FastGPT项目的`packages/service/core/ai/functions/queryExtension.ts`文件。
2. 查看第120行的代码，确认`item.value`的数据类型是否为对象。
3. 检查历史记录数据传入QueryExtension模块时的原始格式，确认`item.value`的结构是否符合预期。

## 解决与验证
通过提交PR修复该代码逻辑，将`item.value`转换为可正常拼接的字符串格式。修复完成后，更新或重新部署FastGPT版本。验证时，确认模型接收的提示词内历史记录不再显示`[object Object]`，可正常依据历史记录完成查询重写。具体修复细节需按实际开发环境确认。

> 来源: [FastGPT GitHub issue #1142](https://github.com/labring/FastGPT/issues/1142)
