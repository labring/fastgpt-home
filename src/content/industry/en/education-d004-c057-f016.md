---
title: Forms and User Interaction for National Key Research and Development Applications: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c057-f016
page_type: 行业问题页
application_area: education
meta_title: National R&D Grants | Forms | Handover
meta_description: National R&D Grants: review forms for material handover. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for National Key Research and Development Applications: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

National Key R&D Program project applications involve three types of materials: the project application form, the budget application form, and the cooperation agreement. Their sources are the various special program guidelines, internal unit templates, and consortium negotiation records, and their update cadence rolls forward with application batches and adjustments to consortium members. The project application form carries the research objectives, task breakdown, and assessment indicators; the budget application form carries the subject amounts, calculation basis, and self-funding ratio; the cooperation agreement carries the task division, fund disbursement, intellectual property, and signature page. When the three types of materials enter the form input node, each has a different role: the project application form provides the main body fields, the budget application form provides the numeric fields, and the cooperation agreement provides the responsibility and signature fields. Field characteristics manifest as names, quantities, dates, responsible persons, version numbers, and signature statuses coexisting, and the same record must remain consistent across the three materials, requiring item-by-item verification during handover.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The signable material drafts and handover records are completed by subsequent nodes or manually afterward. After the form input node is triggered, the conversation enters the interaction state and records the workflow state; after the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Project application form | Whether the name, date, responsible person, and version number are consistent with the budget application form and cooperation agreement | Check the field names one by one in the node configuration, confirm they correspond one-to-one with the material fields, and check the field references of `formInput` |
| Budget application form | Whether the quantity, amount, calculation basis, and self-funding ratio match the project application form and cooperation agreement | Check the required settings one by one, mark key numeric fields as required, reference the field in subsequent nodes after submission, and run a trial |
| Cooperation agreement | Whether the task division, fund disbursement, intellectual property, signature, and receipt are complete | Use `userSelect` to select the responsible person and signing status, and check whether the signature page fields enter the form |
| Handover record | Complete fields, clear responsible person, consistent version and date | Draft one according to the template and complete one handover, see whether missing items are blocked, and check the field transfer after submission |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the project application form and the budget application form. Cause: No item-by-item comparison was made during drafting, and the form fields did not cover all material fields.
- Symptom: The cooperation agreement version is not synchronized, the signature page is missing, or the receipt has not been recovered. Cause: The version number was not updated with modifications, and the signing status field was not checked during handover.
- Symptom: After submission, subsequent nodes cannot retrieve the values, and the conversation stays in the interaction state. Cause: Required items can be submitted even when empty, or the field references were not correctly configured in subsequent nodes.

## How to verify the setup

Acceptance of this feature: Fill it out once and submit, check the field values retrieved by subsequent nodes, and confirm that the field values of `formInputResult` and `selectResult` can be passed correctly.

Business test: Draft one according to the template and complete one handover, and see whether missing items are blocked.

- Check the field names one by one in the node configuration, and confirm they correspond one-to-one with the fields of the project application form, budget application form, and cooperation agreement.
- Check the required settings one by one, reference the field in subsequent nodes and run a trial, and confirm that the field transfer after submission works properly.
