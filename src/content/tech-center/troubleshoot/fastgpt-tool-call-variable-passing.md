---
title: FastGPT 工具参数的变量传入与权限校验排查
slug: /zh/troubleshoot/fastgpt-tool-call-variable-passing
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5937
source_type: GitHub issue
---

# FastGPT 工具参数的变量传入与权限校验排查

## 适用场景与历史记录

原议题希望用受控变量传递权限相关参数，减少模型生成长令牌或用户 ID 的风险。 原始讨论提交于 2025-11-17，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

维护者回复可以指定参数类型；后续用户进一步区分了工具执行节点与工具调用节点的界面。应保留这一争议边界，核对具体节点和版本。

## 排查与复测

1. 记录使用的是独立工具执行还是模型驱动工具调用，以及工具参数的来源设置。
2. 将身份与凭证留在受控服务端配置中，按接口需要传入经过验证的参数。
3. 使用两个测试账号核对权限隔离，并对照节点日志确认模型实际填充的字段范围。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：工具调用时，希望某些值可以通过变量进行传递，而不是都通过模型填充参数。](https://github.com/labring/FastGPT/issues/5937)

> 来源: [原讨论中的补充回复](https://github.com/labring/FastGPT/issues/5937#issuecomment-3912300821)

> 来源: [原讨论中的补充回复](https://github.com/labring/FastGPT/issues/5937#issuecomment-3970954171)

> 来源: [FastGPT 工具调用与终止](https://doc.fastgpt.io/en/guide/build/workflow/nodes/tool)

> 来源: [FastGPT 对话 OpenAPI](https://doc.fastgpt.io/en/openapi/chat)
