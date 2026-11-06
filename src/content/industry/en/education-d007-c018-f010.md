---
title: Citations and Source Traceability for Undergraduate Curriculum Planning: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c018-f010
page_type: 行业问题页
application_area: education
meta_title: Program Revision | Citations | Review
meta_description: Program Revision: review citations for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Undergraduate Curriculum Planning: Trace Exceptions and Review Results

## What this category's data looks like

This category's data involves three types of materials: program plans, course syllabi, and credit structure tables. The program plan provides the major direction, total credits, and study requirements; the course syllabus explains course objectives, content, and assessment methods; the credit structure table lists the credits, class hours, and proportions of each module. The three types of materials use version dates, course names, credit amounts, signatures, and receipts as key fields, and the revision cycle is usually updated on a rolling basis by academic year or training cycle. When entering knowledge base retrieval, each material provides original text fragments and source identifiers as independent documents or segments. The program plan is used to check the overall framework, the course syllabus is used to check course names and content, and the credit structure table is used to check quantities and proportions. Together, the three support comparison of the original records during exception tracing.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text fragment and a source identifier, and the length can be 0. The exception list and review conclusions are completed afterward by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Program plan | Whether the major name, total credits, study requirements, and version date correspond to the credit structure table | Open the citation marker to point back to the original paragraph, check the fields and signature column, record the number of array items, and separately record the `quoteMaxToken` budget |
| Course syllabus | Whether the course name, credit amount, semester offered, and program plan are consistent | Compare the course fields in the cited fragments one by one, check for cases where the version is not synchronized and names do not match, and inspect the citation array in `responseData` (non-streaming module results returned with detailed output enabled) |
| Credit structure table | Whether the credits, class hours, and proportions of each module are consistent with the program plan, and whether signatures and receipts are complete | Check the citation source identifiers and original dates, mark an exception when signatures or receipts are missing, and if necessary inspect `quoteList` to confirm the source |
| Exception record | Whether the name, quantity, and date of the same record do not match across the two materials | Run a trial with one exception record to see whether the source material can be traced, and confirm that the chain still runs through when the citation array is empty |

## Three common errors

- Symptom: the credit amount for the same course does not match between the program plan and the course syllabus. Cause: during revision, only one material was changed and the other was not updated in sync; the cited fragments each point back to their own original text, and the difference must be determined manually after comparing fields.
- Symptom: the course name is written differently in the two materials, and the date and version number are also inconsistent. Cause: the versions are not synchronized, the old document is still in the knowledge base, retrieval hits different sources, and the number of citations and source identifiers can help locate them.
- Symptom: the credit structure table lacks a signature or receipt, and the review conclusion cannot be signed off. Cause: a step in material circulation was omitted; the cited fragments can only prove that the original text exists and cannot replace a signature, so manual supplementary signing is required before submitting it to the person in charge for handling.

## How to verify the setup

This feature's acceptance check: ask a question that has support in the original text, and check whether the citation array and markers can point back to the original text; then ask a question with no matching material, confirm that the array is empty while the chain runs through, and separately record the number of array items without comparing it for equality with `quoteMaxToken`.

Business test: create an exception record, see whether the source material can be traced, and check whether the cited fragments correspond to the original paragraphs.

- In the node, check the selected knowledge base collections and their vector models, and confirm that the selected knowledge bases use the same vector model.
- Open the search parameter panel and check the values item by item, then run a trial with a question that has no matching material to see whether the output is empty while the chain continues.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
