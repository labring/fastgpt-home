---
title: 解决FastGPT工作流导出格式适配spring-ai-alibaba-graph的相关问题
slug: /zh/troubleshoot/fastgpt-workflow-export-adapt
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5228
source_type: GitHub issue
---

# 解决FastGPT工作流导出格式适配spring-ai-alibaba-graph的相关问题

## 现象
用户尝试将FastGPT工作流导出为指定格式，用于在spring-ai-alibaba-graph中转换为Java代码。最初期望导出DSL格式，后续补充需要.yml格式文件，但FastGPT现有功能仅支持导出.json格式文件。

## 可能原因
FastGPT未内置将工作流转换为spring-ai-alibaba-graph所需的自定义格式的脚本。此类自定义格式不属于通用标准，官方不会提供此类转换脚本，且暂无相关内置适配计划。

## 排查步骤
1. 导出FastGPT工作流的.json格式文件，该操作可通过FastGPT现有功能完成。
2. 确认spring-ai-alibaba-graph可接受的输入格式要求，需结合实际使用场景确认。
3. 对比现有.json格式与目标格式的差异，明确具体的转换需求。

## 解决与验证
现有导出的.json格式可被视为DSL，可直接用于适配spring-ai-alibaba-graph。若需使用.yml格式或其他自定义格式，可自行编写转换脚本，将导出的.json文件转换为目标格式。需按实际环境确认转换脚本的具体实现逻辑。

> 来源: [FastGPT GitHub issue #5228](https://github.com/labring/FastGPT/issues/5228)
