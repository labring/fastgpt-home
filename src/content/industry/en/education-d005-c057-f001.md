---
title: HTTP Integrations for National Key Research and Development Applications: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c057-f001
page_type: 行业问题页
application_area: education
meta_title: National R&D Grants | HTTP | Versions
meta_description: National R&D Grants: review HTTP for version tracking. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# HTTP Integrations for National Key Research and Development Applications: Maintain Document Versions and Changes

## What this category's data looks like

National Key R&D Program project application materials include the project application form, the budget application form, and the cooperation agreement. These materials are revised repeatedly during the application cycle, and their fields cover project name, participating units, funding amount, start and end dates, and signatures and seals. The project application form carries the research objectives and task breakdown, the budget application form lists funding sources and expenditure structure item by item, and the cooperation agreement stipulates the rights and responsibilities of each party and the signature and seal pages. The materials come from the lead unit and participating units filling them in separately and then consolidating them, and the update rhythm follows the application window, budget adjustments, and agreement re-signing. The field characteristic is that the same record appears repeatedly in the two types of materials, and the name, quantity, and date must be consistent, while signatures and receipts must be complete. When the materials enter this function, the project application form and the budget application form participate in version comparison as structured fields, and the cooperation agreement participates in reference synchronization as attachments and signature and seal information, each serving as the anchor for a single current version.

## Configuration and implementation checks

This step is executed by the HTTP node in the workflow, which outputs the response body, status code, and returned fields. The version ledger and change records are parsed from the response by subsequent nodes, or handled by an external system according to the agreement to complete the rest.

| Object | Check | Verification action |
| --- | --- | --- |
| Project application form | The project name, participating units, and start and end dates do not match the same record in the budget application form | Use `variables` in the request body to reference the project fields output by the preceding node, and compare the returned current version number and date |
| Budget application form | The funding amount and quantity are inconsistent with the project application form, or the version is not synchronized | Pass `Authorization` in the request header as required by the external system, and check the budget version and reference status in the returned fields |
| Cooperation agreement | The signature page is missing, the receipt has not been returned, or the old version is still referenced after re-signing | Use `responseData` to retrieve the signature and seal and receipt fields, and check that the current version is unique and the old version is traceable |
| Request address and path parameters | The placeholder variables resolve to actual values and point to the correct version query interface | View the rendered full address in the request preview, and confirm that the path parameters are consistent with the external interface agreement |

## Three common errors

- Symptom: the external system receives empty fields. Cause: the placeholder variables in the request body are not resolved, and the field names output by the preceding node do not match the interface agreement.
- Symptom: the name, quantity, and date of the same record do not match between the project application form and the budget application form. Cause: the versions are not synchronized, and the two materials are maintained separately.
- Symptom: the cooperation agreement lacks a signature or receipt. Cause: the signature and seal page was not returned after re-signing, and the reference still points to the old version.

## How to verify the setup

This function's acceptance: preview the rendered request, check the status code and returned fields, then compare the result against one sample, and confirm that the three placeholders `Authorization`, `variables`, and `responseData` can all be traced to specific sources.

Business test: change one piece of content and see whether the version number and reference are updated in sync.

- In the variables panel, check the source of each placeholder and confirm that the references in the path parameters, request header, and request body are consistent.
- Use one sample request to compare the response, check that the current version is unique, the old version is traceable, and the reference is synchronized, then update the knowledge base or external documents.
