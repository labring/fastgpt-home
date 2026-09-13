---
title: 修复FastGPT工作流编辑页Ctrl+Z误撤销节点操作问题
slug: /zh/troubleshoot/fastgpt-workflow-ctrlz-misbehavior
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2787
source_type: GitHub issue
---

# 修复FastGPT工作流编辑页Ctrl+Z误撤销节点操作问题

## 现象
在FastGPT 4.8.10私有部署版本的工作流编辑页面，当在"运行预览"的输入框内完成文字编辑后，按下Ctrl+Z快捷键，预期会撤销当前输入框内的文字修改，但实际效果为撤销了最近一次的节点操作，不符合用户使用直觉。

## 可能原因
需按实际环境确认，暂未明确该问题的具体技术根因。

## 排查步骤
1. 进入FastGPT私有部署版本4.8.10的工作流编辑页面。
2. 对任意节点进行编辑操作，例如修改prompt内容。
3. 切换至"运行预览"界面，在输入框内输入文字内容。
4. 保持输入框处于激活状态，按下Ctrl+Z快捷键。
5. 观察页面变化，确认是否出现输入框内容未被撤销，反而撤销了节点操作的情况。

## 解决与验证
目前该问题暂无官方内置修复方案，临时规避方式为：在按下Ctrl+Z快捷键前，先点击页面空白处取消输入框焦点，再按下快捷键即可触发输入框内的文本撤销操作。验证该规避方式时，在运行预览输入框内完成文字编辑后，取消输入框焦点并按下Ctrl+Z，可正常撤销输入框内的文字修改，且不会影响节点操作。待官方发布对应修复版本后，可恢复正常的快捷键行为。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/2787)
