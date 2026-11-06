---
title: Workflow Orchestration for Training Provider Admissions and Inquiry Follow-Up: Find Supporting Evidence
slug: /en/industry/education-d001-c043-f008
page_type: 行业问题页
application_area: education
meta_title: Training Admissions | Workflows | Evidence
meta_description: Training Admissions: review workflows for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Training Provider Admissions and Inquiry Follow-Up: Find Supporting Evidence

## What this category's data looks like

This category's data centers on three types of materials: enrollment brochures, consultation records, and trial-class schedules. Enrollment brochures provide course names, class types, class hours, and fee-caliber statements, and serve as the external basis for parent inquiries; consultation records carry parent demands, communication times, and follow-up staff signatures, and serve as the internal process basis; trial-class schedules record trial times, teachers, classrooms, and receipts, and serve as the visit-conversion basis. The three types of materials are updated by enrollment season: brochures are revised as class types are adjusted, consultation records are added entry by entry, and trial schedules are arranged weekly. Field characteristics are the coexistence of names, quantities, dates, signatures, and receipts, with the same record appearing repeatedly across multiple materials. When entering workflow orchestration, brochures serve as the source of external caliber, consultation records as the source of process traces, and trial-class schedules as the source of visit credentials, each supplying basis entries that can be traced back to the original text.

## Configuration and implementation checks

This step is executed by a workflow node (user selection and branching), outputting branch directions and interaction-state records. "Basis entries that can be traced back to the original text" are completed by subsequent nodes continuing execution along the branch. When the node is triggered, the conversation enters an interaction state and the workflow state is recorded; after the user completes the selection, execution continues along the branch corresponding to the chosen option.

| Object | Check | Verification action |
| --- | --- | --- |
| Enrollment brochure | Whether course names, class types, class hours, and fee-caliber statements match the consultation records and trial-class schedules, and whether the version is current | Compare names, quantities, and dates in the brochure and consultation records item by item, and check the revision date and signature fields |
| Consultation record | Whether parent demands, communication times, and follow-up staff signatures are complete, and whether the name, quantity, and date of the same record are consistent with the brochure | Extract one record, trace it back to the original text of the brochure and trial-class schedule, and check whether signatures and receipts are missing |
| Trial-class schedule | Whether trial times, teachers, classrooms, and receipts are complete, and whether they are consistent with the brochure's class types and the consultation records' dates | Check receipts item by item according to the weekly schedule, and confirm that versions are synchronized and dates do not conflict |
| User selection node | Whether each option corresponds to one branch, and whether the selection-result variable is passed to subsequent nodes | Check options and branch connections one by one in the node, reference `variables` in subsequent nodes and run a trial once, and inspect the node status and `nodeId` in the run record |

## Three common errors

- Symptom: the name and quantity of the same record do not match between the brochure and the consultation record. Cause: materials are maintained separately, there is no cross-material comparison step, and field alignment is not done before entering the workflow.
- Symptom: trial-class schedule dates conflict with the brochure's class-type cycle. Cause: versions are not synchronized, the old brochure is still in use, and scheduling is not checked back against the current brochure.
- Symptom: consultation records lack follow-up staff signatures, and trial-class schedules lack receipts. Cause: no signature and receipt validation is set up in the material circulation step, so basis entries cannot be traced back to the original text.

## How to verify the setup

Feature acceptance: run a trial for each option one by one, check the branch direction and interaction state in the run record, confirm that the selection-result variable has been passed to subsequent nodes, and review by referencing `variables` and `nodeId` in subsequent nodes.

Business test: ask a cross-material basis question, see whether the answer gives a traceable source, and check whether names, quantities, dates, and signatures/receipts match the original text.

- In the user selection node, check options and branch connections one by one, trigger it once, and then inspect the node status and branch direction in the run record.
- Extract one consultation record, trace it back to the original text of the enrollment brochure and trial-class schedule, and check whether names, quantities, dates, signatures, and receipts are consistent.
