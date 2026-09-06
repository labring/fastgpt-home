---
title: FastGPT 图表工具输出不稳定的历史模型对照
slug: /zh/troubleshoot/fastgpt-tool-plugin-chart-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3178
source_type: GitHub issue
---

# FastGPT 图表工具输出不稳定的历史模型对照

## 适用场景与历史记录

原议题报告绘图工具有时出错或无法稳定输出图表，并在评论中补充多张截图。 原始讨论提交于 2024-11-18，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

维护者建议使用 GPT-4o 对照测试，模型参数生成、工具执行和图表渲染应分别核对。

## 排查与复测

1. 保留相同图表数据、工具配置与错误文本，检查数据字段和 JSON 格式。
2. 使用一个确认支持该工具调用的模型进行对照；原维护者曾建议 GPT-4o。
3. 分别核对模型参数生成、工具执行和图表渲染三个阶段，记录失败位置。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：画图插件报错及输出不稳定](https://github.com/labring/FastGPT/issues/3178)

> 来源: [原讨论中的补充回复](https://github.com/labring/FastGPT/issues/3178#issuecomment-2487626407)

> 来源: [FastGPT 工具调用与终止](https://doc.fastgpt.io/en/guide/build/workflow/nodes/tool)
