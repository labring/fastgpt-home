---
title: 解决FastGPT知识库回答无法关联原始源文档的问题
slug: /zh/troubleshoot/fastgpt-knowledge-source-link
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/32
source_type: GitHub issue
---

# 解决FastGPT知识库回答无法关联原始源文档的问题

## 现象
使用FastGPT知识库生成回答时，若回答不准确或不全面，无法跳转至原始源文档查看完整信息。当前知识库的提示词未与信息源建立关联。

## 可能原因
1. 现有知识库实现未将生成的回答内容与原始信息源建立关联；
2. 本地文件直接上传至知识库的场景下，未存储原始文件，无法实现溯源；
3. FastGPT知识库模块近期将进行架构调整，调整后模块将独立于模型，由模型选择知识库，当前关联功能受此架构变化影响。

## 排查步骤
1. 查看知识库生成的回答内容，确认是否包含原始源文档的标识信息；
2. 核对导入知识库的原始文件是否完整；
3. 确认当前FastGPT知识库模块的运行状态。

## 解决与验证
当前FastGPT知识库模块暂未实现回答与原始源文档的关联功能。本地文件上传场景下，因未存储原始文件，无法直接溯源。如需实现该关联功能，需关注知识库模块的架构调整进度。如需参与该功能的开发，可加入官方开发者交流渠道。

> 来源: [FastGPT GitHub issue #32](https://github.com/labring/FastGPT/issues/32)
