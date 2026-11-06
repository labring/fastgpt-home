---
title: Citations and Source Traceability for Exam Organization and Misconduct Handling: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c039-f010
page_type: 行业问题页
application_area: education
meta_title: Exam Administration | Citations | Intake
meta_description: Exam Administration: review citations for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Exam Organization and Misconduct Handling: Handle Questions and Collect Missing Information

## What this category's data looks like

This category covers exam administration and violation handling. Materials include exam administration manuals, examination room record sheets, and violation fact records. The exam administration manual serves as the rule base, specifying process nodes and handling standards; the examination room record sheet serves as process evidence, carrying time, examination room, and invigilator signatures; the violation fact record serves as case evidence, containing candidate information, behavior descriptions, determinations, and receipts. The three types of materials are updated by session and batch, rule versions iterate with notices, record sheets are archived when the exam ends, and fact records are countersigned as handling progresses. When materials enter this feature, the exam administration manual provides the clause basis, the examination room record sheet provides the factual source, and the violation fact record provides determination and signature clues; citation sources and traceability allow each answer segment to point back to specific material passages, and missing-item follow-up uses this to determine which material has not yet been provided.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and a source identifier, and the length may be 0. "Intake records and completed follow-up items" are completed subsequently by AI nodes, code nodes, or humans.

| Object | Check | Verification action |
| --- | --- | --- |
| Knowledge base retrieval node | The associated knowledge base uses the same vector model, and cited content is output as an array whose length may be 0 | In the node, check the selected collection and vector model, run a test with a question that has no matching materials, see that the output is empty while the chain continues, and record the number of array items in `responseData` (non-streaming module results returned with detailed output enabled) |
| Exam administration manual | Clause numbers, effective dates, and handling standards can be traced back to the original text in the cited fragments | Open the citation marker, compare the clause passage and effective date, record the number of array items, and separately check the tokens budget of the cited text; when an upper limit is involved, check `quoteMaxToken` |
| Examination room record sheet | Examination room name, exam date, number of candidates, and invigilator signature are consistent across all materials | Compare the name, quantity, and date in the record sheet and the fact record one by one; when a signature or receipt is missing, list it as a pending follow-up item, and check the source identifier in `quoteList` |
| Violation fact record | Behavior description, determination conclusion, notification, and receipt signature are complete and version-synchronized | Check the determination basis against the manual clauses, check the receipt signature, and when a version is found to be out of sync, ask for the latest record |

## Three common errors

- Symptom: there is no citation marker in the answer. Cause: the citation output is not passed through by subsequent nodes, or the cited fragment does not match the original text; first check the materials hit in this round, then check the trimming.
- Symptom: the name, quantity, and date of the same record do not match between the examination room record sheet and the violation fact record. Cause: the two materials were filled in separately without cross-checking, and a signature or receipt is missing.
- Symptom: the exam administration manual clause version is not synchronized, and the old standard is cited. Cause: the knowledge base was not updated with the notice, retrieval hit the old passage; check the effective date and version identifier.

## How to verify the setup

Feature acceptance: ask a question with an original-text basis, check whether the citation array and markers can point back to the original text, and record the number of array items in `responseData`; then ask a question with no matching materials, confirm the array is empty while the chain runs through, and when an upper limit is involved, check `quoteMaxToken` and the tokens of the cited text.

Business test: submit a question missing key information, see whether it asks a follow-up before answering, and write the missing item into the intake record and completed follow-up items.

- Open the search parameter panel and check item by item, confirm the values are consistent with the knowledge base retrieval section, record the number of citation array items in `responseData`, and separately check the tokens budget of the cited text.
- In the conversation, open the citation markers to compare with the source documents, check the source identifier and original passage in `quoteList`, list missing signatures or receipts as pending follow-up items, and forward them to the handler.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
