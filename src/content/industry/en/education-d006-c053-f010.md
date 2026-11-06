---
title: Citations and Source Traceability for College Admissions Health Examination Organization: Track Progress and Check Statistics
slug: /en/industry/education-d006-c053-f010
page_type: 行业问题页
application_area: education
meta_title: Admissions Health Exams | Citations | Progress
meta_description: Admissions Health Exams: review citations for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for College Admissions Health Examination Organization: Track Progress and Check Statistics

## What this category's data looks like

In progress records and statistical verification for organizing college admissions physical examinations, materials include physical examination forms, re-examination applications, restricted-major notifications, and receipts and signature pages. Physical examination forms are issued by the examining institution, re-examination applications are submitted by the candidate or the middle school, restricted-major notifications are sent by the admissions department, and receipts and signature pages are used to confirm delivery and acknowledgment. When the materials enter the knowledge base retrieval node, each participates as a cited source in hits: the physical examination form provides fields and dates, the re-examination application provides the application time and conclusion, and the restricted-major notification provides the major name and notification date. The update rhythm is summarized weekly and archived monthly, and the version is based on the latest signed document. Field characteristics center on name, candidate number, physical examination conclusion, restricted major, date, and signature. The name, quantity, and date of the same record in different materials must be able to refer back to one another, and materials missing a signature or receipt are marked separately.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and source identifier, and the length may be 0. The "progress table and statistical scope description" is completed next by a subsequent AI node, code node, or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Physical examination form | Whether the fields, dates, and signature are complete, and whether the physical examination conclusion corresponds to the restricted major | In the citation superscript, refer back to the original paragraph of the physical examination form, and check the name, candidate number, physical examination conclusion, date, and signature; record the number of citations, and look separately at the `quoteMaxToken` budget |
| Re-examination application | Whether the application date, re-examination conclusion, and signature or receipt are consistent with the physical examination form | Open the cited source, and compare the date, conclusion, and signature of the re-examination application with those of the physical examination form; use `responseData` (non-streaming module results returned with detailed output enabled) to view the node return structure and confirm that the citation array is consistent with the hit materials |
| Restricted-major notification | Whether the major name, notification date, and receipt match the physical examination form and re-examination application | Open the citation superscripts one by one, and check the major name and notification date; use `quoteList` to view the citation details and confirm that each citation can refer back to the original paragraph |
| Progress table and statistical scope description | Whether the record count and statistical count match, whether the scope is written in the table header, and whether exceptions are clearly stated | Use one week of records to check the total, and inspect the table header scope and exception notes; when the citation array is empty, the pipeline still runs through, and the count is recorded according to the array length |

## Three common errors

- Phenomenon: the name and date of the same candidate do not match between the physical examination form and the re-examination application. Cause: the two materials were entered separately, cross-checking by candidate number was not performed, and the cited fragments do not refer back to the same original paragraph.
- Phenomenon: the version of the restricted-major notification was not synchronized, and the old major name is still cited. Cause: the old and new versions exist simultaneously in the knowledge base, retrieval hits the old version, and verification was not performed against the latest signed document.
- Phenomenon: the re-examination application lacks a signature or receipt, but it is still counted as completed in the statistics. Cause: the scope was not written in the table header, exceptions were not marked separately, and an empty citation array was mistakenly judged as verified.

## How to verify the setup

Acceptance of this feature: ask a question with an original-text basis, and check whether the citation array and superscripts can refer back to the original text; then ask a question with no matching materials, confirm that the array is empty while the pipeline runs through, and record the number of citations and the `quoteMaxToken` budget, without comparing the two for equality.

Business test: use one week of records to check the total, and see whether the scope and exceptions are clearly stated.

- Open the search parameter panel and check item by item, confirm that the selected knowledge base uses the same vector model, and view the citation details in `quoteList` within `responseData`.
- Run a trial with a question that has no matching materials, observe that the citation array is empty while the output pipeline continues, and then check against the source documents whether each citation can refer back to the original paragraph.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
