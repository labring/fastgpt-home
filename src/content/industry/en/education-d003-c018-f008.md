---
title: Workflow Orchestration for Undergraduate Curriculum Planning: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c018-f008
page_type: 行业问题页
application_area: education
meta_title: Program Revision | Workflows | Intake
meta_description: Program Revision: review workflows for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Undergraduate Curriculum Planning: Handle Questions and Collect Missing Information

## What this category's data looks like

This category's data covers three types of materials: program plans, course syllabi, and credit structure tables. A program plan states the program name, length of study, total credits, and course modules; a course syllabus states the course name, credits, class hours, semester offered, and the signature of the author; a credit structure table states the credit amount, proportion, and preparation date of each module. Materials are submitted centrally by department teaching secretaries each semester; updates are denser during revision periods, while off-peak periods are mainly supplements and errata. Field characteristics are the coexistence of four types—names, quantities, dates, and signatures—and the same record often appears across two materials. When entering the Q&A intake and missing-item follow-up function, the program plan serves as the main document carrying the revision scope, while course syllabi and credit structure tables serve as attachments supporting credit and course verification; together the three form the basis for follow-up questions.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction state records. "Intake records and items to be completed" are continued and completed by subsequent nodes according to the branch. When a node is triggered, the conversation enters an interactive state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Program plan | Whether the name, date, and signature fields are consistent with the course syllabi and credit structure table | Compare the program name, revision date, and signature column item by item, check the options and branch connections in the node, and view the branch direction corresponding to `nodeId` |
| Course syllabus | Whether the course name, credit amount, and semester offered match the credit structure table | Extract the name and credits of the same course from both materials, run a trial once, and reference `variables` to check whether the selection result variable is passed to subsequent nodes |
| Credit structure table | Whether the credit amount of each module and the preparation date are in sync with the program plan version | Check the module credit totals and preparation date, trigger a user selection node once, and view the node status and branch direction in the run record |
| Intake records and items to be completed | Whether missing items are identified and followed up on, and whether answers have a material basis | Ask a question missing key information, see whether it follows up before answering, and check whether the follow-up items point to specific material fields |

## Three common errors

- Symptom: The course name and credit amount for the same record do not match between the program plan and the course syllabus. Cause: The two materials were revised separately without cross-table comparison.
- Symptom: The credit structure table is still an old version, and the module credits are inconsistent with the current version of the program plan. Cause: Versions are not synchronized, and there is no unified revision date and receipt.
- Symptom: The course syllabus lacks the author's signature or the department receipt, and it still cannot be completed after follow-up. Cause: The submission step does not validate the signature and receipt fields.

## How to verify the setup

Function acceptance: run trials option by option, check the branch direction and interaction state in the run record, confirm that the branch corresponding to `nodeId` matches the option, and check whether `variables` have been passed to subsequent nodes.

Business test: ask a question missing key information, see whether it follows up before answering, and check whether the follow-up items fall on the name, quantity, date, and signature fields of the program plan, course syllabus, and credit structure table.

- Check the options and branch connections one by one in the node, and after triggering once, view the node status and branch direction in the run record.
- Reference the selection result variable in a subsequent node and run a trial once to confirm that the process continues after the interaction is completed and does not re-enter the interaction.
