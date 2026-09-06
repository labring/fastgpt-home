---
title: FastGPT Body 额外字段保存：JSON 布尔值与回读检查
slug: /zh/troubleshoot/fastgpt-body-field-save-loss
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3845
source_type: GitHub issue
---

# FastGPT Body 额外字段保存：JSON 布尔值与回读检查

## 适用场景与历史记录

原报告在 4.8.22 的模型 Body 额外字段中填写 include_reasoning，保存后再次打开显示为空。 原始讨论提交于 2025-02-20，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

原线程已指出布尔值需要小写 true。完整 JSON 示例为 {"include_reasoning": true}；该语法修正和模型提供商是否接受此参数应分别验证。

## 排查与复测

1. 先将额外字段写为合法 JSON：{"include_reasoning": true}。
2. 保存后重新打开编辑框，检查值是否保留，并查看保存请求的响应。
3. 检查实际出站请求及提供商当前参数说明，确认参数含义和模型响应。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：Fastgpt4.8.22模型参数编辑Body额外字段修改保存不了](https://github.com/labring/FastGPT/issues/3845)

> 来源: [原讨论中的补充回复](https://github.com/labring/FastGPT/issues/3845#issuecomment-2675168281)
