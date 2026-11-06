---
title: Tool Calls and Plugins for Training Provider Admissions and Inquiry Follow-Up: Track Progress and Check Statistics
slug: /en/industry/education-d006-c043-f009
page_type: 行业问题页
application_area: education
meta_title: Training Admissions | Tool Calls | Progress
meta_description: Training Admissions: review tool calls for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Training Provider Admissions and Inquiry Follow-Up: Track Progress and Check Statistics

## What this category's data looks like

This page addresses the enrollment consultation conversion scenario at training institutions. The materials come from three categories: enrollment brochures, consultation records, and trial class schedules. Enrollment brochures provide course names, class types, start dates, and fee bases; consultation records carry consultation times, consultants, intended courses, follow-up status, and receipt signatures; trial class schedules record trial dates, trial attendees, corresponding consultation record numbers, and attendance signatures. Materials are summarized weekly and archived at month-end. Fields are mainly text and dates. The names, quantities, and dates of the same record often fail to match across different materials, versions are not synchronized, or signature receipts are missing. When entering this feature, enrollment brochures and trial class schedules serve as parameter value sources, consultation records serve as the verification object, and the tool call node is responsible for deciding whether to call based on the introduction and parameter configuration, returning the input parameters and return results for subsequent verification.

## Configuration and implementation checks

This step is executed by the tool call node in the workflow (the model decides whether to call, and the node executes), outputting the tool call result (the input parameters and return in the call record). The "progress table and statistical basis description" is then completed by a subsequent AI node or manual verification.

| Object | Check | Verification action |
| --- | --- | --- |
| Enrollment brochure | Whether the course name, class type, start date, and fee basis correspond one by one with the intended course and trial date in the consultation record | Open the tool node introduction field and check whether the introduction can be understood on its own; check the parameter introduction and the required-or-not items, and confirm that the brochure fields serve as parameter value sources |
| Consultation record | Whether the consultation time, consultant, intended course, follow-up status, and receipt signature are complete, and whether the name, quantity, and date of the same record are consistent in the brochure and trial schedule | Run a test with a question missing a required field and observe whether it asks a follow-up question first; check the input parameters and return of `toolChoice` and `functionCall` in the call record |
| Trial class schedule | Whether the trial date, trial attendee, corresponding consultation record number, and attendance signature match the consultation record and brochure dates, and whether the versions are synchronized | On the canvas, check the diamond-shaped interface connections and node status to confirm the target tool is connected; check whether the return of `toolChoice` and `functionCall` contains values that do not exist in the materials |
| Progress table and statistical basis description | Whether the record count and statistical count match, whether the basis is written in the header, and whether exceptions are clearly stated | Use one week of records to verify the totals, compare the consultation records, trial schedules, and brochure fields item by item, and confirm that signatures and receipts are not missing |

## Three common errors

- Symptom: The course name, quantity, and date of the same consultation record do not match between the enrollment brochure and the trial class schedule. Cause: The field value sources are not unified, versions are not synchronized, and item-by-item comparison was not performed during verification.
- Symptom: The consultation record lacks a signature or receipt, and the trial schedule lacks an attendance signature. Cause: No signature confirmation was set up in the material circulation process, and receipt completeness was not checked during archiving.
- Symptom: The model did not call the tool and directly gave an answer; values that do not exist in the business materials appear in the return result. Cause: The tool introduction and parameter introduction did not clearly state the purpose and values, and required parameters were not guided by prompts for the user to provide.

## How to verify the setup

Acceptance of this feature: run a test with a question missing a required parameter, check the input parameters and return in the call record, and confirm whether it asks a follow-up question or calls according to the introduction; at the same time, check whether the return of `toolChoice` and `functionCall` is consistent with the material fields.

Business test: use one week of records to verify the totals and see whether the basis and exceptions are clearly stated; compare the fields, dates, and signatures of the enrollment brochure, consultation records, and trial class schedules item by item, and confirm that the record count and statistical count match.

- Open the tool node introduction field and check whether this description can be understood when taken out on its own; open each parameter configuration one by one, check the introduction and the required-or-not items, and confirm that they correspond to fields that actually exist in the business materials.
- On the canvas, check the diamond-shaped connections and node status to confirm the target tool is connected; run a test with a question missing that field and see whether it asks a follow-up question first rather than directly fabricating.
