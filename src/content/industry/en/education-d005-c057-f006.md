---
title: Scheduled Tasks and Automation for National Key Research and Development Applications: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c057-f006
page_type: 行业问题页
application_area: education
meta_title: National R&D Grants | Automation | Versions
meta_description: National R&D Grants: review automation for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Scheduled Tasks and Automation for National Key Research and Development Applications: Maintain Document Versions and Changes

## What this category's data looks like

National Key R&D Program project applications involve three types of materials: the project application, the budget application, and the cooperation agreement. The project application carries the research objectives, task breakdown, and assessment indicators; the budget application carries the subject amounts, calculation basis, and annual disbursement; the cooperation agreement carries the division of labor among participating units, intellectual property ownership, and signed receipts. In the version ledger, each of the three types of materials serves as an independent record object, and their fields cross-reference the same project name, participating units, start and end dates, funding amounts, and signature status. The material sources are exports from the application system and offline stamped scans, and the update cadence is triggered by application milestones and budget adjustments. The field characteristics are dense dates and quantities, with signature and receipt statuses coexisting; the same record must remain consistent across different materials, old versions must be traceable after a version change, and reference locations must be refreshed in sync.

## Configuration and implementation checks

| Object | Check | Verification action |
| --- | --- | --- |
| Item | Judgment | Verification Action |
| Project Application Form | Whether the project name, participating units, start and end dates, and assessment indicators align item by item with the Budget Application Form and the Cooperation Agreement | Compare the same fields across the three documents, check whether dates and quantities are consistent, and verify that signatures and receipts are complete |
| Budget Application Form | Whether the subject amounts, calculation basis, and annual disbursement dates are consistent with the corresponding records in the Project Application Form and the Cooperation Agreement | Check the name, quantity, and date of the same record in the two documents, and confirm that the version number and references are updated in sync |
| Cooperation Agreement | Whether the division of work among participating units, intellectual property ownership, and signature receipts are consistent with the application materials | Check the signature page and receipts, and confirm that the current version is unique, old versions are traceable, and reference locations have been synchronized |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the project application and the budget application. Cause: The two materials are maintained separately and are not compared against the same version ledger.
- Symptom: After changing one piece of content, the version number does not change, and reference locations still point to the old version. Cause: The version is not synchronized, and change records are not refreshed along with the content.
- Symptom: The cooperation agreement lacks signatures or receipts, yet the application materials show that everything is complete. Cause: Signature status is not written back, and statuses are not aligned across materials.

## How to verify the setup

This feature's acceptance: check the trigger records and execution times to confirm that execution occurs on schedule and only once.

Business test: change one piece of content and see whether the version number and references are updated in sync.

- Check the process connections and trigger records to confirm that the trigger is connected to the corresponding tool node and that the tool description clearly states when it should execute.
- Confirm that the termination node is attached at the end of the tool when no summary is needed, and check whether the version ledger and change records are completed by per-record execution or catch-up runs.
