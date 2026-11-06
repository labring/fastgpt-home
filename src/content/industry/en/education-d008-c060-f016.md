---
title: Forms and User Interaction for Research Project Annual Progress and Acceptance: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c060-f016
page_type: 行业问题页
application_area: education
meta_title: Research Progress | Forms | Access
meta_description: Research Progress: review forms for authorized access. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Research Project Annual Progress and Acceptance: Manage Authorized Access and External Services

## What this category's data looks like

This category's data looks like this: Annual progress and acceptance of research projects involves three types of materials: annual progress reports, mid-term review materials, and acceptance reports. Annual progress reports are updated on an annual cycle, with fields including project name, start and end dates, phase objectives, completion status, funding usage, and responsible person's signature; mid-term review materials are submitted when the project is halfway through, with fields including indicator completion, deviation explanation, adjustment request, and review comments; acceptance reports are formed at project closure, with fields including results list, test records, financial final accounts, and acceptance conclusion. When the three types of materials enter the form input node, their roles differ: annual progress reports are used to confirm progress and signature receipts within the cycle, mid-term review materials are used to check indicators and adjustment matters, and acceptance reports are used to close out results and conclusions. Authorized access and external services require that visitor identity matches the visible scope, and unauthorized access must not be visible. Material fields must correspond one-to-one with form fields, names, quantities, and dates must remain consistent across materials, versions must be synchronized, and signatures or receipts must be completed before opening to parents or superiors.

## Configuration and implementation checks

| Object | Check | Verification action |
| --- | --- | --- |
| Item | Judgment | Verification Action |
| Annual Progress Report | Fields correspond one-to-one with the fields of the annual progress report materials; key fields are marked as required; dates and signatures are complete | Check field names and required settings one by one in the node configuration; after submission, check the field values retrieved by subsequent nodes referencing `formInputResult` |
| Mid-term Inspection Materials | Fields correspond one-to-one with the fields of the mid-term inspection materials; indicator completion, deviation explanation, and review comments are not missing | Check field names and required markers one by one; after submission, check whether subsequent nodes can retrieve the corresponding field values, and confirm that the `userSelect` options are consistent with the materials |
| Acceptance Report | Fields correspond one-to-one with the fields of the acceptance report; the results list, test records, financial final accounts, and acceptance conclusion are complete | Check field names and required settings one by one; after submission, run a trial of the `formInput` reference to confirm that subsequent nodes retrieve the field values |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the annual progress report and the mid-term review materials. Cause: The fields do not correspond one-to-one with the material fields, and after submission the subsequent nodes obtain inconsistent values.
- Symptom: The version of the acceptance report is not synchronized, and the old results list is mixed with new test records. Cause: After the materials were updated, the form was not resubmitted, and subsequent nodes still obtain the old field values.
- Symptom: The annual progress report lacks a signature or receipt, and the acceptance report lacks an acceptance conclusion. Cause: Key material fields are not marked as required, and submission is possible even when required items are empty.

## How to verify the setup

How to verify the setup: Acceptance of this feature: fill it out once and submit, check the field values obtained by subsequent nodes, confirm that `formInputResult` and `selectResult` references are correct, and confirm that the conversation continues to execute after submission.

Business test: access once with a restricted identity, see whether the visible scope matches the settings, and confirm that unauthorized access is not visible.

- Check field names and required markers one by one in the node configuration, and confirm that they correspond one-to-one with the fields of the annual progress report, mid-term review materials, and acceptance report.
- After submission, reference `formInputResult` and `selectResult` for a trial run, confirm that subsequent nodes can obtain the corresponding field values, and that the conversation does not stop in the interactive state.
