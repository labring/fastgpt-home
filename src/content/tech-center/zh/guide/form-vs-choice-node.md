---
title: FastGPT 决策矩阵：表单输入节点与选择节点怎么分工
slug: /zh/guide/form-vs-choice-node
page_type: 聚合导航页
source: https://github.com/labring/FastGPT/blob/v4.17.2/document/content/guide/build/workflow/nodes/form_input.mdx
source_type: 官方文档
meta_title: FastGPT表单输入节点与选择节点分工
meta_description: 基于FastGPT v4.17.2官方文档，说明表单输入节点与选择节点在收集材料字段、明确意图上的分工，并给出两者串联的顺序建议与核对要点。
keywords:
schema_type: TechArticle
date_published: 2026-11-03
date_modified: 2026-11-03
---

# FastGPT 决策矩阵：表单输入节点与选择节点怎么分工

在 FastGPT 工作流里，表单输入节点负责收集用户填写的材料字段，输出 formInputResult；用户选择节点负责把预设选项呈现给用户，等用户选定后输出 selectResult 并按选项进入分支；按条件自动判断走向的是判断器节点，三者职责不同。串联时先收集材料字段，再让用户选择，条件分支交给判断器。

## 表单输入节点与选择节点的职责边界

表单输入节点收集结构化材料。用户填写并提交后，后续节点从 formInputResult 对象中读取字段。用户选择节点呈现预设选项，等待用户做出选择，再输出 selectResult 并沿对应分支继续。两个节点都属于交互节点。

按已收集字段自动判断条件时，使用判断器节点。例如，表单先收集办理事项与日期，判断器按实际字段比较；需要用户确认办理意向时，再放置用户选择节点。这样可以把材料收集、用户决定和自动比较三类动作分别配置，并在运行记录中追溯各自输入。

## 三列比较表：两种节点的适用条件与核对点

| 方案 | 适用条件 | 需要核对的点 |
| --- | --- | --- |
| 表单输入节点 | 收集用户填写的材料字段 | 字段名、必填设置、formInputResult中的实际提交值 |
| 用户选择节点 | 需要用户在预设选项中做决定 | 选项值、分支连线、selectResult与所选选项的对应 |
| 判断器节点 | 按已有字段自动比较并分流 | 输入变量、值类型、比较条件与实际走向 |
| 先表单再用户选择 | 收集材料后仍需用户确认意向 | 两次交互是否完成，下游是否分别收到表单对象与选项值 |
| 先选择再分支表单 | 根据用户所选事项收集不同材料 | 各分支表单及引用来源是否对应，汇合后是否取对节点 |

## 两者串联的顺序与核对建议

串联顺序由业务交互决定。需要先了解情况再确认意向时，先收集表单，再呈现用户选项；事项已经可以由用户直接选定时，先做选择，再进入对应分支收集材料。条件判断按已有数据执行，可以放在需要自动比较的位置。

试跑时分别记录表单提交值、用户选项和各节点下游输入。表单内容从 formInputResult 读取，用户所选值从 selectResult 读取；条件判断器按实际输入和值类型检查。遇到走向异常，先区分是选项连线、变量引用，还是自动比较条件的问题，再处理对应节点。

进一步阅读：[表单输入节点](https://fastgpt.cn/node/fastgpt-workflow-form-input)、[用户选择节点](https://fastgpt.cn/node/fastgpt-user-selection-node)。

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/guide/build/workflow/nodes/form_input.mdx)
- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/guide/build/workflow/nodes/user-selection.mdx)
