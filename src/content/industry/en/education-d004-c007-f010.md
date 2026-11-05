---
title: Citations and Source Traceability for School Enrollment Records and Status Changes: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c007-f010
page_type: 行业问题页
application_area: education
meta_title: School Enrollment | Citations | Handover
meta_description: School Enrollment: review citations for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for School Enrollment Records and Status Changes: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page addresses the drafting of materials and handover of responsibility for student status establishment and changes in primary and secondary schools, covering three types of materials: student status records, transfer applications, and leave/resumption materials. Student status records contain fields such as student basic information, family information, enrollment and current status, and change records; transfer applications contain the transferring-out and transferring-in schools, student status number, reason for transfer, date, and signatures/seals of both parties; leave/resumption materials contain the reason for application, start and end times, approval opinions, and receipt. The materials originate from drafting by school student status administrators, review by academic affairs and school-level leaders, and filing with higher-level student status authorities, and the update cadence changes with establishment at the beginning of the semester, changes during the semester, and archiving at the end of the semester. When entering this function, the three types of materials are retrieved as knowledge base documents, each serving as the basis for field comparison and responsibility chain verification, and cited snippets point back to the original paragraphs for subsequent nodes to generate drafts and handover records.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original snippet and source identifier, and the length can be 0. The "issuable material drafts and handover records" are completed subsequently by AI nodes, code nodes, or humans.

| Object | Check | Verification action |
| --- | --- | --- |
| Student status record | Fields are complete, responsible persons are clear, version and date are consistent; names, quantities, and dates match across the three materials | Open the citation marker to point back to the original paragraph, and verify the student status number, name, change date, and signature/seal item by item |
| Transfer application | The transferring-out and transferring-in schools, student status number, reason for transfer, date, and signatures/seals of both parties are complete, and the version and date are consistent | Draft one according to the template and complete one handover, see whether missing items are blocked, then check the cited snippets in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` |
| Leave/resumption materials | The reason for application, start and end times, approval opinions, and receipt are complete; if the name and date of the same record do not match, it is blocked | Run a test with a question that has no matching materials, confirm that the citation array is empty while the chain continues, and record the count separately |
| Associated knowledge base | The selected knowledge base uses the same vector model, and the search parameters are consistent with the values in the knowledge base retrieval section | In the node, verify the selected collections and their vector models, open the search parameter panel, and verify item by item |

## Three common errors

- Phenomenon: The name or student status number of the same student does not match between the student status record and the transfer application. Cause: During drafting, the original paragraph was not referenced back, the cited snippet was disconnected from the source document, and field comparison lacked a basis.
- Phenomenon: The version of the leave/resumption materials was not synchronized, and the date and approval opinions remained in the old draft. Cause: During responsibility handover, the version and date were not recorded, and the next step did not verify item by item according to the template before signing for receipt.
- Phenomenon: The transfer application lacks a signature or receipt, but the materials are still advanced. Cause: The handover record did not list the signature and receipt as blocking items, and missing items were not blocked before entering the issuance step.

## How to verify the setup

This function's acceptance: ask a question with original-text evidence, check whether the citation array and markers can point back to the original paragraph, and use `quoteList` within `responseData` to compare against the source document; then ask a question with no matching materials, confirm that the array is empty while the chain runs through, the citation count is the array length, and `quoteMaxToken` is the citation content budget, and the two are not compared for equality.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- Run a test with a question that has no matching materials, see that the output is empty while the chain continues, and record the array count separately.
- Open the citation markers in the conversation, compare against the source document, and verify that each citation can point back to the original paragraph.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
