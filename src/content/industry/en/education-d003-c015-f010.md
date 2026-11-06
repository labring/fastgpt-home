---
title: Citations and Source Traceability for School Mental Health Screening and Referrals: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c015-f010
page_type: 行业问题页
application_area: education
meta_title: Student Mental Health | Citations | Intake
meta_description: Student Mental Health: review citations for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for School Mental Health Screening and Referrals: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses three types of materials in the mental health screening and referral scenario for primary and secondary schools: psychological screening plans, interview records, and referral forms. Psychological screening plans provide the scale name, screening date, organizing party, and informed consent fields; interview records carry the student name, interview time, risk level, and interviewer signature; referral forms record the referral reason, receiving institution, receipt, and handler signature. When the three types of materials enter the question-answer intake and missing-item follow-up function, they respectively play the roles of basis source, process evidence, and transfer evidence. In terms of update rhythm, screening plans are replaced by semester or academic year versions, interview records are added with each interview, and referral forms have receipts supplemented after the referral occurs. Field characteristics are concentrated in four categories: names, quantities, dates, and signatures. The same student may appear in different materials with inconsistent name spellings, date orders, and risk level versions, which need to be compared item by item during the intake stage.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing an original text fragment and a source identifier, and the length can be 0. The "intake records and completed question items" are subsequently completed by AI nodes, code nodes, or humans.

| Object | Check | Verification action |
| --- | --- | --- |
| Psychological screening plan | The scale name, screening date, and organizing party fields must be consistent with the corresponding items in the interview records, and the plan version number should be unified within the same batch | Retrieve the original plan text and interview records, compare the name, date, and version identifier field by field, and record inconsistent items |
| Interview record | The student name, interview time, risk level, and interviewer signature must be complete, and the risk level should correspond to the referral reason on the referral form | Open the citation marker to refer back to the original paragraph, check whether the signature column and receipt column are blank, and compare the risk level wording |
| Referral form | The receiving institution, referral date, receipt, and handler signature must be complete, and the referral reason should be synchronized with the risk level version in the interview record | Check the receipt copy and handler signature of the referral form, and compare the chronological order of the referral date and interview date |
| Knowledge base retrieval node | The cited content is output as an array, the length can be 0, and the `quoteList` field in `responseData` (non-streaming module results returned with detailed output enabled) can show the matched fragments | Run a trial with a question that has no matching materials, confirm that the array is empty while the pipeline runs through, and check the `quoteMaxToken` budget against the tokens of the actual cited text |

## Three common errors

- Phenomenon: The same student's name spelling and risk level version do not match between the interview record and the referral form. Cause: The two materials were filled in successively by different handlers, the versions were not synchronized, and a unified verification step was lacking.
- Phenomenon: The referral form lacks a receipt or handler signature, and the date order of the screening plan and interview record is reversed. Cause: Material supplementation and the signature process are separated, and the receipt is not archived in sync with the referral.
- Phenomenon: There are no citation markers in the answer, and the cited fragments do not match the original text. Cause: Without first checking whether this round had a match and which material was matched, the issue was directly attributed to length truncation.

## How to verify the setup

Acceptance of this function: ask a question with an original-text basis, and check whether the citation array and markers can refer back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the pipeline runs through. The number of citations is the array length, and `quoteMaxToken` is the citation content budget; the two are not compared for equality.

Business test: submit a question missing key information and see whether it first asks a follow-up question before answering.

- In the node, check the selected knowledge base collections and their vector models, and confirm that the selected knowledge bases use the same vector model.
- Open the search parameter panel and check the values item by item, then run a trial with a question that has no matching materials to see whether the output is empty while the pipeline continues.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
