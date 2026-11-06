---
title: Citations and Source Traceability for Training Provider Scheduling and Lesson Records: Track Progress and Check Statistics
slug: /en/industry/education-d006-c044-f010
page_type: 行业问题页
application_area: education
meta_title: Training Schedules | Citations | Progress
meta_description: Training Schedules: review citations for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Training Provider Scheduling and Lesson Records: Track Progress and Check Statistics

## What this category's data looks like

In the scheduling and class-hour deduction scenario of training institutions, materials include three types: class schedules, class-hour deduction records, and schedule-change requests. The class schedule is the scheduling baseline, recording class, teacher, time slot, and classroom; the class-hour deduction record is the proof of what actually occurred, containing student, class hours, check-in, and signature; the schedule-change request is the basis for changes, containing the original time slot, new time slot, approval, and receipt. When these three types of materials enter the knowledge base retrieval node, each participates in vector search as an independent source, outputting an array of cited content, each item containing the original text fragment and source identifier. The update rhythm is aggregated weekly: schedule-change requests and class-hour deduction records are generated during the week, and class schedule versions are summarized on the weekend. In terms of field characteristics, the class schedule emphasizes dates and teachers, the class-hour deduction record emphasizes quantities and signatures, and the schedule-change request emphasizes approval and receipt. The materials have different roles: the class schedule defines the baseline, the class-hour deduction record defines what actually occurred, and the schedule-change request defines exceptions; together, the three support progress records and statistical reconciliation.

## Configuration and implementation checks

This part is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and source identifier, and the length can be 0. The "progress table and statistical scope description" is then completed by a subsequent AI node, code node, or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Class schedule | Fields include class, teacher, time slot, and classroom; dates and signatures need to be aligned item by item with the class-hour deduction records | Check that the selected knowledge bases use the same vector model, and open the citation marker to trace back to the original class schedule passage |
| Class-hour deduction record | Fields include student, class-hour quantity, check-in, and signature; quantities and dates need to be consistent with the class schedule and schedule-change requests | Run a trial with a question that has no matching materials, confirm that the citation array is empty while the chain continues, and record the array length |
| Schedule-change request | Fields include original time slot, new time slot, approval, and receipt; the version needs to be synchronized with the class schedule and no signatures may be missing | Open the search parameter panel and check item by item; when the citation limit is involved, check the tokens of the cited text, and record the number of array items separately |
| Cited content output | The number of returned items is consistent with the matched materials; being empty is also normal, and no equality comparison is made | View `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` in the conversation, and compare against the source documents to confirm that each citation can trace back to the original text |

## Three common errors

- Symptom: The name, quantity, and date of the same class do not match between the class schedule and the class-hour deduction record. Cause: The two materials are entered separately and are not aggregated under the same scope, so the original text must be traced back to and compared field by field.
- Symptom: The schedule-change request has been updated, but the class schedule version is not synchronized, and the progress table is still counted according to the old time slot. Cause: The version is not synchronized, so the approval and receipt dates must be checked to confirm which version is the current baseline.
- Symptom: The class-hour deduction record lacks a signature or receipt, but the statistical total still includes it. Cause: The exception is not clearly stated, so items missing signatures must be marked in the scope description, and their number recorded separately.

## How to verify the setup

Acceptance of this feature: ask a question that has original-text support, and check whether the citation array and citation markers can trace back to the original text; then ask a question with no matching materials, confirm that the array is empty while the chain runs through, and record the array length and the `quoteMaxToken` budget, without making an equality comparison between the two.

Business test: use one week of records to check the totals, see whether the scope and exceptions are clearly stated, and confirm that the number of records matches the statistical count.

- In the node, check the selected knowledge base collections and their vector models, and confirm that they all use the same vector model.
- Open the search parameter panel and check item by item; view `quoteList` within `responseData`, and confirm that the cited fragments correspond to the original text.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
