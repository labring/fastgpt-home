---
title: Workflow Orchestration for Student Awards, Financial Aid and Hardship Assessment: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c022-f008
page_type: 行业问题页
application_area: education
meta_title: Student Financial Aid | Workflows | Checks
meta_description: Student Financial Aid: review workflows for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Student Awards, Financial Aid and Hardship Assessment: Compare Documents and Locate Differences

## What this category's data looks like

Student awards, grants, loans, and hardship determination involve three types of materials: the family economic hardship determination form, the scholarship/grant application form, and the loan receipt. The determination form is filled out by the student and initially reviewed by the counselor, and contains family members, income, hardship level, and a signature field; the application form is applied for by the student and summarized by the department, and contains the award name, amount, ranking, and date; the loan receipt is issued by the bank or the financial aid center, and contains the contract number, disbursement amount, and arrival date. The three types of materials update at different rhythms: the determination form is submitted centrally by academic year, the application form rolls over by batch, and the receipt is returned according to the disbursement cycle. Field characteristics center on name, student ID, amount, date, signature, and receipt number. The same object often shows mismatched names, quantities, and dates across two materials, versions are not synchronized, and signatures or receipts are missing. After the materials enter the workflow, the determination form and application form are used for cross-comparison, and the receipt is used to verify loan information; together the three support discrepancy localization.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction state records. The "discrepancy list" is completed by subsequent nodes continuing execution according to the branch. When the user selection node is triggered, the conversation enters an interaction state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Family economic hardship determination form | Name, student ID, hardship level, signature, and date are consistent across the two materials | Compare the determination form and application form item by item, check the signature field and date, and use `variables` to record discrepant fields |
| Scholarship/grant application form | Award name, amount, ranking, and date are consistent with the ledger | Compare the application form and ledger field by field, check whether versions are synchronized, and use `nodeId` to locate discrepant rows |
| Loan receipt | Contract number, disbursement amount, and arrival date are consistent with the application form | Check the amount and date on the receipt and application form, confirm the receipt number and signature are complete, and record the interaction state |
| User selection node | Each option corresponds to one branch, and the interaction state is recorded | Trial-run each option one by one, inspect the branch direction and interaction state in the run record, and check `variables` passing |

## Three common errors

- Symptom: The name, amount, and date of the same record do not match between the determination form and the application form. Cause: The two materials were filled out at different times, versions are not synchronized, and fields were not cross-checked.
- Symptom: The loan receipt is missing or the signature field is blank, and the discrepancy list cannot be closed. Cause: The receipt return cycle is long, and the signature and receipt number were not validated during material collection.
- Symptom: After selecting an option, the default branch is still taken, and the process stops after the interaction completes. Cause: The options and branch connections were not checked one by one, and the interaction state was not recorded correctly.

## How to verify the setup

This feature's acceptance: trial-run each option one by one, check the branch direction and interaction state in the run record, and confirm that `variables`, `nodeId`, and option branches correspond.

Business test: use one real record to find fields inconsistent with the ledger, record name, quantity, and date discrepancies, and submit them to the reviewer for confirmation and write-back.

- In the user selection node, check the options and branch connections one by one, and trigger once to view the node state in the run record.
- In a subsequent node, reference the selection result variable and trial-run once to confirm that the discrepancy list continues execution according to the branch.
