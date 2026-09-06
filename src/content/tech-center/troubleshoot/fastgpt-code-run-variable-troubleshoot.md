---
title: 解决FastGPT代码运行节点无法引用传入变量的问题
slug: /zh/troubleshoot/fastgpt-code-run-variable-troubleshoot
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3084
source_type: GitHub issue
---

# 解决FastGPT代码运行节点无法引用传入变量的问题

## 现象
用户希望在代码运行插件的代码中支持变量引用，应用场景为部分节点生成代码后，需要将代码传递至代码运行插件中运行。典型场景为通过prompt声明代码模板，让AI补全代码后，将生成的代码输出至代码运行节点执行时，无法正常引用传入的变量。

## 可能原因
代码运行节点的设计定位为数据处理，未内置原生的变量引用支持，无法直接读取外部传入的变量内容。

## 排查步骤
1. 确认当前使用的功能节点为代码运行节点。
2. 梳理业务流程，确认是否存在将其他节点生成的代码传递至代码运行节点的操作。
3. 检查是否需要通过变量传递的方式向代码运行节点传入参数。

## 解决与验证
可使用HTTP请求节点替代代码运行节点实现相关操作。若需使用代码运行节点，需按实际环境确认变量传递的适配方式。

> 来源: [FastGPT GitHub issue #3084](https://github.com/labring/FastGPT/issues/3084)
