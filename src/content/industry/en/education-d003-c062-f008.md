---
title: Workflow Orchestration for Research Ethics Review: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c062-f008
page_type: 行业问题页
application_area: education
meta_title: Research Ethics | Workflows | Intake
meta_description: Research Ethics: review workflows for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Research Ethics Review: Handle Questions and Collect Missing Information

## What this category's data looks like

For Q&A intake and missing-item follow-up in research ethics review, the materials usually include three types: the ethics review application, the informed consent form template, and the risk assessment form. The ethics review application carries the basic research information and submission date, the informed consent form template carries the subject notification and signature fields, and the risk assessment form carries the risk level, assessment date, and responsible person's signature. The material sources are mostly researcher submissions, institutional ethics committee archiving, and template library synchronization, and the update cadence follows protocol revisions and annual reviews. The field characteristics center on name, quantity, date, signature, and receipt. When the materials enter this function, the ethics review application serves as the main record to trigger intake, while the informed consent form template and risk assessment form participate as attachments in missing-item comparison, each taking on the role of field verification and version validation.

## Configuration and implementation checks

This link is executed by workflow nodes (user selection and branches), outputting branch direction and interaction state records. The intake record and the completed follow-up questions are then completed by subsequent nodes continuing execution according to the branch. When the user selection node is triggered, the conversation enters the interaction state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Ethics review application | Whether the name, quantity, date, and signature are consistent with the informed consent form template and risk assessment form | Verify item by item the research name, subject quantity, submission date, and signature fields in the application, and reference `variables` to compare the two materials |
| Informed consent form template | Whether the version date and signature or receipt are synchronized, and whether the template version is consistent with the application | Verify the template version number, update date, signature fields, and receipt, and reference `nodeId` in a subsequent node to run a trial once |
| Risk assessment form | Whether the risk level, assessment date, and responsible person's signature match the application and template | Verify the risk level, assessment date, and signature, and trigger once to view the node status in the run record |
| User selection node | Whether each option corresponds to one branch, and whether the selection result variable has been passed to subsequent nodes | Verify the options and branch connections one by one in the node, and trigger once to view the interaction state record |

## Three common errors

- Phenomenon: The research name, subject quantity, and date for the same record do not match between the ethics review application and the informed consent form template. Cause: The two materials are filled in separately, lacking unified field comparison and version synchronization.
- Phenomenon: The informed consent form template version is not synchronized, and the old-version signature fields coexist with the new-version risk assessment form. Cause: After the template library is updated, the application record is not written back, and the version number is not updated with the revision.
- Phenomenon: The risk assessment form lacks the responsible person's signature or the receipt is missing, yet the intake record still proceeds to the next stage. Cause: The missing item is not identified and followed up on, and the selection branch does not trigger the follow-up question.

## How to verify the setup

This function's acceptance: run trials option by option, verify the branch direction and interaction state in the run record, and confirm that `variables`, `nodeId`, and the selection result variable have been passed to subsequent nodes.

Business test: submit a question missing key information, see whether it asks a follow-up question before answering, and confirm that the missing item is identified and followed up on and that the answer has a material basis.

- In the user selection node, verify the options and branch connections one by one, and trigger once to view the node status and interaction state in the run record.
- Reference the selection result variable in a subsequent node and run a trial once, verify the branch direction and interaction state record, and confirm that the intake record and the completed follow-up questions are completed by subsequent nodes.
