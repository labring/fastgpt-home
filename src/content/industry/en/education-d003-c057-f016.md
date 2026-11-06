---
title: Forms and User Interaction for National Key Research and Development Applications: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c057-f016
page_type: 行业问题页
application_area: education
meta_title: National R&D Grants | Forms | Intake
meta_description: National R&D Grants: review forms for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for National Key Research and Development Applications: Handle Questions and Collect Missing Information

## What this category's data looks like

The data in this category looks like this: National Key R&D Program project applications involve three types of materials: the project application form, the budget application form, and the cooperation agreement. The project application form is written by the lead organization and includes research content, assessment indicators, participating organizations, and start and end dates; the budget application form is prepared by finance and the project leaders and includes subject amounts, funding sources, and annual disbursement pace; the cooperation agreement is signed by participating organizations and includes task division, fund allocation, and stamped signature pages. The three types of materials are submitted intensively during the application window, and versions are updated as consortium negotiations and budget adjustments proceed. The field characteristics are that four types of information—names, quantities, dates, and signatures/seals—appear in an interwoven manner. When entering Q&A acceptance and missing-item follow-up, the project application form provides the research objectives and indicator sources, the budget application form provides the basis for funding and duration, and the cooperation agreement provides the basis for division of labor and signatures/seals. The three complement each other, and if any one is missing, it becomes a pending question item.

## Configuration and implementation checks

How to configure it: This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). "Acceptance records and completed question items" are then completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters the interaction state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Project application form | Check whether the name, quantity, and start and end dates are consistent with the budget application form | Check the field names one by one in the node configuration, and use `formInput` to reference the field values for a trial run |
| Budget application form | Check whether the fund allocation and annual disbursement dates match the cooperation agreement | Check the required settings one by one, and confirm that key material fields have been marked as required |
| Cooperation agreement | Check whether signatures, seals, and receipts are complete, and whether the version is synchronized | Reference this field in subsequent nodes and run a trial to confirm that the corresponding field value can be retrieved |
| Form input node | If a required item is empty, submission is not allowed; after submission, the field values can be used by subsequent nodes | Use `userSelect` to select the material type and submit, then check whether the conversation remains in the interaction state |

## Three common errors

- Phenomenon: The same project name is written differently in the project application form and the budget application form. Cause: The two materials are filled in separately by different roles, and field alignment was not performed.
- Phenomenon: The fund allocation amount does not match between the budget application form and the cooperation agreement. Cause: The versions were not synchronized, and after negotiation only one material was changed.
- Phenomenon: The cooperation agreement lacks a signature or receipt but is still submitted as complete material. Cause: The form does not automatically identify material content, nor does it judge the authenticity of materials.

## How to verify the setup

Acceptance of this function: Fill it out once and submit, check the field values retrieved by subsequent nodes, and confirm that the fields corresponding to `formInputResult` and `selectResult` can be passed correctly.

Business test: Submit a question that lacks key information, see whether it first asks a follow-up before answering, and whether the follow-up items point to specific fields in the project application form, budget application form, or cooperation agreement.

- Check the field names one by one in the node configuration, and confirm that they correspond one-to-one with the material fields to be collected.
- Check the required settings one by one, and confirm that key material fields have been marked as required and that empty values cannot be submitted.
