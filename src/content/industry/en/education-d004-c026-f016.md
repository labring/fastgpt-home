---
title: Forms and User Interaction for Degree Awards and Certificate Information Reporting: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c026-f016
page_type: 行业问题页
application_area: education
meta_title: Degree Certificates | Forms | Handover
meta_description: Degree Certificates: review forms for material handover. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Degree Awards and Certificate Information Reporting: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page addresses the material drafting and responsibility handover steps in the degree conferral and certificate information reporting scenario, involving three types of materials: degree application forms, thesis review forms, and defense resolutions. The degree application form carries the applicant's basic information and course grades, the thesis review form records review opinions and conclusions, and the defense resolution summarizes the defense committee's vote and signatures. These materials are usually submitted in batches, with an update cadence synchronized with the degree evaluation cycle; field characteristics include name, student ID, thesis title, date, signature fields, and so on. When the materials enter the form input node, each serves as an independent entry item or attachment description item, entered item by item by the submitter, providing field values for subsequent nodes to generate issuable material drafts and handover records.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, outputting the field values filled in by the user (passed to subsequent nodes after submission). The issuable material drafts and handover records are completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interactive state and the workflow state is recorded; after the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Degree application form | Fields are complete, the responsible person is clear, the version and date are consistent, and the name, quantity, and date match those in the thesis review form and defense resolution | Check field names and required markers one by one in the node configuration, reference the `formInputResult` field and run a trial, and confirm that subsequent nodes can retrieve the corresponding field values |
| Thesis review form | Review opinions, conclusions, date, and signature fields are complete, and the name, quantity, and date of the same record match those in the degree application form and defense resolution | Check the required settings one by one, reference the `selectResult` output in subsequent nodes and run a trial, and check whether the field transfer is complete after submission |
| Defense resolution | The defense committee's voting results, signatures, and receipt are complete, and the version is synchronized with the degree application form and thesis review form | Check field names and required items, reference the `formInputResult` field in subsequent nodes and run a trial, and confirm whether missing items are blocked |
| Handover record | The responsible person is clear, the version and date are consistent, and they match the corresponding records in the three materials | Check whether the handover record fields correspond one-to-one with the material fields, and run a handover trial to see whether missing items are blocked |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the degree application form and the thesis review form. Cause: The two materials are filled in separately, and no field-level comparison is done before submission.
- Symptom: The defense resolution version is not synchronized and still references the conclusion of an old version of the thesis review form. Cause: The version and date fields are not mandatorily linked, and no check is done at handover.
- Symptom: Materials are missing signatures or receipts but still proceed to the next step. Cause: The required markers do not cover the signature and receipt fields, and submission is not blocked.

## How to verify the setup

This feature's acceptance: fill in once and submit, check the field values retrieved by subsequent nodes, confirm that the `formInputResult` and `selectResult` fields are passed correctly, that submission is not possible when required items are empty, and that the conversation does not get stuck in the interactive state.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- Check field names and required markers one by one in the node configuration, ensuring they correspond one-to-one with the fields of the degree application form, thesis review form, and defense resolution.
- Reference the `formInput` or `selectResult` output in subsequent nodes and run a trial, confirming that the field values can be retrieved after submission and that missing items are blocked.
