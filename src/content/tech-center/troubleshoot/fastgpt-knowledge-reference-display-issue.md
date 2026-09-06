---
title: 解决FastGPT知识库引用内容显示异常的问题
slug: /zh/troubleshoot/fastgpt-knowledge-reference-display-issue
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4855
source_type: GitHub issue
---

# 解决FastGPT知识库引用内容显示异常的问题

## 现象
在FastGPT 4.9.7-fix版本中，将知识库召回的信息通过脚本处理后仅保留指定数据集分片内容，将处理后的信息放入AI的system或user提示词。例如，知识库召回3.xls和333___doc.docx两个数据集，脚本处理后仅保留3.xls的数据集分片内容。AI回复内容仅包含3.xls的内容，但回复下方的引用区域仍显示333___doc.docx及其完整内容。

## 可能原因
当前界面可能为debug调试模式，或未配置过滤未处理知识库内容的展示选项，导致未被脚本保留的知识库引用内容被直接展示。

## 排查步骤
1.  确认当前使用的界面是否为debug调试界面。
2.  查找界面中控制知识库引用内容展示的相关配置项。

## 解决与验证
若当前处于debug调试界面，关闭debug模式的相关展示选项；或在分享时关闭显示未处理知识库引用内容的选项。验证时，处理后的知识库内容可被正确保留，且回复下方的引用区域仅显示脚本保留的数据集内容，未被保留的数据集不再出现在引用区域中。

> 来源: [FastGPT GitHub issue #4855](https://github.com/labring/FastGPT/issues/4855)
