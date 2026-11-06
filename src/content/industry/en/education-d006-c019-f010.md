---
title: Citations and Source Traceability for Course Selection, Timetables and Classroom Allocation: Track Progress and Check Statistics
slug: /en/industry/education-d006-c019-f010
page_type: 行业问题页
application_area: education
meta_title: Course Scheduling | Citations | Progress
meta_description: Course Scheduling: review citations for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Course Selection, Timetables and Classroom Allocation: Track Progress and Check Statistics

## What this category's data looks like

In the course selection, scheduling, and classroom resource allocation category, three materials—the course offering plan, the scheduling table, and the course selection rules—jointly enter the knowledge base retrieval node: the course offering plan provides course names, credits, and offering units; the scheduling table provides classrooms, weeks, and periods; and the course selection rules provide capacity, priority, and exception clauses. The materials are updated by semester batch, and signature and receipt pages are stored in sync with the version. Fields mainly consist of course codes, classroom numbers, dates, headcounts, and signature status. After entering this feature, the three materials are each retrieved as cited sources, to be used for subsequent comparison of whether the name, quantity, and date of the same record are consistent, and based on this a progress table and statistical scope statement are generated.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text snippet and a source identifier, and the length may be 0. The "progress table and statistical scope statement" is then completed by a subsequent AI node, code node, or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Course offering plan | Whether the course name, credits, offering unit, and signature field correspond item by item with the scheduling table, and whether the date is the same version | Open the citation marker to trace back to the original passage in the course offering plan, and verify the fields and signature page |
| Scheduling table | Whether the classroom number, weeks, and periods are consistent in name, quantity, and date with the same record in the course offering plan and course selection rules | Use `quoteList` to view the cited snippet, and compare the same course record across the three materials item by item |
| Course selection rules | Whether capacity, priority, and exception clauses clearly state the scope, and whether the version is in sync with the course offering plan | Verify the cited source identifier, and confirm that the rules version is consistent with the course offering plan for the current semester |
| Cited content output | The number of returned entries is consistent with the materials hit, and being empty is also normal | Run a test with a question that has no matching materials, and see whether the array is empty while the chain continues |

## Three common errors

- Symptom: The name, quantity, and date of the same course do not match between the course offering plan and the scheduling table. Cause: The two materials were entered at different times, and no field-level comparison or receipt verification was performed.
- Symptom: The course selection rules version is not in sync with the course offering plan for the current semester. Cause: After the rules were updated, they were not re-ingested into the knowledge base, and the cited source still points to the old version's passage.
- Symptom: The scheduling table lacks signatures or receipts, and the statistical scope cannot be traced. Cause: The signature page was not ingested into the knowledge base together with the materials, and the cited snippet only covers the main text.

## How to verify the setup

Feature acceptance: Ask a question that has textual evidence, and verify whether the citation array and markers can trace back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through. The number of citations is the array length, and `quoteMaxToken` is the citation content budget; the two are not compared for equality. When the citation limit is involved, verify the tokens of the cited text, and record the array entry count separately.

Business test: Use one week of records to verify the totals, and see whether the scope and exceptions are clearly stated.

- In the node, verify the selected knowledge base collections and their vector models, open the search parameter panel, and verify the values item by item.
- Run a test with a question that has no matching materials, confirm that the citation array in `responseData` (non-streaming module results returned with detailed output enabled) is empty while the chain continues, and record the array length and the `quoteMaxToken` value.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
