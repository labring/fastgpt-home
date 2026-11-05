---
title: Forms and User Interaction for Vocational School Student Internships: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c030-f016
page_type: 行业问题页
application_area: education
meta_title: Student Internships | Forms | Review
meta_description: Student Internships: review forms for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Vocational School Student Internships: Trace Exceptions and Review Results

## What this category's data looks like

Vocational school student internship management involves three core types of materials: internship agreements, internship plans, and internship logs. Agreements are signed by three parties—the school, the enterprise, and the student—and contain position, term, and responsibility clauses; they are updated before the internship. Plans are prepared by supervising teachers and contain rotation arrangements, mentors, and time nodes; they are adjusted as the internship progresses. Logs are filled in daily by students and contain tasks, work hours, and issue records; they accumulate day by day. When the materials enter the exception tracing and manual review function, the agreement serves as the basis of rights and responsibilities, the plan serves as the progress reference, and the log serves as process evidence; the names, quantities, dates, and signatures of the three must be cross-compared. Field characteristics include: agreement number, enterprise name, position name, start and end dates, three-party signatures; plan batch, rotation department, mentor, plan date; log date, task name, work hours, student signature, mentor receipt. In terms of update cadence, the agreement is signed once, the plan is updated weekly or monthly, and the log is updated daily.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The exception list and review conclusions are completed by subsequent nodes or manually afterward. After the form input node is triggered, the conversation enters an interactive state and the workflow state is recorded; after the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Internship agreement | Check whether the agreement number, enterprise name, position name, start and end dates, and three-party signatures are complete, and whether they are consistent with the corresponding fields in the internship plan and internship log | Configure the agreement number, enterprise name, position name, start and end dates, and three-party signatures fields in the form input node, mark key fields as required, and after submission reference the field values in subsequent nodes and run a trial |
| Internship plan | Check whether the plan batch, rotation department, mentor, and plan date match the agreement's position and term, and whether they correspond to the task name and date in the log | Configure the plan batch, rotation department, mentor, and plan date fields in the form input node, mark key fields as required, and after submission reference the field values in subsequent nodes and run a trial |
| Internship log | Check whether the log date, task name, work hours, student signature, and mentor receipt are continuous and complete, and whether they are consistent with the task name and date in the plan | Configure the log date, task name, work hours, student signature, and mentor receipt fields in the form input node, mark key fields as required, and after submission reference the field values in subsequent nodes and run a trial |
| Form fields and required markers | Field names correspond one-to-one with the material fields to be collected, and key material fields have been marked as required | Check field names and required settings one by one in the node configuration, and confirm that subsequent nodes can retrieve the corresponding field values after submission |

## Three common errors

- Symptom: The position name for the same student does not match between the agreement and the log. Cause: After the agreement was signed, the position was adjusted, the log was filled in according to the new position, and the agreement was not updated synchronously, resulting in inconsistent names.
- Symptom: The rotation date in the plan is misaligned with the log date. Cause: The plan version was not synchronized, the old plan was still in circulation, and the log was executed according to the new version, so the dates do not match.
- Symptom: The log is missing the mentor receipt or the agreement is missing the enterprise signature. Cause: No required validation was set in the material collection step, so it was omitted at submission, and responsibility cannot be traced during review.

## How to verify the setup

Acceptance of this function: fill in the form once and submit it, then check whether the field values retrieved by subsequent nodes are consistent with what was filled in, focusing on whether the `formInput` node output, `userSelect` options, and required markers take effect.

Business test: create an exception record, see whether the source material can be traced, and check the names, quantities, dates, and signatures in the agreement, plan, and log.

- When configuring fields in the form input node, check field names one by one to ensure they correspond one-to-one with the material fields, mark key fields as required, and after submission reference the fields in subsequent nodes and run a trial.
- Create an exception record, trace back from the form submission values to the original records of the agreement, plan, and log, and check whether the names, quantities, dates, and signatures are consistent.
