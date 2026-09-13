---
title: FastGPT中控制模型思考行为的解决方案
slug: /zh/troubleshoot/fastgpt-model-think-switch-control
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4731
source_type: GitHub issue
---

# FastGPT中控制模型思考行为的解决方案

## 现象
在FastGPT中使用模型时，无法通过代码指令控制模型是否执行思考步骤，无法实现代码层面的思考开关控制，无法按照需求主动开启或关闭模型的思考流程，影响功能的自动化配置。

## 可能原因
未在模型输入的提示词中添加指定控制参数，或未明确在输入文本中以清晰的方式指示模型是否需要执行思考步骤。

## 排查步骤
1. 查看当前向模型提交的完整输入文本内容，确认所有提示词和指令的细节。
2. 确认输入文本中是否包含/think或/no_think控制参数，检查参数的拼写和位置是否正确。
3. 检查输入指令是否清晰明确地指示模型的思考状态，避免模糊表述。

## 解决与验证
根据相关说明，在模型输入的提示词中添加/think或/no_think参数，即可切换模型的思考状态。验证时，向模型提交包含/think的输入，确认模型执行思考步骤并输出相关思考内容；提交包含/no_think的输入，确认模型直接输出结果而不展示思考过程。

> 来源: [FastGPT GitHub issue #4731](https://github.com/labring/FastGPT/issues/4731)
