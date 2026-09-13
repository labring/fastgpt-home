<!--
slug: vector-store-selection
canonical: https://fastgpt.io/guide/vector-store-selection
hreflang: en | zh-CN → https://fastgpt.cn/guide/vector-store-selection | en → https://fastgpt.io/guide/vector-store-selection | x-default → https://fastgpt.io/guide/vector-store-selection
Meta title: FastGPT Vector Store Selection and Migration Planning
Meta description: Compare FastGPT vector stores using deployment constraints, retrieval features, operational capacity and migration costs before changing production.
keywords: vector store selection
结构化数据: Article + BreadcrumbList
配图需求: Text and accessible tables; no image is required for this release.
内链: 
source_file: 程序化技术页-第6批/英文-fastgpt.io/guide/vector-store-selection.md
source_sha256: f61e2e0f28e3e37bb99b23c6c8524fcdce43908d9aa043615ab60ae1cf6caf14
source_verified: 2026-09-07
publication_batch: Week08
-->

# Choosing a Vector Store: Criteria, Migration Cost and When Not to Switch

## When this decision has to be made
You must select a vector store when you deploy RAG applications, knowledge base systems, or LLM-enhanced business workflows. Early selection carries risks: if your business has not clarified vector data scale, query requirements, or quantization level needs, your initial choice may not align with future changes, forcing you to restructure your system later. Delaying selection also creates risks: when business traffic peaks, your existing vector store lacks performance, or cannot support new quantization or distance calculation needs, a last-minute switch carries downtime risks that disrupt normal business operations.
You need to re-evaluate and select a new vector store when:
1. Your vector data scale grows beyond 1 million records, and your current full-precision vector store has excessive storage costs. A graded quantization-supported vector store will reduce resource waste.
2. You need to support multiple vector retrieval scenarios, such as inner product, cosine similarity, or other distance calculation methods, or need compatibility with your existing database ecosystem. This ensures long-term business stability and scalability.

## Criteria matrix
| Candidate | Support quantization level configuration | Compatible distance calculation types | Index rebuild operation method | Full-text search integration solution | Environment variable configuration rules | Version adaptation requirements |
| --- | --- | --- | --- | --- | --- | --- |
| Oceanbase Vector Store | Supports 8-bit, 1-bit quantization. Configure via the `VECTOR_VQ_LEVEL` environment variable (32 = full precision, 8 = 8-bit, 1 = 1-bit). Default index scale is 1 million records. | 1-bit quantization only supports l2 and cosine (cosine supported starting in V4.3.5 BP4 version); does not support `inner_product`. 8-bit quantization has no such restrictions. | You must directly connect to the database to rebuild indexes. Code only handles initial index creation; existing ten-million-level indexes will be ignored by the code. | Uses MongoDB $text; no extra migration required. | Can reuse the `VECTOR_VQ_LEVEL` environment variable from PGVector. | Not stated in the documentation; verify in your environment. |
| pgvector | Not stated in the documentation; verify in your environment | Not stated in the documentation; verify in your environment | Not stated in the documentation; verify in your environment | Uses MongoDB $text | Not stated in the documentation; verify in your environment | Not stated in the documentation; verify in your environment |
| Milvus | Not stated in the documentation; verify in your environment | Not stated in the documentation; verify in your environment | Not stated in the documentation; verify in your environment | FastGPT V4.16.2 and above supports Milvus BM25 full-text search. Upgrade Milvus to V2.5.16 or higher, and use the `modeldata_v2` collection. | Not stated in the documentation; verify in your environment | FastGPT V4.16.2 and above supports this integration; you must match the corresponding Milvus version. |
| Zilliz | Not stated in the documentation; verify in your environment | Not stated in the documentation; verify in your environment | Not stated in the documentation; verify in your environment | Shares SDK with Milvus; full-text search integration method is the same as Milvus. | Not stated in the documentation; verify in your environment | Not stated in the documentation; verify in your environment |

## Why each criterion matters
Support for quantization level configuration directly impacts storage costs and retrieval accuracy. For large vector data sets, lower quantization levels reduce disk usage and hardware costs. For use cases with strict retrieval accuracy requirements, full-precision configuration preserves more vector details. If a vector store cannot flexibly adjust quantization levels, you will either face rapid storage resource depletion or fail to meet accuracy needs. For example, Oceanbase Vector Store’s graded quantization lets you switch configurations based on business scenarios, avoiding resource waste or insufficient accuracy.
Compatible distance calculation types adapt to different retrieval needs for your business scenarios. Inner product calculations offer high performance but may have recall accuracy issues in some scenarios. Cosine similarity matches inner product results for normalized vectors, making it suitable for most general RAG scenarios. If a vector store does not support the distance types your business needs, you cannot perform accurate vector similarity matching. For example, Oceanbase’s 1-bit quantization only supports l2 and cosine distances. If your business requires `inner_product`, you must adjust your distance calculation method, or your retrieval results will be incorrect.
Index rebuild operation methods affect operational complexity and business downtime. If index rebuilding can be automated via code, you reduce operational costs and downtime windows. If you need to manually connect to the database to perform rebuilds, you increase the operational burden on your team. For example, Oceanbase’s index rebuild requires direct database operations. When you adjust quantization levels or index parameters later, your operations team must manually run database commands. If your team lacks dedicated database operational skills, this creates additional business interruption risks.
Full-text search integration solutions impact hybrid retrieval capabilities and deployment complexity. Some vector stores require separate upgrades to adapt to new full-text search solutions. For example, Milvus requires an upgrade to V2.5.16 or higher for FastGPT V4.16.2 and above to support Milvus BM25 full-text search, and you must migrate old data to the `modeldata_v2` collection. Complex integration processes increase deployment and upgrade difficulty, slowing down business iteration speed.
Environment variable configuration rules reduce deployment and maintenance complexity. Unified environment variable rules lower your team’s learning curve and reduce configuration errors. For example, Oceanbase can reuse the `VECTOR_VQ_LEVEL` environment variable from PGVector, so you do not need to learn new configuration rules, improving deployment efficiency. If a vector store requires many custom, exclusive environment variables, you increase the risk of configuration errors and make deployment more difficult.
Version adaptation requirements affect system stability and upgrade efficiency. Matching vector store versions with upper-layer applications directly ensures normal system operation. For example, Milvus must match specific FastGPT versions. FastGPT V4.16.2 and above supports Milvus BM25 full-text search, and Milvus itself must be upgraded to V2.5.16 or higher. If versions do not match, your system may fail to start or experience retrieval errors, increasing troubleshooting and repair costs.

## The cost of switching later
Switching vector stores after you have already selected one carries multiple costs and risks. First, you face data migration costs: you must export existing vector data from your original store and import it into the new one. Large datasets will consume significant network and storage resources during this process. Second, you face index rebuilding costs: index creation rules vary across vector stores. For example, Oceanbase’s index rebuild requires manual database connections, and you must adjust index parameters to match the new store’s configuration.
Downtime windows are another risk: during data migration and index rebuilding, your business may lose access to vector retrieval functions. You must plan a reasonable downtime period to avoid harming user experience. You also have validation workloads: you must fully test the new store’s retrieval results and performance to ensure they match the original store, and verify that all business processes work correctly. Additionally, different vector stores use different full-text search integration methods, so you must adjust corresponding full-text search configurations, further increasing migration workload.

## When this decision can wait
You can delay selecting a vector store in several scenarios:
- Your RAG application or knowledge base system is still in testing and has not officially launched.
- Your vector data scale is small, such as fewer than 1 million records per store, and your current vector store’s basic functions meet your needs.
- Your team has not clarified your long-term vector storage needs, such as future quantization level or distance calculation type requirements. Delaying selection avoids unnecessary configuration changes later.
- You are evaluating multiple vector stores for compatibility, and have sufficient testing resources. You can test different options in a staging environment before making a formal selection, without making early production changes.
- Your existing vector store’s performance and functions meet all current business needs, and you have no clear upgrade or replacement requirements.

## Keep reading

- [Cloud, Community Self-Hosting or Commercial Private Deployment: Six Criteria](/en/guide/deployment-form-selection)
- [Choosing a Document Parser: Built-in, Enhanced and External Services](/en/guide/doc-parser-selection)

## References

- [FastGPT environment variables](https://doc.fastgpt.cn/zh-CN/self-host/config/env)
- [FastGPT Docker Compose deployment](https://doc.fastgpt.cn/zh-CN/self-host/deploy/docker)

## Next steps

The criteria above can be checked against public documentation and a test deployment. To decide against a specific workload, data boundary and operations setup, contact sales for an assessment; the cloud service can be used first to validate feasibility before choosing a deployment form.

- [Contact sales](/en/contact): assess the choice against your conditions
- [Get started](/en/start): validate feasibility on the cloud service
- [Pricing](/en/price): compare what each form covers
