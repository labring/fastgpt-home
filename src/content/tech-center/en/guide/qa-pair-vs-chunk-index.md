---
title: Q&A Pairs or Plain Chunks: Which Data Shape Fits Which Content
slug: /en/guide/qa-pair-vs-chunk-index
page_type: Decision matrix
source: https://doc.fastgpt.cn/zh-CN/self-host/config/env
source_type: Open-source repository docs and community threads
article_section: Selection & Evaluation
is_part_of: FastGPT Tech Center
meta_description: Technical decision guide for enterprise AI platform buyers: compare plain document chunks and Q&A pair data shapes for knowledge bases, with criteria, switching costs, and timing guidance.
schema_type: TechArticle
date_published: 2026-10-15
date_modified: 2026-10-15
---

# Q&A Pairs or Plain Chunks: Which Data Shape Fits Which Content

## When this decision has to be made
You must make this decision when you build or iterate a knowledge base system and need to define the storage and processing shape of your data. Making this decision too early leads to rework: if you don’t align your data shape with business needs during data collection, you will face high reprocessing costs later when you discover poor retrieval accuracy or bad business fit. Making it too late causes more disruption: after most data is imported, indexes built, and applications connected, switching will invalidate existing configurations, require rebuilding indexes and adjusting retrieval rules, and extend your project timeline.
Specific trigger scenarios include: your business shifts from general customer service to fields like legal or compliance that require precise citations; your knowledge base retrieval results frequently show irrelevant answers or broken information; you need to connect structured FAQ data sources or unstructured long documents. You should act quickly if you need to distinguish between question and answer units in your data, or optimize retrieval performance for multi-turn conversations.

## Criteria matrix
| Candidate Solution               | Data Import Format Requirements                                                                 | Retrieval Keyword Matching Capability               | Multi-turn Conversation Adaptability               | Index Customization Flexibility                                                                 | Semantic Integrity Assurance Capability                                                                 | Upfront Data Processing Cost               |
|----------------------------------|-----------------------------------------------------------------------------------------------|----------------------------------------------------|---------------------------------------------------|-------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------|--------------------------------------------|
| Plain Chunk Data                 | Supports unstructured documents, CSV/Excel files without Q/A headers                            | Relies on overall semantic or full-text retrieval performance | Requires enabling a question optimization module to resolve pronouns | Supports custom indexes, maximum 5 total                                                        | Depends on chunking rules; you must enforce rules to maintain semantic integrity                     | Low; only requires splitting documents per defined rules |
| Q&A Pair Data                    | Requires structured format with Q and A fields                                                  | Can match keywords directly based on the Q field    | Natively supports multi-turn conversation pronoun resolution | Supports configuring multiple indexes per data set                                             | Q and A fields naturally form complete semantic units; integrity is more controllable | High; requires extracting or organizing Q&A units |

## Why each criterion matters
### Data Import Format Requirements
Different data sources have different format needs. If you have an existing structured FAQ library, using plain chunk data will force you to reformat Q&A pairs into text blocks without clear questions, increasing data organization work and preventing direct matching of user-specific questions during retrieval. If you import unstructured long documents, using Q&A pair data will require calling a model to extract Q&A pairs, increasing upfront processing time and resource usage. Failing to match format requirements will cause data to be unretrievable or add extra processing costs.

### Retrieval Keyword Matching Capability
For exact query scenarios like part numbers, model numbers, or proper nouns, plain chunk data relies on overall semantic or keyword matching. If chunking splits a complete keyword across multiple blocks, retrieval will fail. Q&A pair data uses the Q field as a clear question unit, so it can directly match user-input keywords without complex semantic expansion. Choosing the wrong data shape for your retrieval scenario will reduce retrieval accuracy and fail to meet business needs for precise queries.

### Multi-turn Conversation Adaptability
In multi-turn conversations, users often omit context in follow-up questions, such as "What is the scope of this clause?" Plain chunk data requires enabling a question optimization module, which uses a model to resolve pronouns, adding an extra model call and increasing overall response latency. Q&A pair data uses the Q field as an independent question unit with complete semantic information, so it can perform accurate retrieval without extra pronoun resolution. Choosing the wrong shape for multi-turn scenarios will cause retrieval failures or slower response times, harming user experience.

### Index Customization Flexibility
Plain chunk data’s indexes are based on post-chunk text content, so you must adjust chunking rules to optimize index performance. Q&A pair data lets you configure multiple indexes for Q, A, or custom business fields—for example, adding a "legal clause number" index to the Q field of legal documents to improve precise retrieval. Failing to use index customization flexibility will limit your retrieval scope or reduce accuracy, making it hard to meet complex business query needs.

### Semantic Integrity Assurance Capability
Plain chunk data’s semantic integrity depends on chunking rules. If chunks are too large, retrieval results will include too much irrelevant content. If chunks are too small, semantic breaks will occur, preventing users from getting complete context. Q&A pair data’s Q and A fields naturally form complete semantic units, so you don’t need to rely on chunking rules to maintain integrity—only errors during Q&A splitting could cause semantic breaks. Choosing the wrong shape without ensuring semantic integrity will lead to fragmented or unsubstantiated answers, hurting user understanding and trust.

## The cost of switching later
Switching your chosen data shape will incur multi-dimensional costs. First is data migration cost: you must convert existing data from its original shape to the target shape. For example, converting plain chunk data to Q&A pair data requires re-extracting or organizing Q and A fields. When using data push APIs, you can send a maximum of 200 sets per call, so large-scale data migrations will require multiple API calls, increasing API usage and processing time. Second is index rebuilding cost: after switching shapes, you must rebuild vector and full-text indexes, which uses vector model resources and storage space. If you do not use a phased rollout, retrieval services may experience temporary downtime.
You will also face increased validation work: you must re-upload test data, run application evaluation tasks, adjust search parameters like minimum relevance score and citation limit, and verify retrieval accuracy and response speed under the new shape. If you have already connected conversational applications, you must reconfigure the application’s retrieval logic to avoid retrieval failures or incorrect answers. In some cases, switching data shapes will require adjusting existing system integration logic, adding integration costs. Poor planning could lead to business downtime and disrupt normal user access.

## When this decision can wait
You can delay this decision if your knowledge base is only for temporary testing or demos, with a limited data scale and no long-term maintenance needs. You can also use the default chunking mode first if your business scenario is unclear, and adjust later based on actual needs.
You don’t need to define a data shape if your knowledge base only stores original documents and isn’t used directly for question-and-answer retrieval—for example, for document management or other non-retrieval use cases. If you already have mature third-party data processing tools, you can offload data shape work to those tools and delay making a choice within your platform until integration is finalized.
Note that delaying this decision only applies to short-term or non-core scenarios. If your knowledge base will be used for formal business operations, you must define the data shape before launch to avoid later rework costs.

## Keep reading

- [Moving Apps Between Environments: What Export, Templates and Copies Carry Over](/guide/app-migration-across-envs)
- [Deployment Architecture: Images and Trade-offs on x86 and ARM Servers](/guide/cpu-arch-and-image-selection)

## References

- [FastGPT environment variables](https://doc.fastgpt.cn/zh-CN/self-host/config/env)
- [FastGPT Docker Compose deployment](https://doc.fastgpt.cn/zh-CN/self-host/deploy/docker)

## Next steps

The criteria above can be checked against public documentation and a test deployment. To decide against a specific workload, data boundary and operations setup, contact sales for an assessment; the cloud service can be used first to validate feasibility before choosing a deployment form.

- Contact sales: assess the choice against your conditions
- Get started: validate feasibility on the cloud service
- Pricing: compare what each form covers

> Criteria taken from the open-source repository and community threads, verified 2026-09-28.
