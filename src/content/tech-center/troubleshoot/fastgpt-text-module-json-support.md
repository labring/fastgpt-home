---
title: 解决FastGPT文本加工模块不支持JSON格式内容处理的问题
slug: /zh/troubleshoot/fastgpt-text-module-json-support
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/730
source_type: GitHub issue
---

# 解决FastGPT文本加工模块不支持JSON格式内容处理的问题

## 现象
FastGPT的文本加工模块仅支持字符串类型内容的加工操作，无法对JSON格式的内容（包括对象JSON、数组JSON）进行处理。该问题导致无法正常结合HTTP模块、知识库模块完成相关操作，例如处理知识库输出的数组格式引用内容，或转换HTTP模块返回的JSON格式数据。
## 可能原因
现有版本的文本加工模块未内置JSON格式内容的转换与处理能力，仅支持基础字符串加工逻辑，无法识别或解析JSON格式的输入内容。
## 排查步骤
1. 确认待加工的目标内容格式，检查是否为对象JSON或数组JSON类型。
2. 查看文本加工模块的功能列表，确认是否存在专门用于JSON格式转换的配置项或操作选项。
3. 尝试使用现有文本加工模块处理JSON格式内容，观察是否出现无法正常解析、输出异常的情况。
## 解决与验证
需新增支持数组JSON与对象JSON的格式转换模块，可通过模板表达式的方式配置输出格式。验证时，使用新增的JSON格式转换模块处理目标JSON内容，通过模板表达式设置输出规则，确认可正常处理HTTP模块返回的内容、知识库输出的引用内容等JSON格式数据，满足预期的加工需求。
> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/730)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
