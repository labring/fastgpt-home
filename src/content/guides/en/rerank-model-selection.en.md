<!--
Delivery metadata (not published with the body)
slug: rerank-model-selection
locale: en
canonical: https://fastgpt.io/guide/rerank-model-selection
hreflang: en | zh-CN → https://fastgpt.cn/guide/rerank-model-selection | en → https://fastgpt.io/guide/rerank-model-selection | x-default → https://fastgpt.io/guide/rerank-model-selection
Meta title: FastGPT Rerank Model Selection, Latency and Cost Guide
Meta description: Compare FastGPT rerank models using fixed candidates, labeled questions, relevance thresholds, latency, fallback behavior, and cost per accepted answer.
keywords: FastGPT,rerank,model,selection
结构化数据: Article + BreadcrumbList
内链: FastGPT Embedding Model Migration and Rollback Guide / FastGPT Local Model TCO, Capacity and Integration Guide
配图需求: Text and accessible tables; no image is required for this release.
发布批次: Week07
-->

# Choosing FastGPT Rerank Models: Relevance, Latency, and Cost

A reranker receives retrieved candidates and evaluates their relevance to a question. Begin by checking that the candidate set contains the correct evidence, then measure how reranking affects result quality and end-to-end performance. Missing content, parsing errors, and inadequate retrieval coverage need attention earlier in the pipeline.

FastGPT's retrieval documentation explains vector search, full-text search, hybrid retrieval, and reranking. Final results also involve RRF fusion and filtering. Acceptance should therefore inspect the evidence and answers that the application actually returns.

## Keep comparison conditions fixed

Use the same knowledge-base snapshot, embedding model, question set, candidate count, and generation model. Label supporting documents or chunks. Include abbreviations, long questions, specialist terms, similar documents, and questions outside the knowledge base. Retain a baseline with reranking disabled.

| Metric | Measurement | Purpose |
| --- | --- | --- |
| Candidate coverage | Whether correct evidence reaches the candidate set | Identify the opportunity available to a reranker |
| Ranking quality | Position of relevant evidence and coverage in the first k results | Compare discrimination between candidates |
| Answers and citations | Correctness, sufficient evidence, and citation targets | Connect ranking changes to business outcomes |
| Latency | Rerank time and end-to-end percentiles | Assess user experience and peak-load behavior |
| Usage and cost | Candidate count, text length, calls, and compute | Price the observed quality improvement |
| Failure behavior | Timeouts, limits, malformed responses, and fallback | Assess service availability |

## Test the inputs the application uses

Confirm interface compatibility, language coverage, input limits, and response format for the deployed version. Start with fixed examples that exercise authentication and responses, then evaluate the complete question set. Preserve candidate content, model outputs, and final retrieval results to explain filtering and fusion effects.

Report Chinese, English, and mixed-language results separately when relevant. Specialist abbreviations and long chunks can behave differently, so review critical scenarios alongside averages. Increasing candidate count adds reranking input; measure both quality gains and latency changes.

## Calibrate scores and filtering

Rerank models can have different score ranges and distributions. Select relevance thresholds again using labeled samples after changing models. Inspect whether the remaining evidence is sufficient to answer the question. Reusing a previous model's threshold can introduce a new source of error.

Inspect the final results through the real business entry point and account for score filtering and RRF fusion. For an individual diagnostic case, retain the retrieved candidates, reranker output, and final evidence as separate records.

## Exercise failure and fallback

The linked FastGPT source snapshot retains the original text retrieval after a rerank failure and sets `usingReRank=false`. Confirm the behavior of the deployed release and test timeout, invalid credentials, and service unavailability. Check both the business result and the operational record.

Answer quality can change when a request falls back to baseline retrieval. Include that scenario in the critical question set, inspect citations, and ensure operators can distinguish successful reranking from fallback requests.

## Enable it where the measured benefit justifies it

Start with question types that show a clear improvement, then expand to other applications. Include API usage or self-hosted compute, gateway and network costs, monitoring, operations, and peak-capacity reserves in procurement comparisons. Cost per answer that passes quality acceptance connects model pricing to the result the business actually needs.

## Related guides

- [FastGPT Embedding Model Migration and Rollback Guide](https://fastgpt.io/guide/embedding-model-migration)
- [FastGPT Local Model TCO, Capacity and Integration Guide](https://fastgpt.io/guide/local-model-tco)

## References

- [FastGPT model configuration](https://doc.fastgpt.cn/zh-CN/self-host/config/model/intro)
- [FastGPT retrieval principles](https://doc.fastgpt.cn/zh-CN/guide/dataset/dataset_engine)
- [FastGPT rerank fallback implementation](https://github.com/labring/FastGPT/blob/2bab5c1e06c46362f40a454d49d963e8bf0c62bc/packages/service/core/dataset/search/defaultRecall/rerank.ts)
- [BAAI BGE Reranker v2 M3 model card](https://huggingface.co/BAAI/bge-reranker-v2-m3)
