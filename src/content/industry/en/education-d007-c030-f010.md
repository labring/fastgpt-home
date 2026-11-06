---
title: Citations and Source Traceability for Vocational School Student Internships: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c030-f010
page_type: 行业问题页
application_area: education
meta_title: Student Internships | Citations | Review
meta_description: Student Internships: review citations for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Vocational School Student Internships: Trace Exceptions and Review Results

## What this category's data looks like

Vocational school student internship management involves three core types of materials: internship agreements, internship plans, and internship logs. Internship agreements are signed by three parties—the school, the enterprise, and the student—and include the position name, internship period, insurance, and liability clauses; internship plans are prepared by the professional teaching and research group and include rotation arrangements, supervising personnel, and assessment methods; internship logs are filled in by students day by day and include date, position, task, and supervisor signature. The three types of materials are centrally ingested at the beginning of the semester, incrementally updated weekly or monthly during the internship period, and versions are synchronized with signed receipts. When entering the exception tracing and manual review function, internship agreements serve as the baseline source for ownership and duration, internship plans serve as the source for arrangements and personnel comparison, and internship logs serve as the source for process records and signatures. The fields, dates, and signatures of the three types of materials need to be cross-compared; the name, quantity, and date of the same record must be consistent, versions must be synchronized, and signatures and receipts must be complete.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text snippet and source identifier, and the length may be 0. The exception list and review conclusions are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Internship agreement | Check whether the three-party names, position, period, signatures, and receipts are complete, and whether the dates are consistent with the internship plan | Open the citation marker, compare against the original agreement paragraph, and record the number of citations and the `quoteMaxToken` budget |
| Internship plan | Check the rotation arrangement, supervising personnel, and assessment method fields, and whether the version is synchronized with the agreement | Compare the original plan item by item with the cited agreement snippets, and confirm that the source identifier points to the same version |
| Internship log | Check the date, position, task, and supervisor signature, and whether the quantity matches the plan arrangement | Use the original log snippet to trace back to the source document, and check the length of the citation array in `responseData` (non-streaming module results returned with detailed output enabled) |
| Cited content output | The number of returned items is consistent with the matched materials; being empty is also normal, and the chain continues to run through | Run a test with a question that has no matching materials, confirm that the array is empty and that the chain in `quoteList` is not interrupted |

## Three common errors

- Symptom: The position name for the same student does not match between the agreement and the plan. Cause: The two materials were filled in by different roles, and no field-level comparison was performed before ingestion.
- Symptom: The dates in the internship log are misaligned with the planned rotation dates. Cause: After the plan version was updated, it was not synchronized to the log template, so the versions were not synchronized.
- Symptom: The agreement lacks the enterprise receipt or the log lacks the supervisor signature. Cause: Signatures and receipts were not ingested together with the materials, so there is no original record to support review.

## How to verify the setup

Acceptance of this function: ask a question with original-text support, and check whether the citation array and markers can trace back to the original text; then ask a question with no matching materials, confirm that the array is empty while the chain runs through, and record the number of citations and the `quoteMaxToken` budget for separate checks.

Business test: create an exception record and see whether it can be traced back to the source material.

- Open the search parameter panel, check item by item that the values are consistent with those in the knowledge base retrieval section, and confirm that the associated knowledge base uses the same vector model.
- Open the citation markers in the conversation, compare against the source documents, and check whether each citation can trace back to the original paragraph.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
