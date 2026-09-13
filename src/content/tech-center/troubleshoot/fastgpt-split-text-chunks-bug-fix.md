---
title: 修复FastGPT中splitText2Chunks的分段异常问题
slug: /zh/troubleshoot/fastgpt-split-text-chunks-bug-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/515
source_type: GitHub issue
---

# 修复FastGPT中splitText2Chunks的分段异常问题

## 现象
使用FastGPT的splitText2Chunks函数处理文本时，可能出现三类异常：递归分段时无重叠长度、返回结果末尾存在过小分段且无法合并到后续分段、特定分段结构下文本顺序被打乱。当输入文本被拆分为小片段、正常长度片段组合、小片段的结构时，异常表现更突出。

## 可能原因
该问题源于splitTextRecursively函数的实现缺陷，包含三个具体问题：一是递归调用时未传递重叠长度参数，二是递归返回的末尾过小分段无法合并到下一个分段，三是特定分段组合下文本顺序被重新排列。相关代码位于packages/global/common/string/textSplitter.ts文件中。

## 排查步骤
1. 检查调用splitText2Chunks函数时的入参配置，确认分段重叠长度参数是否按需求正确传递
2. 梳理待处理文本的分段结构，判断是否包含小片段、正常长度片段组合、小片段的组合形式
3. 查看textSplitter.ts文件中的splitTextRecursively递归调用逻辑，确认是否存在参数遗漏或合并逻辑缺陷

## 解决与验证
可通过修复splitTextRecursively的递归调用逻辑，补充重叠长度参数传递，调整末尾小分段的合并规则，修复文本重排问题。验证时，构造包含小片段和正常长度片段的测试文本，调用splitText2Chunks函数，检查返回的分段是否无重叠缺失、末尾分段大小符合预期、文本顺序未被打乱。若出现异常，需按实际环境确认配置与代码版本。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/515)
