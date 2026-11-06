---
title: Citations and Source Traceability for Training Provider Scheduling and Lesson Records: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c044-f010
page_type: 行业问题页
application_area: education
meta_title: Training Schedules | Citations | Versions
meta_description: Training Schedules: review citations for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Training Provider Scheduling and Lesson Records: Maintain Document Versions and Changes

## What this category's data looks like

In the scheduling and class-hour deduction scenario of training institutions, materials come from three types: class schedules, class-hour deduction records, and schedule change requests. Fields cover course name, student name, class date, number of class hours, teacher signature, and receipt. Class schedules are generated weekly or monthly, class-hour deduction records are registered after each class, and schedule change requests are submitted when a change occurs. The three have different update rhythms, so it is easy for the same record to have mismatched names, quantities, or dates across two materials, for versions to be out of sync, and for signatures or receipts to be missing. When materials enter the knowledge base retrieval node, the class schedule plays the role of baseline scheduling, the class-hour deduction record plays the role of actual consumption, and the schedule change request plays the role of change basis. Each is cited in the form of an original text fragment for subsequent field comparison, ledger writing, and report generation.

## Configuration and implementation checks

This part is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text fragment and a source identifier, and the length can be 0. The version ledger and change records are completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Class schedule | Fields include course name, student name, class date, number of class hours, and teacher signature; the date and signature must correspond item by item with the class-hour deduction record | Open the citation marker, compare it with the original paragraph of the class schedule, and separately record the cited text within the `quoteMaxToken` budget and the number of array items |
| Class-hour deduction record | Fields include actual consumed class hours, class date, student signature, and receipt; the quantity and date must be consistent with the class schedule | Search using the same course date, check whether the cited fragment can point back to the original text of the class-hour deduction record, and check the length of the citation array in `responseData` (non-streaming module results returned with detailed output enabled) |
| Schedule change request | Fields include original class date, adjusted date, applicant, and approval signature; the change basis must be synchronized with the class schedule and class-hour deduction record | Open the citation marker in the conversation, check the original text fragment and source identifier of the schedule change request, and confirm that the citation in `detail` corresponds to the original text |
| Version ledger and change records | The current version is unique, old versions are traceable, and citations are synchronized; after changing one piece of content, the version number and citations must be updated synchronously | After changing one piece of content, search again, check whether the citation array points to the new version, and whether the old version is still traceable |

## Three common errors

- Symptom: the number of class hours for the same class session does not match between the class schedule and the class-hour deduction record. Cause: the two materials are updated separately, without field-level comparison and version synchronization.
- Symptom: the schedule change request has been submitted, but the class schedule still shows the original date. Cause: the change was not written back, the version was not synchronized, and the citation still points to the old version of the material.
- Symptom: the class-hour deduction record lacks a teacher signature or receipt. Cause: signatures were not fully collected during registration, and the cited fragment cannot prove that consumption has been confirmed.

## How to verify the setup

Acceptance of this feature: ask a class schedule question with an original-text basis, and check whether the citation array and markers can point back to the original text; then ask a question with no matching material, confirm that the array is empty while the pipeline runs through, and separately record the number of array items and the `quoteMaxToken` budget.

Business test: change one piece of content and see whether the version number and citations are updated synchronously.

- Check item by item whether the selected knowledge bases use the same vector model, and open the search parameter panel to check the values.
- Run a trial with a question that has no matching material, see that the citation array is empty while the output pipeline continues, and then check that the citation markers correspond to the original text paragraphs.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
