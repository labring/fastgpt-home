---
title: Forms and User Interaction for Graduate Education Process Management: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c025-f016
page_type: 行业问题页
application_area: education
meta_title: Graduate Education | Forms | Handover
meta_description: Graduate Education: review forms for material handover. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Graduate Education Process Management: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

Graduate training process management covers three types of materials: the training plan, the thesis proposal report, and the mid-term assessment form. The training plan is drafted jointly by the supervisor and the graduate student, updated by semester or academic year, with fields including course name, credits, research direction, start and end dates, and signatures of both parties. The thesis proposal report is drafted after the topic is determined, with fields including title, key points of the literature review, research plan, expected milestones, and review comments. The mid-term assessment form is filled in at the mid-point of training, with fields including completed work, stage results, next steps, and assessment conclusion. When these three types of materials enter the form input node, each plays a different role: the training plan provides the baseline for courses and direction, the thesis proposal report provides the basis for the topic and plan, and the mid-term assessment form provides stage progress and the assessment conclusion. Material drafting and responsibility handover require complete fields, clear responsible parties, and consistent versions and dates; missing items are blocked at the submission step, avoiding mismatches in names, quantities, and dates between two materials.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The "issuable material drafts and handover records" are completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters the interaction state and the workflow state is recorded; after the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Form fields | Correspond one-to-one with the material fields to be collected; the field names of the training plan, thesis proposal report, and mid-term assessment form can be matched item by item | Check the field names one by one in the node configuration, and use `formInput` to reference the field values in a test run |
| Required markers | Key material fields are marked as required; missing items cannot be submitted | Check the required settings one by one, clear the key fields, and submit to observe whether it is blocked |
| Field passing after submission | Subsequent nodes can retrieve the corresponding field values, and the handover record can be generated based on them | Reference the field in a subsequent node and run a test, and check that the retrieved value matches the submitted value |
| Version and date fields | The name, quantity, and date of the same record are consistent across the training plan, thesis proposal report, and mid-term assessment form | Compare the version numbers and date fields of the three materials, and check whether the signatures and receipts are complete |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the training plan and the mid-term assessment form. Cause: Fields are not mapped uniformly, and each is filled in separately during drafting.
- Symptom: The versions of the thesis proposal report and the mid-term assessment form are not synchronized, and the handover record points to an old version. Cause: The version field is not refreshed when the material is updated.
- Symptom: After submission, signatures or receipts are missing, and subsequent nodes cannot retrieve complete field values. Cause: Required markers do not cover the signature and receipt fields, and the interaction state ends prematurely.

## How to verify the setup

Acceptance of this feature: fill in once and submit, check the field values retrieved by subsequent nodes, and confirm that the values referenced by `formInputResult` and `selectResult` match the submitted values.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- Check the field names and required markers one by one in the node configuration, clear the key fields, and submit to confirm that missing items are blocked.
- Reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a test, check that the retrieved field values match the submitted values, and confirm that the handover record can be generated.
