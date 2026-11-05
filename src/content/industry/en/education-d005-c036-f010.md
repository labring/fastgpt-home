---
title: Citations and Source Traceability for Professional Qualification Exam Applications: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c036-f010
page_type: 行业问题页
application_area: education
meta_title: Professional Exams | Citations | Versions
meta_description: Professional Exams: review citations for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Professional Qualification Exam Applications: Maintain Document Versions and Changes

## What this category's data looks like

In the review of registration for professional and technical personnel vocational qualification examinations, the registration form, education certificate, and work experience certificate are the three core types of materials. The registration form carries the name, ID number, examination subjects, employer's opinion, and signature; the education certificate carries the graduating institution, major, certificate number, and issue date; the work experience certificate carries the start and end times, position, employer's seal, and handler's signature. Materials often enter the knowledge base as scanned copies or electronic files, each playing a field-tracing role: the registration form verifies identity and registration information, the education certificate verifies major and graduation date, and the work experience certificate verifies years of experience and the employer's opinion. The update cadence changes with registration batches, policy adjustments, and correction notices, requiring maintenance of a unique current version, traceability of old versions, and synchronized citations. Field characteristics are concentrated in date formats, name spellings, quantity definitions, and signature receipts, and the same record can easily fail to match across two materials.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text snippet and source identifier, and the length can be 0. The "version ledger and change records" are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Registration form | Check whether the name, ID number, examination subjects, employer's opinion, and signature are complete, and whether the date is within the registration period | Locate the original text snippet of the registration form in the citation output, compare field by field, and record the source identifier |
| Education certificate | Check whether the graduating institution, major, certificate number, and issue date are consistent with what is filled in the registration form | Open the citation marker to point back to the original text of the education certificate, check the fields, and record the source in `responseData` (non-streaming module results returned with detailed output enabled) |
| Work experience certificate | Check the start and end times, position, employer's seal, and handler's signature, and calculate whether the years meet the requirements | Compare dates and quantities one by one in the citation array, and separately record the array length and the `quoteMaxToken` budget |
| Citation content output | The number of returned entries matches the materials hit; being empty is also normal, and the chain continues | Run a test with a question that matches no materials, see that the array is empty while the chain completes, and check `quoteList` |

## Three common errors

- Symptom: The name, major, or date of the same record does not match between the registration form and the education certificate. Cause: The two materials use different filling standards, and the sources were not compared field by field in the citation output.
- Symptom: An old version of the work experience certificate is still cited, and the current version is not synchronized. Cause: The knowledge base did not maintain a version ledger by batch, and the citation does not point to the latest material.
- Symptom: The registration form lacks the employer's signature or the work experience certificate lacks a receipt. Cause: The material scan is incomplete, and the cited snippet does not cover the signature field and receipt page.

## How to verify the setup

Acceptance of this feature: ask a question with original-text support and check whether the citation array and markers can point back to the original text; then ask a question that matches no materials and confirm that the array is empty while the chain completes.

Business test: change one piece of content and see whether the version number and citations are updated synchronously.

- In the node, check whether the selected knowledge base collections and their vector models are consistent
- Open the search parameter panel and check the values item by item, and separately record the number of citation array entries and the `quoteMaxToken` budget

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
