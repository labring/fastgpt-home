---
title: Chunking by Document Type: How Each Class Splits and What Values to Use
slug: /en/guide/chunking-strategy-selection
page_type: Decision matrix
source: https://github.com/labring/FastGPT
source_type: Open-source repository docs and community threads
article_section: Selection & Evaluation
is_part_of: FastGPT Tech Center
meta_title: Chunking by Document Type: How Each Class Splits and What Values to Use
meta_description: Understand how to chunk documents by type in your enterprise AI application platform. Learn about chunking strategies, criteria, and the costs of changing
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Chunking by Document Type: How Each Class Splits and What Values to Use

## When this decision has to be made
You must decide on a knowledge base chunking strategy. This is essential for building an effective and accurate Retrieval Augmented Generation (RAG) system. Technical teams planning or optimizing knowledge base construction must consider chunking strategies, especially with diverse document types.

Fixing a single chunking pattern too early can lead to inefficient document import or poor retrieval quality. This happens because optimal splitting logic varies significantly across document types. For example, fixed-character chunking for code documents can break code blocks, affecting semantic understanding. PDF documents, without enhanced parsing, might split chaotically due to complex layouts.

Delaying this decision has significant costs. If you import many documents with an unsuitable strategy, retrieval recall and generation accuracy will suffer. This impacts user experience. Correcting a wrong strategy means re-parsing, re-chunking, and re-indexing. This consumes substantial computing resources and storage. It can also cause prolonged service downtime or data inconsistencies.

Furthermore, if business requirements demand high real-time document access, an improper chunking strategy extends document update and knowledge base synchronization times. Evaluate and determine the most suitable chunking strategy before large-scale knowledge base deployment. Also, re-evaluate when introducing new document types.

## Criteria matrix

| Candidate | `chunkSettingMode` | `chunkSplitMode` | `chunkSize` | `indexSize` | `chunkSplitter` | LLM Auto-segmentation | Paragraph Priority Mode | Max Paragraph Depth |
| :-------- | :----------------- | :--------------- | :---------- | :---------- | :-------------- | :-------------------- | :---------------------- | :------------------ |
| General Chunking | `auto` | `auto` | Not stated in the documentation; verify in your environment | Not stated in the documentation; verify in your environment | Not stated in the documentation; verify in your environment | Not stated in the documentation; verify in your environment | Not stated in the documentation; verify in your environment | Not stated in the documentation; verify in your environment |
| Custom Chunking | `custom` | `char` / `token` | Not stated in the documentation; verify in your environment | Not stated in the documentation; verify in your environment | Custom string (supports newlines) | Supported in commercial version | Not stated in the documentation; verify in your environment | Not stated in the documentation; verify in your environment |
| Code Documents | `auto` | `auto` | LLM model context as chunk size | Not stated in the documentation; verify in your environment | Not stated in the documentation; verify in your environment | Not stated in the documentation; verify in your environment | Not stated in the documentation; verify in your environment | Not stated in the documentation; verify in your environment |
| Table Documents | `auto` | `auto` | LLM model context as chunk size | Not stated in the documentation; verify in your environment | Not stated in the documentation; verify in your environment | Not stated in the documentation; verify in your environment | Not stated in the documentation; verify in your environment | Not stated in the documentation; verify in your environment |
| Markdown Documents | `auto` | `auto` | Not stated in the documentation; verify in your environment | Not stated in the documentation; verify in your environment | Not stated in the documentation; verify in your environment | Not stated in the documentation; verify in your environment | Priority over length | Not stated in the documentation; verify in your environment |
| PDF Documents | `auto` | `auto` | Not stated in the documentation; verify in your environment | Not stated in the documentation; verify in your environment | Not stated in the documentation; verify in your environment | Not stated in the documentation; verify in your environment | Not stated in the documentation; verify in your environment | Not stated in the documentation; verify in your environment |

## Why each criterion matters
`chunkSettingMode` determines the source of chunking parameters. Selecting `auto` mode allows the system to automatically chunk based on document type and internal algorithms. This simplifies configuration for most general scenarios. However, it may not fully meet the fine-grained needs of specific documents. Choosing `custom` mode allows you to manually set parameters like `chunkSize`, `chunkSplitMode`, and `chunkSplitter`. This is crucial for document types requiring highly customized chunking logic. If document structures are complex or contain specific semantic boundaries that `auto` mode cannot accurately identify, the lack of a `custom` mode will degrade chunking quality. This then impacts retrieval accuracy.

`chunkSplitMode` defines the unit of measurement for chunking. The `char` mode splits by character count. It suits text content that is relatively uniform and lacks distinct structural features. The `token` mode splits by the number of tokens processed by the model. This directly relates to the input limits of large language models. It helps precisely control the context length of each chunk, preventing chunks from being too long or too short. If you choose incorrectly, for example, using a small `char` chunk for long text, it can lead to semantic breaks. Using a large `token` chunk for short text can waste resources.

`chunkSize` and `indexSize` control the granularity of chunks and the scope of indexing, respectively. `chunkSize` determines the maximum length of each chunk. This directly affects the completeness and relevance of retrieved snippets. A `chunkSize` that is too small can lead to insufficient contextual information. A `chunkSize` that is too large can introduce irrelevant information, increasing retrieval noise. `indexSize` allows for a larger context during indexing. This improves the probability of complete chunks. This is especially important for document types requiring broader contextual understanding, such as complex code logic or lengthy dissertations. If these parameters are set improperly, retrieval quality will suffer directly. The model will then fail to obtain sufficient or accurate information for answers.

`chunkSplitter` provides the ability to customize delimiters. This allows you to split based on specific document structures or semantic boundaries. For example, you can specify particular punctuation marks, paragraph tags, or even custom strings as splitting criteria. If a document uses non-standard formats or unique logical separators, and `chunkSplitter` cannot be flexibly configured, the system will struggle to recognize these boundaries. This results in unexpected chunking outcomes. This is particularly evident when processing specific formats of reports, logs, or code files.

LLM Auto-segmentation is an advanced feature. It uses the capabilities of large language models to intelligently identify paragraph boundaries within documents. This feature offers significant advantages for documents with complex structures that are difficult to split with fixed rules. Examples include natural language descriptions or unstructured text. Without this capability, even using `custom` mode and `chunkSplitter` might not achieve ideal segmentation for such documents. Human-defined rules often cannot cover the full complexity of document semantics.

Paragraph Priority Mode and Max Paragraph Depth work together for structured documents, especially Markdown and similar formats. Paragraph Priority Mode ensures that chunking prioritizes maintaining paragraph integrity. This avoids splitting a complete semantic unit in the middle. This is crucial for maintaining the logical coherence of the document. Max Paragraph Depth further refines the granularity of paragraph priority. It allows you to control how deep into the heading or paragraph structure the system should prioritize preservation. If these parameters are missing or set incorrectly, document structure information can be lost during chunking. This leads to retrieved snippets lacking context or semantic coherence. For example, when chunking Markdown documents, the system forces splitting by paragraph, and paragraph priority overrides length. If you fail to effectively use these features, even clearly formatted Markdown documents can become fragmented.

## The cost of switching later
Once you select and implement a knowledge base chunking strategy, changing it later incurs several costs.

First, there are **data costs**. All imported documents require re-parsing and re-chunking according to the new strategy. This means re-reading original documents, re-executing chunking algorithms, and generating new chunk data. If your knowledge base contains many documents, this process will be time-consuming and computationally intensive. You may need to clean up old chunk data to avoid redundancy and confusion. This is a task requiring careful handling.

Second, there are **indexing costs**. After generating new chunk data, you must rebuild the vector index. This typically involves converting each new chunk into a vector embedding and storing it in a vector database. Rebuilding the index is a resource-intensive operation. It consumes significant CPU, memory, and storage resources. It can also take a long time to complete, especially in large knowledge bases. During index rebuilding, knowledge base retrieval performance might suffer. The service might even become unavailable.

Third, there are **downtime costs**. The process of re-parsing, re-chunking, and re-indexing often requires the system to be in maintenance mode. Or, it will at least severely impact performance. This can lead to service interruptions or response delays, negatively affecting business applications that rely on the knowledge base. To minimize downtime, you might need complex blue-green deployment or rolling upgrade strategies. This increases operational complexity and risk.

Finally, there are **validation workload costs**. After implementing a new chunking strategy, you need comprehensive validation to ensure its effectiveness. This includes evaluating metrics like retrieval recall, answer generation accuracy, and contextual relevance. The validation process may require manual review of many retrieval results and model outputs. This determines if the new strategy achieves the desired results. If validation results are not ideal, you might need to adjust the strategy again and repeat all the steps above. This creates an iterative optimization cycle that consumes significant human and time resources.

## When this decision can wait
In certain scenarios, you can postpone a fine-grained chunking strategy decision. Do not rush it. If your project is in an early exploration phase, and the knowledge base contains only a few, simple, and homogeneous documents (e.g., plain text or simple Markdown files), and retrieval precision requirements are not high, you can temporarily use the default `auto` chunking mode. In this case, the system's built-in general chunking logic is usually sufficient for initial testing and validation.

Additionally, if your current team resources (including human resources, computing power, and time) are limited, and core business functions are not yet fully stable, it is more reasonable to prioritize more urgent development tasks. When document types are singular and data volume is small, even if the default chunking strategy is not optimal, its negative impact is relatively controllable. You can delve into and optimize the chunking strategy later. Do this when business scales, document types diversify, or when there are clear, higher requirements for retrieval performance. At that point, the data and experience accumulated from actual operation will provide a more solid foundation for subsequent decisions.

## Keep reading

- [When an Index Must Be Rebuilt: Triggers, Cost and Migration Paths](/en/guide/index-rebuild-and-migration)
- [Observability Choices: What Each Layer Records, and How Long to Keep It](/en/guide/observability-and-logging-stack)

## References

- [FastGPT environment variables](https://doc.fastgpt.cn/zh-CN/self-host/config/env)
- [FastGPT Docker Compose deployment](https://doc.fastgpt.cn/zh-CN/self-host/deploy/docker)

## Next steps

The criteria above can be checked against public documentation and a test deployment. To decide against a specific workload, data boundary and operations setup, contact sales for an assessment; the cloud service can be used first to validate feasibility before choosing a deployment form.

- Contact sales: assess the choice against your conditions
- Get started: validate feasibility on the cloud service
- Pricing: compare what each form covers
