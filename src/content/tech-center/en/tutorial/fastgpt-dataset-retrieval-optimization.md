---
title: Optimize Retrieval Performance for FastGPT Datasets
slug: /en/tutorial/fastgpt-dataset-retrieval-optimization
page_type: 教程/部署
source: https://doc.fastgpt.cn/en/guide/dataset/rag
source_type: 官方文档
---

# Optimize Retrieval Performance for FastGPT Datasets

The retrieval component directly determines the relevance and accuracy of answers generated via FastGPT. Hybrid search strategies combining BM25 and DPR offer complementary matching capabilities: BM25 efficiently handles keyword-based matching, while DPR excels at deep semantic understanding of query intent and content context.

### Core Retrieval Challenges
Retrieval workflows face four key limitations:
- Single retrieval strategies introduce answer bias by restricting matching to narrow scope
- A persistent tradeoff exists between retrieval efficiency and computational resource consumption
- Redundant retrieval results lead to repetitive, low-quality generated content
- Fixed retrieval configurations lack adaptability across diverse task types

### Standard Retrieval Optimization Techniques
Several evidence-based improvements address these challenges:
- Hybrid retrieval pipelines: Combine BM25 and DPR workflows, using BM25 for initial keyword filtering to narrow result sets, followed by DPR for deep semantic matching to refine relevant results
- Efficiency optimizations: Implement caching for frequently submitted queries to reduce redundant processing, and use distributed computing to enable parallel retrieval tasks
- Result refinement: Apply deduplication algorithms to remove overlapping content, plus ranking optimization to prioritize high-relevance results
- Dynamic strategy adjustment: Tailor retrieval approaches to task type: prioritize semantic search for medical Q&A workflows, and keyword matching for news-related scenarios
- Extensibility integration: Connect retrieval optimization frameworks such as Haystack to enhance system extensibility

### Step-by-Step Hybrid Retrieval Setup
Follow these steps to implement optimized retrieval for FastGPT datasets:
1. Enable BM25 keyword matching as the primary initial retrieval layer in dataset configuration
2. Configure DPR semantic matching as a secondary retrieval layer to process results filtered by BM25
3. Activate query caching for repeated user inputs to reduce redundant computational load
4. Enable distributed parallel processing to scale retrieval throughput
5. Turn on deduplication and ranking algorithms to clean and prioritize retrieval results
6. Define task-specific retrieval rules: assign semantic search for medical Q&A tasks, and keyword matching for news scenarios
7. Integrate the Haystack framework to add extensible optimization features

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/guide/dataset/rag)
