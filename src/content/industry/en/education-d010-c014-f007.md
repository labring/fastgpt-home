---
title: Conversation Records and Traceability for School Moral Education and Class Teacher Work: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c014-f007
page_type: 行业问题页
application_area: education
meta_title: Pastoral Education | Chat Records | Operations
meta_description: Pastoral Education: review chat records for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for School Moral Education and Class Teacher Work: Coordinate Operations and Application Handover

## What this category's data looks like

This page addresses school moral education and homeroom teacher work; the materials include themed class meeting plans, student comprehensive quality records, and home visit records. The sources are daily reporting by homeroom teachers and aggregation by grade groups, with an update cadence by week or by activity milestone, and field characteristics including name, quantity, date, and signature field. When these materials enter the conversation log and auditing feature, each plays a different role: the themed class meeting plan provides the activity theme and convening date, the student comprehensive quality record provides student names and evaluation items, and the home visit record provides the home visit subject and receipt status. The conversation record interface pulls by application and session dimension, organizing the communication traces corresponding to the above materials into verifiable session evidence, but the field consistency of the materials themselves still requires manual or external system comparison.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), outputting the session message list and the total record count, including role and reference information. The handover-ready deployment status and operation records are then completed manually or by an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Themed class meeting plan | Name, quantity, date, and signature are consistent between the plan and the summary table | Open the plan and the summary table, compare item by item the activity name, session quantity, convening date, and signature field, and check in the conversation records whether the session corresponding to `chatId` covers that activity |
| Student comprehensive quality record | When the name, quantity, and date for the same student do not match between the two materials, the signed original prevails | Extract one record, compare the name, item quantity, evaluation date, and signature, then page through to retrieve all conversation records, and check whether `dataId` and `value` point to the same session message |
| Home visit record | The receipt and signature are complete, and the date matches the home visit subject | View the receipt attachment and signature field of the home visit record, confirm that the date and subject name match, and check the reference information and duration field of that communication in the conversation records |
| Deployment status and operation records | Version, connection, and task records are consistent | Check item by item against the handover form the version number, connection status, and task records, confirm that the total record count total corresponds to response `code` of 200, and mark any missing item as pending supplementation |

## Three common errors

- Symptom: The same themed class meeting plan has mismatched name and session quantity between the class summary table and the grade materials. Cause: The two materials were reported by different people, were not checked against the same signed original, and the versions were not synchronized.
- Symptom: The student comprehensive quality record lacks a signature or receipt, and the date is inconsistent with the home visit record. Cause: During material circulation, the signature field and receipt status were not checked item by item, and missing items were not recorded on the handover form.
- Symptom: The conversation record interface returns empty but sessions exist in the interface, or only the first page is retrieved. Cause: The application and session identifiers come from inconsistent sources, the pagination parameters were not pulled continuously, and the total record count total was not compared with the offset.

## How to verify the setup

This feature's acceptance: page through to retrieve all records by total record count, extract one record to check the role, reference information, and time, confirm that response `code` of 200 corresponds to total, and check that the message identifiers and content fields `_id`, `dataId` and `value` point consistently.

Business test: check once item by item against the handover form, see which record item is missing, and focus on checking whether the name, quantity, date, and signature of the themed class meeting plan, student comprehensive quality record, and home visit record are complete.

- Pull two consecutive pages by application and session identifier, compare the total record count with the offset, and confirm that the two role types, question and answer, appear alternately.
- Open one session record, check the reference information and duration field, and check that the tokens of the reference text and the array item count are recorded separately, without performing an equality comparison.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
