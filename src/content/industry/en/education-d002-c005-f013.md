---
title: Permissions and Data Isolation for Kindergarten Safety and Emergency Drills: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c005-f013
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Safety | Permissions | Checks
meta_description: Kindergarten Safety: review permissions for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Permissions and Data Isolation for Kindergarten Safety and Emergency Drills: Compare Documents and Locate Differences

## What this category's data looks like

This page is for kindergarten safety protection and emergency drill scenarios. Materials include hazard inspection ledgers, rectification notices and receipts, emergency drill plans and sign-in sheets, access control and school bus daily inspection records, and responsible person signature pages. Sources are kindergarten safety officers, class teachers, logistics and gatekeepers, and drill organizers, updated daily, weekly, monthly, and at semester milestones. Field characteristics focus on hazard items and rectification deadlines, drill participant counts and sign-ins, access control and school bus inspection items, and responsible person signatures. The same object may appear in two materials with different names, quantities, or date calibers. After materials enter this function, ledgers and plans serve as baseline materials, while sign-ins, inspection records, and receipts serve as materials to be verified. They enter the visible set according to member permissions and file-level permissions, for file list and retrieval verification.

## Configuration and implementation checks

Enable commercial file permissions and give the member read access to the knowledge base.

This step is executed by member permissions and file-level permissions (server-side authentication), outputting a visible file set filtered by member. The "discrepancy list" is subsequently completed by AI nodes, code nodes, or manual work; the file list and retrieval only return the readable set filtered by member. Viewing lists and details requires knowledge base read permission plus file read permission; deletion is limited to the creator; retrieval filters by files readable by the current member and only takes effect when authenticated by member identity.

| Object | Check | Verification action |
| --- | --- | --- |
| Hazard inspection ledger and rectification receipt | Hazard items and rectification deadlines are consistent, and hazards are closed-loop | Compare the two materials using the same hazard number, verify the rectification deadline and closed-loop status, and locate the responsible person by `teamId` and `tmbId` |
| Emergency drill plan and sign-in sheet | Drill participant counts and sign-ins are consistent, and records match the plan | Compare the plan participant count and sign-in count by drill date, and verify whether drill subjects and procedures match the plan |
| Access control and school bus daily inspection records | No missing inspection items, and responsible person signatures are complete | Check inspection checklist entries one by one, verify signatory and date, and confirm no missing items or proxy signatures |
| File list and retrieval results | Visible scope is consistent with member permissions | Use a restricted member account to view the list and details and retrieve the same issue, and verify that unauthorized files do not appear or get recalled |

## Three common errors

- Phenomenon: The hazard ledger shows rectification completed, but the rectification deadline in the receipt is later than the ledger date. Cause: The hazard is not closed-loop, the two materials are updated at different rhythms, and the deadline field was not synchronized during write-back.
- Phenomenon: The drill sign-in count does not match the plan count, and recorded subjects do not match the plan. Cause: Drill records do not match the plan, the sign-in sheet was supplemented based on actual attendance, and the plan was not revised synchronously.
- Phenomenon: Access control and school bus daily inspection records have missing items, and responsible person signature fields are blank. Cause: Inspection items are missing, the daily inspection form template is inconsistent with the current month's inspection requirements, and the signature step was skipped.

## How to verify the setup

This function acceptance: Use a restricted member account to view the file list and details and retrieve once, and verify that the visible scope only contains files readable by that member, and unauthorized files do not occupy a place or get recalled.

Business test: Use one real record to find fields inconsistent with the ledger, record the discrepancy list, and submit it to the reviewer for confirmation before write-back.

- Compare the two materials item by item by hazard number, drill date, and inspection item, and write fields with inconsistent names, quantities, or dates into the discrepancy list.
- Use a restricted member account to verify the list and retrieval results, confirm that the visible set is consistent with member permissions, then submit to the reviewer for confirmation and write-back.
