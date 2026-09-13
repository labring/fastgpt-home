---
title: 解决FastGPT中知识库检索结果无法作为非AI对话工具输出的问题
slug: /zh/troubleshoot/fastgpt-non-ai-knowledge-tool-output
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1921
source_type: GitHub issue
---

# 解决FastGPT中知识库检索结果无法作为非AI对话工具输出的问题

## 现象
在FastGPT插件构建流程中，存在需要将知识库检索结果作为输入的场景。当前知识库检索功能仅适配AI对话场景，其他组件无法直接获取该检索结果作为输入内容。

## 可能原因
知识库检索结果的接收逻辑仅支持AI对话场景。部分组件因自身运行逻辑不依赖知识库，无法直接调用该检索结果作为输入参数。

## 排查步骤
1. 确认需要调用知识库检索结果的目标组件类型。
2. 检查目标组件是否支持配置数据类型为知识库引用。
3. 核对组件是否属于自定义输入、http组件或代码运行组件的范畴。

## 解决与验证
1. 选择自定义输入、http组件或代码运行组件作为目标组件。
2. 在组件的配置界面中，将数据类型设置为知识库引用。
3. 配置知识库检索的相关参数，触发检索操作以获取目标结果。
4. 运行组件，验证是否成功获取并使用知识库检索结果作为组件输入。

> 来源: [FastGPT GitHub issue #1921](https://github.com/labring/FastGPT/issues/1921)
