---
title: Citations and Source Traceability for Enterprise Employee Skills Assessment: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c035-f010
page_type: 行业问题页
application_area: education
meta_title: Employee Skills | Citations | Intake
meta_description: Employee Skills: review citations for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Enterprise Employee Skills Assessment: Handle Questions and Collect Missing Information

## What this category's data looks like

The filing materials for enterprise independent skilled talent evaluation usually include three types: the enterprise evaluation filing form, the evaluation specification, and the candidate roster. The filing form records the evaluation entity, occupation (trade), level, and venue information; the evaluation specification states the assessment method, scoring elements, and passing standards; the roster registers candidate names, ID numbers, declared levels, and years of work experience. The three types of materials corroborate each other in names, quantities, dates, and signature fields: the declared number of people in the filing form and the roster should be consistent, the level in the evaluation specification must be consistent with the filing form, and signatures and receipts must be complete. Materials are updated by batch, and it is common for versions to be out of sync, for the same record to have mismatched names or dates across two materials, and for signatures or receipts to be missing. When entering the Q&A acceptance and missing-item follow-up stage, the filing form serves as the basis for evaluation qualifications and scope, the evaluation specification serves as the basis for standards and procedures, and the roster serves as the basis for personnel and quantities. After a retrieval hit, cited snippets point back to the original text for subsequent field comparison, ledger writing, and report generation.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text snippet and a source identifier, and the length may be 0. The "acceptance record and items to be completed" are then completed by subsequent AI nodes, code nodes, or humans.

| Object | Check | Verification action |
| --- | --- | --- |
| Enterprise evaluation filing form | Check the occupation (trade), level, evaluation venue, date, and signature fields, and confirm consistency with the names and quantities in the evaluation specification and roster | Open the citation marker to point back to the original paragraph in the filing form, and compare the occupation name, level, date, and signature item by item |
| Evaluation specification | Check the assessment method, scoring elements, passing standards, and version number, and confirm synchronization with the level and batch date in the filing form | View the specification version and effective date in the cited snippet, and compare them with the batch dates in the filing form and roster |
| Candidate roster | Check candidate names, ID numbers, declared levels, years of work experience, and number of people, and confirm consistency with the declared number of people in the filing form and the levels in the evaluation specification | Use the cited snippets to check the number of people and levels, and check whether signatures or receipts are complete |
| Cited content output | The number of returned items is consistent with the matched materials; being empty is also normal; `quoteMaxToken` only constrains the citation text budget | Run a test with a question that has no matching materials, see that the output is empty while the pipeline continues, and separately record the number of array items |

## Three common errors

- Phenomenon: The name, quantity, or date of the same record does not match between the filing form and the roster. Cause: The two materials are maintained separately, and fields are not synchronized and checked during updates.
- Phenomenon: The evaluation specification version is not synchronized, and the cited snippet points to an old standard. Cause: Multiple versions are retained in the knowledge base, and retrieval hits an old version without marking the effective date.
- Phenomenon: The filing form or roster lacks signatures or receipts, and the cited snippet cannot point back to complete approval. Cause: The approval pages were not completed when the materials were archived, and retrieval only hits the main text.

## How to verify the setup

Acceptance of this feature: Ask a question with original-text support, check whether the citation array and markers can point back to the original paragraph, and record the number of array items; then ask a question with no matching materials, confirm that the array is empty while the pipeline runs through, and `quoteMaxToken` is only checked as the citation text budget.

Business test: Submit a question missing key information, see whether it first asks a follow-up before answering, and write the follow-up items into the acceptance record and items to be completed.

- In the node, check the selected knowledge base collections and their vector models, and open the search parameter panel to check the values item by item.
- In the conversation, open the citation markers, check whether the cited snippets are consistent with the original text against the source documents, and check the citation information in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList`.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
