---
title: FastGPT中RAG功能问题排查与Graph RAG选型参考
slug: /zh/troubleshoot/fastgpt-rag-graph-selection
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1969
source_type: GitHub issue
---

# FastGPT中RAG功能问题排查与Graph RAG选型参考

## 现象
当前RAG功能存在诸多不足。部分场景下普通RAG无法召回全部相关数据，增大token使用量后仍无明显效果。当召回内容过多时，会产生大量无效信息，参考资料量过大难以人工检索，同时存在嵌入幻觉问题。有需求希望将Graph RAG纳入后续版本，以优化整体知识检索能力。

## 可能原因
普通RAG存在召回效果不足的问题。Graph RAG存在较高使用成本，单个问题成本约为普通方案的20倍，单问题成本约5元左右。Graph RAG可提供更细粒度的知识，实际场景落地价值受成本影响较大。

## 排查步骤
1.  记录当前RAG功能单次请求的token消耗量、召回结果的数量与有效信息占比。
2.  计算单个问题的实际使用成本，对比普通方案与Graph RAG的成本差异。
3.  评估业务对细粒度知识检索的实际需求程度。

## 解决与验证
若选择优化普通RAG方案，可调整召回数量参数，如将top10调整为top200，以优化召回效果。若考虑引入Graph RAG，需确认实际使用成本与业务需求是否匹配，单个问题成本约5元左右，具体成本需按实际环境确认。同时需结合业务场景，验证Graph RAG的适配性是否符合实际需求。

> 来源: [FastGPT GitHub issue #1969](https://github.com/labring/FastGPT/issues/1969)
