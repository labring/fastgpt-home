---
title: Citations and Source Traceability for Vocational College Curriculum Planning: Track Progress and Check Statistics
slug: /en/industry/education-d006-c029-f010
page_type: 行业问题页
application_area: education
meta_title: Vocational Curricula | Citations | Progress
meta_description: Vocational Curricula: review citations for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Vocational College Curriculum Planning: Track Progress and Check Statistics

## What this category's data looks like

This category's data covers the formulation of talent cultivation plans in vocational colleges and involves three types of materials: talent cultivation plans, curriculum standards, and job competency analysis tables. The material sources are exports from the academic affairs system, discussion records of professional groups, and receipts from enterprise job surveys. The update cadence advances weekly: finalization of the plan, revision of curriculum standards, and signed confirmation of the job competency table. Field characteristics include major name, course code, competency unit, preparation date, reviewer signature, and version number. When entering the knowledge base retrieval node, the talent cultivation plan serves as the main record providing major and program length fields, the curriculum standard serves as a sub-record providing course name and class hours, and the job competency analysis table provides job names and competency items. In the citation output, each of the three types of materials retains its own source identifier, making it easier to subsequently compare whether the name, quantity, and date of the same record are consistent, and whether version synchronization and signature receipts are complete.

## Configuration and implementation checks

The citation output of the knowledge base retrieval node only outputs an array of cited content, each item containing the original text fragment and source identifier, and the length can be 0. The progress table and statistical scope description must be handled subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Talent cultivation plan | The major name, program length, preparation date, reviewer signature, and version number must be aligned item by item with the curriculum standard and job competency analysis table | Open the citation marker to trace back to the original paragraph, check whether the major name and date are consistent, and check whether the signature field and version number are synchronized |
| Curriculum standard | The course name, course code, class hours, and corresponding competency unit must match the course list in the talent cultivation plan | Compare the course code and class hours item by item in the citation array, and confirm that the name and quantity of the same course match in the two materials |
| Job competency analysis table | The job name, competency items, survey date, and enterprise receipt signature must correspond to the competency units in the curriculum standard | Check the job name and competency items in the cited fragment, and check whether the receipt signature and survey date are missing |
| Cited content output | The number of returned items is consistent with the matched materials; being empty is also normal; `quoteMaxToken` only constrains the citation text budget | Run a test with a question that has no matching materials, and see whether the output is empty while the pipeline continues; then check the number of citations in `quoteList` within `responseData` (non-streaming module results returned with detailed output enabled) |

## Three common errors

- Phenomenon: The course name and class hours of the same record do not match between the talent cultivation plan and the curriculum standard. Cause: The versions of the two materials are not synchronized, and after revision one was not written back to the other.
- Phenomenon: The job competency analysis table lacks an enterprise receipt signature or the survey date is blank. Cause: The survey record was not archived, and the signature process was not completed before entering the citation output.
- Phenomenon: The cited fragment does not match the original text, and there is no citation marker in the answer. Cause: First check whether this round hit a match and which material was matched, then look at clipping, and do not directly attribute it to length clipping.

## How to verify the setup

Acceptance of this feature: ask a question with original-text support, check whether the citation array and markers can trace back to the original text, and confirm that each citation can correspond to an original paragraph in the talent cultivation plan or curriculum standard; then ask a question with no matching materials, confirm that the array is empty while the pipeline runs through, and separately record the number of citations in `quoteList` within `responseData`.

Business test: use one week of records to check the totals, see whether the scope and exceptions are clearly stated, confirm that the number of records matches the statistical count, and write the scope into the table header.

- In the node, check whether the selected knowledge base collections and their vector models are consistent, and open the search parameter panel to check the values item by item.
- In the conversation, open the citation markers, verify the correspondence between the cited fragments and the original text against the source documents, and register the number of array items and the `quoteMaxToken` budget separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
