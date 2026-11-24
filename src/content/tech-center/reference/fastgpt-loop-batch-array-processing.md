---
title: FastGPT工作流循环节点批量处理数组的操作方法
slug: /zh/reference/fastgpt-loop-batch-array-processing
page_type: 技术速查
source: https://doc.fastgpt.cn/guide/build/workflow/nodes/loop
source_type: 官方文档小节
---

# FastGPT工作流循环节点批量处理数组的操作方法

## 结论
使用FastGPT工作流的循环节点，可以实现数组元素的批量AI处理。该场景是批量运行节点的典型应用，可快速完成多文本的统一处理任务。

## 具体怎么做
1. 准备输入数组：使用【代码运行】节点生成测试数组，代码为：
```javascript
const texts = [
  "这是第一段文本",
  "这是第二段文本",
  "这是第三段文本"
];
return { textArray: texts };
```
2. 配置批量运行节点：
   - 数组输入：选择上一步代码运行节点的输出变量`textArray`
   - 循环体内添加【AI 对话】节点，设置prompt为「请将这段文本翻译成英文」
   - 添加【指定回复】节点，用于输出翻译后的文本
   - 循环体结束节点选择输出变量为AI回复内容
3. 运行流程：依次执行代码节点生成测试数组，批量节点遍历处理每个元素，收集所有处理结果后输出最终数组。

## 注意事项
1. 代码运行节点需正确返回格式为数组的`textArray`变量，确保数据格式符合要求
2. 循环体结束节点需准确选择AI对话节点的回复内容作为输出变量，否则无法正确汇总处理结果
3. 批量运行节点的数组输入需关联正确的上游节点输出变量，避免选错数据源

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/guide/build/workflow/nodes/loop)
