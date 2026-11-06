---
title: Citations and Source Traceability for District Teaching Research and Classroom Reviews: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c012-f010
page_type: 行业问题页
application_area: education
meta_title: Teaching Reviews | Citations | Operations
meta_description: Teaching Reviews: review citations for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for District Teaching Research and Classroom Reviews: Coordinate Operations and Application Handover

## What this category's data looks like

Teaching research activity and lesson observation and evaluation materials for districts and counties usually include three types: teaching research activity notices, lesson observation records, and lesson evaluation minutes. The notice gives the activity name, time, location, participation scope, and receipt requirements; the lesson observation record contains the instructor, class, topic, observation dimensions, and signature; the lesson evaluation minutes contain the review points, conclusions, improvement suggestions, and signature. These materials are submitted by teaching researchers, school academic affairs staff, and instructors at different points in time, and the update rhythm advances weekly or by activity batch. The same activity often has mismatched names, quantities, and dates across different materials, with versions not synchronized or signatures and receipts missing. After entering the knowledge base retrieval node, the notice, lesson observation record, and lesson evaluation minutes each serve as retrievable original-text sources. The citation output is only responsible for returning original-text snippets and source identifiers; field comparison, ledgers, and reports are completed by subsequent nodes or manually.

## Configuration and implementation checks

This part is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original-text snippet and a source identifier, and the length may be 0. The handover-ready deployment status and operation records are then completed by subsequent AI nodes, code nodes, or manually, and are used to compare fields, write ledgers, and generate reports.

| Object | Check | Verification action |
| --- | --- | --- |
| Teaching research activity notice | Check whether the activity name, date, participation scope, and receipt requirements are consistent with the lesson observation record and lesson evaluation minutes | Open the citation superscript in the conversation, compare it against the original notice paragraph, and record the source identifier in `quoteList` |
| Lesson observation record | Check whether the instructor, class, topic, observation dimensions, and signature are complete, and whether the date is consistent with the notice | Run a trial query that retrieves by topic, see whether the number of items in the citation array matches the lesson observation record materials hit, and record the array length separately |
| Lesson evaluation minutes | Check whether the review points, conclusions, improvement suggestions, and signature are complete, and whether the names and quantities match the notice and lesson observation record | Open the search parameter panel and check the values item by item, confirming that the tokens budget for cited text `quoteMaxToken` and the number of array items are recorded separately |
| Citation content output | The number of returned items matches the materials hit; being empty is also normal, and the output chain continues to run through | Run a trial query with no matching materials, see that the output is empty while the chain continues, and check the output structure together with `responseData` (non-streaming module results returned with detailed output enabled) |

## Three common errors

- Symptom: The name, quantity, and date of the same activity do not match across two materials, and during handover it is impossible to determine which one prevails. Cause: The notice, lesson observation record, and lesson evaluation minutes are submitted at different points in time, and fields are not checked against the same batch.
- Symptom: Material versions are not synchronized; an old notice and a new lesson evaluation minutes enter retrieval at the same time, and the cited snippets contradict each other. Cause: The update rhythm advances weekly or by activity batch, and there is a lack of unified version marking and handover confirmation.
- Symptom: The lesson observation record or lesson evaluation minutes lack a signature or receipt, and one item is missing when checking the handover form item by item. Cause: Signatures and receipts are completed on paper or through scattered channels and are not incorporated into retrievable sources together with the materials.

## How to verify the setup

Acceptance of this feature: ask a question with original-text support, check whether the citation array and superscript can point back to the original paragraph, and check the source identifier in `quoteList`; then ask a question with no matching materials, confirm that the array is empty while the chain runs through, and at the same time confirm that the number of citations is the array length and `quoteMaxToken` is the citation content budget, and do not compare the two for equality.

Business test: check once item by item according to the handover form, see which record is missing, confirm that the version, connection, and task record are consistent, and then hand over to operations or the next shift.

- Run a trial query with no matching materials, confirm that the citation array is empty while the output chain continues, and record the array length and the `responseData` structure.
- Open the citation superscript in the conversation, compare it against the original notice, lesson observation record, and lesson evaluation minutes, and check item by item whether the cited snippets and source identifiers can point back to the original paragraphs.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
