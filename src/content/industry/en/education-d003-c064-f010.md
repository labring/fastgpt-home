---
title: Citations and Source Traceability for University Laboratory Safety Classification: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c064-f010
page_type: 行业问题页
application_area: education
meta_title: Lab Safety Categories | Citations | Intake
meta_description: Lab Safety Categories: review citations for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for University Laboratory Safety Classification: Handle Questions and Collect Missing Information

## What this category's data looks like

This page focuses on the university laboratory safety grading and classification scenario; the materials include the laboratory grading and classification table, the hazard source list, and the safety responsibility statement. The grading and classification table records the laboratory name, room number, category level, and hazard source type; the hazard source list sets out the specific hazard source names, quantities, storage locations, and control measures; the safety responsibility statement states the responsible person, signature, date, and receipt. When these three types of materials enter the Q&A acceptance and missing-item follow-up question function, the grading and classification table serves as the classification basis, the hazard source list serves as the hazard source verification basis, and the safety responsibility statement serves as the responsibility and sign-off basis. The materials are updated with the semester or year, and version synchronization and signature receipts are common weak points. The field characteristics are concentrated in four items: name, quantity, date, and signature, and inconsistencies easily arise during cross-material comparison.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text fragment and a source identifier, and the length can be 0. Even if no content is retrieved, the output chain will still run through. The acceptance record and the follow-up question items to be completed are then handled by subsequent AI nodes, code nodes, or humans.

| Object | Check | Verification action |
| --- | --- | --- |
| Laboratory grading and classification table | Whether the name, room number, category level, and date are consistent with the hazard source list | Locate the original text fragment of the grading and classification table in the citation array, compare field by field with the hazard source list, and record the discrepancies in name, quantity, and date |
| Hazard source list | Whether the hazard source name, quantity, storage location, and control measures correspond to the safety responsibility statement | Open the citation marker to point back to the original text paragraph, verify the hazard source quantity against the scope of responsibility in the responsibility statement, and mark missing items |
| Safety responsibility statement | Whether the responsible person, signature, date, and receipt are complete and version-synchronized | Check the signature and receipt fields against the cited fragment, and confirm that the date is consistent with the version of the grading and classification table |
| Knowledge base retrieval node | The associated knowledge base uses the same vector model, and the cited content is output as an array whose length can be 0 | Verify the selected collection and vector model, run a trial with a question that has no matching materials, and see whether the citation array in `responseData` (non-streaming module results returned with detailed output enabled) is empty while the chain continues |

## Three common errors

- Phenomenon: the name, quantity, and date of the same laboratory do not match between the grading and classification table and the hazard source list. Cause: the two materials are maintained by different personnel, and no cross-table verification was done during updates.
- Phenomenon: the safety responsibility statement lacks a signature or receipt, and the date is not synchronized with the version of the grading and classification table. Cause: the sign-off process is out of step with the material archiving rhythm, and the old version is still being cited.
- Phenomenon: there is no citation marker in the answer, or there is an answer but the citation array is empty. Cause: no material was hit in this round, or the cited fragment does not match the original text; first check the hit situation, then look at `quoteMaxToken` trimming.

## How to verify the setup

This function's acceptance: ask a question that has original text support, and verify whether the citation array and citation markers can point back to the original text; then ask a question with no matching materials, confirm that the array is empty while the chain runs through, and record the number of citations and the `quoteMaxToken` budget for separate verification.

Business test: ask a question that is missing key information, and see whether it first asks a follow-up question before answering, and whether the acceptance record lists the follow-up question items to be completed.

- Open the citation markers, verify the original text fragments and source identifiers one by one against the source documents, and confirm that each citation can point back to the original text paragraph.
- Run a trial with a question that has no matching materials, check whether the citation array length in `responseData` is 0, and whether the chain continues to run through.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
