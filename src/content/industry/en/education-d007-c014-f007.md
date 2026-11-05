---
title: Conversation Records and Traceability for School Moral Education and Class Teacher Work: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c014-f007
page_type: 行业问题页
application_area: education
meta_title: Pastoral Education | Chat Records | Review
meta_description: Pastoral Education: review chat records for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for School Moral Education and Class Teacher Work: Trace Exceptions and Review Results

## What this category's data looks like

School moral education and homeroom teacher work involves three types of materials: themed class meeting plans, student comprehensive quality records, and home visit records. Themed class meeting plans record activity objectives, process, and signatures; comprehensive quality records summarize student performance and supporting evidence by semester; home visit records state the time, subject, content, and receipt. The three types of materials come from different sources and have different update rhythms: class meeting plans are updated by week, comprehensive quality records are summarized by stage, and home visit records are registered per instance. When the materials enter the conversation logs and audit function, each assumes an evidence role: class meeting plans correspond to the basis for activity organization, comprehensive quality records correspond to the basis for evaluation, and home visit records correspond to the basis for communication. Field characteristics center on name, quantity, date, and signature, and are used to compare against the original records during anomaly tracing and manual review.

## Configuration and implementation checks

This step is performed by the conversation record interface (by application and session dimension), which outputs the session message list and the total number of records, including role and reference information. The anomaly list and review conclusions are then completed manually or by an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Themed class meeting plan | Name, quantity, date, and signature should match the student comprehensive quality records and home visit records | Pull records by application and session dimension, verify the session corresponding to `chatId`, and compare the plan date and signature item by item |
| Student comprehensive quality record | The name, quantity, and date of the same record are consistent across the two materials, and the versions are synchronized | Page through to retrieve all records, verify the entry corresponding to `dataId` and the reference information, and compare the student comprehensive quality record fields |
| Home visit record | The receipt and signature are complete, and the date does not conflict with the class meeting plan or the student comprehensive quality record | Open a single record to verify the reference and elapsed time in `value`, and check whether the home visit receipt is missing |
| Conversation record interface | The total number of records total and response `code` of 200, and the role field matches the original conversation between question and answer | Pull two pages consecutively to compare the offset and total, confirm that the number of references equals the array length, and verify the reference tokens separately |

## Three common errors

- Symptom: The name and quantity of the same student do not match between the class meeting plan and the student comprehensive quality record. Cause: The two materials are registered separately, and no cross-comparison is made against the same record.
- Symptom: The date of the home visit record conflicts with the date of the class meeting plan, and the versions are not synchronized. Cause: The materials have different update rhythms, and the old version was not replaced, causing the trace to point to outdated content.
- Symptom: The exported records lack references, and signatures or receipts are missing. Cause: Only the first page was retrieved, or the interface returned empty while sessions still appeared in the interface, and paging was not used to retrieve all records.

## How to verify the setup

This function's acceptance: page through to retrieve all records according to the total number of records total, response `code` of 200, sample one record to verify the role, reference information, and time, confirm that the number of references equals the array length, and record the reference tokens separately.

Business test: create an anomalous record, see whether the source material can be traced, and verify the fields, dates, and signatures of the themed class meeting plan, student comprehensive quality record, and home visit record.

- Verify the source of `chatId` by application and session identifier, pull two pages consecutively to compare the offset and the total number of records total, and confirm that the role field matches the original conversation between question and answer.
- Open a single record to verify `dataId` and the reference and elapsed time in `value`, and check whether the number of references and the reference tokens are recorded separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
