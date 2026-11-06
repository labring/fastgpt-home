---
title: Forms and User Interaction for Journal Publication Licensing and Annual Verification: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c069-f016
page_type: 行业问题页
application_area: education
meta_title: Journal Licensing | Forms | Access
meta_description: Journal Licensing: review forms for authorized access. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Journal Publication Licensing and Annual Verification: Manage Authorized Access and External Services

## What this category's data looks like

Journal publication license and annual verification materials include three categories: journal publication licenses, annual verification forms, and rectification reports. The sources are submissions by publishing units and receipts from competent authorities, and the update cadence rolls with the annual verification cycle and rectification deadlines. The license states the name, publication number, publishing unit, validity period, and issue date; the annual verification form states the verification year, publication status, personnel and asset data, and signatures and seals; the rectification report states the problem items, rectification measures, completion date, and receipt. When these three categories of materials enter this function, the license and verification form serve as the basis for the visible scope of authorized access, and the rectification report serves as supplementary material for restricted display in external services. Field characteristics are concentrated in four categories: names, quantities, dates, and signatures. For the same record, inconsistencies in name spelling, issue period quantity, and verification date easily arise between the license and the verification form, and the rectification report version may not be synchronized or may lack a receipt signature.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The externally available entry points and authorization scope are then completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interactive state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Journal publication license | Whether the name, publication number, publishing unit, validity period, and issue date are item-by-item consistent with the annual verification form | Check the field names one by one in the node configuration; after submission, have subsequent nodes reference the field values for comparison, and run a trial with `formInput` once |
| Annual verification form | Whether the verification year, publication status, personnel and asset quantities, and signatures and seals are consistent with the license and rectification report | Check the required settings one by one in the node configuration; after submission, have subsequent nodes reference the field values for comparison, and use `userSelect` to select a restricted identity for a trial run |
| Rectification report | Whether the problem items, rectification measures, completion date, and receipt signature are synchronized with the version of the annual verification form | Check the field names and required markers in the node configuration; after submission, have subsequent nodes reference the field values for comparison |
| Form fields | Whether the field names correspond one-to-one with the material fields to be collected, and whether submission is possible when required items are empty | Check the field names and required markers one by one in the node configuration, then run a trial with `formInput` once |

## Three common errors

- Phenomenon: For the same record, the name, issue period quantity, and verification date in the license and annual verification form do not match. Cause: The two materials are filled in separately, and authorized access is entered without item-by-item comparison.
- Phenomenon: The rectification report version is not synchronized, and old rectification measures coexist with the new verification form. Cause: After the material was updated, it was not resubmitted, and the form field values still point to the old version.
- Phenomenon: The annual verification form lacks a signature or the rectification report lacks a receipt, yet it is still displayed as complete material. Cause: The required markers do not cover the signature and receipt fields, and no manual review is performed after submission.

## How to verify the setup

Acceptance of this function: Fill out the form once and submit it, then check whether the field values obtained by subsequent nodes match what was filled in, focusing on whether field passing works properly after `formInput` submission.

Business test: Access once with a restricted identity, see whether the visible scope matches the settings and whether unauthorized content is invisible, and use `userSelect` to select a restricted identity for a trial run.

- Check the field names and required markers one by one in the node configuration, confirm that key material fields are marked as required, then use `userSelect` to select a restricted identity for a trial run.
- Reference the `formInputResult` fields in subsequent nodes and run a trial to check whether the field values can be obtained after submission, and also check whether the conversation stays in the interactive state.
