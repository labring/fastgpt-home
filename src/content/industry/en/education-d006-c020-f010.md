---
title: Citations and Source Traceability for Grade Entry and Credit Recognition: Track Progress and Check Statistics
slug: /en/industry/education-d006-c020-f010
page_type: 行业问题页
application_area: education
meta_title: Grades and Credits | Citations | Progress
meta_description: Grades and Credits: review citations for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Grade Entry and Credit Recognition: Track Progress and Check Statistics

## What this category's data looks like

This page focuses on the grade entry and credit recognition category. The materials include three types: transcripts, deferred examination applications, and make-up examination arrangements. The transcript is the primary record, carrying the course name, credits, grade, entry date, and signature; the deferred examination application is a prerequisite exception material, recording the deferred course, application date, approval signature, and receipt; the make-up examination arrangement is a subsequent adjustment material, recording the make-up course, make-up date, examination room, and signature. When these three types of materials enter the knowledge base retrieval node, each participates as an independent source in the citation output. The transcript provides the baseline fields, while the deferred examination application and make-up examination arrangement provide the basis for exceptions and adjustments. Updates proceed on a weekly cadence, with entry and recognition progress summarized once per week. Field characteristics are concentrated in four categories: course name, credit count, date, and signature. The name, count, and date of the same record across different materials need to be aligned item by item. Version synchronization and the completeness of signatures and receipts are the key points of verification.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text snippet and a source identifier, and the length can be 0. The "progress table and statistical scope description" is completed subsequently by an AI node, code node, or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Transcript | The course name, credits, grade, entry date, and signature are complete, and are consistent with the same course name, count, and date in the deferred examination application and make-up examination arrangement | In the citation array, open the footnote markers one by one, compare them against the original transcript paragraphs, and verify the fields and signature; record the number of citations and separately check the `quoteMaxToken` budget |
| Deferred examination application | The deferred course, application date, approval signature, and receipt are complete, and match the course name and date in the transcript | Open the citation footnote markers to trace back to the original deferred examination application text, and verify whether the signature and receipt are missing; use `quoteList` to view the correspondence between the cited snippet and the original text |
| Make-up examination arrangement | The make-up course, make-up date, examination room, and signature are complete, and are consistent with the same record name, count, and date in the transcript and deferred examination application | In the citation array, compare against the original make-up examination arrangement text, and verify the date and signature; use `responseData` (non-streaming module results returned with detailed output enabled) to view the returned structure and confirm that the number of items matches the hit materials |
| Progress table and statistical scope description | The number of records matches the statistical count, the scope is written in the header, and exceptional cases are clearly stated | Use one week of records to verify the total, and check whether the scope and exceptions are clearly stated; the number of citations is the array length, and `quoteMaxToken` is the content budget, and the two are not compared for equality |

## Three common errors

- Symptom: The name, count, and date of the same course do not match between the transcript and the deferred examination application. Cause: The two materials are entered separately and are not compared item by item under the same scope, resulting in deviations in the statistical total.
- Symptom: The make-up examination arrangement and the transcript version are not synchronized, and the cited snippet points to an old date. Cause: After the material is updated, it is not re-entered into retrieval, and the citation still points back to a historical paragraph, making it easy to misjudge during verification.
- Symptom: The deferred examination application lacks an approval signature or receipt, and there is no corresponding original text for that material in the citation array. Cause: The material was uploaded before completing the approval process, so retrieval hits it but cannot point back to a complete paragraph.

## How to verify the setup

Acceptance for this feature: ask a question with original-text support, and verify whether the citation array and footnote markers can point back to the original text; then ask a question with no matching material, and confirm that the array is empty while the pipeline still runs through. The number of citations is the array length, and `quoteMaxToken` is the citation content budget, and the two are not compared for equality.

Business test: use one week of records to verify the total, and see whether the scope and exceptions are clearly stated.

- In the node, verify whether the selected knowledge base collections and their vector models are consistent, and open the search parameter panel to check the values item by item.
- Run a trial with a query that has no matching material, and see that the output is empty while the pipeline continues; then open the citation footnote markers and compare against the source documents to verify whether each citation can point back to the original paragraph.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
