---
title: Citations and Source Traceability for Undergraduate Curriculum Planning: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c018-f010
page_type: 行业问题页
application_area: education
meta_title: Program Revision | Citations | Checks
meta_description: Program Revision: review citations for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Undergraduate Curriculum Planning: Compare Documents and Locate Differences

## What this category's data looks like

This category's data looks like this: Undergraduate program revision involves three types of materials: program plans, course syllabi, and credit structure tables. Program plans are organized by major and record course names, credits, class hours, semesters offered, revision dates, and signatures; course syllabi correspond one-to-one per course and include course objectives, assessment methods, reference textbooks, and the signature of the author; credit structure tables summarize the credits and proportions of each module, with the reviewer's signature and version number attached. Materials enter by revision batch, and each batch includes a version identifier and a receipt. When entering this function, the program plan serves as the main record, while course syllabi and credit structure tables serve as comparison materials. Field characteristics are concentrated in names, quantities, dates, signatures, and version identifiers; any difference in any one of these may cause the ledger and materials to fail to match.

## Configuration and implementation checks

Configuration and implementation checks: This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and source identifier, and the length may be 0. The "discrepancy list" is completed subsequently by an AI node, code node, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Program plan | Whether course names, credits, class hours, semesters offered, revision dates, and signatures are consistent with the ledger | Compare names, quantities, and dates item by item, verify signatures and version identifiers, and record inconsistent fields |
| Course syllabus | Whether course objectives, assessment methods, reference textbooks, author signatures, and corresponding courses are consistent with the program plan | Align the two materials by course name, check dates and signatures, and mark items whose versions are not synchronized |
| Credit structure table | Whether the credits, proportions, reviewer signatures, and version numbers of each module are consistent with the program plan | Verify module credit totals and proportions, check signatures and receipts, and output a discrepancy list |
| Knowledge base retrieval node | Cited content is output as an array, the length may be 0, and the chain runs through | Inspect the `quoteList` of `responseData` (non-streaming module results returned with detailed output enabled), verify the `quoteMaxToken` budget, and record the number of array items separately |

## Three common errors

- Symptom: The name or credits of the same course do not match between the program plan and the course syllabus. Cause: The two materials were revised separately, versions were not synchronized, and they were not written back by batch.
- Symptom: The total module credits in the credit structure table are inconsistent with the program plan. Cause: Quantity fields were not checked item by item, and proportions were calculated according to an old version.
- Symptom: The course syllabus lacks the author's signature or the credit structure table lacks the reviewer's receipt. Cause: The review submission process was not closed-loop, and signatures and receipts were not archived with the materials.

## How to verify the setup

How to verify the setup: Acceptance for this function: ask a question with source-text support, and check whether the citation array and footnote markers can point back to the original text; then ask a question with no matching materials, confirm that the array is empty while the chain runs through, and inspect the `quoteList` in `responseData`.

Business test: use one real record to find fields inconsistent with the ledger, and record differences in names, quantities, dates, and signatures.

- Turn on citation footnote markers, compare against the source documents, and check item by item whether the cited fragments correspond to the original paragraphs
- Open the search parameter panel, check the values item by item, and verify the `quoteMaxToken` budget and the number of array items separately

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
