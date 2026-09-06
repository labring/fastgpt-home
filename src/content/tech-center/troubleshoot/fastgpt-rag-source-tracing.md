---
title: 为FastGPT的RAG问答实现回答来源文档位置溯源功能
slug: /zh/troubleshoot/fastgpt-rag-source-tracing
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4094
source_type: GitHub issue
---

# 为FastGPT的RAG问答实现回答来源文档位置溯源功能

## 现象
在使用FastGPT进行RAG问答时，用户无法直接知晓AI生成的回答内容具体来源于哪个文档的什么位置，难以确认回答信息的原始出处。

## 可能原因
FastGPT原生版本未内置RAG回答来源的文档位置溯源功能，无法将AI生成的回答内容与上传的文档段落进行关联展示。

## 排查步骤
1. 确认当前FastGPT版本是否已内置RAG回答溯源功能，若未内置则需进行自定义开发适配。
2. 梳理需要支持的文档类型与跳转逻辑，明确点击来源标签后需触发的文档打开与跳转动作。
3. 按照既定实现思路完成代码修改与本地调试，验证功能逻辑是否符合需求。

## 解决与验证
可参考以下步骤实现该功能：1. 编写约束性提示词，要求AI在返回回答内容时附带文档来源的标签信息；2. 在前端Markdown组件中添加元素点击事件，用于捕获来源标签携带的参数信息；3. 实现点击事件的响应逻辑，根据传入的参数打开对应文档并跳转到高亮的引用段落。验证时，点击回答内容后的来源标签，可正确打开对应文档并跳转到引用的具体段落，同时高亮显示引用内容。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/4094)
