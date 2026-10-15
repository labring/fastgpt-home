---
title: When the Knowledge Base Has the Answer but Search Misses It: A Layer-by-Layer Diagnosis
slug: /en/guide/kb-retrieval-miss-diagnosis
page_type: Deep-dive guide
source: https://doc.fastgpt.cn/zh-CN/self-host/config/env
source_type: Open-source repository docs and community threads
article_section: Selection & Evaluation
is_part_of: FastGPT Tech Center
meta_description: A structured layer-by-layer diagnostic guide for technical decision-makers and platform operators to resolve enterprise AI knowledge base search failures when relevant content exists but is not retrieved.
schema_type: TechArticle
date_published: 2026-10-15
date_modified: 2026-10-15
---

# When the Knowledge Base Has the Answer but Search Misses It: A Layer-by-Layer Diagnosis

## When this becomes a decision
Your enterprise uses the knowledge base as core business support—like ops troubleshooting, customer service, or dev docs queries. A single search failure stops your workflow. If you retry with adjusted queries or reupload documents and still get no results, the issue moves from a minor inconvenience to a systematic fault.

Technical and ops leads must know this failure does not have one single cause. It ties to search configuration, model parameters, storage logic, and more. Layered troubleshooting avoids wasted costs from random parameter tweaks or full knowledge base rebuilds. This is even more critical when you use advanced setups like hybrid search or reranking—simple keyword changes won’t fix hidden issues.

If your team relies on the knowledge base for critical decisions, search failures can skew choices and expand impact. When failures affect multiple business teams, make this a high-priority technical task with standardized troubleshooting steps.

## What to settle first
| Criterion | What to set | Basis |
| --- | --- | --- |
| Search term original input | Record the user’s actual search text | Official documentation search test parameter instructions |
| Search mode configuration | Verify the current `searchMode` type in use | Official documentation search test parameter instructions |
| Minimum relevance threshold | Test incrementally from low to high based on real-world scenarios | Community feedback on minimum relevance threshold issues |
| Reranking model enable status | Check if reranking is enabled and its corresponding service status | Official documentation reranking model deployment instructions |
| Single-search token limit | Verify the configured `limit` parameter value | Official documentation search test parameter instructions |
| Historical context carrying rule | Check if non-current query content is included | Community feedback on workflow reranking bringing in historical data |

Prioritize these checks based on your business’s priority order. Start with the search query first: confirm the original input has no spelling or semantic errors to rule out user-side mistakes. The `searchMode` setting defines your recall logic: `embedding` uses vector embeddings for semantic matching, `fullTextRecall` uses keyword matching for clear keyword queries, and `mixedRecall` combines both for complex use cases.

Adjust the minimum relevance threshold to balance recall rate and accuracy—too low brings in irrelevant content, too high misses valid results. Test values incrementally to find the right fit for your needs. Check reranking model status: it directly impacts result ranking accuracy. If results are poorly sorted, first confirm the reranking service is running.

The token limit per search controls how much content is retrieved; exceeding it cuts off valid content. Historical context can interfere with current search accuracy—disable or limit historical input in workflow scenarios. All checks must use observable interface data or logs, not subjective judgment.

## How to do it
First, run checks on search queries and modes. Use the official search test API, pass the target knowledge base ID and the user’s actual search text to get raw recall results. Verify the `searchMode` parameter—it supports `embedding`, `fullTextRecall`, and `mixedRecall` three modes. Confirm it matches your query type.

For `fullTextRecall`, check if tokenization fits your scenario (enable jieba tokenization for Chinese use cases). If you need to optimize the query, turn on the `datasetSearchUsingExtensionQuery` parameter. This uses a question optimization model to generate better matching search terms. Confirm `datasetSearchExtensionModel` and `datasetSearchExtensionBg` are configured correctly. If you don’t use query optimization, check if the original query’s semantic matches the knowledge base content to avoid word form mismatches.

Next, validate similarity and reranking steps. For semantic retrieval, check the `similarity` parameter value—it’s a number between 0 and 1, only active when semantic retrieval or reranking is enabled. If results are less relevant than expected, use the search test tool to adjust the similarity threshold and test against your business needs.

If you use reranking, confirm the `usingReRank` parameter is set correctly. Also check the reranking model’s deployment status. If the reranking service fails, results may be poorly sorted or missing. Note the reranking model’s input token limit—exceeding it causes reranking failure. Adjust the number of recalled content to fix this. If reranking results are off, temporarily disable reranking to confirm if the issue comes from the model service.

Then check token budget and workflow data retrieval. Verify the `limit` parameter value—it’s the maximum token count per search. Official docs say this maxes at 20000 tokens. Adjust it based on your business needs to avoid cutting valid content.

In workflow scenarios, check if historical conversation content is included in the search. Some configs automatically add multiple historical records, which can lower current search relevance. Disable historical context carrying or adjust the number of historical records to fix this. Also check knowledge base metadata filter configs—like `collectionId` filters or metadata screening. Confirm the filters are correct to avoid accidentally excluding valid content.

If you use Milvus vector database, confirm the system version meets requirements. Older versions cause full-text search failures that prevent content recall.

Finally, use logs and system metrics to validate your checks. Look at the search API’s response logs. Confirm the returned `score` field matches your expected relevance threshold. If the score is lower than your `similarity` parameter, the similarity filter isn’t working. Check if the full-text index in the database is updated properly. If knowledge base content isn’t synced to the index, new content won’t be retrievable.

For Milvus deployments, confirm the version is 2.5.16 or higher—older versions stop full-text search functionality. Check system resource usage: if the vector database or reranking model runs out of resources, search fails. Adjust resource configs or search parameters to fix this.

## How to verify
1. Call the official search test API, pass the target knowledge base ID and the user’s actual search term. Confirm the returned results include your pre-set expected content.
2. Verify the `searchMode` configuration matches your business query type. For semantic retrieval, confirm the returned `score` field meets your set minimum relevance threshold.
3. When reranking is enabled, confirm the returned results are sorted by relevance—highly relevant content appears before lower-relevance content.
4. Check the single-search token limit configuration. Confirm the total token count of returned results does not exceed the set `limit` parameter value.
5. In workflow scenarios, confirm the search results only include content relevant to the current conversation’s search term, with no non-current historical content included.
6. Review the search API’s runtime logs. Confirm there are no error messages, and the returned `score` field matches your set minimum relevance threshold.
7. For deployments using Milvus vector database, confirm the system starts without version incompatibility errors, and full-text search is enabled normally.

## Limits: when this approach does not hold
This troubleshooting method relies on normal knowledge base index generation and stable storage services. If your vector database or full-text search storage has faults—like Milvus versions lower than 2.5.16, or MongoDB full-text index corruption—search fails outright. In this case, fix the storage service first, not use this method.

If knowledge base content hasn’t finished indexing—like failed chunked uploads, or metadata config errors preventing correct index writing—this method can’t locate unindexed content. If your embedding or reranking models are down or out of resources, search results will be abnormal. First validate the model service status before further troubleshooting.

In workflow scenarios, if the search node has incorrect permissions and can’t access the target knowledge base, this method’s results will be limited by permissions. Fix permission issues first. If knowledge base index sync has delays—newly uploaded content hasn’t updated the index yet—search results will miss new content. Wait for sync to finish or trigger a manual sync.

If your system has unresolved known bugs—like abnormal sorting scores when searching across multiple knowledge bases—this method’s checks may not cover these cases. Review version update notes to confirm if known issues exist.

## Keep reading

- [Integrating Through the Chat API: Sessions, History and Per-Run Details](/guide/chat-api-session-and-run-detail)

## References

- [FastGPT environment variables](https://doc.fastgpt.cn/zh-CN/self-host/config/env)
- [FastGPT upgrade notes](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/upgrade-instruction)

## Next steps

The criteria above can be checked against public documentation. To apply this process to a specific deployment, contact sales for support; the cloud service can be used directly to validate the process first.

- Contact sales: apply this process to your deployment
- Get started: validate the process on the cloud service
- Pricing: compare what each form covers

> Criteria taken from the open-source repository, verified 2026-09-28.
