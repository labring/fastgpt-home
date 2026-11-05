---
title: Forms and User Interaction for National Key Research and Development Applications: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c057-f016
page_type: 行业问题页
application_area: education
meta_title: National R&D Grants | Forms | Review
meta_description: National R&D Grants: review forms for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for National Key Research and Development Applications: Trace Exceptions and Review Results

## What this category's data looks like

National Key R&D Program project application materials typically include three types: the project application form, the budget application form, and the cooperation agreement. Their sources are the application system and offline stamped documents, and their update cadence changes with application rounds and supplementary notices. The project application form carries the research objectives, task breakdown, and assessment indicators; the budget application form carries the funding categories, calculation basis, and annual allocation; the cooperation agreement carries the division of labor among participating units, intellectual property, and signature pages. When the three types of materials enter the form input node, each provides fields to be verified: the application form provides the project name and start/end dates, the budget form provides the funding amount and category names, and the cooperation agreement provides the names of cooperating units and the signing date. The field characteristic is that the same record appears repeatedly across multiple materials, requiring item-by-item comparison of names, quantities, dates, and signatures.

## Configuration and implementation checks

| Object | Check | Verification action |
| --- | --- | --- |
| Item | Judgment | Verification Action |
| Project Application Form | Project name, start and end dates, signature page, budget application form, and cooperation agreement are consistent item by item | Check field names one by one in the node configuration, and confirm that the project name, dates, and signature fields correspond to the original text of the application form |
| Budget Application Form | Funding subject names, quantities, and dates match the project application form and cooperation agreement | Reference this field in subsequent nodes and run a test to verify whether the budget field values are consistent with the original text of the budget document |
| Cooperation Agreement | Cooperation unit name, signing date, signatures/seals, and receipt are complete and the version is synchronized | Check the required settings one by one, confirm that the cooperation unit and signing date are required, and attach the receipt |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the project application form and the budget application form. Cause: The two materials are filled in separately, without field-level comparison and version synchronization.
- Symptom: The cooperation agreement lacks a signature or receipt, and the version has not been synchronized to the latest. Cause: The offline stamped document was not returned, and the form did not list signatures/seals and receipt as required.
- Symptom: After submission, subsequent nodes cannot retrieve the values, or the conversation stays in the interaction state. Cause: The field names are inconsistent with the references in subsequent nodes, or required items can be submitted even when empty.

## How to verify the setup

Acceptance of this feature: fill in the form once and submit it, check the field values retrieved by subsequent nodes, and confirm that the `formInput` output matches what was filled in.

Business test: create an exception record, see whether it can be traced back to the source material, and check the reviewer's signature and the disposition outcome.

- Check the field names one by one in the node configuration, confirm that they correspond one-to-one with the fields of the project application form, budget application form, and cooperation agreement, and check the required markers.
- Reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a test, and confirm that after submission the corresponding field values can be retrieved and the conversation continues to execute downward.
