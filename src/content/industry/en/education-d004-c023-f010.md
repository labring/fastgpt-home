---
title: Citations and Source Traceability for Student Discipline and Appeals: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c023-f010
page_type: 行业问题页
application_area: education
meta_title: Student Appeals | Citations | Handover
meta_description: Student Appeals: review citations for material handover. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Student Discipline and Appeals: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

In the scenario of student disciplinary actions and appeals, the drafting of materials and handover of responsibility involve three core document types: disciplinary fact materials, disciplinary decision documents, and appeal statements. Disciplinary fact materials record the course of conduct, time and place, involved personnel, and evidence list; disciplinary decision documents include the basis for the disciplinary action, type, effective date, and delivery receipt; appeal statements set out the appeal request, factual grounds, and submission date. When these three types of materials enter the knowledge base retrieval node, each plays a different role: disciplinary fact materials provide original factual fragments, disciplinary decision documents provide the basis for characterization and procedural nodes, and appeal statements provide objections and time limit information. In terms of update rhythm, fact materials are supplemented as the investigation progresses, decision documents are finalized after deliberation, and appeal statements are submitted within a time limit after delivery. Field characteristics center on names, quantities, dates, signatures, and version numbers; if any field is inconsistent between two materials, it constitutes a handover blocking point.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text fragment and a source identifier, and the length can be 0. The material drafts and handover records that can be issued are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Disciplinary fact materials | Field completeness check: whether the behavior description, time, place, involved personnel, evidence list, recorder signature, and date correspond item by item | In the knowledge base retrieval node, view the citation output, and use `responseData` (non-streaming module results returned with detailed output enabled) to check whether the cited fragments of this material cover the above fields; mark any missing item |
| Disciplinary decision document | Date and signature check: whether the disciplinary basis clauses, disciplinary type, effective date, delivery receipt signature, and date are consistent with the fact materials | Open the citation marker to compare with the source document, and check whether the dates and signatures in the cited fragments of the decision document match those in the cited fragments of the fact materials |
| Appeal statement | Version and date consistency check: whether the appeal request, factual grounds, submission date, and appellant signature connect with the delivery date of the decision document | Use `detail` to view the citation source identifier, and confirm that the date in the cited fragments of the appeal statement does not conflict with the date in the cited fragments of the decision document |
| Knowledge base retrieval node | Cited content is output as an array, and the length can be 0; even if no content is found, the output chain will still run through | Run a test with a question that has no matching materials, and see that the citation array is empty while the chain continues; then check that `quoteMaxToken` only constrains the citation text budget, while the number of array items is recorded separately |

## Three common errors

- Phenomenon: The names, quantities, and dates of the same record do not match between the disciplinary fact materials and the disciplinary decision document. Cause: The two materials were drafted separately, and the cited fragments were not compared field by field during handover.
- Phenomenon: The version of the disciplinary decision document was not synchronized, and the appeal statement cites the date of an old version of the decision document. Cause: After finalization, the knowledge base citation source was not updated, and retrieval hit an old version fragment.
- Phenomenon: The delivery receipt lacks a signature or the appeal statement lacks a submission date. Cause: The handover record did not list signature and date as prerequisites for receipt, and missing items were not blocked.

## How to verify the setup

Acceptance of this feature: ask a question with textual basis, and check whether the citation array and markers can point back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through.

Business test: draft one copy according to the template and complete one handover, and see whether missing items are blocked.

- In the knowledge base retrieval node, check the selected collections and their vector models, and confirm that the selected knowledge bases use the same vector model.
- Open the search parameter panel and check item by item, confirming that the values are consistent with those set in the knowledge base retrieval section.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
