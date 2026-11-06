---
title: Citations and Source Traceability for Undergraduate Curriculum Planning: Track Progress and Check Statistics
slug: /en/industry/education-d006-c018-f010
page_type: 行业问题页
application_area: education
meta_title: Program Revision | Citations | Progress
meta_description: Program Revision: review citations for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Undergraduate Curriculum Planning: Track Progress and Check Statistics

## What this category's data looks like

The materials for progress records and statistical verification of undergraduate program revision come from three types: program plans, course syllabi, and credit structure tables. The program plan provides course names, credits, and revision dates, and is the master record of the progress table; the course syllabus provides the objectives and signatures of the corresponding courses, and is the supporting evidence for progress; the credit structure table provides the quantities and totals of each type of credit, and is the base table for the statistical scope. The materials are updated weekly, and revised drafts and final drafts coexist; the fields include course name, credits, date, signature, and receipt. When entering the knowledge base retrieval node, the three types of materials each serve as traceable original text fragments for subsequent field comparison, ledger writing, and report generation.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing an original text fragment and a source identifier, and the length can be 0. The "progress table and statistical scope description" is then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Program plan | Whether the course name, credits, revision date, and signature align item by item with the course syllabus | Open the footnote markers one by one in the citation array, trace back to the original text paragraphs, and check the course name and date; record the number of citations, and separately check the `quoteMaxToken` budget |
| Course syllabus | Whether the name, quantity, and date of the same course are consistent across the two materials, and whether the receipts are complete | Use the weekly records to verify the totals, and write exceptions next to the scope in the header; test-run a question with no matching material to confirm the array is empty while the pipeline still runs through |
| Credit structure table | Whether the quantities and total scope of each type of credit are written in the header, and whether the versions are synchronized | Open the search parameter panel and check item by item, confirming that the values are consistent with the knowledge base retrieval section; when the cited fragment does not match the original text, first check which material was hit in this round |
| Progress table and statistical scope description | Whether the recorded numbers match the statistical numbers, and whether the scope and exceptions are clearly written | Use the weekly records to verify the totals, and see whether the scope and exceptions are clearly written; check the citation source identifiers in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` |

## Three common errors

- Symptom: the name and credits of the same course do not match between the program plan and the course syllabus. Cause: the two materials were revised separately and not synchronized to the same version, and the field scope was not written in the header.
- Symptom: the date of the credit structure table is inconsistent with the revision date of the program plan. Cause: the versions were not synchronized, old drafts and new drafts coexist, and the retrieval hit an old draft without checking which material was hit in this round.
- Symptom: the course syllabus lacks a signature or receipt, yet the statistical total still includes it. Cause: the progress records did not list signature and receipt as check items, and the exception was not explained in the header scope.

## How to verify the setup

Acceptance of this feature: ask a question with original text support, and check whether the citation array and footnote markers can trace back to the original text; then ask a question with no matching material, and confirm the array is empty while the pipeline still runs through. The number of citations is the array length, and `quoteMaxToken` is the citation content budget; the two are not compared for equality; when the citation upper limit is involved, check the tokens of the cited text, and record the array count separately.

Business test: use the weekly records to verify the totals, and see whether the scope and exceptions are clearly written.

- Open the search parameter panel and check item by item, confirming that the values are consistent with the knowledge base retrieval section, and check whether the selected knowledge base uses the same vector model.
- Open the citation footnote markers in the conversation, compare against the source documents, and check that each citation can trace back to the original text paragraph; record the number of citations and the `quoteMaxToken` budget, and register them separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
