---
title: Workflow Orchestration for Undergraduate Curriculum Planning: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c018-f008
page_type: 行业问题页
application_area: education
meta_title: Program Revision | Workflows | Multilingual
meta_description: Program Revision: review workflows for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Undergraduate Curriculum Planning: Handle Multilingual Materials and Terminology

## What this category's data looks like

This page addresses multilingual materials and terminology processing in undergraduate program revision. The source materials are program plans, course syllabi, and credit structure tables; the update cadence advances with revision batches, and the field characteristics center on course names, credit counts, course start dates, and signature fields. The program plan carries the overall outline and credit structure, the course syllabus carries course objectives and content, and the credit structure table carries the credits and study requirements of each module. When these three types of materials enter workflow orchestration, they serve respectively as the terminology extraction source, the basis for generating the comparison draft, and the reference base for consistency back-referencing. The terminology list and the comparison draft must ensure that the same term is consistent throughout the whole text and that the translated name can back-reference the original text, and are finally delivered for external release.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branches), outputting branch directions and interaction state records. "Unified terminology list and comparison draft" is continued and completed by subsequent nodes according to the branches. When the user selection node is triggered, the conversation enters the interaction state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Program plan | Whether course names, credit counts, course start dates, and signature fields are consistent across the three types of materials | Check the options and branch connections one by one in the node, trigger once and then view the node status in the run record, and reference `variables` in a subsequent node for a trial run |
| Course syllabus | Whether the same course name and credit count match between the program plan and the course syllabus | Locate the node by `nodeId`, check the branch connection corresponding to each option, and confirm that the selection result variable has been passed to subsequent nodes |
| Credit structure table | Whether the credit counts, dates, and signatures or receipts of each module are complete | Check the options and branch connections, view the interaction state in the run record, and reference `variables` in a subsequent node for a trial run |
| Unified terminology list and comparison draft | Whether the same term is written consistently throughout the whole text and whether the translated name can back-reference the original text | Sample three terms and check their writing throughout the whole text, and check the branch direction and interaction state records |

## Three common errors

- Symptom: the same course name is written differently in the program plan and the course syllabus. Cause: terminology extraction was not unified, the two materials were named separately, and no back-reference check was performed.
- Symptom: credit counts and course start dates do not match between the two materials. Cause: versions were not synchronized, the revised draft and the old draft were mixed, and fields were not compared item by item.
- Symptom: materials still enter external release when the signature field or receipt is missing. Cause: the signature status was not checked during the material circulation step, and materials missing signatures were not stopped.

## How to verify the setup

This feature's acceptance: run trials option by option, and check the branch direction and interaction state in the run record.

Business test: sample three terms and check whether their writing is consistent throughout the whole text.

- Check the options and branch connections one by one in the node, trigger once and then view the node status in the run record.
- Reference `variables` in a subsequent node for a trial run, and locate the node by `nodeId` to confirm that the selection result variable has been passed in.
