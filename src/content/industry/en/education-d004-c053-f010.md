---
title: Citations and Source Traceability for College Admissions Health Examination Organization: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c053-f010
page_type: 行业问题页
application_area: education
meta_title: Admissions Health Exams | Citations | Handover
meta_description: Admissions Health Exams: review citations for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for College Admissions Health Examination Organization: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

The core materials for university admissions physical examination organization in the drafting and responsibility handover stage include three types: the physical examination form, the re-examination application, and the restricted-major notification. The physical examination form records the candidate's basic information, past medical history, examination conclusions for each subject, and the chief examiner's opinion, with fields including name, candidate number, examination date, physician signature, and physical examination conclusion. The re-examination application targets abnormal items from the initial examination and must state the reason for application, original examination conclusion, re-examination items, agreed date, and applicant signature. The restricted-major notification, based on the physical examination conclusion, explains to the candidate the range of majors unsuitable for study, and must list the major name, the clause serving as the basis for restriction, the notification date, and the delivery receipt. The three types of materials each play different roles in the function: the physical examination form is the original record and the baseline for subsequent comparison, the re-examination application is the trigger for the process and the evidence of status change, and the restricted-major notification is the externalization of the conclusion and the proof of receipt. The material sources are the admissions physical examination institutions' templates over the years and competent department documents, and the update rhythm adjusts with the admissions year. The field characteristics are reflected in the fact that when the same record reappears across materials, the name, quantity, and date must be consistent, and the version and signature receipt must be synchronized.

## Configuration and implementation checks

This link is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and source identifier, and the length can be 0. The signable material drafts and handover records are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Physical examination form | Fields are complete: name, candidate number, examination date, physician signature, and physical examination conclusion are all present; date and signature can correspond | Take a physical examination form draft, check the fields one by one, and see whether the signature and date appear as a pair |
| Re-examination application | Reason for application, original examination conclusion, re-examination items, agreed date, and applicant signature are complete; consistent with the date and item names in the original examination record | Retrieve the original examination record and the re-examination application and compare them side by side, check the item names and dates, and check whether the signature field is left blank |
| Restricted-major notification | Major name, clause serving as the basis for restriction, notification date, and delivery receipt are complete; the conclusion statement is consistent with the physical examination form | Compare the physical examination form conclusion with the notification text, check the major name and clause number, and check whether the receipt shows signs of receipt |
| Citation content output | The number of returned items is consistent with the matched materials; being empty is also normal; each citation can point back to the original paragraph | Run a trial with a question that has original text support, open the citation marker and compare it with the source document; then run a trial with a question that has no matching materials, and confirm that the array is empty while the pipeline continues |

## Three common errors

- Phenomenon: The same candidate's name or candidate number is written differently in the physical examination form and the re-examination application. Cause: When drafting, fields were not copied using the physical examination form as the baseline, manual entry introduced differences, and no cross-material comparison was done before handover.
- Phenomenon: The date of the restricted-major notification is earlier than the date of the physical examination conclusion, or the version number is not synchronized with the physical examination form. Cause: After the template was updated, only some materials were replaced, the old version was still in circulation, and the handover record did not note the version and date.
- Phenomenon: The re-examination application lacks the applicant signature, and the restricted-major notification lacks the delivery receipt. Cause: The signature and receipt steps were treated as follow-up matters to be completed later, and at handover only the main text was checked, not the receipt proof.

## How to verify the setup

This function's acceptance: ask a question with original text support, and check whether the citation array and markers can point back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the pipeline runs through. When checking, record the number of citations, i.e. the array length, and look at the tokens of the citation text separately against the `quoteMaxToken` budget; do not compare the two for equality; if necessary, check `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` to confirm the return structure.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- In the node, check the selected knowledge base collections and their vector models, and confirm that they belong to the same vector model; open the search parameter panel and check the values item by item.
- Run a trial with a question that has no matching materials, and see that the output is empty while the pipeline continues; then open the citation markers and compare them with the source document to confirm that each citation can point back to the original paragraph.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
