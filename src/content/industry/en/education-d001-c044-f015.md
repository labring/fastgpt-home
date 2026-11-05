---
title: Knowledge Base Retrieval for Training Provider Scheduling and Lesson Records: Find Supporting Evidence
slug: /en/industry/education-d001-c044-f015
page_type: 行业问题页
application_area: education
meta_title: Training Schedules | Retrieval | Evidence
meta_description: Training Schedules: review retrieval for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Training Provider Scheduling and Lesson Records: Find Supporting Evidence

## What this category's data looks like

Materials for scheduling and class-hour consumption in training institutions mainly consist of class schedules, class-hour consumption records, and schedule change requests, supplemented by parent acknowledgements and teacher signature pages. Class schedules contain class, course, classroom, time slot, teacher, and effective date; class-hour consumption records contain student, number of class hours, consumption date, and signature; schedule change requests contain original time slot, new time slot, reason, and approval signature. Materials are updated by semester or month. The same record may first appear in a schedule change request, then be reflected in the class schedule, and finally enter the class-hour consumption record. The version based on the archived document after approval prevails. When entering knowledge base retrieval and recall, the class schedule serves as the basis for time slots and classrooms, the class-hour consumption record serves as the basis for class-hour consumption, the schedule change request serves as the basis for changes, and parent acknowledgements and signature pages serve as the basis for confirmation. The field names, dates, and signature status of each material must be traceable back to the original text in the retrieval candidates in order to support replying to parents or writing them into a plan.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after pattern, merge, rerank, filter, and upper-limit trimming). The basis entries that can be traced back to the original text are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Class schedule | Fields include class, course, classroom, time slot, teacher, and effective date; the version must be the current archived document | In the search test, test once each with synonymous questions, switch `searchMode` to compare the number of candidates and scores, and check whether the hit snippets contain the effective date and signature |
| Class-hour consumption record | Fields include student, number of class hours, consumption date, and signature; the quantity and date must match the class schedule and schedule change request | Check whether the candidates come from both semantic and full-text channels, enable `usingReRank` to compare the ranking of the top few results, and check whether the number of class hours and date can be traced back to the original text |
| Schedule change request | Fields include original time slot, new time slot, reason, and approval signature; it must be consistent with the class schedule change and class-hour consumption date | After filtering by `similarity`, record the number of candidates, separately record the length of the citation array, and check whether the approval signature and acknowledgement are complete |
| Parent acknowledgement and signature page | The acknowledgement must have a signature or confirmation trace, and the date must correspond to the schedule change request and class-hour consumption record | Use a cross-material basis question for retrieval, see whether the candidate snippets can cover both the acknowledgement and the corresponding record, and check whether the versions are synchronized |

## Three common errors

- Phenomenon: The name, quantity, or date of the same class-hour consumption record does not match between the class schedule and the class-hour consumption record. Cause: The materials are maintained separately, and field verification has not been performed based on the archived document after approval.
- Phenomenon: A schedule change request has been approved, but the class schedule and class-hour consumption record still show the old time slot. Cause: The versions are not synchronized, historical versions are mixed into the retrieval candidates, and filtering has not been performed according to the current archived document.
- Phenomenon: A class-hour consumption record or schedule change request lacks a signature or acknowledgement but is still cited as a basis. Cause: The material completeness check is not executed after recall, and the candidate snippets do not cover the signature page.

## How to verify the setup

Acceptance of this feature: test once each with synonymously rewritten questions, compare the number of candidates and scores, then toggle rerank on and off to observe the ranking of the top few results; switch `searchMode` to observe the differences between semantic and full-text candidates, adjust `similarity` to see the number of results after filtering, and enable `usingReRank` to compare ranking changes.

Business test: ask a cross-material basis question and see whether the answer provides a traceable source; check the length of the citation array and the tokens of the cited text to confirm that the candidate snippets can be traced back to the original text of the class schedule, class-hour consumption record, or schedule change request.

- In the search test, test once each with synonymous questions, record the number of candidates and scores, switch `searchMode`, and enable `usingReRank` to compare the ranking of the top few results.
- After filtering by `similarity`, separately record the length of the citation array, check the tokens of the cited text, and confirm that the candidate snippets can be traced back to the current archived document and signature page.
