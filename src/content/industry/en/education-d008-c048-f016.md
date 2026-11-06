---
title: Forms and User Interaction for Sino-Foreign Education Establishment and Annual Reports: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c048-f016
page_type: 行业问题页
application_area: education
meta_title: Joint Education | Forms | Access
meta_description: Joint Education: review forms for authorized access. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Sino-Foreign Education Establishment and Annual Reports: Manage Authorized Access and External Services

## What this category's data looks like

The materials for the establishment and annual reports of Chinese-Foreign cooperative education institutions mainly come from the establishment application, cooperation agreement, articles of association, and subsequent annual report receipts. Their update cadence is synchronized with the approval cycle and annual submission milestones. The establishment application provides basic fields such as institution name, education level, program offerings, and enrollment scale; the cooperation agreement carries the rights and responsibilities of both Chinese and foreign parties, contribution methods, term, and signature page; the articles of association stipulate the governance structure, decision-making procedures, and scope of authorization. When these materials enter the form input node, each plays a different role: application fields are used to establish the institution's master record, cooperation agreement fields are used to verify the parties' agreements and validity period, and articles of association fields are used to define the boundaries of external services and access authorization. The name, quantity, and date of the same record in the application and cooperation agreement must be compared item by item, and versions and signature receipts must be archived in sync to avoid field conflicts during annual reporting.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The externally available entry points and scope of authorization are completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interactive state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Establishment application | Fields such as institution name, education level, program offerings, and enrollment scale must be consistent with the cooperation agreement and articles of association, and dates and signature pages must be complete | Check field names one by one in the node configuration, confirm they correspond one-to-one with the establishment application fields, and check the required markers |
| Cooperation agreement | The names of both Chinese and foreign parties, contribution quantities, validity period, signatures, and receipts must match the application and articles of association; when versions are not synchronized, the latest signed version shall prevail | Reference this field in subsequent nodes and run a test to confirm that the name, quantity, and date in the cooperation agreement can be retrieved after submission |
| Articles of association | The governance structure, decision-making procedures, and scope of authorization must be consistent with the application and cooperation agreement; if signatures or receipts are missing, they must not be used as the basis for authorization | Access once with a restricted identity and check whether the articles of association fields are visible as configured in `formInputResult` and `selectResult` |

## Three common errors

- Symptom: The name, quantity, and date of the same institution do not match between the application and the cooperation agreement. Cause: The two materials were filled in separately, without item-by-item comparison and version synchronization.
- Symptom: The articles of association version is not synchronized, and the old version is still referenced. Cause: After updating, the archived copy was not replaced, and whether signatures and receipts were complete was not checked.
- Symptom: After submission, subsequent nodes cannot retrieve values, and required items can be submitted even when empty. Cause: Field names do not correspond one-to-one with material fields, and required markers were not checked one by one.

## How to verify the setup

Acceptance of this feature: Fill it out once and submit, check the field values retrieved by subsequent nodes, and confirm that `formInputResult` and `selectResult` can retrieve the corresponding field values.

Business test: Access once with a restricted identity, see whether the visible scope matches the configuration, and ensure unauthorized content is not visible.

- Check field names and required markers one by one in the node configuration, and confirm they correspond one-to-one with the fields of the establishment application, cooperation agreement, and articles of association.
- Reference this field in subsequent nodes and run a test to confirm that the corresponding field values can be retrieved after submission, and that the conversation does not remain in the interactive state.
