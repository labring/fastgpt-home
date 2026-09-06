---
title: 解决FastGPT中qwen-vl-max调用报错与菜单按钮隐藏问题
slug: /zh/glossary/fastgpt-qwen-url-error-menu-hide
page_type: 术语速查
source: https://github.com/labring/FastGPT/issues/4536
source_type: GitHub issue
---

# 解决FastGPT中qwen-vl-max调用报错与菜单按钮隐藏问题

## 一句话定义
本页说明FastGPT中qwen-vl-max调用报错的排查方法，以及聊天窗口功能菜单按钮的隐藏操作要求。

## 在FastGPT里怎么用
针对qwen-vl-max调用报错：在4.8.22版本的docker部署环境中，调用qwen-vl-max时若出现`url error, please check url！ (request id: 2025041411401766447340301436313)`报错，需检查调用URL的有效性，同系列的qwen-plus模型可正常调用。针对聊天窗口菜单按钮：可通过配置禁用或隐藏聊天窗口内的功能菜单按钮，该操作的必要性在于按钮功能会与网站智能客服对话功能产生冲突。

## 容易搞错的地方
一是qwen-vl-max的调用报错仅在4.8.22的docker版本中被记录，其他版本的类似报错需结合实际部署环境排查，不可直接套用该场景的解决方法；二是菜单按钮的隐藏需匹配具体使用场景，避免因误操作导致核心功能无法正常使用，且该操作仅针对聊天窗口内的功能菜单按钮，不涉及其他界面元素。

> 来源: [FastGPT GitHub issue #4536](https://github.com/labring/FastGPT/issues/4536)
> 来源: [FastGPT GitHub issue #5731](https://github.com/labring/FastGPT/issues/5731)
