---
title: FastGPT iframe 的 sandbox 与 referrerPolicy 历史需求
slug: /zh/troubleshoot/fastgpt-iframe-sandbox-referrer
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3977
source_type: GitHub issue
---

# FastGPT iframe 的 sandbox 与 referrerPolicy 历史需求

## 适用场景与历史记录

原议题希望在聊天 Markdown 中自定义 iframe 安全属性，以嵌入复杂业务表单。 原始讨论提交于 2025-03-05，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

维护者表示需要研究安全策略。当前 HTML 预览能力与第三方页面的嵌入权限需要分开验证。

## 排查与复测

1. 分别提供嵌入内容与外部页面地址，并记录所需的最小 iframe 权限。
2. 在浏览器中检查 sandbox、referrerPolicy 和目标站点嵌入响应头。
3. 在隔离测试页验证必要交互，保留现有安全限制并提交具体兼容需求。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：聊天框中可通过markdown语法自定义iframe的属性](https://github.com/labring/FastGPT/issues/3977)

> 来源: [FastGPT 对话 HTML 渲染](https://doc.fastgpt.io/en/guide/chat/htmlRendering)

> 来源: [原讨论中的补充回复](https://github.com/labring/FastGPT/issues/3977#issuecomment-2702788157)
