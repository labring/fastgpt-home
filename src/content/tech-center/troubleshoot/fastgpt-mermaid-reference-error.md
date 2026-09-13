---
title: 解决FastGPT直接回复节点内Mermaid图表引用报错问题
slug: /zh/troubleshoot/fastgpt-mermaid-reference-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5101
source_type: GitHub issue
---

# 解决FastGPT直接回复节点内Mermaid图表引用报错问题

## 现象
在FastGPT 4.9.5私有部署版本中，用户在直接回复节点内写入包含空```mermaid```代码块与脚注引用的内容后，发布测试工作流，点击节点内的引用序号时，网页下方出现Mermaid报错。

## 可能原因
该问题的可能原因与直接回复节点内的空Mermaid代码块和脚注引用的交互逻辑冲突有关，具体触发细节需按实际部署环境确认。

## 排查步骤
1. 确认当前使用的FastGPT版本为4.9.5私有部署版本。
2. 打开目标工作流的直接回复节点，检查内容是否包含空```mermaid```代码块和标准格式的脚注引用。
3. 按照复现流程操作：创建工作流、添加该节点、发布并测试，点击节点内的引用序号，观察是否出现Mermaid报错。
4. 临时删除节点内的```mermaid```代码块，重新发布工作流并测试，确认报错是否消失。

## 解决与验证
解决方法分为两种场景：
1. 若无需在节点内使用Mermaid图表，直接移除空```mermaid```代码块即可。
2. 若需保留Mermaid代码块，需补充完整的Mermaid图表语法，避免使用空代码块。
验证步骤：修改节点内容后，重新发布工作流，点击节点内的引用序号，确认不再出现Mermaid报错。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/5101)
