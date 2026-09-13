---
title: 配置FastGPT实现所有AI回复显示自定义引用来源
slug: /zh/troubleshoot/fastgpt-custom-citation-support
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1446
source_type: GitHub issue
---

# 配置FastGPT实现所有AI回复显示自定义引用来源

## 现象
目前仅在配置知识库问答的场景下，AI生成的回复才会显示引用来源。无法为其他类型的AI回复（如HTTP搜索类）添加自定义的引用来源，导致非知识库类的AI回复无法溯源，无法满足信任性要求。

## 可能原因
当前的引用生成逻辑仅绑定知识库节点的返回结果，未支持自定义输入文本类的回复场景，因此仅知识库问答生成的回复会附带引用来源。

## 排查步骤
1. 确认当前使用的FastGPT版本为最新版，已完成例行检查
2. 检查AI应用的节点配置，确认是否仅包含知识库问答节点
3. 验证非知识库节点生成的AI回复是否未显示引用来源

## 解决与验证
当前暂不支持为自定义输入文本类的AI回复配置引用来源。引用生成逻辑仅基于知识库节点的结果生成。后续计划将引用生成逻辑调整为按数据结构检测，以支持更多场景的引用显示。验证方式为：在非知识库问答的场景下观察AI回复是否显示引用来源，待功能更新后可按新逻辑完成配置。

> 来源: [FastGPT GitHub issue #1446](https://github.com/labring/FastGPT/issues/1446)
