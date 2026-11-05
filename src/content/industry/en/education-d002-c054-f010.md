---
title: Citations and Source Traceability for Self-Study Exam Records and Graduation Review: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c054-f010
page_type: 行业问题页
application_area: education
meta_title: Self-Study Exams | Citations | Checks
meta_description: Self-Study Exams: review citations for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Self-Study Exam Records and Graduation Review: Compare Documents and Locate Differences

## What this category's data looks like

This category's data involves three types of materials: registration records, course qualification certificates, and graduation application forms. Registration records are updated by the provincial examination office after each exam registration, with fields including name, exam registration number, course code, score, date, and handling signature; course qualification certificates are generated upon the release of individual subject scores, with fields including course name, credits, qualification date, and seal; graduation application forms are filled out by candidates when applying for graduation, with fields including major name, number of courses, total credits, signature, and receipt. When these three types of materials enter the knowledge base retrieval node, each is associated as an independent source, and the citation output returns the original text snippets and source identifiers based on the matched materials, for subsequent field comparison, ledger writing, and report generation. In terms of update cadence, registration records roll with each exam session, course qualification certificates are released by batch, and graduation application forms are submitted by application cycle; version discrepancies and missing signatures are the main verification points.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing an original text snippet and a source identifier, and the length can be 0. The "discrepancy list" is completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Registration records | Whether the name, exam registration number, course code, score, date, and handling signature are consistent with the course qualification certificate | Open the source marker in the citation output, compare the original text snippets of the two materials field by field, and record inconsistent items |
| Course qualification certificate | Whether the course name, credits, qualification date, and seal are consistent with the same record in the registration records | Check the number of entries in the citation array against the number of matched materials, and see whether the cited snippets in `responseData` (non-streaming module results returned with detailed output enabled) point back to the original paragraphs |
| Graduation application form | Whether the major name, number of courses, total credits, signature, and receipt are consistent with the registration records and course qualification certificate | Check the citation source identifiers in `quoteList`, and confirm whether version synchronization and signature receipt are complete |
| Associated knowledge base | Whether the selected collections are knowledge bases of the same vector model | In the node, check the selected knowledge base collections and their vector models, and confirm that the search parameters are consistent with the values in the knowledge base retrieval section |

## Three common errors

- Symptom: The course name or qualification date of the same record does not match between the registration records and the course qualification certificate. Cause: The two materials' versions are not synchronized, or field mapping was misaligned during entry; first verify the materials matched in this round before comparing.
- Symptom: The number of courses and total credits in the graduation application form are inconsistent with the counts in the registration records. Cause: Score consolidation or exemption records were not written back, causing the same object's counts to differ between the two materials.
- Symptom: The graduation application form lacks a signature or receipt, and the cited snippets do not match the original text. Cause: The scanned copy has missing pages or an improper cropping range; do not directly attribute this to length truncation—first check the matched entries, then look at the `quoteMaxToken` budget.

## How to verify the setup

This feature's acceptance: ask a question with original-text support, and check whether the citation array and source markers can point back to the original text; then ask a question with no matching materials, confirm that the array is empty while the pipeline still runs, and record the number of citations and the `quoteMaxToken` budget values separately.

Business test: use a real record to find a field inconsistent with the ledger, and hand the cited snippets and source identifiers to the reviewer for confirmation and write-back.

- In the conversation, open the citation source markers, verify the name, quantity, date, and signature field by field against the source documents, and record inconsistent items to form a discrepancy list.
- Run a trial with a question that has no matching materials, check `quoteList` within `responseData`, confirm that an empty array is output while the pipeline continues, and record the number of citations separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
