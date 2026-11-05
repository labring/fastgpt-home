---
title: Citations and Source Traceability for District Teaching Research and Classroom Reviews: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c012-f010
page_type: 行业问题页
application_area: education
meta_title: Teaching Reviews | Citations | Review
meta_description: Teaching Reviews: review citations for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for District Teaching Research and Classroom Reviews: Trace Exceptions and Review Results

## What this category's data looks like

The materials for district and county teaching research activities and classroom observation and evaluation include three types: teaching research activity notices, classroom observation records, and classroom evaluation minutes. Notices contain the activity name, time, location, participants, and signatures/seals; classroom observation records contain the instructor, class, topic, observation points, and observer signature; classroom evaluation minutes contain evaluation points, conclusions, and review signature. Materials are archived by activity batch, and the update cadence follows the progress of activity implementation and supplementary entry. It is common for the name, quantity, and date of the same record to fail to match between the notice and the minutes, for versions not to be synchronized, and for signatures or receipts to be missing. When entering this feature, the three types of materials are retrieved as knowledge base sources: notices are used to verify basic activity information, classroom observation records are used to verify classroom facts, and classroom evaluation minutes are used to verify evaluation conclusions. Cited snippets point back to the original paragraphs for subsequent comparison of fields, ledger writing, and report generation.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original snippet and source identifier, and the length can be 0. The "anomaly list and review conclusions" are completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Teaching research activity notice | Check whether the activity name, date, participants, and signatures/seals are consistent with the classroom observation records and classroom evaluation minutes | Open the citation marker, compare against the original notice paragraph, and compare fields and dates item by item |
| Classroom observation record | Check whether the instructor, class, topic, observation points, and observer signature are complete | Check the number of items in the citation array and the matched materials, and verify whether each citation can point back to the original paragraph |
| Classroom evaluation minutes | Check whether the evaluation points, conclusions, and review signature match the notice and classroom observation records | Open the search parameter panel and check whether the values are consistent with the knowledge base retrieval settings |
| Knowledge base retrieval node | Check whether the selected collection uses the same vector model, and whether the cited content is output as an array and its length can be 0 | Run a test with a question that has no matching materials, and check whether `quoteList` in `responseData` (non-streaming module results returned with detailed output enabled) and the citation array are empty while the chain continues |

## Three common errors

- Symptom: The name, quantity, and date of the same record fail to match between the notice and the classroom evaluation minutes. Cause: Materials are archived in batches, versions are not synchronized, and retrieval hits an old version.
- Symptom: The classroom observation record lacks a signature or receipt, and the classroom evaluation minutes lack a review signature. Cause: The supplementary entry step is not closed-loop, and signature fields are not archived together with the materials.
- Symptom: There is no citation marker in the answer, or the cited snippet does not match the original text. Cause: This round did not hit the corresponding material, or it hit another material; you need to verify the hit first, then verify the trimming.

## How to verify the setup

Acceptance for this feature: ask a question with original-text support, and check whether the citation array and markers can point back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain still runs through.

Business test: create an anomaly record, see whether it can be traced to the source material, and record the number of citations and `quoteMaxToken` separately; do not perform an equality comparison.

- In the node, check whether the selected knowledge base collections and their vector models are consistent.
- Open the search parameter panel and check the values item by item, and check `quoteList` in `responseData` and the number of items in the citation array.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
