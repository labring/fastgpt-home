---
title: Citations and Source Traceability for Self-Study Exam Records and Graduation Review: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c054-f010
page_type: 行业问题页
application_area: education
meta_title: Self-Study Exams | Citations | Multilingual
meta_description: Self-Study Exams: review citations for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Self-Study Exam Records and Graduation Review: Handle Multilingual Materials and Terminology

## What this category's data looks like

Self-taught examination registration record and graduation review materials consist mainly of registration records, course pass certificates, and graduation application forms. Their sources are provincial examination offices and main examining institutions, and their update cadence is synchronized with examination sessions and graduation processing batches. Registration records carry the candidate's identity, major, examination registration number, and historical scores; course pass certificates record the individual subject name, code, score, and date obtained; graduation application forms summarize the number of courses, credits, signatures, and receipts. When the materials enter the knowledge base retrieval node, each serves as an independent citation source, used for subsequent comparison of whether the names, quantities, and dates of the same record are consistent across the two materials, whether the versions are synchronized, and whether signatures or receipts are complete. During multilingual materials and terminology handling, the unified terminology glossary and the comparison draft must be able to point back to the original text passages, and the number of citations and the citation content budget are recorded separately.

## Configuration and implementation checks

The citation output of the knowledge base retrieval node outputs only an array of citation content, each item containing an original text fragment and a source identifier, and its length can be 0. The unified terminology glossary and the comparison draft must be handled subsequently by AI nodes, code nodes, or humans. Even if no content is found, the output chain will still complete.

| Object | Check | Verification action |
| --- | --- | --- |
| Registration record | Fields include name, examination registration number, major, course name, score, and date obtained; compared item by item with the course pass certificate and graduation application form, the names, quantities, and dates must be consistent | Open the citation marker to point back to the original text passage, and verify the source identifier and field values in `responseData` (non-streaming module results returned with detailed output enabled) |
| Course pass certificate | The individual subject name, code, score, and date obtained are consistent with the same record in the registration record; when versions are not synchronized, the latest batch prevails and is annotated | Compare against the source document, record the number of citations, i.e. the array length, and verify the citation text tokens separately with `quoteMaxToken` |
| Graduation application form | The number of courses, credits, signatures, and receipts are complete; they match the quantities and dates in the registration record and course pass certificate, and missing signatures or receipts must be marked | Open the citation marker in the conversation, point back to the original text item by item, and view the fragments and sources in `quoteList` |
| Unified terminology glossary and comparison draft | The same term is written consistently throughout, and the translated name can point back to the original text; sample three terms to check whether the writing is consistent throughout | Run a trial with a question that has no matching materials, and confirm that the citation array is empty while the chain continues |

## Three common errors

- Symptom: the same course name is written differently in the registration record and the course pass certificate. Cause: multilingual material terminology is not unified, versions are not synchronized, and citation fragments do not point back to the original text passages.
- Symptom: the number of courses in the graduation application form does not match the quantity in the registration record. Cause: the two materials have different update batches, signatures or receipts are missing, and citation source identifiers are not verified item by item.
- Symptom: there is no citation marker in the answer, or there is an answer but the citation array is empty. Cause: no materials were matched or the marker was not opened; an empty array is normal output and does not equal retrieval failure.

## How to verify the setup

Acceptance of this feature: ask a terminology question that has an original text basis, and verify whether the citation array and marker can point back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain completes.

Business testing: sample three terms to check whether the writing is consistent throughout, and verify whether the translated names can point back to the original text.

- In the node, verify the selected knowledge base collections and their vector models, and open the search parameter panel to verify the values item by item.
- Run a trial with a question that has no matching materials, and see that the output is empty while the chain continues; record the number of citations separately, and do not compare it for equality with `quoteMaxToken`.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
