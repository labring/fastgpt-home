---
title: Forms and User Interaction for Kindergarten Safety and Emergency Drills: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c005-f016
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Safety | Forms | Handover
meta_description: Kindergarten Safety: review forms for material handover. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Kindergarten Safety and Emergency Drills: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page focuses on material drafting and handover of responsibility in kindergarten safety protection and emergency drills, covering categories such as hazard rectification notices, drill plans and sign-in sheets, access control and school bus inspection records, and handover receipt forms. The materials come from daily inspections of the kindergarten, drill organization, and security checks, and the update cadence rolls forward with each drill, weekly access control and school bus inspections, and monthly hazard re-inspections. Field characteristics center on hazard items and rectification deadlines, drill headcount and sign-in, access control and school bus inspection items, and responsible person signatures. After materials enter the workflow, the form input node handles field collection, and subsequent nodes or humans use this to complete signable material drafts and handover records, forming a closed loop from form submission to receipt.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). After triggering, the conversation enters an interactive state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use. The signable material drafts and handover records are then completed by subsequent nodes or humans.

| Object | Check | Verification action |
| --- | --- | --- |
| Hazard rectification notice material | Whether the hazard items and rectification deadlines, and the responsible person signature are complete, and whether the hazard is closed-loop | Check the field names and required markers one by one, confirm that the rectification deadline and responsible person signature fields are filled in, and after a trial run, reference the `formInputResult` field values in subsequent nodes to see whether they are retrieved |
| Drill plan and sign-in sheet material | Whether the drill headcount and sign-in are consistent with the plan, and whether the records match the plan | Check the headcount, sign-in, plan version, and date fields, and after submission check whether subsequent nodes can retrieve the corresponding `formInputResult` field values |
| Access control and school bus inspection record material | Whether access control and school bus inspection items are missing, and whether the responsible person signature is clear | Check the inspection item fields and required settings one by one, confirm there are no missing items, and run a trial to see whether missing items are blocked |
| Handover receipt form material | Whether the version and date are consistent, whether the responsible person is clear, and whether the destination can be signed for | Check the version, date, and responsible person fields, and after submission verify whether the `selectResult` output values retrieved by subsequent nodes are complete |

## Three common errors

- Phenomenon: The hazard rectification notice has been submitted, but the rectification deadline and closed-loop status are not filled in, and subsequent nodes cannot retrieve the values. Cause: The hazard item and rectification deadline fields are not marked as required, and no item-by-item check was done before submission.
- Phenomenon: The drill record headcount does not match the sign-in sheet, and the records do not match the plan. Cause: The drill headcount and sign-in fields are filled in separately, and no consistency check was done before submission.
- Phenomenon: Access control and school bus inspection items are missing, and the responsible person signature is missing, yet the process still proceeds to the next step. Cause: The inspection item fields are not set as required, and missing items are not blocked.

## How to verify the setup

Acceptance of this feature: Fill out the form once and submit it, check the field values retrieved by subsequent nodes, and confirm that the `formInputResult` and `selectResult` field values output by the form input node are fully passed on. When required items are empty, submission must not be possible, and the conversation must not get stuck in the interactive state.

Business test: Draft one copy according to the template and complete one handover to see whether missing items are blocked.

- In the node configuration, check the field names and required markers one by one, and confirm that fields such as hazard items and rectification deadlines, drill headcount and sign-in, access control and school bus inspection items, and responsible person signature correspond one-to-one with the materials.
- Reference the form fields in subsequent nodes and run a trial to confirm that the corresponding field values can be retrieved after submission; check whether submission is possible when required items are empty and whether the conversation stays in the interactive state.
