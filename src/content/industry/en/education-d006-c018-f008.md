---
title: Workflow Orchestration for Undergraduate Curriculum Planning: Track Progress and Check Statistics
slug: /en/industry/education-d006-c018-f008
page_type: 行业问题页
application_area: education
meta_title: Program Revision | Workflows | Progress
meta_description: Program Revision: review workflows for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Undergraduate Curriculum Planning: Track Progress and Check Statistics

## What this category's data looks like

This category's data covers three types of materials: program plans, course syllabi, and credit structure tables. Program plans come from the academic affairs office and departmental revision teams, updated by academic year, with fields including course name, credits, class hours, semester offered, revision date, and signature; course syllabi come from course leaders, updated as courses are adjusted, with fields including course objectives, content, assessment methods, and signatures of the writer and reviewer; credit structure tables come from academic secretaries, updated in sync by version, with fields including module, total credits, proportion, and version number. When the three types of materials enter the workflow, the program plan serves as the main record, the course syllabus as the sub-record, and the credit structure table as the source of statistical criteria, respectively taking on the roles of entries, support, and totals, to facilitate progress records and statistical verification.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction state records. The progress table and statistical criteria description are completed by subsequent nodes continuing execution along the branches.

| Object | Check | Verification action |
| --- | --- | --- |
| Program plan | Whether the course name, credits, revision date, and signature are consistent with the course syllabus and credit structure table | Compare course names and credits one by one, verify signatures and dates; reference `variables` in subsequent nodes and run a trial |
| Course syllabus | Whether the course objectives, assessment methods, and signatures of the writer and reviewer correspond to the program plan | Match by course name, verify version number and signatures; check the `nodeId` and branch direction in the run records |
| Credit structure table | Whether the module credit totals, proportions, and version number match the program plan and course syllabus | Summarize credits by module, verify totals and proportions; check whether the version number is in sync, and record exception items |
| Progress table and statistical criteria description | Whether the number of records matches the statistical count, and whether the criteria are written in the table header | Use one week of records to verify the totals, check whether the criteria and exceptions are clearly stated; verify the header criteria and signature receipts |

## Three common errors

- Symptom: The name, credits, or date of the same course do not match across two materials. Cause: The program plan and course syllabus were not revised in sync under the same version, and the field sources are inconsistent.
- Symptom: The version of the credit structure table is not in sync, and the totals do not match the program plan. Cause: The version number was not updated after revision, and the statistical criteria were not written in the table header.
- Symptom: The course syllabus lacks the signature of the writer or reviewer, and the receipt is missing. Cause: The revision process was not completed, and the signatures and receipts were not archived.

## How to verify the setup

Feature acceptance: run trials option by option, and verify the branch directions and interaction states in the run records; reference `variables` and `nodeId` in subsequent nodes to confirm that the options are consistent with the branch connections.

Business testing: use one week of records to verify the totals, check whether the criteria and exceptions are clearly stated; verify whether the number of records matches the statistical count, and whether the criteria are written in the table header.

- In the nodes, verify the options and branch connections one by one, trigger once, and check the node status and interaction state in the run records.
- Reference the selection result variable in subsequent nodes and run a trial once to confirm that the branch direction and interaction state records are correct.
