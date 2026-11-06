---
title: Forms and User Interaction for Academic Misconduct Reports and Investigations: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c063-f016
page_type: 行业问题页
application_area: education
meta_title: Research Misconduct | Forms | Access
meta_description: Research Misconduct: review forms for authorized access. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Academic Misconduct Reports and Investigations: Manage Authorized Access and External Services

## What this category's data looks like

Materials in the academic misconduct report investigation and handling category are usually submitted separately by the reporter, the reported party, the investigation team, external experts, and the competent authority, and when they enter the system they mainly fall into three types: report materials, investigation reports, and expert appraisal opinions. Report materials focus on the source of leads and factual descriptions, investigation reports focus on procedural nodes and conclusions, and expert appraisal opinions focus on technical judgments and boundaries of responsibility. The update rhythm of materials is driven by stages such as acceptance, preliminary verification, formal investigation, review, and feedback, and field characteristics are concentrated in names, quantities, dates, signatures, and receipts. When the three types of materials enter this function, report materials are the source of entry fields, investigation reports are the source of process fields, and expert appraisal opinions are the source of judgment fields, each playing a different role.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The externally available entry point and authorization scope are then completed by subsequent nodes or manually. The form does not automatically identify material content, nor does it judge the authenticity of materials.

| Object | Check | Verification action |
| --- | --- | --- |
| Report materials | Whether fields, dates, and signatures are consistent with the investigation report | Check field names one by one in the node configuration, confirm that names, quantities, dates, and signature items correspond, and after a trial run check the field values referenced by subsequent nodes |
| Investigation report | Whether the version is synchronized and whether receipts are complete | Check the report version number and date, confirm that signature and receipt fields are marked as required, and after submission check the field values obtained by subsequent nodes |
| Expert appraisal opinions | Whether the names, quantities, and dates of the same record match across the two materials | Compare the names, quantities, and dates in the appraisal opinions and the investigation report, confirm that signature and receipt fields are complete, and verify field transmission through a trial run |
| `formInputResult` and `selectResult` | Whether the visible scope for restricted identities matches the authorization settings | Access once with a restricted identity, check the visible fields against the authorization scope, and confirm that unauthorized content is not visible |

## Three common errors

- Phenomenon: The names, quantities, and dates of the same record do not match between the report materials and the investigation report. Cause: Fields were not checked item by item, and after submission subsequent nodes obtain inconsistent values.
- Phenomenon: The investigation report version is not synchronized, and old-version fields are still referenced. Cause: Version and date fields were not included as required, and the workflow state recorded by the interaction state is out of sync with the latest materials.
- Phenomenon: Expert appraisal opinions lack signatures or receipts but can still be submitted. Cause: Key material fields were not marked as required, and after submission subsequent nodes cannot obtain complete field values.

## How to verify the setup

Acceptance of this function: fill it out once and submit, check the field values obtained by subsequent nodes, and confirm that the outputs of `formInputResult` and `selectResult` are consistent with what was filled in.

Business test: access once with a restricted identity, see whether the visible scope matches the settings, and confirm that unauthorized content is not visible.

- Check field names and required markers one by one in the node configuration, and confirm that the names, quantities, dates, signatures, and receipt fields of report materials, investigation reports, and expert appraisal opinions correspond one to one.
- Reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a trial, confirm that the field values can be obtained after submission, and that the conversation does not stop in the interaction state.
