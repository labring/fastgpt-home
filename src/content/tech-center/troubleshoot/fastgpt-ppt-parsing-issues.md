---
title: 解决FastGPT中PPT解析图片保存与文本顺序异常问题
slug: /zh/troubleshoot/fastgpt-ppt-parsing-issues
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1525
source_type: GitHub issue
---

# 解决FastGPT中PPT解析图片保存与文本顺序异常问题

## 现象
使用FastGPT处理PPT格式文件时，出现两类解析异常：其一，PPT内嵌的图片无法按照类似Word转MD的流程完成保存；其二，对PPT进行纯文本解析后，输出的文本内容顺序与原PPT中的实际顺序不符。

## 可能原因
当前存在的异常与Node.js的文档解析能力不足直接相关，同时readfile相关逻辑未拆分优化，也会进一步加剧解析过程中的异常情况，导致图片保存失败与文本顺序错乱。

## 排查步骤
1. 确认FastGPT中readfile相关的逻辑是否已完成拆分优化
2. 检查当前运行环境的Node.js文档解析能力是否适配需求
3. 需按实际环境确认目标PPT文件的格式是否符合常规解析规范

## 解决与验证
等待readfile相关逻辑拆分优化后，可有效缓解当前的解析异常问题。完成优化后，重新对目标PPT文件进行解析，验证图片是否可正常保存，同时确认解析得到的文本内容顺序是否与原文件一致。

> 来源: [FastGPT GitHub issue #1525](https://github.com/labring/FastGPT/issues/1525)
