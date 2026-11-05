---
title: Citations and Source Traceability for Vocational College Curriculum Planning: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c029-f010
page_type: 行业问题页
application_area: education
meta_title: Vocational Curricula | Citations | Checks
meta_description: Vocational Curricula: review citations for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Vocational College Curriculum Planning: Compare Documents and Locate Differences

## What this category's data looks like

This page focuses on three types of materials in the formulation of talent cultivation plans in vocational colleges: talent cultivation plans, curriculum standards, and job competency analysis tables. The talent cultivation plan provides the program positioning, study duration, and curriculum structure; the curriculum standard refines course objectives, content, and class hours; the job competency analysis table describes job tasks and competency requirements. The materials are mostly maintained separately by academic affairs offices, secondary schools/departments, and program leaders, and are updated periodically with policy adjustments, industry research, and teaching feedback. The field characteristics are concentrated in names, quantities, dates, and signatures: the naming style, class hour quantities, and approval dates of the same course in two materials need to be consistent, and version numbers and signature receipts need to be traceable. When the materials enter the knowledge base retrieval node, each serves as a citable original source, and the cited snippets and source identifiers are used to refer back to specific paragraphs for subsequent nodes to compare fields, write ledgers, and generate reports.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each containing an original snippet and a source identifier, and the length can be 0. The "discrepancy list" is then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Talent cultivation plan | Check whether course names, class hour quantities, approval dates, and signatures are consistent with the curriculum standards | Retrieve the original plan text, record cited snippets and source identifiers, compare field by field, and mark discrepancies |
| Curriculum standard | Check whether course objectives, content, and class hours are consistent with the corresponding entries in the job competency analysis table | Retrieve the original curriculum standard text, check the citation superscripts to refer back to paragraphs, and verify version numbers and signature receipts |
| Job competency analysis table | Check whether job tasks, competency requirements, and names are consistent with the wording in the talent cultivation plan | Retrieve the original analysis table text, record the number of citations and sources, and locate fields where names or quantities do not match |
| Cited content output | The number of returned entries is consistent with the matched materials; being empty is also normal | Run a test with a question that has no matching materials, see that the array is empty while the chain continues, and record the `quoteList` in `responseData` (non-streaming module results returned with detailed output enabled) |

## Three common errors

- Symptom: The name, class hour quantity, or approval date of the same course does not match between two materials. Cause: Field definitions were not unified during separate maintenance, and versions were not synchronized.
- Symptom: The curriculum standard has been updated, but the talent cultivation plan still cites the old version. Cause: Update rhythms are not synchronized, and version receipt verification is lacking.
- Symptom: Materials lack signatures or receipts, and cited snippets cannot refer back to the approval paragraphs. Cause: No trace was left in the circulation process, and source identifiers are incomplete.

## How to verify the setup

Acceptance of this feature: ask a question with textual evidence, and check whether the citation array and superscripts can refer back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through. Check `quoteList` within `responseData`, record the number of citations and `quoteMaxToken`, and do not compare the two for equality.

Business test: use a real record to find a field inconsistent with the ledger, hand it to the reviewer for confirmation, and write it back.

- In the node, check whether the selected knowledge base collections and their vector models use the same vector model.
- Open the search parameter panel and check the values item by item, confirming they are consistent with the values set in the knowledge base retrieval section.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
