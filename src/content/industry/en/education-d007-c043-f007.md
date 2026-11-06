---
title: Conversation Records and Traceability for Training Provider Admissions and Inquiry Follow-Up: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c043-f007
page_type: 行业问题页
application_area: education
meta_title: Training Admissions | Chat Records | Review
meta_description: Training Admissions: review chat records for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Training Provider Admissions and Inquiry Follow-Up: Trace Exceptions and Review Results

## What this category's data looks like

This page addresses the enrollment consultation conversion scenario at training institutions. The source materials are of three types: enrollment brochures, consultation records, and trial class arrangements. Enrollment brochures provide course names, class types, pricing bases, and start dates, and serve as the baseline version for consultation scripts; consultation records carry the questions and answers and the citation evidence from both parties during the consultation process, and are the primary scene for tracing abnormalities; trial class arrangements record trial times, class leaders, and receipt acknowledgments, and are the implementation proof for the conversion stage. The three types of materials are updated by batch: brochures are adjusted with the enrollment season, consultation records accumulate in real time with sessions, and trial arrangements are scheduled weekly. In terms of field characteristics, brochures are distinguished by version number and effective date, consultation records are located by application identifier and session identifier, and trial arrangements are checked by date and signature field. When the three enter the conversation log and auditing feature, the brochure serves as the comparison baseline, the consultation record serves as the main body of evidence, and the trial arrangement serves as the result receipt, jointly supporting abnormal traceback and manual review.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), which outputs the session message list and the total record count, including role and citation information. The abnormality list and review conclusions are then completed manually or by an external system; the interface does not write business ledgers and only provides session evidence.

| Object | Check | Verification action |
| --- | --- | --- |
| Enrollment brochure | Course name, class type, pricing basis, and effective date are consistent across versions, and it carries a version number and signature | Take the currently effective version, compare it item by item with the course name and date cited in the consultation records, and check the signature field and receipt |
| Consultation record | The same session can be located under the application and session dimension, message roles correspond to the original conversation, and citation and duration fields are visible | Pull pages by application and session dimension, check the total record count and offset, and sample one record to check the role, citation, and duration |
| Trial class arrangement | Trial date, class leader, and receipt signature are complete, and do not conflict with the brochure start date | Compare against the brochure start date and the trial commitment in the consultation records, check the date and signature field, and mark those missing a signature or receipt as pending review |
| Conversation logs and auditing | The total record count matches the pagination parameters, the status code is 200, and a single record contains `dataId` and `value` | Pull two consecutive pages and compare the total record count and offset, and open one record to check `_id`, `dataId` and `value`, and citation information |

## Three common errors

- Symptom: the name or class type of the same course does not match between the brochure and the consultation records. Cause: the brochure version was not synchronized to the consultation scripts, old materials are still circulating, and version number and effective date constraints are missing.
- Symptom: the trial arrangement date conflicts with the brochure start date, and the quantities also do not match. Cause: the two materials are updated separately, the scheduling table is not written back to the brochure, and dates and quantities are not cross-checked.
- Symptom: review conclusions lack a signature or receipt, and abnormal records cannot be traced to the source materials. Cause: the registration step only copies conclusions without keeping original records, receipts are not collected, and the responsible person and date are missing.

## How to verify the setup

Acceptance of this feature: page through using the total record count total to retrieve all records, sample one record to check the role, citation information, and time, confirm the status code is 200, check `_id`, `dataId` and `value`, and the number of items in the citation array, and record the tokens of the citation text separately.

Business test: create one abnormal record, see whether it can be traced to the source materials, and check whether the brochure version, consultation record, and trial receipt match.

- Pull the session message list by pagination under the application and session dimension, compare the total record count and offset, and confirm that only the first page was not retrieved.
- Sample one record to check the role order, citation information, and duration fields, register the abnormality list, and hand it to the responsible person for handling.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
