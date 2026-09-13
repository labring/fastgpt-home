<!--
Delivery metadata (not published with the body)
slug: embedding-model-migration
locale: en
canonical: https://fastgpt.io/guide/embedding-model-migration
hreflang: en | zh-CN → https://fastgpt.cn/guide/embedding-model-migration | en → https://fastgpt.io/guide/embedding-model-migration | x-default → https://fastgpt.io/guide/embedding-model-migration
Meta title: FastGPT Embedding Model Migration and Rollback Guide
Meta description: Migrate FastGPT embedding models with a new knowledge base, rebuilt vectors, fixed retrieval tests, application cutover, and a practical rollback plan.
keywords: FastGPT,embedding,model,migration
结构化数据: Article + BreadcrumbList
内链: FastGPT Rerank Model Selection, Latency and Cost Guide / FastGPT Knowledge Base Lifecycle and Ownership Guide
配图需求: Text and accessible tables; no image is required for this release.
发布批次: Week07
-->

# Changing FastGPT Embedding Models: Rebuild and Validate

Changing an embedding model changes how documents and queries are represented. Two models can produce vectors with the same dimensions while using different semantic spaces. Recreate target vectors from the original documents, chunks, and indexes, then evaluate retrieval with a fixed question set.

An embedding change affects semantic representation. A vector database migration affects storage. Give each change its own acceptance criteria, and change one major variable at a time where practical so quality and performance differences can be explained.

## Preserve the migration inputs

| Input | Purpose | Checks |
| --- | --- | --- |
| Original documents and provenance | Reparse and embed content in the target knowledge base | File integrity, source identifiers, and modification dates |
| Chunking and index rules | Explain retrieval differences | Chunk size, overlap, headings, and custom indexes |
| Existing knowledge base and bindings | Preserve a recovery path | Model, retrieval settings, applications, and permissions |
| Fixed question set | Compare old and new results | Supporting evidence, unanswered questions, and ambiguous cases |
| Capacity and time budget | Estimate rebuilding costs | Text volume, embedding usage, concurrency, and dual storage |

## Check model and storage dimensions

FastGPT's M3E integration documentation explains that a knowledge base selects its embedding model at creation and that model bindings must remain compatible with its original embedding model. Confirm the creation and binding options in the deployed version, then create a target knowledge base using the replacement model.

Record the model's raw output dimensions separately from the dimensions stored after FastGPT adaptation. The linked FastGPT source snapshot includes truncation, normalization, or padding, so a database's general vector limit alone does not describe the application path. Send a short text to the target model and inspect both the response length and the stored result.

## Follow a six-step migration

1. Freeze the baseline model, documents, retrieval settings, and question set. Retain results and citations.
2. Configure the replacement model in the target environment. Test authentication, output format, long inputs, and failure responses.
3. Create the target knowledge base and import original content. When preserving chunks, check the import methods supported by the deployed version and sample their correspondence.
4. Wait for processing to finish. Check document counts, failed jobs, index counts, and sample retrieval.
5. Compare both knowledge bases with the fixed questions, recording retrieval, supporting evidence, latency, and cost separately.
6. Switch a test application, observe a limited traffic group, and then expand. Preserve the old application binding and knowledge base through the observation period.

## Evaluate quality and speed separately

Label the documents or chunks that support each answer. Measure coverage among the first k results and track empty retrieval, incorrect citations, and answers with incorrect evidence separately. Keep the generation model, prompts, and reranking settings fixed to isolate the effect of the embedding change.

Performance measurements should include rebuild duration, online query latency, and model usage. Test database index tuning separately. For example, `hnsw.iterative_scan`, `hnsw.scan_mem_multiplier`, and `hnsw.max_scan_tuples` are pgvector settings; confirm the PostgreSQL extension version before applying them.

## Preserve rollback through application bindings

Define restoration actions for unacceptable retrieval loss, failure rates, or latency. After restoring the old binding, repeat the same question set. Track documents added or changed during cutover and maintain those increments during the observation period so the old knowledge base remains usable.

At the end of the dual-storage period, handle the old knowledge base and backups under the organization's retention policy. Confirm application references, audit requirements, and recovery windows before cleanup, and retain the migration results.

## Related guides

- [FastGPT Rerank Model Selection, Latency and Cost Guide](https://fastgpt.io/guide/rerank-model-selection)
- [FastGPT Knowledge Base Lifecycle and Ownership Guide](https://fastgpt.io/guide/kb-lifecycle-ownership)

## References

- [FastGPT M3E integration](https://doc.fastgpt.cn/zh-CN/self-host/custom-models/m3e)
- [FastGPT knowledge-base API schema](https://github.com/labring/FastGPT/blob/2bab5c1e06c46362f40a454d49d963e8bf0c62bc/packages/global/openapi/core/dataset/api.ts)
- [FastGPT vector formatting implementation](https://github.com/labring/FastGPT/blob/2bab5c1e06c46362f40a454d49d963e8bf0c62bc/packages/service/core/ai/embedding/index.ts)
- [pgvector indexing and iterative scans](https://github.com/pgvector/pgvector#indexing)
