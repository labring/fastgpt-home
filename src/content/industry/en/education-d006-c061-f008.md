---
title: Workflow Orchestration for Research Outcome Registration and Intellectual Property: Track Progress and Check Statistics
slug: /en/industry/education-d006-c061-f008
page_type: 行业问题页
application_area: education
meta_title: Research IP | Workflows | Progress
meta_description: Research IP: review workflows for progress tracking. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Research Outcome Registration and Intellectual Property: Track Progress and Check Statistics

## What this category's data looks like

Research achievement registration and intellectual property management involves three types of materials: achievement registration forms, patent disclosure documents, and software copyright materials. Achievement registration forms are submitted by research groups and record the achievement name, completers, date, and signature; patent disclosure documents are written by inventors and include the technical solution, inventors, filing date, and departmental receipt; software copyright materials are compiled by the development team and include the software name, version number, development completion date, and stamped page. The three types of materials are usually summarized and updated weekly or monthly, with fields emphasizing different aspects such as name, quantity, date, signature, and receipt. When entering this function, the achievement registration form serves as the main line of registration progress, while patent disclosure documents and software copyright materials serve as branch verification sources; together, the three support the generation of progress records and statistical scope descriptions.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction status records. The "progress table and statistical scope description" is completed by subsequent nodes continuing execution according to the branch. When a node is triggered, the conversation enters an interactive state and records the workflow status; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Achievement registration form | Whether fields, dates, and signatures are consistent with the patent disclosure document and software copyright materials | Compare names, quantities, and dates one by one, check the signature field, use `nodeId` to locate the node, and after a trial run check the selection result in `variables` |
| Patent disclosure document | Whether the inventors, filing date, and departmental receipt correspond to the achievement registration form | Check whether the receipt is complete and whether the date is consistent with the registration form, then reference `variables` in a subsequent node and run a trial once |
| Software copyright materials | Whether the software name, version number, and development completion date are synchronized with the registration form and disclosure document | Check the version number and date, inspect the stamped page, and confirm that the branch direction record is associated with `nodeId` |
| Progress table and statistical scope description | Whether the recorded count and statistical count match, and whether the scope is written in the header | Use one week of records to verify the total, check whether the scope and exceptions are clearly stated, and verify the branch direction and interaction status records |

## Three common errors

- Phenomenon: The name and quantity of the same achievement do not match between the registration form and the disclosure document. Cause: The two materials are filled out separately, without field-level verification and version synchronization.
- Phenomenon: The version number and development completion date of the software copyright materials lag behind the registration form. Cause: The materials are updated at different paces, versions are not synchronized, and receipts are missing.
- Phenomenon: The disclosure document lacks the inventor's signature or departmental receipt and is omitted from the statistics. Cause: Signatures and receipts were not included in the verification items, and exceptions were not explained in the scope.

## How to verify the setup

Acceptance for this function: run trials option by option, check the branch direction and interaction status in the run records, and confirm that `nodeId` and `variables` references are correct.

Business test: use one week of records to verify the total, and check whether the scope and exceptions are clearly stated.

- In the node, verify the options and branch connections one by one, trigger once, and check the node status in the run records.
- Reference the selection result variable in a subsequent node and run a trial once to confirm that the branch direction is consistent with the interaction status record.
