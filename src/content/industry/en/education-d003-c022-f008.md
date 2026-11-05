---
title: Workflow Orchestration for Student Awards, Financial Aid and Hardship Assessment: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c022-f008
page_type: 行业问题页
application_area: education
meta_title: Student Financial Aid | Workflows | Intake
meta_description: Student Financial Aid: review workflows for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Student Awards, Financial Aid and Hardship Assessment: Handle Questions and Collect Missing Information

## What this category's data looks like

Student awards, grants, loans, and hardship determination involve three core types of materials: the family economic hardship determination form, the scholarship and grant application form, and the loan receipt. The determination form comes from student submission and class review, is updated by academic year, and contains household population, income, hardship level, and signature fields; the application form comes from student application and department review, is updated by batch, and contains award name, amount, ranking, and signature; the loan receipt comes from the bank or financial aid center, is updated by disbursement cycle, and contains loan contract number, amount, date, and receipt stamp. When the materials enter the Q&A intake and missing-item follow-up function, the determination form is used to determine hardship level and eligibility, the application form is used to verify award and amount, and the receipt is used to confirm loan arrival and signature; the fields and dates of the three must be cross-compared.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch direction and interaction state records. The intake records and the completed follow-up items are continued and finished by subsequent nodes according to the branch. When the user selection node is triggered, the conversation enters the interaction state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Family economic hardship determination form | Check fields, dates, and signature: whether household population, income, hardship level, review date, and signature field are complete | In the node, check the options and branch connections one by one, and reference `variables` to see whether the determination form fields are passed to subsequent nodes |
| Scholarship and grant application form | Check fields, dates, and signature: whether award name, amount, ranking, application date, and review signature are complete | In a subsequent node, reference the selection result variable and run a trial once, and check whether the application form fields match the determination form in name, quantity, and date |
| Loan receipt | Check fields, dates, and signature: whether contract number, amount, disbursement date, and receipt stamp are complete | Trigger the user selection node once, check the node status in the run record, and verify whether the receipt matches the application form in amount and date |
| User selection node | Each option corresponds to one branch, the interaction state is recorded, and the selection result variable has been passed to subsequent nodes | In the node, check the options and branch connections one by one, use `nodeId` to locate the node, and check the branch direction and interaction state in the run record |

## Three common errors

- Symptom: The name and quantity of the same record do not match between the determination form and the application form. Cause: The two materials are submitted separately, without cross-field comparison and unification.
- Symptom: The loan receipt version is not synchronized, and the old receipt is still circulating in the process. Cause: After the receipt is updated, re-intake and branch judgment are not triggered.
- Symptom: The determination form or application form lacks a signature, or the loan receipt lacks a receipt stamp. Cause: Completeness validation is not performed when materials are uploaded, and missing items are not identified and followed up.

## How to verify the setup

Acceptance of this function: run trials option by option, check the branch direction and interaction state in the run record, and use `variables` and `nodeId` to locate references and nodes.

Business test: submit a question that lacks key information and see whether it first follows up before answering.

- In the node, check the options and branch connections one by one, confirm that each option corresponds to one branch, and check whether the interaction state is recorded.
- In a subsequent node, reference the selection result variable and run a trial once, and check whether the fields, dates, and signatures of the determination form, application form, and loan receipt are complete and consistent.
