---
title: 解决FastGPT中JS模块无法提取嵌套JSON字段值的问题
slug: /zh/troubleshoot/fastgpt-js-nested-json-fix
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1909
source_type: GitHub issue
---

# 解决FastGPT中JS模块无法提取嵌套JSON字段值的问题

## 现象
使用FastGPT私有部署的JS模块处理JSON数据时，可正常获取外层对象codeReturn的完整值，但无法提取其嵌套的result字段值。原始输出的JSON结构为{"codeReturn":{"result":"pending"},"log":""}。JS模块自定义输出配置了codeReturn（any类型）与result（string类型），其中codeReturn可正常返回{"result":"pending"}，但result始终无法获取到值。

## 可能原因
该问题的可能原因与JS模块对嵌套JSON字段的解析逻辑相关，具体触发条件需按实际使用环境确认。

## 排查步骤
1. 核对JS模块自定义输出的字段名与目标JSON嵌套字段的名称是否完全一致。
2. 查看原始输入的JSON数据结构，确认嵌套字段存在且格式符合标准JSON规范。
3. 检查JS模块的处理代码是否存在对字段提取的额外限制。
4. 确认外层对象codeReturn的输出是否正常，验证基础数据传递是否存在异常。

## 解决与验证
若需获取嵌套字段值，可通过引用外层对象的方式提取。例如，在JS模块中直接返回codeReturn.result。验证时，调整JS模块的输出配置，仅通过外层对象调用嵌套字段，或修改自定义输出的配置逻辑，确认result字段可正常获取到"pending"的结果。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1909)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
