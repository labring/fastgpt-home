---
title: Citations and Source Traceability for Training Provider Scheduling and Lesson Records: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c044-f010
page_type: 行业问题页
application_area: education
meta_title: Training Schedules | Citations | Access
meta_description: Training Schedules: review citations for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Training Provider Scheduling and Lesson Records: Manage Authorized Access and External Services

## What this category's data looks like

In the scheduling and class-hour deduction scenario for training institutions, materials are mainly of three types: class schedules, class-hour deduction records, and class-change requests. A class schedule contains the class, course, instructor, class date, and time slot; a class-hour deduction record contains the student, course, number of class hours consumed, date, and signature; a class-change request contains the original class session, target class session, request date, and approval signature. After these materials enter the knowledge base retrieval node, each plays a different role: the class schedule is used to verify scheduling dates and time slots, the class-hour deduction record is used to verify the consumed quantity and signature, and the class-change request is used to verify the request and approval chain. The materials mostly come from academic affairs system exports or scans of signed paper documents, and the update cadence changes with each scheduling, class-hour deduction, or class-change operation, with field characteristics concentrated in three categories: date, quantity, and signature. For external services, the visibility scope for parents or superiors must match the visitor's identity, and unauthorized content must not be visible.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text snippet and source identifier, and the length can be 0. The externally available entry points and authorization scope are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Class schedule | Fields include class, course, instructor, class date, and time slot; the date and signature must be consistent with the class-hour deduction record | In the node, check the selected knowledge base collections and their vector models, and run a trial with a restricted identity to see the visibility scope |
| Class-hour deduction record | Fields include student, course, number of class hours consumed, date, and signature; the quantity and date must match the class schedule | Open the citation badge to compare against the source document, and check whether the number of citations in `responseData` (non-streaming module results returned with detailed output enabled) matches the hit materials |
| Class-change request | Fields include original class session, target class session, request date, and approval signature; the version must be synchronized with the current class schedule | Open the search parameter panel and check item by item that `quoteMaxToken` is consistent with the value in the knowledge base retrieval section |
| Cited content output | The number of returned items matches the hit materials; being empty is also normal; `quoteList` can be used to view the details of a single citation | Run a trial with a question that has no matching materials, and see whether the output is empty while the chain continues |

## Three common errors

- Symptom: The same class-hour deduction record has inconsistent names, quantities, and dates between the class schedule and the class-hour deduction materials. Cause: The two materials were entered in different steps, and no field comparison or receipt verification was performed.
- Symptom: A class-change request has been approved but the class schedule has not been synchronized, resulting in inconsistent versions. Cause: The class schedule update was not triggered after approval, lacking a version synchronization action.
- Symptom: A class-hour deduction record lacks a signature or receipt, but the external visibility scope has already been opened. Cause: The authorization judgment did not check the signature field, and the visitor's identity and visibility scope were not matched.

## How to verify the setup

Acceptance for this feature: ask a question with source-text support, and check whether the citation array and badges can point back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through.

Business test: access once with a restricted identity and see whether the visibility scope matches the setting.

- Open the search parameter panel and check item by item, confirm that the values are consistent with the knowledge base retrieval section, and record that the number of citations and the `quoteMaxToken` budget are each independent and should not be compared for equality.
- In the conversation, open the citation badges, compare against the source documents to check whether each citation can point back to the original text paragraph, and use `quoteList` to view the details of a single citation.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
