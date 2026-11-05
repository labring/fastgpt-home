---
title: Workflow Orchestration for Research Ethics Review: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c062-f008
page_type: 行业问题页
application_area: education
meta_title: Research Ethics | Workflows | Review
meta_description: Research Ethics: review workflows for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Research Ethics Review: Trace Exceptions and Review Results

## What this category's data looks like

In the research ethics review scenario, three types of materials—ethics review applications, informed consent form templates, and risk assessment forms—enter the exception tracing and manual review workflow. The ethics review application carries the project name, review category, submission date, and applicant signature; the informed consent form template carries the study name, number of subjects, version number, and version date; the risk assessment form carries the risk level, handling measures, assessment date, and reviewer signature. The material sources are researcher submissions, ethics office archiving, and the system template library, and the update cadence is triggered by version revisions and annual reviews. After entering the workflow, the three types of materials serve as comparison sources and objects to be verified, respectively providing fields, dates, and signature information for the generation of the exception list and citation in review conclusions.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction state records. The "Exception List and Review Conclusions" are completed by subsequent nodes continuing execution along the branches. When the user selection node is triggered, the conversation enters an interactive state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Ethics review application | Whether the project name, review category, submission date, and applicant signature are consistent with the informed consent form template and risk assessment form | Check the options and branch connections one by one, compare the name, date, and signature fields of the three types of materials in the node, and record discrepancy items |
| Informed consent form template | Whether the study name, number of subjects, version number, and version date match the other two materials | Reference the selection result variable in a subsequent node and run a trial, and check whether the template's version date and receipt are missing |
| Risk assessment form | Whether the risk level, handling measures, assessment date, and reviewer signature are complete and in sync with the application and template | Trigger a user selection node once, view the node status in the run record, and check the reviewer signature and assessment date |
| Exception record | Whether an exception entry can be traced to the specific field and date of the source material | Create an exception record, check the `nodeId` and `variables` referenced by the record in the run record, and confirm the branch direction |

## Three common errors

- Symptom: The same number of subjects does not match between the ethics review application and the informed consent form template. Cause: The two materials are filled in separately, lacking cross-material field comparison and version synchronization.
- Symptom: The risk assessment form lacks a reviewer signature or receipt, yet the review conclusion still continues to flow. Cause: Signatures and receipts are not included in the branch judgment conditions, and after the interaction is completed, the default branch is taken directly.
- Symptom: The informed consent form template's version number and version date are not synchronized to the ethics review application. Cause: After the template library is updated, the comparison is not re-triggered, and the old version's fields are still referenced.

## How to verify the setup

Feature acceptance: Run trials on each option one by one, check the branch direction and interaction state in the run record, confirm that each option corresponds to one branch, and that the selection result variable has been passed to subsequent nodes.

Business testing: Create an exception record, see whether it can be traced to the source material, and check whether the exception list and review conclusions are supported by original records and the reviewer signature.

- In the user selection node, check the options and branch connections one by one, and after triggering once, view the node status in the run record.
- Reference the selection result variable in a subsequent node and run a trial, and check whether `variables` and `nodeId` are correctly passed along the branch.
