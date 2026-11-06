---
title: Citations and Source Traceability for Exam Organization and Misconduct Handling: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c039-f010
page_type: 行业问题页
application_area: education
meta_title: Exam Administration | Citations | Multilingual
meta_description: Exam Administration: review citations for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Exam Organization and Misconduct Handling: Handle Multilingual Materials and Terminology

## What this category's data looks like

The exam organization and violation handling category covers three types of materials: exam administration manuals, examination room record sheets, and violation fact records. Fields include candidate name, examination room number, exam subject, violation time, fact description, handling basis, invigilator signature, candidate signature, and receipt date. Multilingual versions of materials run in parallel, with sources being finalized and revised drafts in each language, and the update cadence changes with exam batches and rule adjustments. When entering this feature, the exam administration manual serves as the terminology and process baseline, the examination room record sheet provides on-site fields and signature evidence, and the violation fact record carries the fact description and handling decision. Together, the three support citation traceability for the unified terminology glossary and comparison drafts.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text snippet and source identifier, and the length can be 0. The "unified terminology glossary and comparison drafts" are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Exam administration manual | Terminology and process fields are consistent across multilingual versions, and translated names can refer back to the original paragraphs | Check item by item how candidate name, examination room number, exam subject, violation time, and handling basis are written, and confirm that citation superscripts point to the original text |
| Examination room record sheet | The name, quantity, and date of the same record are consistent between the manual and the record sheet, and signatures and receipts are complete | Compare the examination room number, violation fact description, and date in the two materials, and check whether the invigilator signature, candidate signature, and receipt date are missing |
| Violation fact record | The fact description and handling decision can refer back to the original source, and the version is synchronized with the current batch | Sample three terms and check their usage throughout the document, verify the cited snippets and source identifiers in `responseData` (non-streaming module results returned with detailed output enabled), and confirm that `quoteList` can expand the original text |
| Cited content array | The array length can be 0, the number of citations matches the hit materials, and no equality comparison is performed | Run a trial with a question that has no matching materials and see whether the array is empty while the chain still runs; when the citation limit is involved, check the tokens of the cited text, and record the array item count separately |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the exam administration manual and the examination room record sheet. Cause: Multilingual versions are not synchronized, and the terminology glossary does not uniformly refer back to the original text.
- Symptom: The violation fact record lacks an invigilator signature or candidate receipt. Cause: Signature fields were not checked before the materials entered retrieval, and versions were not synchronized, causing old drafts to be mixed in.
- Symptom: The answer has content but the citation array is empty, or the cited snippets do not match the original text. Cause: No materials were hit in this round, or a different material was hit; you need to check the hit first and then check the trimming.

## How to verify the setup

Acceptance for this feature: ask an exam administration terminology question with original text support, and check whether the citation array and superscripts can refer back to the original text; then ask a question with no matching materials, confirm that the array is empty while the chain still runs, and record the number of citations in `quoteMaxToken` and `responseData`.

Business test: sample three terms and check whether their usage is consistent throughout the document, and confirm that translated names can refer back to the original text.

- In the node, check whether the selected knowledge base collections and their vector models are consistent, and open the search parameter panel to check the values item by item.
- Run a trial with a question that has no matching materials, and see whether the output is empty while the chain continues; in the conversation, open the citation superscripts and compare with the source documents to verify that `quoteList` can expand the original text.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
