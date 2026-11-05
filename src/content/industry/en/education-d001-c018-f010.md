---
title: Citations and Source Traceability for Undergraduate Curriculum Planning: Find Supporting Evidence
slug: /en/industry/education-d001-c018-f010
page_type: 行业问题页
application_area: education
meta_title: Program Revision | Citations | Evidence
meta_description: Program Revision: review citations for evidence lookup. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Undergraduate Curriculum Planning: Find Supporting Evidence

## What this category's data looks like

The materials for undergraduate program revision usually include three types: the program plan, course syllabi, and the credit structure table. When they enter the knowledge base retrieval node, each plays a different role: the program plan provides the framework basis for total credits and course modules, the course syllabi give the class hours and assessment methods for individual courses, and the credit structure table summarizes the credit allocation for each module. All three types of materials carry fields, dates, and signature information: fields such as course name, credit count, and semester offered; dates such as revision year and effective time; signatures such as the department head and the teaching committee receipt. The material update cadence is synchronized with the training cycle. After revision, the old version may still remain in the knowledge base, causing the name, quantity, or date of the same record to mismatch across two materials, or the version to be out of sync, or signatures or receipts to be missing. The retrieval node returns cited snippets and source identifiers based on the selected knowledge base, for subsequent steps to compare fields, write ledgers, and generate reports.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text snippet and a source identifier, and the length can be 0. The "basis entries that can be traced back to the original text" are completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Program plan | Fields include course name, credit count, and semester offered; dates and signatures are complete | In the node, check the selected collections and their vector models, open the search parameter panel, and verify item by item |
| Course syllabi | Course name and credit count match the program plan, and the version is current | Compare against the source document and check whether the cited snippet is consistent with the original paragraph |
| Credit structure table | The total credits of each module match the program plan, and the date has not expired | Run a test with a question that has no matching material, and see whether the output is empty while the flow continues |
| Cited content output | The number of returned entries matches the materials hit; empty is also normal | Record the array length and separately check the tokens budget of the cited text |

## Three common errors

- Symptom: the name or credit count of the same course does not match across two materials. Cause: during revision, only one material was changed and the other was not updated in sync.
- Symptom: the cited snippet points to an old version of the program plan. Cause: the old version still remains in the knowledge base, and retrieval hits do not distinguish the current version.
- Symptom: the material is missing a signature or receipt, so the basis entry cannot be confirmed as effective. Cause: the revision process was not completed, and the signature page was not stored in the knowledge base along with the material.

## How to verify the setup

Acceptance of this feature: ask a question that has a basis in the original text, and check whether the citation array and the footnote markers can trace back to the original text; then ask a question with no matching material, and confirm that the array is empty while the flow completes.

Business test: ask a basis question that spans materials, see whether the answer gives a traceable source, and check the cited snippets in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList`.

- In the conversation, turn on the citation footnote markers and verify the cited snippets against the original paragraphs in the source document item by item.
- Open the search parameter panel and verify item by item, record the array length, and separately check the tokens budget of the cited text; do not compare it for equality with `quoteMaxToken`.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
