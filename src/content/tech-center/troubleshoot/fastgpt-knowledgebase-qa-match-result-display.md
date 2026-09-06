---
title: 在FastGPT中实现知识库问答匹配结果展示与点击查看功能
slug: /zh/troubleshoot/fastgpt-knowledgebase-qa-match-result-display
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/360
source_type: GitHub issue
---

# 在FastGPT中实现知识库问答匹配结果展示与点击查看功能

## 现象
用户期望在FastGPT知识库问答流程中，大模型回答完成后，在页面下方展示向量匹配得到的top3问题，点击这些问题可直接展示对应的答案，以避免重复调用大模型并降低幻觉风险，但当前版本未提供该内置功能模块。

## 可能原因
现有FastGPT版本未内置该展示与交互模块，需通过自定义编排流程或后续插件形式实现该功能。

## 排查步骤
1. 确认已将FastGPT升级至最新版本。
2. 进入知识库问答的编排配置页面，梳理现有流程的节点构成。
3. 确认是否需要新增自定义处理模块，适配匹配结果的展示与交互需求。

## 解决与验证
可通过定制客服编排流程实现该功能。维护问答知识库与文档知识库，每次对话时先对问答知识库进行检索，选取相关性0.93以上的内容进行输出。使用HTTP模块对搜索到的数据进行处理，即可在大模型回答后展示匹配到的问答对。点击匹配问题可直接展示对应答案，避免重复调用大模型并降低幻觉风险。未来该功能将以插件形式引入，无需改造现有知识库搜索模块。

> 来源: [FastGPT GitHub issue #360](https://github.com/labring/FastGPT/issues/360)
