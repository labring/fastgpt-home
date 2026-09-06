---
title: FastGPT 工具调用嵌套的历史需求与子工作流验证
slug: /zh/troubleshoot/fastgpt-tool-call-direct-mount
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2922
source_type: GitHub issue
---

# FastGPT 工具调用嵌套的历史需求与子工作流验证

## 适用场景与历史记录

原议题希望将工具调用节点直接作为另一个工具使用，减少先封装应用再挂载的步骤。 原始讨论提交于 2024-10-15，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

原文已经描述了封装应用后挂载的替代路径。直接嵌套节点与通过子工作流封装的边界应按版本测试。

## 排查与复测

1. 导出需要复用的最小工具流程，并明确输入输出。
2. 按该版本支持的子工作流或应用工具方式封装，核对文件与变量显式传递。
3. 测试一次和多层调用时的工具结果、异常与终止行为，再记录直接嵌套的具体需求。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：希望“工具调用”也可以作为工具被调用](https://github.com/labring/FastGPT/issues/2922)

> 来源: [FastGPT 工具调用与终止](https://doc.fastgpt.io/en/guide/build/workflow/nodes/tool)

> 来源: [FastGPT 文件输入与 4.8.13 行为说明](https://doc.fastgpt.io/en/guide/build/general/fileInput)
