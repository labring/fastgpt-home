---
title: Workflow Orchestration for Graduate Employment Contracts and Destination Statistics: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c027-f008
page_type: 行业问题页
application_area: education
meta_title: Graduate Destinations | Workflows | Review
meta_description: Graduate Destinations: review workflows for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Graduate Employment Contracts and Destination Statistics: Trace Exceptions and Review Results

## What this category's data looks like

For university employment contract signing and graduation destination statistics, materials come from three categories: employment agreements, graduation destination registration forms, and employer certificates. The employment agreement is signed by the student and the employer and then returned to the college; its fields include employer name, position, signing date, and signatures of both parties. The graduation destination registration form is filled out by the student and initially reviewed by the counselor; its fields include destination type, employer name, reporting date, and the student's own signature. The employer certificate is issued by the employer; its fields include the offered position, onboarding date, employer contact, and receipt. The three types of materials are updated centrally by month and during graduation season, and the same record often appears across tables, so names, quantities, and dates need to be aligned item by item. When entering anomaly tracing and manual review, the employment agreement serves as the primary evidence of signing, the graduation destination registration form serves as supporting evidence of destination, and the employer certificate serves as corroborating evidence of performance; the three are source materials for one another and are used to locate inconsistent fields.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch direction and interaction status records. The "anomaly list and review conclusions" are completed by subsequent nodes continuing execution according to the branch. When the user selection node is triggered, the conversation enters an interactive state and records the workflow status; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Employment agreement | Employer name, position, signing date, and signatures of both parties must be consistent with the registration form | Retrieve the original agreement, compare the same-named fields in the registration form, check the date and signature positions, and record discrepancies to `variables` |
| Graduation destination registration form | Destination type, employer name, reporting date, and the student's own signature must be consistent with the agreement | Trace the registration form filing record by `nodeId`, check the signature and receipt, and mark items missing signatures |
| Employer certificate | Offered position, onboarding date, employer contact, and receipt must be consistent with the agreement | Obtain the original certificate and compare the position and date, check whether the receipt is complete, and write discrepancies to `variables` |
| Anomaly record | Supported by original records and signed by the reviewer | Attach source materials item by item, confirm the signature, and hand it over to the responsible person for handling |

## Three common errors

- Phenomenon: The employer name, quantity, and date for the same record do not match between the agreement and the registration form. Cause: The two materials are filled out by different people, and no field-level comparison was performed.
- Phenomenon: Material versions are not synchronized, and an old version of the registration form is still in circulation. Cause: The update cadence was not aligned, and missing receipts and signatures were not identified.
- Phenomenon: Records missing signatures or receipts still enter review. Cause: The review entry point did not verify signature positions and receipt completeness.

## How to verify the setup

Acceptance of this feature: run through each option, check the branch direction and interaction status in the run records, confirm that selected branches and default branches are not confused, and check whether `variables` and `nodeId` are passed along with the branch.

Business test: create an anomaly record and see whether it can be traced back to the source materials

- In the node, check the options and branch connections one by one; after a trial run, check the node status and selection result variables in the run records
- For each anomaly record, attach the employment agreement, graduation destination registration form, and employer certificate one by one, confirm the signature and receipt, and hand it over to the responsible person for handling
