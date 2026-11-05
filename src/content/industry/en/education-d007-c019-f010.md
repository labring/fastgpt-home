---
title: Citations and Source Traceability for Course Selection, Timetables and Classroom Allocation: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c019-f010
page_type: 行业问题页
application_area: education
meta_title: Course Scheduling | Citations | Review
meta_description: Course Scheduling: review citations for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Course Selection, Timetables and Classroom Allocation: Trace Exceptions and Review Results

## What this category's data looks like

In course selection, scheduling, and classroom resource allocation scenarios, materials typically include three types: course offering plans, scheduling tables, and course selection rules. Course offering plans carry the course name, course code, offering unit, semester, and signature field; scheduling tables carry the course name, instructor, week number, period, classroom number, and version number; course selection rules carry the selection target, capacity, priority, effective date, and receipt. When the three enter the knowledge base retrieval node, each participates in vector search as an independent source, and the citation output is only responsible for returning the matched original text snippets and source identifiers. In terms of update cadence, course offering plans are finalized before the semester, scheduling tables are revised multiple times before course selection, and course selection rules are adjusted by batch. Field characteristics manifest as the same course possibly having inconsistent names, dates, and classroom numbers between the course offering plan and the scheduling table; unsynchronized versions, missing signatures, and missing receipts are common material states.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing an original text snippet and a source identifier, and the length can be 0. Even if no content is retrieved, the output pipeline still completes. The exception list and review conclusions are subsequently completed by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Course offering plan | Whether the course name, course code, semester, offering unit, and signature field are complete, and whether the name and date of the same course match those in the scheduling table | In the node, verify whether the associated knowledge base uses the same vector model, open the citation markers one by one to trace back to the original paragraphs of the course offering plan, and check the signature and date fields |
| Scheduling table | Whether the course name, instructor, week number, period, classroom number, and version number are consistent with the course offering plan and course selection rules, and whether the version is synchronized | Run a test with a query that has no matching materials to confirm that the citation array is empty while the pipeline continues, then check the version and classroom number against the scheduling table source document |
| Course selection rules | Whether the selection target, capacity, priority, effective date, and receipt are consistent with the fields in the course offering plan and scheduling table, and whether signatures or receipts are missing | Open the search parameter panel and check the values item by item, record the number of citations and the `quoteMaxToken` budget, check the tokens of the cited text, and record the array length separately |
| Citation content output | The number of returned entries matches the matched materials; empty is also normal; each citation can trace back to the original paragraph | Open the citation markers in the conversation and compare them with the source documents; check the cited snippets and source identifiers in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` |

## Three common errors

- Symptom: The name and date of the same course do not match between the course offering plan and the scheduling table. Cause: The two materials were revised separately without field comparison and version synchronization, and the differences remain in the original text after citation matching.
- Symptom: The scheduling table version is not synchronized, and the classroom number and week number still use the old version. Cause: After revision, the knowledge base materials were not updated, and the retrieved matches are still original text snippets from the old version.
- Symptom: The course selection rules lack signatures or receipts, and the review conclusion cannot be stamped. Cause: When the materials entered the knowledge base, the signature field and receipt field were not checked, and the citation output only returns original text snippets.

## How to verify the setup

Acceptance of this feature: Ask a question with original text evidence and check whether the citation array and markers can trace back to the original text; then ask a question with no matching materials and confirm that the array is empty while the pipeline completes.

Business test: Create an exception record, see whether it can be traced back to the source material, record the number of citations and the `quoteMaxToken` budget, and check `quoteList` within `responseData`.

- In the node, check the selected knowledge base collections and their vector models, and open the search parameter panel to check the values item by item.
- Run a test with a query that has no matching materials, observe that the output is empty while the pipeline continues, then open the citation markers and compare them with the source documents.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
