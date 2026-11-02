---
title: FastGPT Continuing a Workflow When Retrieval Has No Evidence
slug: /en/guide/empty-retrieval-evidence-handoff
page_type: Deep-dive guide
source: https://github.com/labring/FastGPT
source_type: 官方文档
meta_title: FastGPT Continuing a Workflow When Retrieval Has No Evidence
meta_description: Review continuing a workflow when retrieval has no evidence. Check inputs, handoffs, source evidence and failure handling with repeatable tests.
keywords: retrieval, citation tracing, workflow routing, HTTP integrations
schema_type: TechArticle
date_published: 2026-10-26
date_modified: 2026-10-26
---

# FastGPT Continuing a Workflow When Retrieval Has No Evidence

**When a knowledge base search provides no usable evidence, the first step is to determine whether the missing element is the subject of the query, the source material itself, or the recall of indexed content. This determination dictates whether the appropriate next action is to request more information, seek additional documentation, or transfer the task. The citation output of the FastGPT Knowledge Base Search node is an array, which is permitted to have a length of zero. An empty array does not automatically cause the workflow to terminate with an error. The subsequent response must be explicitly implemented in the application's design. A retail after-sales scenario can illustrate this boundary: the identity of an order, the merchant's refund policy, and the snippets retrieved in a specific search each answer different questions and cannot substitute for one another.**

## Distinguishing Three Types of Evidence Gaps

Assume a consultation begins with only the text, “Can this order be refunded?” without the current session providing an order number or other identifying material. In this case, the subject of the query is missing. Even if the knowledge base contains the complete policy, it is impossible to determine which transaction to check. The application should first collect the identifiers and query scope required for the task. The specific fields are derived from actual business materials and subsequent query contracts, not from a uniform order format preset by industry, nor should the model be allowed to invent a number.

Another situation occurs when the order is clearly identified, yet the knowledge base contains only order details and refund records, not the applicable refund policy. The records can prove the events they document, not all conditions for a refund. The correct handling is to request confirmed policy documentation or to hand the query over to a business process capable of obtaining these materials. One cannot deduce that the current order has the same eligibility merely because a different order was once refunded.

It is also possible that the original policy text has been indexed in the knowledge base, yet the current search did not return any relevant snippets. This situation requires checking the knowledge base's scope, its processing status, the phrasing of the query, and the search settings. It is necessary to first confirm that the material does exist and is accessible before discussing recall parameters. These three types of gaps may occur simultaneously. Investigation records should separately list the materials that have been obtained, the evidence that has not, and the inputs that need to be supplemented, to prevent one adjustment from masking a different gap.

## Collecting Verifiable Information When the Input Lacks a Subject

Query optimization refers to disambiguation and query expansion. When a continuous conversation has already specified an order, a comparison between the query before and after optimization can check whether the subject and constraints have been maintained. When a new session does not provide a subject, the application should prompt for or collect information. Neither changing the model nor extending the length of the response can transform an unprovided transaction identity into a known fact. If a new number not present in the original input appears in the optimized result, its source should be investigated.

The FastGPT Form Input node is responsible for collecting filled-in information and passing it to subsequent nodes upon submission. A proposed implementation is to first collect a confirmed transaction identifier and the subject of the query, then connect to retrieval or authorization interfaces. Field validation, transaction authenticity verification, and business eligibility judgment are implemented according to subsequent plans. The form itself is not a business database, nor does it automatically read an entire order file.

The User Select node is suitable for guiding a user into corresponding branches based on pre-designed options, such as choosing to query existing records, supplement materials, or transfer for processing. The actual connection for each option requires item-by-item verification. The node's state of waiting for interaction does not prove that an external query or refund has been completed. After submission, the values received by subsequent nodes should be checked, and the external results should be verified separately.

## Clarifying Responsibility for Supplementing and Processing When Source Material Is Missing

When retrieval returns an empty citation array, the subsequent implementation should check the actual output and determine the processing paths the application can take. Decision points, variable handling, and page responses must be implemented according to the actual workflow. Stating “transfer to a human agent when there are no results” does not constitute a pre-configured universal switch; it must be built. If the workflow is allowed to continue generating a response, the scope of available materials and the evidence gap must be explicitly passed to the response generation step. This prevents the model from using general knowledge to invent policy details.

When materials need to be obtained from an external system, the HTTP request's address, method, parameters, headers, and body must be checked against the other party's API contract. Authentication is configured through protection mechanisms; public examples do not display real credentials. The data returned by the API only supports the facts actually recorded within it. When an external system does not provide the latest logistics status, the application cannot generate a real-time status based on a shipping label. The resource authorization required for the query must still be confirmed independently.

Actual refunds, order write-backs, or ticket routing are completed by the corresponding business interfaces or personnel. The process design should specify who receives the query, what materials are needed, and how to verify the result. A successful request initiated by the application does not mean the business transaction is complete. A model-generated message like “Processing successful” cannot replace an external record. Querying and writing can employ different permissions and validation steps; the specific plan is determined by actual business requirements.

## Verifying Recall and Citations Layer by Layer When the Original Text Exists

First, re-check the selected knowledge bases with a query for which an answer is known to exist in the original text, confirming the material version and processing status. When a Knowledge Base Search node is associated with multiple knowledge bases, they must use the same vector model. The ability to be associated together does not imply that the current account has permission to read all materials; task scope and access authorization are checked separately. Categories, tags, and similarity scores cannot replace authorization verification.

Search modes can be compared using sample queries for semantic, full-text, and hybrid retrieval. Test identifiers, terminology, and natural language questions separately, checking whether the returned snippets genuinely support the answer. Hybrid retrieval combines vector and full-text results, which are fused via Reciprocal Rank Fusion (RRF). When the target original text is not among the candidates, check the materials and recall first; reranking cannot substitute for missing original text. A conclusion about a mode's general effectiveness cannot be drawn from a single result.

The minimum relevance score is effective only in semantic search or when using result reranking; pure hybrid retrieval should not be considered to have the same filtering condition. The citation limit is controlled by tokens, and it should be checked whether critical conditions are being truncated. Numeric values without an official basis should not be written as default values or recommended thresholds. Finally, verify whether the retrieval output is passed to the response generation step. Compare the response, the cited snippets, and the original text side-by-side to confirm that no new, unsubstantiated judgments have been added.

## Verifying Through to Final Handover with Control Samples

For acceptance, five groups of self-devised samples can be proposed: a query with a complete subject and an answer in the original text; a query with a missing subject; a query for which the original text has no answer; a query where older phrasing is a closer match; and a case where an external query failed to provide a result. For each group, first write down the expected path and the basis for it, then record the actual input, search output, response, and handover result. The number of samples should be arranged according to the scale of the materials. These testing suggestions do not represent tests that have already occurred.

When the subject is missing, check if the application requests the necessary information. When the policy is missing, check if a supplementary search or a handover is clearly specified. When the original text exists, verify the retrieved snippets and their applicable subjects. For historical materials, their validity should be judged based on business-confirmed effective dates; a retrieval score cannot prove that the material is still applicable. For external processes, read back the actual reception and processing records; a node's name or the end of a conversation cannot serve as evidence of completion.

Each adjustment should state which layer of the problem it solves and be re-tested with the same group of samples. The changes brought by supplementing policy materials should be recorded separately from the changes brought by modifying retrieval settings. Retaining unexplained discrepancies helps to clarify whether the next step is to supplement materials, fix connections, or check external interfaces. The final object of acceptance is the verifiable materials and processing path; the fluency of the response only reflects its presentation style.

Further reading: [FastGPT technical guide](https://fastgpt.io/en/tutorial/fastgpt-dataset-search-params).
