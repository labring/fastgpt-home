---
title: Keeping a Knowledge Base Fresh: Refresh Cadence, Signals and Ownership
slug: /en/guide/corpus-freshness-operations
page_type: Deep-dive guide
source: https://github.com/labring/FastGPT
source_type: Open-source repository docs and community threads
article_section: Selection & Evaluation
is_part_of: FastGPT Tech Center
meta_title: Keeping a Knowledge Base Fresh: Refresh Cadence, Signals and Ownership
meta_description: Learn how to maintain a fresh knowledge base in an enterprise AI platform. Define refresh cadences, identify signals, and assign ownership.
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Keeping a Knowledge Base Fresh: Refresh Cadence, Signals and Ownership

## When this becomes a decision

Knowledge base content freshness is a subtle but critical issue. A newly built knowledge base usually aligns well with current business needs. However, business environments, product iterations, regulations, and user feedback constantly change. Over time, knowledge base content becomes outdated. This obsolescence accumulates slowly until its negative effects become noticeable.

Specifically, content freshness becomes a problem when these situations occur frequently: users complain that knowledge base answers are outdated or inaccurate; operations teams receive many reports about incorrect or missing knowledge base content; the application performs poorly on new business problems, requiring manual intervention; or, after a system upgrade (e.g., from v4.14.9 to v4.14.10.1, causing Embedding request parameter incompatibility), knowledge base vectorization or retrieval functions show anomalies. These anomalies often point to underlying content that does not match new system features, or old content that new algorithms cannot effectively index.

At this point, reactively updating content is inefficient and impacts business continuity. Turning "content gets older with use" into observable signals and establishing a regular refresh mechanism is key to ensuring the long-term value of your knowledge base. This requires building monitoring and feedback loops at the system level. Relying on accidental manual discovery and resolution becomes ineffective as content volume grows.

## What to settle first

| Criterion                        | What to set                               | Basis                                                                                                                                                                                                                           |
| :------------------------------- | :---------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Content Source Update Frequency  | Daily, Weekly, Monthly, On-demand         | Business data, documents, product release cycles (e.g., product manual update cycle)                                                                                                                                             |
| Knowledge Base Chunking Strategy | `chunk`, `QA`, or custom chunk/index size | Content characteristics (text, code, tables), model context limits, retrieval granularity needs                                                                                                                                |
| Vector Model Compatibility       | `encoding_format` parameter, model version | Vector model updates, system upgrades (e.g., OpenAI SDK updates), custom model requirements                                                                                                                                     |
| Historical Data Migration/Cleanup | Need, migration strategy, cleanup strategy | System version upgrades, data structure changes, old data lifecycle management                                                                                                                                                  |
| Content Quality Metrics          | Accuracy, Recall, User Satisfaction Score | User feedback, business metrics, manual spot checks                                                                                                                                                                             |
| External File Library API        | Enable/Disable, API version, `trainingType` | External system integration, API changes (e.g., `trainingType` field will only support `chunk` and `QA` modes in the future)                                                                                                    |
| System Resource Limits           | File parsing Worker count, memory quota   | Container CPU quota, available CPU parallelism, system safety reserve memory                                                                                                                                                    |

These criteria interact and involve trade-offs. For example, a high update frequency for content sources may require more frequent knowledge base refreshes, increasing system resource consumption (e.g., file parsing Worker count, memory quota). For chunking strategy, `chunk` mode generally suits general text, while `QA` mode is better for question-answer pairs. Custom chunk and index sizes improve handling very large chunks and maintaining code/table integrity. You must weigh these based on actual content type and retrieval needs.

Vector model compatibility is a criterion that can cause system outages. For example, if a system upgrade makes the `encoding_format` parameter in Embedding requests incompatible with the existing vector model, vectorization fails. You may need to adjust model configurations to override this parameter or switch to a compatible vector model. Historical data migration and cleanup are closely related to system upgrades and data lifecycle management; their execution strategy requires careful planning to ensure data integrity and availability.

Content quality metrics are crucial for evaluating refresh effectiveness. User feedback and business metrics help determine if current content meets requirements, guiding refresh strategy adjustments. Finally, external file library API dependencies and system resource limits are technical implementation considerations. API changes may require adjusting integration methods, while resource limits determine the parallelism and processing capacity of refresh tasks. Considering these criteria together allows you to build a comprehensive content freshness operational strategy.

## How to do it

Establishing a content freshness operational mechanism first requires identifying and managing content sources and update cycles. Next, you define the technical implementation plan. Finally, you set up monitoring and feedback processes.

First, identify content sources and update cycles. Content sources can include internal document systems, product databases, customer support records, or official website content. For each source, define its content update frequency and method. For example, product manuals might update monthly, while FAQs might update weekly. For external file libraries, monitor API changes. For instance, in v4.9.0, the `trainingType` field will only support `chunk` and `QA` modes, and `autoIndexes` was introduced. These changes may require adjusting how you call data import interfaces. For PDFs, use enhanced PDF parsing features, such as Doc2x service or parsing examples based on mistral-ocr and miner-u, to improve parsing quality.

Second, define and execute the technical implementation plan. This includes data synchronization, chunking and indexing, vectorization, and refresh process management.
1.  **Data Synchronization and Preprocessing**: Establish automated synchronization mechanisms for different content sources. For example, upload files to the knowledge base via the API file library or file import interface (e.g., `/api/core/dataset/collection/create/localFile`). For structured data, convert it to a format suitable for knowledge base ingestion. In v4.9.2, the knowledge base import data API added `chunkSettingMode`, `chunkSplitMode`, `indexSize`, and other optional parameters. These support separate configuration of chunk size and index size, allow very large chunks to increase the probability of complete chunks, and support custom delimiter presets and custom newline splitting.
2.  **Chunking and Indexing**: Select an appropriate chunking strategy based on content characteristics and retrieval needs. For text, use `chunk` mode; for Q&A pairs, use `QA` mode. For code blocks and tables, v4.9.2 optimized the chunking algorithm, using model context as chunk size to ensure integrity as much as possible. v4.9.0 optimized knowledge base data, removing index quantity limits, allowing unlimited custom indexes, and automatically updating indexes for input text.
3.  **Vectorization and Storage**: Vectorize processed chunked data using a vector model and store it in a vector database. When choosing a vector model, ensure compatibility with your system version. For example, in v4.14.10.1, custom embedding requests might carry `encoding_format=float`, leading to incompatibility with some vector models (like the voyage series). In this case, check model configurations, override the `encoding_format` parameter via model configuration, or switch to a compatible vector model (like BAAI/bge-m3). v4.9.0 upgraded the pg vector plugin to version 0.8.0, introducing iterative search. v4.9.2 added support for the `oceanbase` vector database. If you use Milvus vector library, v4.16.2 requires upgrading to 2.5.16 or higher, and will automatically switch full-text retrieval to Milvus BM25, using the new `modeldata_v2` collection to store vectors and full-text.
4.  **Refresh Process Management**: Package these steps into an automatically executable refresh task. Configure scheduled tasks, such as daily or weekly full or incremental refreshes. v4.9.4 added site synchronization support for configuring training parameters and incremental synchronization. For incremental updates, leverage the optimization that knowledge base data no longer limits index quantity, automatically updating input text indexes without affecting custom indexes. Before executing a refresh, ensure sufficient system resources. For example, v4.16.2 removed `PARSE_FILE_WORKERS` and other concurrency configurations; the hard limit for file parsing Workers automatically sets based on Node.js detected available CPU parallelism.

Third, establish monitoring and feedback loops. Monitor refresh task execution status and content quality metrics, and collect user feedback to continuously optimize the refresh strategy. For example, monitor whether knowledge base search test results align with knowledge base references in actual conversations to troubleshoot semantic search issues.

## How to verify

1.  **Refresh Task Execution Success Rate**: Check automatic refresh task execution logs. Confirm tasks complete successfully at the scheduled frequency, without interruptions or errors.
2.  **Content Freshness Metrics**: Randomly sample a percentage of knowledge base content. Compare it against original content sources. Confirm content synchronizes promptly, and updated content matches the latest source data.
3.  **Retrieval Accuracy and Recall**: Design a set of representative questions. Test the knowledge base before and after a refresh. Compare retrieval accuracy and recall rates to verify expected improvements.
4.  **User Satisfaction Feedback**: Collect user feedback on the timeliness and accuracy of knowledge base answers. Analyze user satisfaction score trends. Confirm the refresh's positive impact on user experience.
5.  **System Resource Consumption**: Monitor CPU, memory, I/O, and other system resource usage during refresh task execution. Ensure the refresh process operates within acceptable resource limits, without bottlenecks or overload.
6.  **Vectorization Compatibility Validation**: After a system upgrade or vector model change, perform a small-scale vectorization test. Confirm custom Embedding request parameters (e.g., `encoding_format`) are compatible with the vector model, without 400 errors or other anomalies.
7.  **Deprecated API Check**: Review code or configurations. Confirm deprecated APIs (e.g., old local file upload API `/api/core/dataset/collection/create/file` or interfaces with `trainingType=auto`) have been replaced with new interfaces as per update guides.
8.  **Data Migration Integrity**: After upgrades involving historical data migration (e.g., v4.15.0-beta6 Skill Debug conversation data migration or v4.16.2 resource permission data migration), perform a dry-run. Confirm `migration.errors` is empty. Verify migrated data structure and content meet expectations.

## Limits: when this approach does not hold

This content freshness operational methodology relies on a set of external conditions and assumptions. When these conditions are not met, the approach may not fully apply or its effectiveness may be limited.

First, **content source accessibility and structuredness** are fundamental. If core content is inaccessible via APIs, database interfaces, or file systems, or if content is highly unstructured and semantically complex, making it difficult for programs to automatically parse, chunk, and extract key information, then an automated refresh mechanism becomes difficult to establish. For example, if content primarily exists in handwritten notes, scanned images, or complex diagrams, requiring significant manual intervention to convert into a processable text format, the cost of automated refreshes increases significantly.

Second, the **update frequency and stability of business content** affect the refresh cadence. If business content updates are highly irregular—sometimes large volumes appear, sometimes it remains unchanged for long periods—then a fixed-cycle refresh may not be effective. Overly frequent refreshes waste resources, while too long an interval leads to content becoming stale again. In such cases, you need smarter trigger mechanisms, such as update notifications from a Content Management System (CMS) or dynamic adjustment of refresh frequency by monitoring business data changes.

Third, **vector model and vector database compatibility and stability** are crucial. If the vector model or vector database versions change frequently, and each update introduces incompatible API changes or data format adjustments (e.g., the v4.14.10.1 issue with `encoding_format` parameter incompatibility with the voyage series vector models), then maintaining the refresh process becomes very costly. You need continuous resource investment for adaptation and testing; otherwise, vectorization may fail, impacting knowledge base availability.

Fourth, **system resource scalability** is key to supporting refresh tasks. If file parsing, vectorization, and other tasks require substantial computing resources during peak periods, and the infrastructure cannot scale elastically, or if strict resource quotas exist (e.g., file parsing Worker count, memory quota), then refresh tasks may queue for a long time, unable to complete on schedule, thereby affecting content freshness. Especially when processing very large files or massive amounts of content, resource bottlenecks become a major obstacle.

Finally, **clear content quality assessment standards and feedback loops** are prerequisites for continuous optimization. If clear evaluation metrics for content accuracy, recall, and user satisfaction are lacking, or if user feedback channels are poor and feedback data is difficult to analyze effectively, then even completing a refresh will not allow you to judge its effect, let alone guide future optimization. In this situation, refreshes may only be mechanical operations, failing to deliver actual business value.

## Keep reading

- [Handing Over a Running Deployment: Ownership, Credentials, and Documentation](/en/guide/handover-and-ownership)
- [Incidents Worth Drilling: Writing a Runbook People Actually Use](/en/guide/incident-drill-and-runbook)
- [Usage and Capacity Review: Which Numbers to Watch and When to Scale](/en/guide/usage-and-capacity-review)

## References

- [FastGPT environment variables](https://doc.fastgpt.cn/zh-CN/self-host/config/env)
- [FastGPT upgrade notes](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/upgrade-instruction)

## Next steps

The criteria above can be checked against public documentation. To apply this process to a specific deployment, contact sales for support; the cloud service can be used directly to validate the process first.

- Contact sales: apply this process to your deployment
- Get started: validate the process on the cloud service
- Pricing: compare what each form covers
