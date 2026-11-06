---
title: Citations and Source Traceability for Vocational Training Subsidy Applications: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c037-f010
page_type: 行业问题页
application_area: education
meta_title: Training Subsidies | Citations | Access
meta_description: Training Subsidies: review citations for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Vocational Training Subsidy Applications: Manage Authorized Access and External Services

## What this category's data looks like

The materials for vocational training subsidy applications mainly consist of three types: training class filing records, attendance records, and completion assessment forms. The class filing record notes the institution name, class number, start and end dates, student roster, and handler's signature; the attendance record lists, by day, student names, arrival times, absence markings, and the homeroom teacher's signature; the completion assessment form contains assessment subjects, scores, assessment dates, and assessor's signature. Together, the three support the training facts of the same group of students; if any one is missing or fields are misaligned, subsequent ledgers and reports will be inaccurate. When the materials enter the knowledge base retrieval node, each plays a different role: the class filing record is used to confirm the class and personnel scope, the attendance record is used to verify attendance dates, and the completion assessment form is used to verify assessment results and signatures. The update rhythm is mostly supplementary entry by class or by batch; when old and new versions coexist, the name, quantity, and date of the same record are easily inconsistent across the two materials. The citation output is only responsible for returning the hit original text fragments and source identifiers; field comparison, ledgers, and reports are completed by subsequent nodes or manually.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text fragment and a source identifier, and the length can be 0. "Externally available entry points and authorization scope" are then completed by subsequent AI nodes, code nodes, or manually. The number of citations is the array length, and `quoteMaxToken` is the citation content budget; the two are not compared for equality. When citation limits are involved, check the tokens of the cited text, and record the array item count separately.

| Object | Check | Verification action |
| --- | --- | --- |
| Training class filing record | Whether the institution name, class number, start and end dates, student roster, and handler's signature are complete and consistent with the attendance record | Compare the student names, headcount, and dates in the filing record and attendance record item by item, and mark any missing signature or receipt |
| Attendance record | Whether student names, arrival times, absence markings, and the homeroom teacher's signature can be verified day by day | Check the attendance and filing roster by date, and record any mismatched names or quantities as pending investigation |
| Completion assessment form | Whether the assessment subjects, scores, assessment dates, and assessor's signature correspond to the same batch as the filing record and attendance record | Check whether the assessment date falls within the start and end interval of the filing record, and list missing signatures separately |
| Citation content output | The number of returned items is consistent with the hit materials; being empty is also normal | Run a trial with a question that has no matching materials, see that the output is empty while the chain continues, and record the `quoteList` in `responseData` (non-streaming module results returned with detailed output enabled) |

## Three common errors

- Phenomenon: the same student name is written differently in the class filing record and the attendance record, and the headcount does not match. Cause: the two materials were entered by different handlers without unified proofreading.
- Phenomenon: the assessment date on the completion assessment form is earlier than the start and end dates of the filing record. Cause: versions were not synchronized, and the old assessment form was cited as the new version.
- Phenomenon: the attendance record lacks the homeroom teacher's signature or receipt. Cause: during supplementary entry, only the arrival time was filled in, and the signature step was skipped.

## How to verify the setup

Acceptance of this feature: ask a question with original text evidence, and check whether the citation array and superscripts can point back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through.

Business test: access once with a restricted identity, and see whether the visible scope matches the setting.

- Open the search parameter panel and check item by item, confirm that the associated knowledge base uses the same vector model, and record the number of citations and the `quoteMaxToken` budget as separate values.
- In the conversation, turn on citation superscripts, check against the source documents whether each citation can point back to the original text paragraph, and register mismatched fragments and source identifiers as pending investigation.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
