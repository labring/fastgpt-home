---
title: Citations and Source Traceability for Teacher Qualification Exams and Certification: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c056-f010
page_type: 行业问题页
application_area: education
meta_title: Teacher Qualifications | Citations | Intake
meta_description: Teacher Qualifications: review citations for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Teacher Qualification Exams and Certification: Handle Questions and Collect Missing Information

## What this category's data looks like

Teacher qualification exams and certification involve three types of materials: written and interview registration forms, Putonghua certificates, and medical examination forms. The registration form contains name, ID number, applied teaching stage and subject, exam district, date, and signature; the Putonghua certificate contains grade, certificate number, test date, and issuing institution; the medical examination form contains the examination conclusion, date, and physician's signature. When these three types of materials enter the Q&A intake and missing-item follow-up function, the registration form is the baseline for identity and application information, while the Putonghua certificate and medical examination form are supporting evidence for qualification conditions, each playing the role of field comparison and missing-item identification. The material update cadence is driven by exam batches and certification batches: the registration form updates with the registration cycle, the Putonghua certificate is valid long-term but versions may not be synchronized, and the medical examination form has a validity period limit. Field characteristics manifest as the name, quantity, and date of the same record potentially not matching across different materials, and cases of missing signatures or receipts require follow-up questions before answering.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and source identifier, and the length can be 0. The intake records and the completed follow-up questions are then handled by subsequent AI nodes, code nodes, or humans. The citation array is not a discrepancy list, ledger, report, or authorization scope; the item count is the array length, and `quoteMaxToken` is the content budget, and the two are not compared for equality.

| Object | Check | Verification action |
| --- | --- | --- |
| Written and interview registration form | Whether name, ID number, applied teaching stage and subject, exam district, date, and signature are complete, and whether the same record's name is consistent with other materials | In the node, check the selected knowledge base and vector model, open the citation marker to compare against the original paragraph in the registration form, and record the number of citations in `responseData` (non-streaming module results returned with detailed output enabled) |
| Putonghua certificate | Whether grade, certificate number, test date, and issuing institution match the registration form information, and whether versions are synchronized | Run a test with a question involving Putonghua grade, check whether the citation array hits the original certificate text, and verify the source identifier and fragment in `quoteList` |
| Medical examination form | Whether the examination conclusion, date, and physician's signature are complete, whether it is within the validity period, and when signature or receipt is missing, ask a follow-up question first | Ask a question missing key information, see whether it asks a follow-up question before answering, and confirm the chain still runs through when the citation array is empty |
| Search parameters | Consistent with the values set in the knowledge base retrieval section, and the tokens of the cited text and the array item count are recorded separately | Open the search parameters panel and check item by item, confirm that `quoteMaxToken` is the content budget, and record the array item count separately |

## Three common errors

- Symptom: the name or date of the same record does not match between the registration form and the Putonghua certificate. Cause: the two materials are entered in different steps, versions are not synchronized, and no field-level comparison was performed.
- Symptom: the medical examination form lacks a physician's signature or receipt, but the answer directly gives a conclusion. Cause: the missing item was not identified, and the answer was given without asking a follow-up question first.
- Symptom: the answer has no citation marker, or the cited fragment does not match the original text. Cause: first check whether this round hit and which material was hit, then look at trimming, and do not directly attribute it to length trimming.

## How to verify the setup

Acceptance for this function: ask a question with original-text support, check whether the citation array and citation markers can point back to the original text, and confirm that the number of citations in `responseData` is consistent with the hit material; then ask a question with no matching material, confirm that the array is empty while the chain runs through, and that an empty source identifier in `quoteList` is also normal.

Business test: ask a question missing key information, and see whether it asks a follow-up question before answering.

- In the node, check the selected knowledge bases and their vector models, open the search parameters panel, and check the `quoteMaxToken` value item by item.
- Run a test with a question that has no matching material, see that the output is empty while the chain continues, and record the citation array item count and the tokens of the cited text.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
