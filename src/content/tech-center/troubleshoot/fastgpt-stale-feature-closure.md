---
title: FastGPT 用户选择接收 HTTP 数组的历史需求
slug: /zh/troubleshoot/fastgpt-stale-feature-closure
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5164
source_type: GitHub issue
---

# FastGPT 用户选择接收 HTTP 数组的历史需求

## 适用场景与历史记录

原议题希望把 HTTP 返回数据经脚本转换成数组，作为用户选择节点的选项。 原始讨论提交于 2025-07-07，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

用户选择节点定义使用预设选项及对应分支。外部数组动态扩展选项、选项文本填充和固定分支能力需要分别验证。

## 排查与复测

1. 保留一份最小 HTTP 返回示例，定义选项的稳定 ID 与展示文本。
2. 检查所用版本的用户选择输入是否接受动态数组，并记录实际界面行为。
3. 为动态业务列表设计选择结果的服务端校验，以选项 ID 验证用户只能访问授权数据。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：用户选择 组件是否可以支持通过http返回的数据可以通过脚本返回数组，配置到用户选择的选项卡里](https://github.com/labring/FastGPT/issues/5164)

> 来源: [FastGPT 用户选择节点选项定义](https://github.com/labring/FastGPT/blob/main/packages/global/core/workflow/template/system/interactive/userSelect.ts)

> 来源: [FastGPT 用户选择节点](https://doc.fastgpt.io/en/guide/build/workflow/nodes/user-selection)
