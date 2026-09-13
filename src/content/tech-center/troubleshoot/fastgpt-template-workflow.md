---
title: FastGPT v4.8.21 模板导入空白：workflow 层级核对
slug: /zh/troubleshoot/fastgpt-template-workflow
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3846
source_type: GitHub issue
---

# FastGPT v4.8.21 模板导入空白：workflow 层级核对

## 适用场景与历史记录

原报告在 v4.8.21 导入仓库的飞书插件 template.json 后提示成功，画布却没有节点。 原始讨论提交于 2025-02-20，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

维护者明确指出需要导入模板中 workflow 部分的内容。导入结构应与所用版本的有效工作流样例核对。

## 排查与复测

1. 保存原模板副本，检查模板元数据和 workflow 内容的结构层级。
2. 针对原版本导入入口，按维护者建议使用 workflow 部分，并与该版本导出的有效工作流比较结构。
3. 导入后核对节点、连接和参数，在测试应用执行最小路径。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：工作流模板导入显示成功 但是工作流什么都没有](https://github.com/labring/FastGPT/issues/3846)

> 来源: [原讨论中的补充回复](https://github.com/labring/FastGPT/issues/3846#issuecomment-2678516249)
