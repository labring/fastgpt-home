---
title: Citations and Source Traceability for Public Vocational Skills Level Assessment: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c034-f010
page_type: 行业问题页
application_area: education
meta_title: Skills Certification | Citations | Operations
meta_description: Skills Certification: review citations for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Public Vocational Skills Level Assessment: Coordinate Operations and Application Handover

## What this category's data looks like

For the deployment, operations, and application handover of social evaluation of vocational skill level certification, the core materials are the evaluation implementation plan, candidate registration forms, and assessor dispatch forms. The implementation plan carries the evaluation occupation, level, time and location, and process signatures; the registration form carries candidate identity, application conditions, material list, and receipt; the dispatch form carries assessor qualifications, sessions, recusal, and sign-off. When these three types of materials enter the knowledge base retrieval node, each serves as a traceable original source, for the citation array to correspond to item by item. The update rhythm follows the batch: the plan is finalized first, the registration form is updated on a rolling basis as candidates confirm, and the dispatch form is locked before the exam. Field characteristics are concentrated in five categories: names, quantities, dates, signatures, and receipts. The same record not matching across two materials is the most commonly uncovered gap during handover and must be checked item by item against the handover list.

## Configuration and implementation checks

This link is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text snippet and a source identifier, and the length can be 0. The handover-ready deployment status and operation records are completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Evaluation implementation plan | Whether the three items of fields, dates, and signatures are complete, and whether the plan version is the same as the version referenced by the registration form and dispatch form | Check item by item the occupation name, level, batch date, and signature fields in the plan; use `quoteList` to expand the cited snippet and trace it back to the original paragraph |
| Candidate registration form | Whether the candidate name, application level, material quantity, and date are consistent with the plan and dispatch form, and whether the receipt is retained | Compare against the plan batch date and dispatch form session, and check the registration form quantity and receipt; record the number of items in the citation array separately, and do not compare it for equality with that content budget |
| Assessor dispatch form | Whether assessor qualifications, sessions, recusal declarations, and signatures are consistent with the plan, and whether dispatch receipts are complete | Check the dispatch form signatures and receipts item by item against the handover list; open the citation superscript in the conversation and compare against the source document |
| Cited content output | The number of returned items is consistent with the matched materials; being empty is also normal, and the output chain continues to work | Run a test with a question that has no matching materials, and see that the array is empty while the chain continues; check the values of `responseData` (non-streaming module results returned with detailed output enabled) and `quoteMaxToken` |

## Three common errors

- Symptom: The same candidate's name or level does not match between the registration form and the dispatch form. Cause: The two forms are maintained separately, update batches are not synchronized, and fields are not compared item by item before handover.
- Symptom: The plan has been revised, but the registration form and dispatch form still reference the old version date. Cause: The version was not synchronized, the cited source was not updated with the plan, and the handover list did not mark the version number.
- Symptom: The assessor dispatch form lacks signatures or receipts. Cause: The dispatch process was not closed-loop, signature fields were left blank, and only the roster was checked during handover, not the sign-off.

## How to verify the setup

Acceptance for this feature: ask a question with original-text support, and check whether the citation array and superscript can trace back to the original paragraph; then ask a question with no matching materials, and confirm that the array is empty while the chain continues.

Business test: check once item by item against the handover list, see which record is missing, and align the version, connection, and task record.

- Open the search parameter panel and check item by item, confirming that the selected knowledge base uses the same vector model.
- Open the citation superscript in the conversation and compare against the source document to check whether each citation can trace back to the original paragraph.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
