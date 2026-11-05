---
title: Citations and Source Traceability for Undergraduate Curriculum Planning: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c018-f010
page_type: 行业问题页
application_area: education
meta_title: Program Revision | Citations | Handover
meta_description: Program Revision: review citations for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Undergraduate Curriculum Planning: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This category's data covers the drafting and responsibility handover of materials for undergraduate program revision, involving three types of materials: the program plan, course syllabi, and the credit structure table. The program plan gives the total credits and course modules; each course syllabus corresponds to a course's credits and offering semester; the credit structure table summarizes the proportions of each course category. When these materials enter the knowledge base retrieval node, each is cited as an independent source: the program plan provides the basis for modules and total credits, the course syllabi provide course names, credits, class hours, and assessment methods, and the credit structure table provides categorized statistics. The update cadence follows revision batches: the drafter first produces a draft, which is then signed off and handed over by the reviewer. Field characteristics center on course name, credit count, offering semester, revision date, signature, and receipt. The same record must be consistent across the three materials, with versions and dates synchronized; a missing signature or receipt is treated as an incomplete handover.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text snippet and a source identifier, and the length may be 0. The signable material drafts and handover records are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Program plan | Whether the module names, total credits, revision date, signature, and receipt are complete, and whether they are consistent with the course syllabi and the credit structure table | Open the citation superscript to trace back to the original text, check the fields and dates, and record the number of array entries |
| Course syllabi | Whether the course names, credits, class hours, offering semester, and assessment methods match the program plan and the credit structure table | Compare item by item against the cited snippets for names, quantities, and dates, and check whether versions are synchronized |
| Credit structure table | Whether the credit proportions of each course category, the total count, the version date, and the signature or receipt are complete | Check the cited source identifiers against the original paragraphs, and confirm that the totals and the sub-items are consistent |
| Handover record | Whether the responsible person, handover date, version number, and signed receipt are clear | Walk through a handover once using the template, and see whether missing items are blocked and a receipt is left |

## Three common errors

- Symptom: the name, credits, or date of the same course do not match across two materials. Cause: during drafting, different versions were cited separately, without tracing back to the original text for verification.
- Symptom: the program plan has been updated, but the course syllabi are still the old version. Cause: versions were not synchronized, and the version number and revision date were not checked during handover.
- Symptom: materials are missing a signature or receipt but still proceed to the next stage. Cause: the handover checklist did not block missing items, and the responsible person was not clearly defined.

## How to verify the setup

This feature's acceptance: ask a question that has a basis in the original text, check whether the citation array and superscripts can trace back to the original text, and inspect the source identifiers in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList`; then ask a question with no matching materials, and confirm that the array is empty while the pipeline still runs through. The number of citations is the array length, and `quoteMaxToken` is the citation content budget; the two are not compared for equality.

Business test: draft one document using the template and complete one handover, and see whether missing items are blocked.

- In the node, check the selected knowledge base collections and their vector models, open the search parameter panel, and verify the values item by item.
- Run a test with a query that has no matching materials, see that the output is empty while the pipeline continues, and record the number of array entries and the tokens of the cited text.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
