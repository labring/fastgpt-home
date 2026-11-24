---
title: 使用FastGPT并行执行节点实现文本数组并行翻译
slug: /zh/reference/fastgpt-parallel-translate-text-array
page_type: 技术速查
source: https://doc.fastgpt.cn/guide/build/workflow/nodes/parallel_run
source_type: 官方文档小节
---

# 使用FastGPT并行执行节点实现文本数组并行翻译

## 结论
通过FastGPT的并行执行节点，可以批量并行处理文本数组的翻译任务，自动管理并发数量与失败重试，最终输出标准化的翻译结果数组。

## 具体怎么做
1. 构造测试输入数组：使用【代码运行】节点，代码如下：
```js
function main (){
const texts = [
"这是第一段文本" ,
"这是第二段文本" ,
"这是第三段文本"
];
return { textArray: texts };
}
```
2. 配置并行执行节点：
   - 数组输入：选择上一步【代码运行】节点的输出变量`textArray`
   - 最大并发数：保持默认值5
   - 单轮报错重试次数：保持默认值3
3. 配置并行节点内的执行逻辑：添加【AI对话】节点，引用「开始」节点的输入作为待翻译文本，设置prompt为`请将下面这段文本翻译成英文：{当前数组项}`，关闭「返回 AI 内容」选项，避免多个任务的输出交错。
4. 配置节点输出：「结束」节点选择输出变量为AI对话的回复内容。

## 注意事项
1. 下游流程可直接引用「成功结果」获取翻译后的字符串数组
2. 如需核对每一项的执行状态，可引用「完整结果」查看每项的执行情况与结果
3. 可通过「完成状态」快速判断是否需要执行兜底逻辑，例如全部失败时发送告警
4. 任一翻译任务失败会自动重试，重试仍失败的项会在「完整结果」中标记为失败
5. 并行节点会在所有任务完成后一次性输出「成功结果」「完整结果」「完成状态」

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/guide/build/workflow/nodes/parallel_run)
