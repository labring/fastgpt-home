---
title: Citations and Source Traceability for Initial Review of Academic Journal Submissions: Track Progress and Check Statistics
slug: /en/industry/education-d006-c066-f010
page_type: 行业问题页
application_area: education
meta_title: Journal Submissions | Citations | Progress
meta_description: Journal Submissions: review citations for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Initial Review of Academic Journal Submissions: Track Progress and Check Statistics

## What this category's data looks like

In the initial review stage of academic journal submissions, the materials include the submitted manuscript, the author information form, and the plagiarism check report. Each plays a different role: the submitted manuscript provides the research content and formatting style, the author information form provides the order of authorship, affiliations, and contact information, and the plagiarism check report provides the text similarity ratio and source comparison results. These materials usually enter the progress record and statistical verification process in weekly batches. The fields involve manuscript number, title, author, affiliation, date received, initial review date, plagiarism check date, conclusion, and signature field. The update cadence advances weekly, with a new batch of records formed each week and summarized at the end of the month. The names, quantities, and dates of the same record across the three materials need to be aligned item by item. Version synchronization and signed receipts are the basis for determining whether the materials are complete. The progress table and statistical scope description are generated on the basis of such materials and are used in weekly or monthly reports.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text snippet and source identifier, and the length can be 0. The "progress table and statistical scope description" is then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Submitted manuscript | The manuscript number, title, date received, and initial review date must be aligned item by item with the author information form and plagiarism check report; the signature field and receipt are indispensable | In the node, check the selected collection and its vector model to confirm that the manuscript materials have entered the associated knowledge base |
| Author information form | The order of authorship, affiliation, and dates are consistent with the manuscript record; when the version is not synchronized, the latest signed version prevails | Open the search parameter panel and check item by item to confirm that the search parameters are consistent with the values set in the knowledge base retrieval section |
| Plagiarism check report | The plagiarism check date, text similarity ratio, and source comparison results must correspond to the manuscript record; if the signature or receipt is missing, it is returned for correction | Run a test with a question that has no matching materials, and see that the output is empty while the chain continues; `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` can assist verification |
| Progress table and statistical scope description | The number of records matches the statistical count, the scope is written in the header, and exceptional cases are noted item by item | Open the citation superscript in the conversation and compare it with the source document to confirm that each citation can point back to the original paragraph |

## Three common errors

- Symptom: The name, quantity, and date of the same manuscript do not match across two materials. Cause: The numbering or date scope was not unified during entry, resulting in a discrepancy between the statistical count and the record count.
- Symptom: The author information form and the manuscript version are not synchronized, and two versions of the authorship order or affiliation appear. Cause: Updates were not synchronized after modification, and the old version remains within the retrieval scope.
- Symptom: The plagiarism check report lacks a signature or receipt, but the progress record still shows it as received. Cause: Receipt registration and material verification belong to different steps and were not checked item by item.

## How to verify the setup

Acceptance for this feature: ask a question with textual support and check whether the citation array and superscript can point back to the original text; then ask a question with no matching materials and confirm that the array is empty while the chain runs through. The number of citations is the array length, and `quoteMaxToken` is the citation content budget; the two are not compared for equality. If a citation upper limit is involved, check the tokens of the cited text, and record the array count separately.

Business test: use one week of records to verify the totals, see whether the scope and exceptions are clearly written, and confirm that the record count matches the statistical count and that the scope is written in the header.

- In the node, check the selected collection and its vector model to confirm that the submitted manuscript, author information form, and plagiarism check report have all entered the associated knowledge base of the same vector model.
- Open the search parameter panel and check item by item to confirm that the search parameters are consistent with the values set in the knowledge base retrieval section, and run a test with a question that has no matching materials to observe that the output is empty while the chain continues.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
