---
title: Citations and Source Traceability for Course Selection, Timetables and Classroom Allocation: Find Supporting Evidence
slug: /en/industry/education-d001-c019-f010
page_type: 行业问题页
application_area: education
meta_title: Course Scheduling | Citations | Evidence
meta_description: Course Scheduling: review citations for evidence lookup. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Course Selection, Timetables and Classroom Allocation: Find Supporting Evidence

## What this category's data looks like

In the course selection, scheduling, and classroom resource dispatch category, materials include the course offering plan, the scheduling table, course selection rules, the classroom list, and adjustment receipts. The course offering plan contains the course name, class, week range, and signature; the scheduling table contains the classroom, period, date, and signature; the course selection rules contain the selection target, capacity, and version number; the classroom list contains the classroom number and capacity; the adjustment receipt contains the fields before and after the change and the acknowledgment. Materials enter the knowledge base in batches by the beginning of the semester, before scheduling, during the course selection week, and on the adjustment day, and the version is based on the date on the signature page. When they enter the knowledge base retrieval node, the course offering plan and the scheduling table serve as the basis for scheduling, the course selection rules and the classroom list serve as the basis for capacity and target, and the receipts serve as the basis for change traceability. The field names, quantities, and dates of each material must be mutually referable, and the same record should be consistent across multiple materials.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and a source identifier, and the length may be 0. The basis items that can be traced back to the original text are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Course offering plan | Whether the course name, class, week range, and signature page date are consistent with the corresponding record in the scheduling table, and whether the version is current | Open the course offering plan and the scheduling table, compare the course name, class, week range, and signature page date item by item; check whether the version number is current |
| Scheduling table | Whether the classroom, period, date, and signature are consistent with the classroom list and the receipt, and whether the name and quantity of the same record match | Take the scheduling table, the classroom list, and the adjustment receipt, compare the classroom number, period, date, and signature; register the number of cited items and the `quoteMaxToken` budget separately |
| Course selection rules | Whether the selection target, capacity, and version number are consistent with the course offering plan and the classroom list capacity, and mark when the signature or receipt is missing | Open the course selection rules, the course offering plan, and the classroom list, compare the selection target, capacity, and version number; check whether the signature or receipt is complete |
| Citation output | The number of returned items is consistent with the materials hit, empty is also normal, and each citation can be traced back to the original text paragraph | Run a trial with a question that has no matching material, and see whether the output is empty while the chain continues; open the citation marker in the conversation and compare it with the source document |

## Three common errors

- Symptom: The name, quantity, or date of the same course does not match in two materials. Cause: The same record standard was not used for verification during entry, or the version was not synchronized.
- Symptom: The classroom number and capacity in the scheduling table and the classroom list are inconsistent. Cause: After adjustment, only one material was updated, while the other remained at the old version.
- Symptom: The course selection rules lack a signature or receipt, and the change cannot be traced. Cause: The adjustment process did not collect all acknowledgment documents, and the materials were not validated when they entered the knowledge base.

## How to verify the setup

Acceptance of this feature: ask a question with an original text basis, and check whether the citation array and marker can be traced back to the original text; then ask a question with no matching material, and confirm that the array is empty while the chain runs through. Open `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` to view the cited content array and record the number of items; the citation limit only checks the tokens of the cited text, and the number of array items is recorded separately.

Business test: ask a basis question across materials, and see whether the answer gives a traceable source.

- In the node, check whether the selected knowledge base collections and their vector models are consistent, and open the search parameter panel to check the values item by item.
- Run a trial with a question that has no matching material, and see whether the output is empty while the chain continues; then open the citation marker and compare it with the source document.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
