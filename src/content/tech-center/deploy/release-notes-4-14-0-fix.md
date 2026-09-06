---
title: FastGPT v4.14.0-fix版本升级内容与验证说明
slug: /zh/deploy/release-notes-4-14-0-fix
page_type: 版本解读
source: https://github.com/labring/FastGPT/releases/tag/v4.14.0-fix
source_type: 官方文档
---

# FastGPT v4.14.0-fix版本升级内容与验证说明

## 这个版本改了什么
本次v4.14.0-fix版本包含1项优化与4项bug修复。优化内容为同一轮对话中，MCP Client会持久化实例，不会销毁。修复的bug包括：Debug模式下交互节点无法正常使用；富文本编辑器tab空格未对齐；嵌套运行Agent时，跳过节点队列未初始化导致无法正常运行；判断器右侧为number引用时会出现报错。本次版本还包含多份代码提交与文档更新，涵盖部署文档调整、升级文档编辑、trim检查修复等内容。

## 升级前要确认的事
升级前需确认当前运行的FastGPT版本为v4.14.0。

## 升级步骤（照做）
升级步骤遵循FastGPT官方标准流程，可参考本次更新的升级文档完成操作。

## 升级后怎么验证
升级后可通过以下场景验证功能正常：1. 发起多轮对话，确认MCP Client实例未被销毁；2. 开启Debug模式，测试交互节点的交互功能；3. 在富文本编辑器中使用tab键，确认空格对齐正常；4. 配置嵌套运行Agent的流程，测试跳过节点是否正常运行；5. 创建判断器并引用number类型变量，确认无报错出现。

> 来源: [FastGPT release notes](https://github.com/labring/FastGPT/releases/tag/v4.14.0-fix)
