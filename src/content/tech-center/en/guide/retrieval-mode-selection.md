---
title: Semantic, Full-Text, or Hybrid Retrieval: Where Each Fits and What Thresholds You Need
slug: /en/guide/retrieval-mode-selection
page_type: Decision matrix
source: https://github.com/labring/FastGPT
source_type: Open-source repository docs and community threads
article_section: Selection & Evaluation
is_part_of: FastGPT Tech Center
meta_title: Semantic, Full-Text, or Hybrid Retrieval: Where Each Fits and What Thresholds You Need
meta_description: Choose the right retrieval mode for your enterprise AI knowledge base. Compare semantic, full-text, and hybrid options, understand key criteria, and avoid
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Semantic, Full-Text, or Hybrid Retrieval: Where Each Fits and What Thresholds You Need

## When this decision has to be made
The retrieval mode for your knowledge base is a core component of enterprise AI applications. This choice directly impacts information recall accuracy and efficiency. You must make this decision in these scenarios:

1.  **During initial knowledge base construction**: When you first build a knowledge base system, you need to determine the most suitable retrieval strategy. Base this on your expected content types, user query habits, and accuracy requirements. Locking into a single mode too early can limit future scalability or lead to poor performance.
2.  **When existing system performance is poor**: Re-evaluate and adjust your retrieval mode if current knowledge base results show many irrelevant items, low recall of key information, or poor user feedback on query experience. For example, if semantic retrieval fails to capture user intent effectively, you might need the precise matching capability of full-text retrieval.
3.  **When data types change**: Your existing retrieval mode may not adapt when the knowledge base adds large amounts of unstructured data, multimodal content, or specialized terminology requiring finer-grained matching. Consider a more complex hybrid retrieval strategy.
4.  **When business scenarios diversify**: A single retrieval mode struggles to meet varied query needs, from precise question answering to open-ended exploration. You must combine multiple modes for optimal results.

Making this decision too early means you cannot accurately assess different modes' true performance due to insufficient data. Making it too late results in compromised user experience, inefficient operations, and potentially high costs for later modifications and data migration.

## Criteria matrix

| Candidate  | Applicable Content Type             | Recall Relevance Evaluation Thresholds                               | Query Response Speed | Index Structure Complexity                                      | Recall Breadth | Recall Precision |
| :--------- | :---------------------------------- | :------------------------------------------------------------------- | :------------------- | :-------------------------------------------------------------- | :------------- | :--------------- |
| Semantic   | Conceptual, descriptive, ambiguous  | `minimum_relevance` (e.g., 0.4; re-rank models may need 0.85+)       | Medium               | Vector index                                                    | Broad          | Medium           |
| Full-Text  | Keywords, phrases, exact match      | None (sorted by `textScore`)                                         | Fast                 | Inverted index (`fullTextToken` field, requires `text` index) | Narrow         | High             |
| Hybrid     | Combines concepts and keywords      | `minimum_relevance` (semantic part, e.g., 0.4)                       | Slow                 | Combined vector and inverted indexes                            | Broadest       | High             |

## Why each criterion matters
**Applicable Content Type**: This criterion determines how well the retrieval mode fits your knowledge base content. Semantic retrieval excels with conceptual, descriptive, or ambiguously queried content. It understands the deep meaning of a query to match relevant documents, even if query terms and document vocabulary do not exactly match. For example, if a user asks "how to improve team collaboration efficiency," semantic retrieval can link to documents about "communication skills" or "project management tools." Full-text retrieval is better suited for content with specific keywords, phrases, or requiring exact matches. For example, a query like "FastGPT V4.6.6 Update Notes" can quickly locate documents containing these exact terms. Hybrid retrieval combines both strengths, fitting knowledge bases with extensive conceptual descriptions and the need for precise term lookup. Choosing a retrieval mode that does not match content types can lead to many irrelevant results or missed critical information.

**Recall Relevance Evaluation Thresholds**: This criterion directly impacts the quality of search results and user experience. Semantic retrieval typically relies on a similarity score (e.g., between 0 and 1) to assess content relevance. You can set a `minimum_relevance` threshold (e.g., 0.4); documents below this threshold are filtered. Re-rank models, which further optimize sorting after semantic retrieval, may require a higher relevance threshold, such as 0.85 or above, to ensure only highly relevant results are presented. Full-text retrieval usually does not set an explicit `minimum_relevance` threshold; it sorts results using a text matching score (e.g., `textScore`). Setting a threshold too high can filter out relevant content, leading to "empty search responses." Setting it too low can introduce many irrelevant items, reducing answer accuracy.

**Query Response Speed**: This criterion relates to user wait times and system resource consumption. Full-text retrieval, based on pre-built inverted indexes, is generally fast, especially with many documents. Semantic retrieval involves vector computation and similarity matching; its response speed typically falls between full-text and hybrid retrieval, depending on vector database performance and model inference speed. Hybrid retrieval, needing to execute both semantic and full-text searches and potentially merge and re-rank results, is usually the slowest. In scenarios requiring real-time responses, such as online customer service or instant Q&A, slow query response speed can lead to user dissatisfaction or abandonment.

**Index Structure Complexity**: This criterion affects system deployment difficulty, maintenance costs, and scalability. Semantic retrieval requires maintaining a vector index, storing embedded vectors of document content. Full-text retrieval needs an inverted index, usually based on the `fullTextToken` field of text content. Hybrid retrieval requires maintaining both index structures and merging and sorting results using algorithms like RRF (Reciprocal Rank Fusion). This increases index management complexity. More complex index structures demand higher underlying storage and computing resources and are more prone to issues like index corruption or time-consuming rebuilds, affecting system stability and availability. For example, full-text search in MongoDB requires creating a `text` index on specific fields.

**Recall Breadth**: This criterion measures the range of relevant information a retrieval mode can find. Semantic retrieval, by understanding query intent, can recall documents conceptually related to the query but not exactly matching in vocabulary, thus offering broad recall. Full-text retrieval focuses on precise keyword matching; its recall breadth is relatively narrow, potentially missing documents with different vocabulary but similar meaning. Hybrid retrieval combines semantic and full-text advantages for the broadest recall range, capturing both conceptual relevance and keyword precision. Recall breadth is an important consideration when you need to explore the knowledge base comprehensively and avoid missing any potentially relevant information.

**Recall Precision**: This criterion measures how well retrieval results match the user's query intent. Full-text retrieval offers high precision for exact keyword matching; for specific terms or phrases, it can quickly locate highly relevant documents. Semantic retrieval's precision depends on the embedding model's quality and the query's ambiguity. Its precision may be lower than full-text retrieval when query intent is clear. Hybrid retrieval combines the strengths of both modes. It can significantly improve recall precision by using re-rank models (e.g., bge-rerank) for secondary sorting, ensuring the presented information is both comprehensive and accurate. Recall precision is critical in scenarios requiring highly accurate answers, such as regulatory inquiries or technical manuals.

## The cost of switching later
Once you select and implement a retrieval mode, switching later incurs significant costs, primarily in these areas:

1.  **Data processing and index rebuilding**:
    *   **Data reprocessing**: Switching from full-text to semantic retrieval, or vice versa, may require reprocessing all documents in your existing knowledge base. For instance, semantic retrieval needs text content converted into vector embeddings. This involves selecting new embedding models, running vectorization services, and storing the generated vectors. If the new mode has different requirements for data chunking strategies, you might need to re-chunk text.
    *   **Index rebuilding**: Different retrieval modes rely on different index structures. Switching means destroying old indexes and rebuilding new ones. For example, moving from semantic to full-text retrieval might require creating a `text` index for text fields in the database (e.g., `db.dataset_data_texts.createIndex({fullTextToken:"text"});` in MongoDB). Switching from full-text to semantic might involve rebuilding vector indexes in vector databases (e.g., Milvus or PgVector). Index rebuilding is a resource-intensive and time-consuming process. For large knowledge bases, it can take hours or even days.
2.  **Downtime**: Knowledge base retrieval services often require downtime or operate in a degraded state during index rebuilding and data migration. This impacts business systems that rely on the knowledge base, preventing users from querying or accessing information normally. Even if you use a zero-downtime approach, it may require additional resources and complex synchronization mechanisms, increasing implementation difficulty.
3.  **Validation workload**: After switching retrieval modes, you need comprehensive testing and validation to ensure the new mode meets expected recall effectiveness and performance metrics. This includes:
    *   **Effectiveness evaluation**: Use manual evaluation, A/B testing, and other methods to compare new and old modes for recall accuracy, recall rate, and user satisfaction across different query types.
    *   **Performance testing**: Test the new mode's query response time, system throughput, and resource utilization to ensure stable operation under high concurrency.
    *   **Compatibility testing**: Verify compatibility with other modules (e.g., re-rank models, query optimization, empty search response settings) to ensure a smooth overall process. For example, version V4.6.6 introduced separate vector semantic retrieval, full-text retrieval, and re-ranking, with RRF for result merging. This change requires validating the synergistic operation of all components in the chain.
    *   **Threshold tuning**: For semantic retrieval, you need to re-test and adjust parameters like `minimum_relevance` to adapt to new embedding models or re-rank models (e.g., the bge-rerank model may require a relevance of 0.85 or higher).
4.  **Resource consumption**: The switching process requires additional computing resources (CPU, GPU for vectorization), storage resources (old and new indexes may coexist for a period), and network bandwidth. Your team will also need to invest significant human resources in planning, implementation, monitoring, and validation.

These costs can far exceed the time and money saved during initial selection. Therefore, weigh options carefully during initial decision-making to choose a mode with good scalability and adaptability.

## When this decision can wait
In some situations, you can postpone the retrieval mode decision or use default configurations to quickly launch a project. This delays the decision until a more opportune time:

1.  **Extremely small and single-content-type knowledge base**: When your knowledge base has very few documents (e.g., dozens), highly consistent content types, and relatively simple query needs, any basic retrieval mode (like default semantic retrieval) might meet initial requirements. At this stage, the marginal benefit of investing significant effort in mode selection and tuning is low.
2.  **Proof of Concept (PoC) stage**: During the PoC stage, the primary goal is to validate core business logic and user experience. You can initially adopt an easy-to-deploy and understand retrieval mode, such as semantic retrieval. It performs well with natural language queries and usually provides an acceptable baseline. Refine the retrieval strategy later based on PoC results and user feedback.
3.  **Limited resources and high urgency**: If project timelines are tight, and your team lacks experience in retrieval technology or has limited computing resources, prioritize an out-of-the-box, simple-to-configure mode. For example, if your existing infrastructure is better suited for keyword-based search, you can start with full-text retrieval. This helps you go live quickly and avoids project delays due to complex selection.
4.  **Lack of clear performance or accuracy metrics**: If you have not established clear retrieval performance (e.g., recall rate, accuracy) or user experience metrics in the early stages of a project, assessing the pros and cons of different retrieval modes lacks a basis. In this case, you can start with a general mode and gradually collect data during subsequent operations to clarify requirements before making a precise selection.

Delaying a decision is not irresponsible; it is a pragmatic strategy when resources, information, or time are limited. However, note that this decision becomes unavoidable once business grows or the knowledge base expands.

## Keep reading

- [Chunking by Document Type: How Each Class Splits and What Values to Use](/en/guide/chunking-strategy-selection)
- [When an Index Must Be Rebuilt: Triggers, Cost and Migration Paths](/en/guide/index-rebuild-and-migration)

## References

- [FastGPT environment variables](https://doc.fastgpt.cn/zh-CN/self-host/config/env)
- [FastGPT Docker Compose deployment](https://doc.fastgpt.cn/zh-CN/self-host/deploy/docker)

## Next steps

The criteria above can be checked against public documentation and a test deployment. To decide against a specific workload, data boundary and operations setup, contact sales for an assessment; the cloud service can be used first to validate feasibility before choosing a deployment form.

- Contact sales: assess the choice against your conditions
- Get started: validate feasibility on the cloud service
- Pricing: compare what each form covers
