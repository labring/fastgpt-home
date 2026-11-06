---
title: Citations and Source Traceability for Student Discipline and Appeals: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c023-f010
page_type: 行业问题页
application_area: education
meta_title: Student Appeals | Citations | Intake
meta_description: Student Appeals: review citations for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Student Discipline and Appeals: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the student disciplinary action and appeal handling category; the materials include three types: disciplinary fact materials, disciplinary decision documents, and appeal statements. Disciplinary fact materials carry the course of conduct and the source of evidence, disciplinary decision documents carry the type of disciplinary action, the basis clauses, and the effective date, and appeal statements carry the demands, reasons, and submission time. When these three types of materials enter the knowledge base retrieval node, each is cited as an independent source: disciplinary fact materials answer whether the conduct is established, disciplinary decision documents answer whether the disciplinary action is compliant, and appeal statements answer whether the appeal request is within the time limit. Field characteristics are concentrated in four categories: names, quantities, dates, and signatures: the same student's name may be written differently in two materials, the quantity description of the same disciplinary fact may be inconsistent, the disciplinary decision date and the appeal submission date may contradict each other, and either the signature field or the receipt field may be missing. The update rhythm is mainly version replacement; when old versions of materials are not synchronously removed, retrieval will hit both the old and new versions at the same time. Therefore, intake records and follow-up questions for completing missing items need to compare fields first and then ask about missing items, while cited sources and traceability require that every citation can point back to the original paragraph.

## Configuration and implementation checks

The citation output of the knowledge base retrieval node outputs only an array of cited content, each item containing the original text fragment and source identifier, and the length may be 0; intake records and follow-up questions for completing missing items must be handled subsequently by AI nodes, code nodes, or humans. Even if no content is retrieved, the output chain will still run through.

| Object | Check | Verification action |
| --- | --- | --- |
| Disciplinary fact materials | Whether the names, quantities, dates, and signatures are consistent with the disciplinary decision document | Open the original disciplinary fact materials in the citation superscript, and compare item by item the name spelling, number of disciplinary violations, date of conduct, and signature field |
| Disciplinary decision document | Whether the type of disciplinary action, basis clauses, effective date, and signature receipt are complete | Check the type of disciplinary action and effective date in the original fragment of the disciplinary decision document, and check whether the signature field and receipt field are missing |
| Appeal statement | Whether the appeal demands, reasons, submission date, and signature correspond to the disciplinary decision document | Compare the submission date in the original fragment of the appeal statement with the effective date of the disciplinary decision document, and check whether the signature and receipt are synchronized |
| Cited content output | The number of returned items is consistent with the materials hit; being empty is also normal | Run a test with a question that matches no materials, and see whether the output is empty while the chain continues; check the length of the citation array in `responseData` (non-streaming module results returned with detailed output enabled), separately record the citation text budget of `quoteMaxToken`, and open `quoteList` to verify the source identifier |

## Three common errors

- Symptom: The name or quantity for the same record does not match between the disciplinary fact materials and the disciplinary decision document. Cause: The two materials are entered separately, no field-level comparison is performed, and one fragment is taken from each when citing.
- Symptom: The appeal statement submission date contradicts the effective date of the disciplinary decision document. Cause: The versions are not synchronized, and the old version of the disciplinary decision document is still in the knowledge base and can be hit by retrieval.
- Symptom: The disciplinary decision document lacks a signature or the appeal statement lacks a receipt, yet the answer still gives a complete conclusion. Cause: The cited fragments cover only the main text, and the signature field and receipt field are not hit by the cited content.

## How to verify the setup

This feature's acceptance: ask a question with an original-text basis, and check whether the citation array and superscript can point back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through.

Business test: submit a question missing key information, and see whether it asks a follow-up question before answering.

- In the conversation, open the citation superscript, compare it against the source document, confirm item by item that the cited fragments are consistent with the original paragraphs, and record the citation array length and the `quoteMaxToken` value.
- Run a test with a question that matches no materials, check `quoteList` within `responseData`, and confirm that the chain continues to run through when the citation array is empty.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
