---
title: Citations and Source Traceability for Training Provider Scheduling and Lesson Records: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c044-f010
page_type: 行业问题页
application_area: education
meta_title: Training Schedules | Citations | Handover
meta_description: Training Schedules: review citations for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Training Provider Scheduling and Lesson Records: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page addresses the scenario of course scheduling and course consumption in training institutions, focusing on three types of materials: schedules, course consumption records, and course change requests, and outlines the citation source and traceability requirements in material drafting and responsibility handover. A schedule carries fields for class, course, teacher, classroom, week number, and period; a course consumption record carries student, number of class hours, teaching date, attendance status, and responsible teacher's signature; a course change request carries the original session, target session, reason for change, applicant, approver, and receipt. When these three types of materials enter the knowledge base retrieval node, they serve respectively as the retrieved source texts: the schedule is used to confirm scheduling facts, the course consumption record is used to confirm class hour consumption, and the course change request is used to confirm the basis for changes. Material updates proceed according to the academic affairs cycle, with one version formed after scheduling, after each course consumption, and after each course change approval, and the version number and effective date are refreshed together. In terms of field characteristics, the name, number of class hours, and teaching date of the same session must be consistent across different materials, and signatures and receipts are indispensable; otherwise, the handover record cannot be issued.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text fragment and a source identifier, and the length may be 0. The "issuable material drafts and handover records" are completed subsequently by AI nodes, code nodes, or manual work. The cited content is output as an array, and the length may be 0; even if no content is found, the output chain will still run through.

| Object | Check | Verification action |
| --- | --- | --- |
| Schedule | Fields include class, course, teacher, classroom, week number, and period; dates and version numbers are consistent; responsible teacher signatures are complete | In the node, check the selected collection and its vector model, open the citation marker to compare against the original schedule paragraphs, and compare fields and dates item by item |
| Course consumption record | Fields include student, number of class hours, teaching date, attendance status, and responsible teacher signature, and they match the session name, quantity, and date in the schedule | Run a test with a question that has no matching materials, observe that the output is empty while the chain continues, and then check whether the cited fragment of the course consumption record matches the original text |
| Course change request | Fields include original session, target session, reason for change, applicant, approver, and receipt; version and date are synchronized; signatures and receipts are not missing | Open the search parameter panel and check the values item by item, verify the value of `quoteMaxToken` as the citation content budget, and record the number of array items separately without comparing it for equality with the budget |

## Three common errors

- Symptom: The name, number of class hours, and teaching date of the same session do not match between the schedule and the course consumption record. Cause: The two materials were drafted separately, were not filled back according to the same session identifier, and field comparison was not performed before handover.
- Symptom: The course change request has been approved, but the schedule and course consumption record are still the old version. Cause: The version was not synchronized, the effective date was not refreshed, and the handover record cited expired materials.
- Symptom: The course consumption record lacks the responsible teacher's signature, and the course change request lacks the approval receipt. Cause: During drafting, signatures and receipts were not collected completely according to the template, and missing items were not stopped during handover.

## How to verify the setup

Acceptance of this feature: ask a question with source evidence and check whether the citation array and citation markers can point back to the original text; then ask a question with no matching materials and confirm that the array is empty while the chain runs through. Check the number of citations and source identifiers in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList`, and record the count by array length.

Business test: draft one copy according to the template and complete one handover to see whether missing items are stopped.

- In the conversation, open the citation markers, compare against the source documents, check item by item whether the cited fragments match the original paragraphs, and record the length of the citation array.
- Open the search parameter panel and check the values item by item, confirming that `quoteMaxToken` is only used as the citation content budget, and that the number of citations is recorded separately and not compared for equality.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
