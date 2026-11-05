---
title: Citations and Source Traceability for Student Discipline and Appeals: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c023-f010
page_type: 行业问题页
application_area: education
meta_title: Student Appeals | Citations | Multilingual
meta_description: Student Appeals: review citations for multilingual work. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Student Discipline and Appeals: Handle Multilingual Materials and Terminology

## What this category's data looks like

This page addresses the student disciplinary action and appeal processing category, focusing on multilingual materials and terminology handling for three types of materials: factual materials on disciplinary violations, disciplinary decision documents, and appeal statements. Factual materials on disciplinary violations provide the original records, including the names of persons involved, descriptions of conduct, dates of occurrence, quantities, and witness signatures; disciplinary decision documents carry the basis for characterization, clause citations, decision dates, and delivery receipts; appeal statements present the grounds for objection, requested matters, submission dates, and acknowledgment-of-receipt records. When these three types of materials enter the knowledge base retrieval node, each is cited as an independent source, and the cited snippets point back to the original paragraphs, for subsequent field comparison, ledger writing, and generation of a unified terminology table and comparison draft. The update cadence is version-based: factual materials are supplemented as the investigation proceeds, decision documents are finalized as deliberation concludes, and appeal statements are registered as they are accepted; any version change may cause the names, quantities, and dates of the same record to fail to match across two materials. Field characteristics center on the identifiers of persons involved, the time of conduct, clause numbers, and the positions of signatures and receipts.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing an original snippet and a source identifier, and the length may be 0. Even if no content is found, the output pipeline still completes. The "unified terminology table and comparison draft" is then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Factual materials on disciplinary violations | Whether the names of persons involved, conduct descriptions, dates of occurrence, quantities, and witness signatures are identical in form and value in the disciplinary decision document and the appeal statement | Use the same identifier of the person involved to separately retrieve the three types of materials, compare names, dates, and quantities item by item, and check whether signatures and receipts are complete |
| Disciplinary decision document | Whether the characterization clauses, decision date, and delivery receipt can mutually refer to the factual materials and the appeal statement | Open the citation markers to compare against the source documents, check whether the clause numbers and decision date are consistent across the two materials, and whether the receipt has missing items |
| Appeal statement | Whether the requested matters, submission date, and acknowledgment-of-receipt records are version-synchronized with the decision document and factual materials | Use the dates and requests in the appeal statement as clues to trace back to the first two materials, confirm where versions are not synchronized, and record the locations of discrepancies |
| Knowledge base retrieval node | Cited content is output as an array, the length may be 0, and an empty array still completes the pipeline | Run a trial with a question that has no matching materials, and see that the citation array in `responseData` (non-streaming module results returned with detailed output enabled) is empty while the pipeline continues; then check the values of `quoteList` and `quoteMaxToken` |

## Three common errors

- Symptom: the same person involved has different name spellings in the factual materials and the decision document. Cause: multilingual materials have not unified terminology, translated names do not point back to the original text, and versions are updated separately.
- Symptom: the conduct quantities and dates of occurrence do not match across the two materials. Cause: after the factual materials were supplemented, the decision document was not synchronized, and the cited snippets were taken from an old version.
- Symptom: the decision document lacks a delivery receipt or the appeal statement lacks an acknowledgment-of-receipt record. Cause: signatures were not fully collected during the material circulation step, and the citation array still returns snippets but the fields are incomplete.

## How to verify the setup

This feature's acceptance: ask a question with textual support, and check whether the citation array and markers can point back to the original paragraphs; then ask a question with no matching materials, and confirm that the array is empty while the pipeline completes.

Business testing: sample three terms to check whether their spellings are consistent throughout the entire text, and check whether translated names can point back to the original text.

- In the conversation, open the citation markers, compare them item by item against the source documents, and confirm that the cited snippets are consistent with the original paragraphs.
- Run a trial with a question that has no matching materials, check that the citation array in `responseData` is empty while the pipeline continues, and separately record the array length and the values of `quoteMaxToken` and `quoteList`.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
