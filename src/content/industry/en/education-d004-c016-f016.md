---
title: Forms and User Interaction for School Safety Inspections and Incident Reporting: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c016-f016
page_type: 行业问题页
application_area: education
meta_title: Campus Safety | Forms | Handover
meta_description: Campus Safety: review forms for material handover. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for School Safety Inspections and Incident Reporting: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

School safety hazard inspections and campus incident reporting rely on three types of materials in daily operations: safety inspection checklists, hazard rectification ledgers, and emergency incident reports. Safety inspection checklists are generated through weekly or monthly inspections, with fields including inspection area, hazard description, inspector, and date; hazard rectification ledgers are updated on a rolling basis along with inspection results, with fields including hazard number, rectification measures, responsible person, deadline, and closure status; emergency incident reports are drafted within a time limit after an incident occurs, with fields including incident course, handling measures, reporter, and signed receipt. When these three types of materials enter the form input node, each plays a different role: the safety inspection checklist is the source record, the hazard rectification ledger is process tracking, and the emergency incident report is result reporting. Material drafting and responsibility handover require that the name, quantity, and date of the same record be consistent across different materials, that versions be synchronized, that signatures and receipts be complete, and that missing items be blocked by required markers, ensuring it can be issued and receipted.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The "issuable material drafts and handover records" are completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters the interaction state and the workflow state is recorded. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Safety inspection checklist | Whether the inspection area, hazard description, inspector, and date are complete, and whether they are consistent with the name, quantity, and date in the ledger | Check the field names and required settings one by one in the node configuration, and after submission check whether subsequent nodes can reference the corresponding field values |
| Hazard rectification ledger | Whether the hazard number, rectification measures, responsible person, deadline, and closure status are clear, and whether the version and date are synchronized | Check the required markers, run a test submission once, and confirm that subsequent nodes obtain the rectification responsible person and deadline fields |
| Emergency incident report | Whether the incident course, handling measures, reporter, and signed receipt are complete, and whether signatures and receipts are missing | Check the required settings one by one, and after submission verify the transmission of the receipt field; missing items should be blocked by required markers |
| formInput field transmission | Subsequent nodes can obtain the corresponding field values, and submission is not allowed when required items are empty | Reference this field in a subsequent node and run a test; the conversation should not remain in the interaction state |

## Three common errors

- Phenomenon: The name, quantity, and date of the same hazard do not match between the safety inspection checklist and the rectification ledger. Cause: The two places are filled in manually separately, without field verification and version synchronization.
- Phenomenon: The emergency incident report lacks a signature or receipt, and the handover record is incomplete. Cause: The required markers do not cover the signature and receipt fields, and no one reviews after submission.
- Phenomenon: After submission, subsequent nodes cannot obtain the values, and the conversation remains in the interaction state. Cause: The field names do not correspond one to one, or required items are still submitted when empty.

## How to verify the setup

Check form field names and required flags, then attempt submission with one required value missing. Complete it and inspect the submitted values in `formInputResult`. Compare the selection node options with the material types and confirm that downstream nodes receive the corresponding results.

Business test: draft one according to the template and complete one handover, see whether missing items are blocked, whether the name, quantity, and date of the same record are consistent in the safety inspection checklist, hazard rectification ledger, and emergency incident report, and whether the version and signature receipt are complete.

- Check the field names and required settings one by one in the node configuration, ensuring they correspond one to one with the fields of the safety inspection checklist, hazard rectification ledger, and emergency incident report.
- Reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a test, confirming that values can be obtained after submission, missing items are blocked by required markers, and the conversation does not get stuck in the interaction state.
