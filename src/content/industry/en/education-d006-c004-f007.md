---
title: Conversation Records and Traceability for Kindergarten and Family Communication: Track Progress and Check Statistics
slug: /en/industry/education-d006-c004-f007
page_type: 行业问题页
application_area: education
meta_title: Family Communication | Chat Records | Progress
meta_description: Family Communication: review chat records for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Kindergarten and Family Communication: Track Progress and Check Statistics

## What this category's data looks like

This page addresses the kindergarten home-school co-education communication scenario. The materials come from daily class conversation records and notification delivery receipts, updated weekly. The progress table and statistical scope statement are the core deliverables. Field characteristics include committed items and response times, descriptions of children's performance, classification of parents' requests, and notification delivery status. When conversation records enter the conversation logs and auditing feature, the two roles of question and answer correspond respectively to parents' requests and teachers' responses. Reference information can be linked to specific notifications or observation records, and the duration field helps assess response timeliness. After the materials enter this feature, manual or external systems register, export, and review them accordingly, forming a verifiable progress table and statistical scope statement, which then enter weekly or monthly reports.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), outputting a session message list and total record count, including roles and reference information. The progress table and statistical scope statement are then completed manually or by an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Committed items and response times | Unresponded commitments and missing response times must be marked as exceptions in the progress table | Pull records by session, verify the alternating order of questions and answers, and check whether the response time field falls within the committed time limit |
| Descriptions of children's performance | When statements do not match observation records, the source of the discrepancy must be noted in the statistical scope statement | Open a single record to verify the reference information and duration field, and compare against the original observation record |
| Classification of parents' requests | When feedback is not categorized, the statistical scope statement must specify the categorization rules and the number of uncategorized items | Pull pages by application and session identifier, use `chatId` and `dataId` to locate a single record, and verify the classification label |
| Notification delivery | When notification delivery status does not match the total record count, the scope must be stated in the table header | Pull two consecutive pages to compare the total record count total and the offset, and verify response `code` of 200 and the delivery field |

## Three common errors

- Phenomenon: A committed item is raised in the conversation but the progress table does not record a response time. Cause: The answer role was missed during manual registration, and records were not checked one by one by session dimension.
- Phenomenon: Descriptions of children's performance are inconsistent with observation records. Cause: Statements in the conversation records were not compared with observation records, and the statistical scope did not specify how to handle discrepancies.
- Phenomenon: Classification of parents' requests is missing, and feedback is not categorized. Cause: Records were not organized by classification field during export, and the statistical scope statement did not define categorization rules.

## How to verify the setup

Feature acceptance: Page through using the total record count total to retrieve all records, sample one record to verify the role, reference information, and time, confirm response `code` of 200, and use `_id`, `dataId` and `value` to locate a single record.

Business testing: Use one week of records to verify the totals, check whether the scope and exceptions are clearly stated, and check whether unresponded commitments, mismatched statements, and uncategorized feedback are noted in the table header.

- Pull pages by application and session identifier, pull two consecutive pages to compare the total record count total and the offset, and confirm that the number of records matches the total.
- Open one record to verify the role field, reference, and duration field, check that message roles correspond to the original conversation, and record the number of references separately by array length.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
