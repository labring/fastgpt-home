---
title: 解决FastGPT中Prompt包含转义字符导致的异常转义问题
slug: /zh/troubleshoot/fastgpt-prompt-escaping-issue
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/769
source_type: GitHub issue
---

# 解决FastGPT中Prompt包含转义字符导致的异常转义问题

## 现象
当Prompt包含LaTex字符或含转义符的文本（如\n\、\nabla等）时，会出现异常转义问题。在生成QA的场景下，数据集中的\n等转义符会被错误转为换行，导致LaTex渲染异常。该问题存在场景不确定性，部分场景表现正常，部分场景异常。

## 可能原因
原代码为解决CSV文件中的换行符问题，添加了正则判断逻辑`/\n\W/g`，但未考虑到实际业务中存在包含转义符的文本（如LaTex内容），导致这类转义符被错误处理。

## 排查步骤
1. 验证业务场景是否包含LaTex字符或含转义符的文本，观察异常表现是否为转义符被错误处理。
2. 定位到文本处理的正则逻辑相关代码，确认是否存在针对换行符的全局替换规则。
3. 对比正常与异常场景的输入文本差异，确认异常触发条件。

## 解决与验证
将原有的正则处理逻辑替换为使用`.replace(/\n\W/g, '\n ')`，该修改可同时修复对话页面的LaTex渲染问题。修改完成后，重新生成包含LaTex字符的QA，检查转义符是否正常保留，不再被错误转为换行或其他异常格式。需注意验证修改后不影响原有CSV文件的换行符处理逻辑。

> 来源: [FastGPT GitHub issue #769](https://github.com/labring/FastGPT/issues/769)
