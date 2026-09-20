---
title: Knowledge Base Retrieval and Recall for Thermal Coal Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c028-f013
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Knowledge Base Retrieval and Recall for Thermal Coal
meta_description: Thermal coal data sources include public statistics from the National Energy Administration Coal Department, real-time dispatch data from major ports
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Knowledge Base Retrieval and Recall for Thermal Coal Intelligent Due Diligence Reports

## What the data for this category looks like
Thermal coal data sources include public statistics from the National Energy Administration Coal Department, real-time dispatch data from major ports, monthly production capacity announcements from coal production enterprises, and procurement demand announcements from downstream power and steel industries. Update frequencies vary significantly: National Energy Administration data updates monthly, port loading and unloading data updates daily, futures listed prices update in real time, and enterprise production capacity announcements update irregularly. Most documents are structured tables, containing fields such as mine site identification, calorific value, total sulfur content, ash content, origin, arrival time, and ownership of goods rights. Calorific value uses megajoules per kilogram as its unit, total sulfur content uses grams per kilogram, and cargo weight uses tons.

## What constraints these characteristics impose on knowledge base retrieval and recall
Dispersed data sources and inconsistent update frequencies require setting up multi-source differentiated synchronization tasks to avoid recalling outdated data. Diverse structured document fields and inconsistent units require unifying units and field formats during preprocessing to prevent matching failures due to unit or field name differences during retrieval. Downstream due diligence reports require precise matching of parameters for specific mine sites and time windows. Configure filtering rules based on the time and origin dimensions of metadata to narrow the retrieval pool. Real-time data has high freshness requirements, requiring frequent synchronization to the vector database. Static data can be updated less frequently to save resources.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `recall count` | `top 20` | Thermal coal data has numerous scattered fields. Initially retrieving a sufficient number of candidate results covers all relevant dimensions and prevents missing key mine site or time window data. |
| `similarity threshold` | `0.72–0.78` | Semantic similarity between terms related to thermal coal is relatively high. A threshold that is too low introduces irrelevant results, while a threshold that is too high filters out valid matching content. |
| `rerank return count` | `top 5` | Intelligent due diligence reports require precise core data. Five results meet multi-dimensional cross-verification needs while controlling report length. |
| `chunk length` | `800–1200 characters` | Most thermal coal structured documents are paragraphs split from tables. This length retains complete information units for single delivery orders or production capacity announcements. |
| `vector database sync cycle` | `real-time sync for port data, monthly sync for static production capacity data` | Port data has high timeliness requirements, while static production capacity data has a low update frequency. Differentiated synchronization balances resource usage and data freshness. |
| `metadata filtering rules` | filter by the `doc_type` and `publish_time` fields | Thermal coal data divides valid ranges by document type and release time. This accurately narrows the retrieval pool and improves retrieval efficiency.

> The parameter values provided on this page are all conventional recommendations used to determine starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require specific analysis, and it is recommended to test on your own samples before finalizing values.

## Three common errors
- Symptom: The reranking model returns `false`, and retrieval results have no valid reranked content. Cause: The bge-reranker model deployed via TEI did not correctly load weights, or the number of input candidate results exceeded the maximum sequence length supported by the model.
- Symptom: Retrieval results differ significantly between API calls and online chat. Cause: Online chat enables session context association by default, while API calls do not configure session parameters. This causes retrieval to not apply context filtering based on user historical queries.
- Symptom: Metadata filtering does not take effect, and retrieval results include documents from non-target categories. Cause: Metadata filtering was incorrectly set to filter post-retrieval results instead of knowledge base source data. Irrelevant documents are recalled first then skipped, without narrowing the retrieval pool as intended.

## How to confirm configuration is complete
- Run a single-source data retrieval test and verify that the fields of recalled results match those of target documents.
- Call the reranking interface, check that the sorting and relevance of returned results meet expectations, and confirm the reranking model loads correctly.
- After configuring metadata filtering rules, retrieve keywords from non-target categories and verify no relevant results are recalled.
- Compare retrieval parameters between API calls and online chat, and confirm their recall and reranking configurations are consistent.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
