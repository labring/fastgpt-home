---
title: Workflow Orchestration for Undergraduate Curriculum Planning: Find Supporting Evidence
slug: /en/industry/education-d001-c018-f008
page_type: 行业问题页
application_area: education
meta_title: Program Revision | Workflows | Evidence
meta_description: Program Revision: review workflows for evidence lookup. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Undergraduate Curriculum Planning: Find Supporting Evidence

## What this category's data looks like

The materials for querying the business basis for undergraduate program revision come from three types: program plans, course syllabi, and credit structure tables. The program plan provides the total credits and course module names, the course syllabus provides the name, credits, class hours, and signature field of a single course, and the credit structure table provides the credit quantity and version date of each module. The three types of materials play different roles when entering the workflow: the program plan serves as the primary index, the course syllabus serves as the item-level source text, and the credit structure table serves as the basis for quantity and version comparison. The update cadence follows the academic-year revision, and the same record often has names, quantities, and dates that do not match across two materials, or versions that are not synchronized, with missing signatures and receipts. Field characteristics are concentrated in course name, credits, class hours, offering semester, version number, signature, and date. During querying, the three types of materials need to be aligned by the same course or module in order to produce basis items that can be traced back to the source text.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction state records. The basis items that can be traced back to the source text are completed by subsequent nodes continuing execution according to the branch. When the user selection node is triggered, the conversation enters an interaction state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Program plan | Course name, credits, version date, and signature need to be aligned item by item with the course syllabus and credit structure table | Check the options and branch connections one by one in the node, confirm that each option corresponds to one branch, and record the program plan fields |
| Course syllabus | The name, credits, class hours, offering semester, and signature receipt of a single course need to be consistent with the program plan | Trigger one interaction, check the node status in the run record, and verify whether the syllabus item can be traced back to the source text |
| Credit structure table | The credit quantity, version number, and date of each module need to be synchronized with the program plan and course syllabus | Reference `variables` in subsequent nodes and run a trial once to confirm that the selection result variable has been passed to subsequent nodes |
| Workflow node | Options and branches need to correspond one-to-one, and the interaction state and selection result need to be queryable | Check the reference relationship between `nodeId` and `variables`, and confirm the branch direction and interaction state record |

## Three common errors

- Symptom: The name, quantity, and date of the same course do not match across two materials. Cause: The program plan and course syllabus are not aligned to the same version, and the field sources are not synchronized.
- Symptom: The version of the credit structure table is not synchronized, and the old module quantities are still used. Cause: During revision, only the program plan was changed, and the structure table was not written back and the version number was not checked.
- Symptom: The course syllabus lacks a signature or receipt, and the basis item cannot be traced back to the source text. Cause: The signature field was not completed along with the revision process, and the material archiving is incomplete.

## How to verify the setup

Feature acceptance: Run a trial for each option one by one, check the branch direction and interaction state in the run record, confirm that each option corresponds to one branch, and check whether the references between `variables` and `nodeId` take effect.

Business test: Ask a cross-material basis question, see whether the answer provides a traceable source, and check whether the name, quantity, date, and signature match the source text.

- Check the options and branch connections one by one in the node, confirm that each option corresponds to one branch, and record the interaction state.
- Reference `variables` in subsequent nodes and run a trial once to confirm that the selection result variable has been passed to subsequent nodes, and that the branch direction is consistent with the run record.
