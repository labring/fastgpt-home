---
title: FastGPT 工作流异常捕获与报错反馈配置
slug: /zh/troubleshoot/fastgpt-process-error-feedback
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/661
source_type: GitHub issue
---

# FastGPT 工作流异常捕获与报错反馈配置

## 适用场景与历史记录

原议题于 2023 年请求工作流支持错误事件或 try/catch。 原始讨论提交于 2023-12-27，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

后续维护者明确确认该能力已有，当前源码也包含异常分支与错误输出。具体节点的开启方式和错误路径需要在工作流中验证。

## 排查与复测

1. 在具有错误输出的节点中开启异常处理，并连接异常分支。
2. 把错误信息送往指定回复或受控日志节点，设置适合用户的反馈内容。
3. 在测试应用中触发一次已知错误，核对异常路径运行、反馈输出与正常路径。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：Add "error event" or "try catch"](https://github.com/labring/FastGPT/issues/661)

> 来源: [原讨论中的补充回复](https://github.com/labring/FastGPT/issues/661#issuecomment-3713263767)

> 来源: [FastGPT 异常分支界面实现](https://github.com/labring/FastGPT/blob/main/projects/app/src/pageComponents/app/detail/WorkflowComponents/Flow/nodes/render/RenderOutput/CatchError.tsx)

> 来源: [FastGPT AI 对话节点与错误输出定义](https://github.com/labring/FastGPT/blob/main/packages/global/core/workflow/template/system/aiChat/index.ts)
