---
title: Workflow Orchestration for Graduate Employment Contracts and Destination Statistics: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c027-f008
page_type: 行业问题页
application_area: education
meta_title: Graduate Destinations | Workflows | Checks
meta_description: Graduate Destinations: review workflows for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Graduate Employment Contracts and Destination Statistics: Compare Documents and Locate Differences

## What this category's data looks like

This category's data involves three types of materials: employment agreements, graduation destination registration forms, and employer certificates. The employment agreement is signed by the graduate and the employer, and contains the employer name, position, signing date, and signatures and seals of both parties; the graduation destination registration form is compiled and submitted by the department, and contains the destination type, employer name, reporting date, and review signature; the employer certificate is issued by the hiring employer, and contains the hiring list, number of people, onboarding date, and receipt. The three types of materials come from different sources and have different update rhythms: agreements are generated immediately upon signing, registration forms are compiled by batch, and certificates are returned according to employer receipts. When materials enter the workflow, the agreement and the registration form serve as the primary comparison objects, while the employer certificate serves as supporting evidence and the basis for receipt verification; together, the three support cross-checking of the same record on name, quantity, date, and signature.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branches), outputting branch directions and interaction state records. When triggered, the conversation enters the interaction state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the selected option. The "discrepancy list" is completed by subsequent nodes continuing execution according to the branch.

| Object | Check | Verification action |
| --- | --- | --- |
| Employment agreement | Check whether the employer name, position, signing date, and signatures and seals of both parties are consistent with the registration form | Compare the employer name, signing date, and signature fields of the agreement and the graduation destination registration form one by one, and write discrepancies into the branch result |
| Graduation destination registration form | Check whether the destination type, employer name, reporting date, and review signature are consistent with the agreement | After compiling by batch, cross-check the name, quantity, and date against the agreement; mark those missing signatures or receipts as pending review |
| Employer certificate | Check whether the hiring list, number of people, onboarding date, and receipt are consistent with the registration form | Compare the name, number of people, and date of the certificate and the registration form one by one; those with missing receipts enter the review branch |
| User selection node | Each option corresponds to a branch connection, the interaction state is recorded, and the selection result variable is passed to subsequent nodes | In the node, check the options and branch connections one by one, reference `variables`, and run a trial once in a subsequent node using `nodeId` |

## Three common errors

- Symptom: The employer name and signing date of the same record do not match between the agreement and the registration form. Cause: The two materials are filled in separately at different stages and enter aggregation without cross-checking.
- Symptom: The registration form has been updated, but the employer certificate is still an old version, and the number of people and onboarding date are inconsistent. Cause: The versions are not synchronized, and re-comparison is not triggered after the receipt is returned.
- Symptom: The agreement lacks the employer's signature, or the registration form lacks the review signature, or the certificate lacks a receipt. Cause: Signature and receipt collection are omitted during material circulation, and they are not marked as pending supplementation when entering statistics.

## How to verify the setup

This feature's acceptance: run trials option by option, check the branch directions and interaction state in the run records, confirm that the options and branch connections are consistent, that the process continues after the interaction is completed, and that the same session does not repeatedly enter the interaction, and verify the references to `variables` and `nodeId` in subsequent nodes.

Business test: use one real record to find fields inconsistent with the ledger, and compare the differences in name, quantity, date, and signature among the three materials: the agreement, the registration form, and the employer certificate.

- In the user selection node, check the options and branch connections one by one, and run a trial once to view the node status and branch directions in the run records.
- In a subsequent node, reference the selection result variable and run a trial to confirm that the discrepancy list continues execution according to the branch and writes back the reviewer's confirmation result.
