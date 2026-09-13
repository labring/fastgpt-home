---
title: FastGPT 知识库空结果分支配置与终止验证
slug: /zh/troubleshoot/fastgpt-knowledgebase-match-terminate
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/655
source_type: GitHub issue
---

# FastGPT 知识库空结果分支配置与终止验证

知识库搜索返回空数组时，工作流仍可继续执行。可用判断器检查引用数量，将空结果接到指定回复分支，并在该分支结束本轮流程，避免继续生成缺少依据的回答。

## 原因与适用范围

[Issue #655](https://github.com/labring/FastGPT/issues/655) 记录了检索无结果时结束对话的需求。当前[知识库搜索节点文档](https://doc.fastgpt.cn/zh-CN/guide/build/workflow/nodes/dataset_search) 明确说明引用输出为数组，长度为零时输出链路仍会执行。以下步骤适用于具有知识库搜索、判断器和指定回复节点的工作流。

## 配置步骤

1. 在知识库搜索后连接“判断器”，选择该搜索节点的“引用内容”，判断数组长度是否等于 `0`。官方[判断器文档](https://doc.fastgpt.cn/zh-CN/guide/build/workflow/nodes/tfswitch) 给出了这一条件的示例。
2. 将空结果的 IF 分支接到“指定回复”，填写适合业务的提示，例如“知识库中暂未找到相关资料，请补充问题或联系人工”，并让该分支在此结束。
3. 将有结果的 ELSE 分支接到 AI 对话，传入知识库引用；检查连线，确保空结果分支只执行预期的兜底回复。
4. 若流程位于工具调用内部，可按[工具调用终止文档](https://doc.fastgpt.cn/zh-CN/guide/build/workflow/nodes/tool) 在对应工具流程末尾使用终止节点，结束本次工具调用及后续 AI 总结。

## 验证结果

准备一条明确命中的问题和一条明确无关的问题，查看运行详情中的引用数组及分支执行记录。有结果时应执行知识库问答，空结果时应只返回兜底提示；检索请求报错另按错误响应排查。结束本轮流程后，用户仍可发起下一轮提问。
