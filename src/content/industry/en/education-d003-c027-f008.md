---
title: Workflow Orchestration for Graduate Employment Contracts and Destination Statistics: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c027-f008
page_type: 行业问题页
application_area: education
meta_title: Graduate Destinations | Workflows | Intake
meta_description: Graduate Destinations: review workflows for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Graduate Employment Contracts and Destination Statistics: Handle Questions and Collect Missing Information

## What this category's data looks like

For this category, materials come from employment agreements, graduation destination registration forms, and employer certificates. The employment agreement carries the signing parties, position, term, and signatures of both parties; the registration form carries the destination category, employer name, reporting date, and receipt; the employer certificate carries the fact of hiring, position name, start date, and official seal. The three types of materials enter statistics in batches, and the update rhythm is synchronized with the signing cycle and registration window. Fields are most prone to discrepancies in names, quantities, dates, and signatures. When materials enter this function, the employment agreement is used to verify the signing parties and seals, the registration form is used to verify the destination category and dates, and the employer certificate is used to verify the fact of hiring and the receipt. The three serve as references for one another, and if any one is missing, it becomes an item pending follow-up.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction status records. "Intake records and items to be completed" are continued and completed by subsequent nodes according to the branch. When a node is triggered, the conversation enters an interactive state and records the workflow status. After the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Employment agreement | Whether the signing parties, position, term, signatures of both parties, and dates are complete, and whether they are consistent with the employer name recorded in the registration form | Compare the employer name, position name, and dates in the agreement and the registration form item by item; if a signature or receipt is missing, mark it as an item pending follow-up |
| Graduation destination registration form | Whether the destination category, employer name, reporting date, and receipt are fully filled in, and whether they match the start date in the employer certificate | Check the dates and names in the registration form and the employer certificate, reference `variables` to pass already filled fields, and missing items enter the follow-up branch |
| Employer certificate | Whether the fact of hiring, position name, start date, and official seal are present, and whether they correspond to the term in the agreement | Check the position and dates in the certificate, reference `nodeId` in subsequent nodes to locate the branch, and if the official seal or date is missing, generate a follow-up question |
| Intake record | Whether missing items are identified and followed up, whether answers are supported by material evidence, and whether the branch direction is consistent with the selection | Check the interaction status and branch direction in the run record, and confirm that follow-up items correspond one-to-one with material fields |

## Three common errors

- Phenomenon: The employer name and position name for the same record do not match between the agreement and the registration form. Cause: The two materials are filled in separately, and statistics are entered without field-level comparison.
- Phenomenon: The start date and reporting date in the registration form and the employer certificate are inconsistent. Cause: Versions are not synchronized, an old form overwrites a new one, or the receipt has not been backfilled.
- Phenomenon: The agreement lacks a signature, the certificate lacks an official seal, or the registration form lacks a receipt. Cause: The material circulation step does not verify the completeness of seals and receipts.

## How to verify the setup

Acceptance of this function: run through each option, check the branch direction and interaction status in the run record, confirm that options and branch connections are consistent, and that the selection result variable has been passed to subsequent nodes.

Business test: submit a question missing key information, see whether it first asks a follow-up question before answering, and check whether the follow-up items fall on the fields of the employment agreement, graduation destination registration form, and employer certificate.

- In the node, check the options and branch connections one by one, trigger an interaction once, and then view the node status in the run record.
- Reference the selection result variable in a subsequent node and run it once to confirm that the missing-item follow-up branch corresponds to the material fields.
