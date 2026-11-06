---
title: Citations and Source Traceability for Vocational Training Subsidy Applications: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c037-f010
page_type: 行业问题页
application_area: education
meta_title: Training Subsidies | Citations | Checks
meta_description: Training Subsidies: review citations for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Vocational Training Subsidy Applications: Compare Documents and Locate Differences

## What this category's data looks like

Vocational training subsidy applications involve three types of materials: training class filing records, attendance records, and completion assessment forms. The sources are scanned copies uploaded by the declaring unit and ledgers exported from the business system. The class filing records contain the institution name, occupational type of work, class start date, number of trainees, and approval signature; the attendance records record the trainee name, attendance date, and personal signature on a daily basis; the completion assessment forms state the assessment score, completion date, and assessor signature. After these three types of materials enter the knowledge base retrieval node, they are retrieved as original text fragments in the associated knowledge base, and each plays a different role: the class filing records are used to verify the declaring entity and class information, the attendance records are used to verify the number of attendees and dates, and the completion assessment forms are used to verify the assessment results and completion time. The material update rhythm is centralized upload after each class session; when there are supplementary signatures or corrections, the new version overwrites the old one, and the old version retains the source identifier. The field characteristic is that the same trainee name, number of people, and date repeatedly appear in different materials, and each item must be compared one by one to see whether it is consistent.

## Configuration and implementation checks

This link is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text fragment and a source identifier, and the length can be 0. Even if no content is found, the output chain still runs through. The "discrepancy list" is completed subsequently by an AI node, code node, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Training class filing records | Whether the institution name, occupational type of work, class start date, number of trainees, and approval signature are consistent across the three types of materials | Retrieve the original text fragments of the class filing records, compare them item by item with the corresponding fields in the attendance records and completion assessment forms, and record inconsistent items |
| Attendance records | Whether the trainee name, attendance date, and personal signature are consistent with the class filing roster and completion assessment forms | Check the attendance records against the class filing roster one by one by date, and mark records with missing signatures or mismatched numbers of people |
| Completion assessment forms | Whether the assessment score, completion date, and assessor signature are consistent with the attendance records and class filing records | Check whether the completion date matches the class start date and the number of attendance days, and check whether the assessor signature and receipt are complete |
| Citation content output | The number of citation items is consistent with the hit materials; being empty is also normal | Run a test with a question that has no matching materials, see whether the output is empty while the chain continues, and record the array length and the `quoteMaxToken` budget |

## Three common errors

- Phenomenon: the same trainee's name is written differently in the class filing records and attendance records. Cause: the identity card information was not used for unification at entry, and versions were not synchronized, resulting in mismatched names.
- Phenomenon: the number of people in the attendance records is inconsistent with the number of people in the completion assessment forms. Cause: supplementary signatures or training withdrawals were not written back to the ledger, the quantities in the two materials do not match, and receipt evidence is missing.
- Phenomenon: the completion assessment forms lack an assessor signature or receipt. Cause: supplementary signatures were not made in time after the assessment, material archiving is incomplete, and the assessment results cannot be confirmed during review.

## How to verify the setup

Acceptance of this function: ask a question with original text evidence, and check whether the citation array and superscripts can point back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through.

Business test: use one real record to find a field inconsistent with the ledger, record the discrepancy list, submit it to the reviewer for confirmation, and write it back.

- Turn on the citation superscripts in the conversation, compare them against the source documents, check whether each citation can point back to the original text paragraph, and record the array length in `responseData` (non-streaming module results returned with detailed output enabled).
- Open the search parameter panel and check the values item by item, confirm that the associated knowledge base uses the same vector model, and when the citation upper limit is involved, check the tokens of the cited text and record the number of array items separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
