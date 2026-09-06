---
title: 解决FastGPT上传docx后分段留存内容数量异常的问题
slug: /zh/troubleshoot/fastgpt-docx-segment-content-mismatch
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/600
source_type: GitHub issue
---

# 解决FastGPT上传docx后分段留存内容数量异常的问题

## 现象
上传docx格式文件时，文件内包含40条内容，经FastGPT直接分段处理后，仅留存21条内容。

## 可能原因
直接分段的处理逻辑未匹配用户定义的“40条内容”拆分标准，且该逻辑本身不关注文件内的内容条目数量。需按实际环境确认是否存在其他未提及的影响因素。

## 排查步骤
1. 明确文件内“40条内容”的具体定义，例如是否为自然段落、句子、自定义分隔符分隔的条目等。
2. 对比上传文件的原始内容与FastGPT分段后的结果，记录实际留存的内容条目数量与具体内容。
3. 需按实际环境确认是否存在其他未提及的配置或处理环节对分段结果造成影响。

## 解决与验证
首先明确文件内内容条目的具体划分规则，例如按段落、自定义分隔符等。按照该规则调整FastGPT的分段处理逻辑（需按实际环境确认对应配置项），重新上传目标docx文件，验证分段后留存的内容数量是否匹配预期。

> 来源: [FastGPT GitHub issue #600](https://github.com/labring/FastGPT/issues/600)
