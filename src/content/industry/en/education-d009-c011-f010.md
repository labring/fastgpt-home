---
title: Citations and Source Traceability for School Exam Question Setting and Grading: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c011-f010
page_type: 行业问题页
application_area: education
meta_title: School Exams | Citations | Multilingual
meta_description: School Exams: review citations for multilingual work. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for School Exam Question Setting and Grading: Handle Multilingual Materials and Terminology

## What this category's data looks like

This page addresses the scenario of primary and secondary school exam question setting and grading. Materials include the question-setting two-way specification table, exam papers, grading rubrics, and multilingual materials with terminology comparison drafts. The question-setting two-way specification table gives the correspondence between assessment dimensions and question numbers; the exam papers carry question stems and options; the grading rubrics specify scoring points and translated-name conventions; the multilingual materials provide original-text sources. When these materials enter the knowledge base retrieval node, each is associated as an independent document or segment, and candidate fragments of the glossary and comparison drafts are scattered among the specification table, exam papers, and grading rubrics. The update cadence follows question-setting batches and language versions, and the same term may appear with different written forms across multiple materials. Field characteristics center on names, quantities, dates, and signature fields; version numbers and receipts must also be retained together for subsequent comparison and traceability.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing an original-text fragment and a source identifier, and the length may be 0. Unifying the glossary and comparison drafts is then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Question-setting two-way specification table | Whether the correspondence between assessment dimensions and question numbers, as well as the question-setting date and signature field, are complete | Open the specification table and check question numbers against dimensions item by item, then compare whether the same record's name, quantity, and date in the exam papers and grading rubrics are consistent; if a signature or receipt is missing, mark it |
| Exam papers | Question stems, options, and multilingual translated-name written forms must be traceable back to the original-text paragraphs | In the conversation, open the citation superscripts and check each citation against the source documents; use `responseData` (non-streaming module results returned with detailed output enabled) to view the citation array, use `quoteList` to view a single source identifier, and confirm that translated names can be traced back to the original text |
| Grading rubrics | Scoring points and terminology written forms must be synchronized with the versions of the specification table and exam papers | Check item by item whether the terminology written forms in the grading rubrics match those in the exam papers, and check version numbers and dates; record the number of citations separately, and view the tokens of the cited text against the `quoteMaxToken` budget; do not compare the two for equality |
| Multilingual materials and terminology comparison drafts | The correspondence between translated names and the original text, and whether the citation sources can be traced | Sample three terms and check whether their written forms are consistent throughout the whole text, then check whether the original-text fragments and source identifiers in the comparison drafts can be traced back; if a receipt is missing, return it for supplementation |

## Three common errors

- Phenomenon: the same term has inconsistent written forms in the specification table, exam papers, and grading rubrics. Cause: the multilingual materials and terminology comparison drafts were not updated in sync, and versions were not aligned, causing the same record's name to fail to match.
- Phenomenon: the same question number's quantity and date do not match between the exam papers and grading rubrics. Cause: after a question-setting batch update, only one material was changed while the other remained at the old version, and no cross-check was performed.
- Phenomenon: the grading rubrics lack a signature or receipt, and the cited fragments do not match the original text. Cause: first check whether this round hit a match and which material was hit, then look at trimming; an empty citation array does not equal retrieval failure.

## How to verify the setup

Acceptance of this feature: ask a terminology question that has an original-text basis, and check whether the citation array and superscripts can be traced back to the original text; then ask a question with no matching material, and confirm that the array is empty while the pipeline still runs through.

Business testing: sample three terms and check whether their written forms are consistent throughout the whole text, check the written forms of the same term in the specification table, exam papers, grading rubrics, and comparison drafts, and record the number of citations and the `quoteMaxToken` budget.

- In the node, check the selected knowledge base collections and their vector models, and confirm that the selected knowledge bases use the same vector model.
- Open the search parameter panel and check the values item by item; run a trial with a query that has no matching material, and see that the output is empty while the pipeline continues.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
