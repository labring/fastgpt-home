---
title: Workflow Orchestration for Training Provider Admissions and Inquiry Follow-Up: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c043-f008
page_type: 行业问题页
application_area: education
meta_title: Training Admissions | Workflows | Checks
meta_description: Training Admissions: review workflows for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Training Provider Admissions and Inquiry Follow-Up: Compare Documents and Locate Differences

## What this category's data looks like

In the training institution enrollment consultation conversion scenario, materials mainly come from three categories: enrollment brochures, consultation records, and trial class schedules. Enrollment brochures are updated by the marketing side according to class terms, and include course names, number of class hours, start dates, fee items, and signature/seal positions; consultation records are registered one by one by consultants, and include student names, intended courses, communication dates, and receipt signatures; trial class schedules are arranged weekly by academic affairs, and include trial class times, teaching teachers, attendance lists, and confirmation signatures. The three types of materials have different update rhythms: brochures follow enrollment batches, consultation records are generated in real time with communication, and trial class schedules roll weekly. In terms of field characteristics, the three types of fields—names, quantities, and dates—are most prone to cross-material discrepancies, while signatures and receipts determine whether the materials are complete. When entering this function, the enrollment brochure serves as the baseline material, the consultation record serves as the material to be checked, and the trial class schedule serves as supplementary evidence; together, the three support the judgment of consistency in names, quantities, and dates for the same record across two materials.

## Configuration and implementation checks

This step is executed by a workflow node (user selection and branching), outputting branch directions and interaction status records. The "discrepancy list" is completed by subsequent nodes continuing execution according to the branch. When the user selection node is triggered, the conversation enters an interactive state and records the workflow status; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Enrollment brochure | Check whether course names, number of class hours, start dates, and signature/seal positions are complete | Compare the brochure and the ledger field by field, and mark positions where names, quantities, and dates do not match |
| Consultation record | Check whether student names, intended courses, communication dates, and receipt signatures are consistent | Compare each record one by one against the brochure and trial class schedule, locate discrepant fields, and record them |
| Trial class schedule | Check whether trial class times, teaching teachers, attendance lists, and confirmation signatures are synchronized | Check whether versions are synchronized, and confirm entries missing signatures or receipts |
| User selection node | Check whether each option corresponds to one branch and whether the interaction status is recorded | Check options and branch connections one by one in the node, trigger once, and view the node status in the run record |

## Three common errors

- Phenomenon: The course name for the same student does not match between the consultation record and the trial class schedule. Cause: The two materials' versions are not synchronized, and different update rhythms cause deviations in field values.
- Phenomenon: The number of class hours and start dates in the enrollment brochure and the ledger are inconsistent. Cause: The brochure is updated by batch, while the ledger is written back by record, and there is a lack of a unified verification step.
- Phenomenon: The consultation record or trial class schedule lacks signatures or receipts, and the materials are incomplete. Cause: Signature positions were not confirmed item by item during registration, and review results were not written back in time after interaction was completed.

## How to verify the setup

Acceptance of this function: trial-run each option one by one, check the branch direction and interaction status in the run record, confirm that each option corresponds to one branch, and reference the selection result variable `variables` in a subsequent node and trial-run once.

Business test: use one real record to find fields inconsistent with the ledger, check the names, quantities, dates, and signatures in the three materials—enrollment brochure, consultation record, and trial class schedule—record the discrepancy positions, and submit them to the reviewer for confirmation and write-back.

- Check options and branch connections one by one in the node, trigger one interaction, and view the node status in the run record and the branch direction corresponding to `nodeId`.
- Reference the selection result variable `variables` in a subsequent node and trial-run once to confirm that the process continues execution after the interaction is completed, without stopping or re-entering the interaction.
