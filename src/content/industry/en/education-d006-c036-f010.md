---
title: Citations and Source Traceability for Professional Qualification Exam Applications: Track Progress and Check Statistics
slug: /en/industry/education-d006-c036-f010
page_type: 行业问题页
application_area: education
meta_title: Professional Exams | Citations | Progress
meta_description: Professional Exams: review citations for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Professional Qualification Exam Applications: Track Progress and Check Statistics

## What this category's data looks like

This page addresses the scenario of reviewing registration for professional and technical personnel qualification examinations, focusing on progress records and statistical verification, and handles three types of materials: registration forms, academic qualification certificates, and work experience certificates. The registration form carries the registration subject and examination subject information, the academic qualification certificate carries the education level and graduation date information, and the work experience certificate carries the employment start and end dates and position information. Materials enter the knowledge base retrieval node as scanned copies or structured fields; the node performs vector search against the knowledge base collection of the same vector model, returning an array of cited content, each item containing the original text snippet and source identifier. The update rhythm advances by batch: newly received materials enter the pool, old versions are replaced, and supplementary-signed receipts are archived. Field characteristics center on name, ID number, organization name, date, signature, and receipt number; the name, quantity, and date of the same record across the three materials must be mutually traceable, and the version and signature status must be traceable.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text snippet and source identifier, and the length may be 0. The "progress table and statistical scope description" is completed subsequently by an AI node, code node, or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Registration form | Fields include name, ID number, examination subject, organization name, date, and signature, and must be aligned item by item with the academic qualification certificate and work experience certificate | Open the citation marker and check the name, ID number, date, and signature against the source document; record the number of citations, i.e. the array length, and separately record `quoteMaxToken` as the citation content budget |
| Academic qualification certificate | Fields include name, graduating institution, education level, graduation date, and certificate number, and must be consistent with the name and date in the registration form and work experience certificate | Open the citation marker in the conversation to trace back to the original paragraph; check whether the cited snippet in `responseData` (non-streaming module results returned with detailed output enabled) corresponds to the original text; when the version is not synchronized, the latest archived document prevails |
| Work experience certificate | Fields include name, organization name, position, employment start and end dates, signature, and receipt, and must match the name and date in the registration form and academic qualification certificate | Check whether the signature and receipt are complete; run a test with a question that has no matching material and see whether the citation array is empty while the chain continues; an empty record in `quoteList` is normal |
| Progress table and statistical scope description | The number of records matches the statistical count, the scope is written in the header, and exceptions are marked separately | Use one week of records to check the totals and see whether the scope and exceptions are clearly written; record the number of citations separately and do not compare it for equality with `quoteMaxToken` |

## Three common errors

- Symptom: the organization name and date of the same record in the registration form and work experience certificate do not match. Cause: the two materials were entered separately, no field-level traceability check was performed, and the cited snippets were not compared item by item with the original text.
- Symptom: the academic qualification certificate version is not synchronized, and the old graduation date is still cited. Cause: the new archived document did not replace the old version, multiple versions of the same material exist in the knowledge base collection, and retrieval hits the old snippet.
- Symptom: the work experience certificate lacks a signature or receipt, but the progress table still counts it as received. Cause: the receiving step only checks whether the file was uploaded, does not verify the signature and receipt fields, and the statistical scope does not list exceptions separately.

## How to verify the setup

Acceptance of this feature: ask a question with documentary evidence and check whether the citation array and markers can trace back to the original text; then ask a question with no matching material, confirm that the array is empty while the chain runs through, and record the number of citations, i.e. the array length; `quoteMaxToken` serves only as the citation content budget.

Business testing: use one week of records to check the totals and see whether the scope and exceptions are clearly written; if a citation upper limit is involved, check the tokens of the cited text, record the array item count separately, and do not perform an equality comparison.

- In the node, check whether the selected knowledge base collections and their vector models are consistent, then open the search parameter panel and check the values item by item.
- Run a test with a question that has no matching material and see whether the output is empty while the chain continues; then open the citation marker and check against the source document whether each citation can trace back to the original paragraph.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
