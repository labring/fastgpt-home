---
title: FastGPT 新旧知识冲突：来源日期与检索验证
slug: /zh/troubleshoot/fastgpt-knowledge-conflict-temporary-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1491
source_type: GitHub issue
---

# FastGPT 新旧知识冲突：来源日期与检索验证

## 适用场景与历史记录

原议题希望对知识库设置优先权重，使新内容在与旧内容冲突时优先引用。 原始讨论提交于 2024-05-15，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

社区建议在文件名加入日期，并在传给模型的引用中保留来源，再以提示词选择较新内容；维护者认可这一思路。它属于需要样本验证的临时方案。

## 排查与复测

1. 为冲突文档保留明确的日期和版本标识，并核对检索结果确实包含来源信息。
2. 在回答提示词说明内容冲突时的日期规则，准备新旧结论相反的测试问题。
3. 检查实际引用和答案；需要确定性边界时按授权的集合范围或过滤条件选择资料。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：知识库设置权重优先引用](https://github.com/labring/FastGPT/issues/1491)

> 来源: [原讨论中的补充回复](https://github.com/labring/FastGPT/issues/1491#issuecomment-2111609408)

> 来源: [原讨论中的补充回复](https://github.com/labring/FastGPT/issues/1491#issuecomment-2112379254)

> 来源: [FastGPT 商业版集合标签与过滤](https://doc.fastgpt.io/en/guide/dataset/collection_tags)
