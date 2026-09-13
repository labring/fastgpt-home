---
title: FastGPT 动态业务列表接入用户选择的历史需求
slug: /zh/troubleshoot/fastgpt-user-select-external-datasource
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5049
source_type: GitHub issue
---

# FastGPT 动态业务列表接入用户选择的历史需求

## 适用场景与历史记录

原议题希望从 HTTP 或数据库取得用户订单，将列表动态交给用户选择组件。 原始讨论提交于 2025-06-17，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

节点定义使用预设选项与分支，原线程缺少外部数组直连的完成确认。动态选项呈现、选择值回传和权限检查应分别验收。

## 排查与复测

1. 准备包含订单 ID 和展示名称的最小返回列表。
2. 检查所用版本的用户选择或表单组件可接受的选项输入结构。
3. 通过受控业务接口校验选中订单的归属，核对会话继续运行时的选择值。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：用户选择 组件是否可以支持外部数据源](https://github.com/labring/FastGPT/issues/5049)

> 来源: [FastGPT 用户选择节点选项定义](https://github.com/labring/FastGPT/blob/main/packages/global/core/workflow/template/system/interactive/userSelect.ts)

> 来源: [FastGPT 用户选择节点](https://doc.fastgpt.io/en/guide/build/workflow/nodes/user-selection)

> 来源: [FastGPT 表单输入](https://doc.fastgpt.io/en/guide/build/workflow/nodes/form_input)
