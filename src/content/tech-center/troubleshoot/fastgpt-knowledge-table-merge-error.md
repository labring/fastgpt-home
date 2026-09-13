---
title: 解决FastGPT知识库中带合并单元格的表格识别异常问题
slug: /zh/troubleshoot/fastgpt-knowledge-table-merge-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2750
source_type: GitHub issue
---

# 解决FastGPT知识库中带合并单元格的表格识别异常问题

## 现象
知识库中包含合并行、合并列（即rowspan、colspan属性）的表格，导入后内容出现错乱，或大模型无法正确理解该类表格的结构与内容。

## 可能原因
原始文档中的表格带有rowspan、colspan合并单元格属性，未经过正确格式转换就导入知识库，导致大模型无法识别表格的合并结构，进而出现内容异常。

## 排查步骤
1. 确认原始文档内的表格是否包含合并行或合并列的单元格。
2. 检查导入知识库的文件是否保留了表格的原始HTML结构标签。
3. 验证大模型是否能正确识别转换后的表格内容。

## 解决与验证
1. 将带合并单元格的表格转换为包含rowspan、colspan属性的HTML表格格式，可通过自定义逻辑或html2text库完成转换。
2. 若原始文件为HTML格式，需去除无关的CSS、JS标记，仅保留表格相关的HTML结构后上传至知识库。
3. 在知识库导入完成后，与大模型交互时，在提示词中明确要求不修改HTML标签，即可正确识别合并单元格的表格内容。
4. 若原始文件为Word格式，需先完成表格的HTML转换，再按上述步骤上传验证。

> 来源: [FastGPT GitHub issue #2750](https://github.com/labring/FastGPT/issues/2750)
