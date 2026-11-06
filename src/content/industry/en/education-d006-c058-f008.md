---
title: Workflow Orchestration for Research Project Task Agreement Signing: Track Progress and Check Statistics
slug: /en/industry/education-d006-c058-f008
page_type: 行业问题页
application_area: education
meta_title: Research Agreements | Workflows | Progress
meta_description: Research Agreements: review workflows for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Research Project Task Agreement Signing: Track Progress and Check Statistics

## What this category's data looks like

This page addresses the signing stage of research project task books. The materials come from three types: project task books, topic task breakdown tables, and budget books. The task book contains the project name, undertaking unit, start and end dates, and signature fields; the breakdown table contains topic numbers, task names, quantities, and responsible persons; the budget book contains subject amounts, calculation bases, and approval signatures. At signing, the three types of materials enter this function simultaneously: the task book defines the overall objectives and period, the breakdown table breaks the objectives down to topics and gives quantities, and the budget book corresponds to resources and subjects. The update rhythm follows signing batches; each batch contains multiple materials. The field characteristics are four types: name, quantity, date, and signature, and they need to be aligned item by item across materials.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction state records. The "progress table and statistical scope description" is continued and completed by subsequent nodes according to the branch. When the user selection node is triggered, the conversation enters an interactive state and records the workflow state. After the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Project task book | Whether the fields, dates, and signatures align with the breakdown table and budget book | Check the project name, start and end dates, and signature fields one by one; check the options and branch connections one by one in the node; confirm that the selection result variable has been passed to subsequent nodes |
| Topic task breakdown table | Whether the topic names, quantities, and responsible persons are consistent with the task book | Compare the task book objectives with the breakdown table quantities by topic number; record inconsistencies; run a trial once to view the node status in the run record |
| Budget book | Whether the subject amounts, calculation bases, and approval signatures are complete | Check the correspondence between subject amounts and breakdown table topics; check the approval signatures and receipts; reference `variables` in subsequent nodes and run a trial once |
| Progress table and statistical scope description | Whether the recorded counts and statistical counts match, and whether the scope is written in the header | Use one week of records to check the totals; check whether the scope and exceptions are clearly stated; check the branch direction corresponding to `nodeId` |

## Three common errors

- Symptom: The name and quantity of the same topic do not match between the task book and the breakdown table. Cause: The two materials are filled in separately, and signing begins without item-by-item alignment.
- Symptom: The budget book version and the task book version are not synchronized, and the dates and subjects are inconsistent. Cause: After revision, only one material is updated, while the other continues to use the old version.
- Symptom: The task book or budget book lacks signatures or receipts, and the signing record is incomplete. Cause: The signature step was not completed synchronously with material circulation.

## How to verify the setup

This function's acceptance: run trials option by option, check the branch directions and interaction states in the run record, confirm that options correspond to branches, and that the process continues after interaction is completed.

Business test: use one week of records to check the totals, see whether the scope and exceptions are clearly stated, and check whether the recorded counts and statistical counts match.

- Check the names, quantities, dates, and signatures of the task book, breakdown table, and budget book, and mark inconsistencies item by item.
- Check the options and branch connections one by one in the node, and run a trial once to confirm that the `variables` and `nodeId` references take effect.
