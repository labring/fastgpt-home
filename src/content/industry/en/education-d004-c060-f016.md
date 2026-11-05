---
title: Forms and User Interaction for Research Project Annual Progress and Acceptance: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c060-f016
page_type: 行业问题页
application_area: education
meta_title: Research Progress | Forms | Handover
meta_description: Research Progress: review forms for material handover. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Research Project Annual Progress and Acceptance: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

In the scenario of annual progress and acceptance of research projects, material drafting and handover of responsibility revolve around three types of texts: annual progress reports, mid-term review materials, and acceptance reports. Annual progress reports focus on the completion of phase tasks, budget execution, and personnel input; mid-term review materials focus on milestone achievement, indicator deviations, and adjustment explanations; acceptance reports cover the list of results, test conclusions, and signature pages. Material sources are mostly project ledgers, experimental records, financial vouchers, and receipts from collaborating parties, with an update cadence that usually rolls quarterly or by milestone, and concentrated revisions at year-end and before acceptance. When entering the forms and interaction stage, the three types of materials each play different roles: annual progress reports provide verifiable progress fields within the period, mid-term review materials provide deviation and rectification fields, and acceptance reports provide results and signature fields, together forming the set of fields required for issuable material drafts and handover records.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, outputting the field values filled in by the user (passed to subsequent nodes after submission). The "issuable material drafts and handover records" are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Annual progress report | Fields complete, responsible person clear, version and date consistent | Check field names and required settings one by one in the node configuration, and confirm that the material name, quantity, date, and signature fields are all covered |
| Mid-term review materials | The name, quantity, and date of the same record match between the annual progress report and the mid-term review materials | Reference the `formInputResult` fields and run a trial, comparing whether the field values of the same record in the two materials are consistent |
| Acceptance report | Version and date consistent, signatures and receipts complete | Reference the `userSelect` and `formInputResult` field values in subsequent nodes, and check whether the version number, date, and signature receipt fields are retrieved |
| Handover record | Responsible person clear, next step can be signed for receipt | Draft one according to the template and complete one handover, confirming that missing items are blocked by required markers |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the annual progress report and the mid-term review materials. Cause: The fields in the two places are filled in separately, without same-source comparison before submission.
- Symptom: The acceptance report version is not synchronized, and signatures or receipts are missing. Cause: The version number and date fields are not marked as required, and receipts are not checked during handover.
- Symptom: After submission, subsequent nodes cannot retrieve values, or the conversation stops in the interaction state. Cause: Required items can still be submitted when empty, and field references have not been trial-run.

## How to verify the setup

Acceptance of this feature: Fill it out once and submit, check the field values retrieved by subsequent nodes, and confirm that the `formInputResult` and `selectResult` fields and required markers take effect.

Business test: Draft one according to the template and complete one handover, and see whether missing items are blocked.

- Check field names and required settings one by one in the node configuration, ensuring that key material fields are marked as required.
- Reference the corresponding fields in subsequent nodes and run a trial, confirming that values can be retrieved after submission and that the conversation continues to execute downward.
