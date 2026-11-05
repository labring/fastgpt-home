---
title: Workflow Orchestration for Sino-Foreign Education Establishment and Annual Reports: Find Supporting Evidence
slug: /en/industry/education-d001-c048-f008
page_type: 行业问题页
application_area: education
meta_title: Joint Education | Workflows | Evidence
meta_description: Joint Education: review workflows for evidence lookup. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Sino-Foreign Education Establishment and Annual Reports: Find Supporting Evidence

## What this category's data looks like

The establishment and annual reporting of Chinese-foreign cooperatively-run educational institutions involves three core types of materials: the establishment application, the cooperation agreement, and the articles of association. The establishment application states fields such as the institution name, educational level, and enrollment scale; the cooperation agreement stipulates the rights and obligations of both parties, the method and deadline of capital contribution; the articles of association specify the governance structure, decision-making procedures, and financial arrangements. The sources of the materials are the version accepted by the approving authority and the version archived by the institution, and the update rhythm changes with the establishment approval, agreement renewal, and amendment of the articles of association. When the three types of materials enter this function, the establishment application provides the institution's basic information and filing date, the cooperation agreement provides the partner name, signature page, and effective date, and the articles of association provide the composition of the board of directors or joint management committee, the rules of procedure, and the clauses on responsibility for annual report submission. Field characteristics are concentrated in four categories: names, quantities, dates, and signatures, and each item must be traced back to the original text for verification.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction state records. The basis items that can be traced back to the original text are completed by subsequent nodes continuing execution according to the branch.

| Object | Check | Verification action |
| --- | --- | --- |
| Establishment application | The institution name, educational level, enrollment scale fields, and signature date must each be traced back to the original text | Check the options and branch connections one by one within the node, use `nodeId` to locate the node, and after a trial run check the node status in the run record |
| Cooperation agreement | The partner name, contribution amount, and effective date must be consistent across the three materials, and the signature page and receipt must not be missing | Reference the selection result variable in `variables` in subsequent nodes, run a trial once, and compare it with the corresponding items in the original agreement text |
| Articles of association | The board composition, rules of procedure, and clauses on responsibility for annual report submission must be synchronized with the current version | Trigger a user selection node once, check the node status in the run record, confirm that it has entered the interaction state, and then follow the branch according to the option |
| Interaction state record | Each time a user selection node is triggered, the state is recorded, and the same session does not enter the interaction repeatedly | Check the branch direction and interaction state in the run record, and confirm that the selection result variable has been passed to subsequent nodes |

## Three common errors

- Phenomenon: The same institution name is written differently in the establishment application and the cooperation agreement. Cause: The two materials were entered by different handlers respectively, and no cross-comparison was performed.
- Phenomenon: The enrollment quantity does not match between the articles of association and the application. Cause: After the articles of association were amended, the quantity field in the application attachment was not updated in sync.
- Phenomenon: The cooperation agreement is missing the signature page or receipt. Cause: Pages were omitted when the scanned copy was archived, and the version was not synchronized, resulting in an incomplete current version.

## How to verify the setup

This function's acceptance: run trials option by option, check the branch direction and interaction state in the run record, and confirm that the node status corresponding to `nodeId` is recorded and that the selection result variable in `variables` has been passed to subsequent nodes.

Business test: ask a basis question that spans materials, and see whether the answer gives a traceable source.

- Check the options and branch connections one by one in the user selection node, and after a trial run check the node status and branch direction in the run record.
- Reference the selection result variable in `variables` in subsequent nodes and run a trial once, confirming that the process continues after the interaction is completed and does not stall.
