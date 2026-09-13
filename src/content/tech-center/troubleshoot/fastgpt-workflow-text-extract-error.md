---
title: 解决FastGPT工作流中文本内容提取结果不正确问题
slug: /zh/troubleshoot/fastgpt-workflow-text-extract-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4428
source_type: GitHub issue
---

# 解决FastGPT工作流中文本内容提取结果不正确问题

## 现象
在FastGPT工作流中添加文档解析UI、文本内容提取、AI对话节点后，使用包含表格与文字的Word文件时，文本内容提取节点返回的结果不正确，无法满足检查Word内所有内容填写完整性的业务需求。

## 可能原因
1. 工作流内置的文本内容提取节点无法正确解析Word文件中的表格等复杂格式内容；
2. 该类需要完整提取多类型内容并进行AI校验的需求，本质上不适合通过FastGPT工作流实现。

## 排查步骤
1. 确认待处理的Word文件包含的内容类型，是否存在表格、特殊排版等格式元素；
2. 检查文本内容提取节点的配置参数，确认设置符合当前业务需求，需按实际环境确认；
3. 跳过文本内容提取节点，直接使用AI对话节点处理原始Word文件，观察AI的分析结果。

## 解决与验证
可采用两种方式处理。方式一：调整工作流逻辑，移除文本内容提取节点，直接使用AI对话节点处理Word文件，由AI直接分析文件内的表格与文字内容。方式二：若必须通过工作流完成流程串联，需自行编写代码实现Word文件的内容提取，将提取后的完整文本接入工作流后续的AI对话节点。验证时，使用包含表格和文字的Word文件进行测试，确认分析或提取结果符合业务需求。

> 来源: [FastGPT GitHub issue #4428](https://github.com/labring/FastGPT/issues/4428)
