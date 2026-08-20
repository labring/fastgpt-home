---
title: FastGPT工作流问题分类节点的配置与使用方法
slug: /zh/node/fastgpt-workflow-question-classify
page_type: 工作流节点
source: https://doc.fastgpt.cn/zh-CN/guide/build/workflow/nodes/question_classify
source_type: 官方文档
---

# FastGPT工作流问题分类节点的配置与使用方法

# 节点概述
FastGPT工作流的问题分类节点支持重复添加，接收外部输入，需手动配置，通过触发function_call模块实现分类逻辑。该节点可对用户问题进行分类并执行对应操作，在场景模糊时分类效果可能有限。

# 参数说明
该节点包含以下核心配置参数：
1.  **系统提示词**：放置在对话最前方，用于明确分类定义。例如可补充说明各类分类的范围，如为计费常见问题定义具体包含的场景：计费常见问题包括套餐价格、余额、积分消耗、续费、发票、退款等问题；当用户询问为什么扣费、如何充值、如何查看账单时，应归类为计费常见问题；当用户只是在询问产品功能或打招呼时，不应归类为计费常见问题。
2.  **聊天记录**：可选配置，可引入上下文辅助分类，提升分类准确性。
3.  **用户问题**：必填参数，对应用户输入的原始内容。
4.  **分类内容**：需手动配置需要划分的分类项，节点会基于配置自动生成对应的function调用参数。配置后，节点会生成符合规范的function定义，最终返回枚举值中的一项。

# 快速配置示例
1.  在工作流中添加问题分类节点，绑定用户输入的内容作为用户问题参数。
2.  配置系统提示词，例如填入上述计费常见问题的定义内容。
3.  配置分类内容为`打招呼`、`计费常见问题`、`其他问题`，此时节点会生成如下function调用参数：
```javascript
const agentFunction = {
  name: agentFunName,
  description: "判断用户问题的类型属于哪方面，返回对应的枚举字段",
  parameters: {
    type: "object",
    properties: {
      type: {
        type: "string",
        description: `打招呼，返回: abc；计费常见问题，返回：vvv；其他问题，返回：aaa`,
        enum: ["abc", "vvv", "aaa"]
      }
    },
    required: ["type"]
  }
};
```
4.  节点执行后将返回abc、vvv、aaa中的一个枚举值，可基于该返回值配置后续不同的工作流分支，实现分类后的差异化操作。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/guide/build/workflow/nodes/question_classify)
