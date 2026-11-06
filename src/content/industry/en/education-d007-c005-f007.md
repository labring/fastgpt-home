---
title: Conversation Records and Traceability for Kindergarten Safety and Emergency Drills: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c005-f007
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Safety | Chat Records | Review
meta_description: Kindergarten Safety: review chat records for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Kindergarten Safety and Emergency Drills: Trace Exceptions and Review Results

## What this category's data looks like

Materials for exception tracing and manual review in kindergarten safety protection and emergency drills come from hazard inspection forms, drill plans and sign-in sheets, access control and school bus inspection records, responsible person signature pages, and conversation traces of parents and faculty/staff within the application. When these materials enter the conversation records feature, each takes on a different role: hazard items and rectification deadlines are used to determine whether the loop is closed, drill headcount and sign-ins are used to compare the plan with actual attendance, access control and school bus inspection items are used to check whether item-by-item ticking has omissions, and responsible person signatures are used to confirm the identity of the reviewer. The update rhythm rolls forward with daily inspections, monthly drills, and checks during drop-off and pick-up periods, and the field characteristics are concentrated in four categories: time, location, responsible person, and conclusion. Conversation records retain questions and answers by application and session dimension, providing original material clues for exception tracing.

## Configuration and implementation checks

This step is executed by the conversation records interface (by application and session dimension), outputting a session message list and total record count, including role and reference information. The "exception list and review conclusions" are then completed manually or by an external system, and registration, export, and review are all carried out on top of this output.

| Object | Check | Verification action |
| --- | --- | --- |
| Hazard inspection form | Whether hazard items and rectification deadlines are closed item by item, and whether unclosed items have a responsible person's signature | Page through using the total record count total to retrieve all, sample one record to check role and reference information, and compare hazard items with rectification deadlines |
| Drill plan and sign-in sheet | Whether drill headcount and sign-ins are consistent with the plan, and whether absentees have explanations | Use `chatId` to locate the session, open a single record to check references and elapsed time, and compare planned headcount with sign-ins |
| Access control and school bus inspection records | Whether access control and school bus inspection items are ticked item by item, and whether there are omissions | Retrieve a single record by `dataId`, and check inspection items and responsible person signatures |
| Conversation records interface output | Whether the session message list and total record count match, and whether each message has an identified role | Pull two pages consecutively to compare total and offset, and open one record to check the references and elapsed time in `value` |

## Three common errors

- Phenomenon: a hazard record shows rectification completed but has no re-inspection signature. Cause: hazard items and rectification deadlines were not closed item by item, and the reviewer did not sign on the original materials to confirm.
- Phenomenon: the drill sign-in headcount does not match the planned headcount. Cause: the drill records do not match the plan, absentees have no attached explanations, and the sign-in sheet was not archived in sync with the plan.
- Phenomenon: blank cells exist in access control and school bus inspection items. Cause: inspection items were omitted, item-by-item ticking was not completed before archiving, and the absence of responsible person signatures made accountability impossible.

## How to verify the setup

Feature acceptance: page through using the total record count total to retrieve all, sample one record to check role, reference information, and time, and confirm that response `code` of 200 is consistent with the list length.

Business test: create an exception record, see whether the source materials can be traced, and check hazard items, drill headcount and sign-ins, access control and school bus inspection items, and responsible person signatures.

- Use `chatId` to locate the session, pull two pages consecutively by total, and compare whether the offset and total record count match.
- Open a single record to check `dataId` and `value`, confirm that the reference and elapsed time fields are complete, and then register the exception list and review conclusions.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
