---
title: Workflow Orchestration for School Mental Health Screening and Referrals: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c015-f008
page_type: 行业问题页
application_area: education
meta_title: Student Mental Health | Workflows | Multilingual
meta_description: Student Mental Health: review workflows for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for School Mental Health Screening and Referrals: Handle Multilingual Materials and Terminology

## What this category's data looks like

In the primary and secondary school mental health screening and referral scenario, materials come from three types: psychological screening plans, interview records, and referral forms. The screening plan contains the scale name, screening date, class, and the responsible teacher's signature; the interview record contains the student's pseudonym, interview time, observation items, and the interviewer's signature; the referral form contains the reason for referral, the receiving party, the receipt, and both parties' signatures. Materials are updated by semester or by event, and versions easily diverge. When entering this feature, the screening plan serves as the field baseline, the interview records serve as the terminology source, and the referral form serves as the target for the comparison draft output; multilingual materials and terminology handling need to keep the same term consistent throughout the whole text and ensure translated names can refer back to the original text.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction state records. The unified terminology glossary and comparison draft are completed by subsequent nodes continuing execution according to the branch. When a node is triggered, the conversation enters an interaction state and the workflow state is recorded; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Psychological screening plan | The name, quantity, and date of the same record in the plan and the interview records must match | Check the options and branch connections one by one in the node, and reference `variables` and `nodeId` to record the branch direction |
| Interview records | Term translations must be able to refer back to the original text, and the same term must be written consistently throughout the whole text | Trigger a user selection node once, and check the node state and interaction state in the run record |
| Referral form | Versions must be synchronized, and signatures and receipts must not be missing | Reference the selection result variable in subsequent nodes and do a trial run once, checking the referral form fields and signature fields |
| Unified terminology glossary and comparison draft | Glossary entries and comparison draft translations must correspond one by one, with no isolated entries | Sample three terms to check whether their writing is consistent throughout the whole text, and check the correspondence between the glossary and the comparison draft |

## Three common errors

- Symptom: The name, quantity, and date of the same record in the screening plan and the interview records do not match. Cause: The two materials are maintained separately, and terminology and fields were not aligned in the same round.
- Symptom: The referral form version is not synchronized, and old-version terminology remains in the comparison draft. Cause: After the branch selection, execution did not continue according to the new version, and subsequent nodes continued to use the old variables.
- Symptom: The referral form is missing a signature or receipt, which is only discovered before publication. Cause: After the interaction is completed, the process stops and does not enter subsequent nodes to complete the signature and receipt fields.

## How to verify the setup

Feature acceptance: Try each option one by one, check the branch direction and interaction state in the run record, and confirm that `variables`, `nodeId`, and the selection result variable have all been passed.

Business testing: Sample three terms to check whether their writing is consistent throughout the whole text, and check whether the translations can refer back to the original text.

- Check the options and branch connections one by one in the node, and confirm that each option corresponds to one branch.
- Reference the selection result variable in subsequent nodes and do a trial run once, checking the interaction state and branch direction records.
