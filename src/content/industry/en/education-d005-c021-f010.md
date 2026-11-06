---
title: Citations and Source Traceability for Enrollment Changes and Graduation Eligibility: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c021-f010
page_type: 行业问题页
application_area: education
meta_title: Graduation Eligibility | Citations | Versions
meta_description: Graduation Eligibility: review citations for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Enrollment Changes and Graduation Eligibility: Maintain Document Versions and Changes

## What this category's data looks like

Student status changes and graduation eligibility review involve three types of materials: leave/resumption of studies applications, major transfer applications, and graduation review checklists. Leave/resumption of studies applications record the time, reason, and approval signature for a student's leave or resumption; major transfer applications include the original major, target major, assessment conclusion, and date; graduation review checklists list course names, credits, grades, graduation conclusions, and seals. When these materials enter the knowledge base retrieval node, each is associated as an independent source, and after a retrieval hit, the original text fragments and source identifiers are returned as a cited content array. Material versions are updated as the approval process advances; old versions must be retained for traceability, and citations are synchronized with the current version. Field characteristics center on names, quantities, dates, signatures, and receipts, and the same record must remain consistent across different materials.

## Configuration and implementation checks

This part is executed by the citation output of the knowledge base retrieval node, which outputs a cited content array, each entry containing an original text fragment and a source identifier, and the length may be 0. The version ledger and change records are completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Leave/resumption of studies application | Whether the fields, dates, and signatures are consistent with the same record in the major transfer application and graduation review checklist | Check the leave or resumption start and end dates, approval signature, and receipt, and compare the original passage pointed to by the cited fragment |
| Major transfer application | Whether the original major, target major, assessment conclusion, and date are consistent with the student status change record | Check the names, quantities, dates, and signatures, and verify whether the cited source identifier can point back to the corresponding document |
| Graduation review checklist | Whether the course names, credits, grades, and graduation conclusion are synchronized with the leave/resumption of studies and major transfer materials | Check the checklist fields and signatures, and confirm that the number of entries in the cited array matches the hit materials |
| Cited content output | The number of returned entries matches the hit materials; being empty is also normal | Run a test with a question that has no matching materials, and see whether the output is empty while the pipeline continues; record the array length, and do not compare the number of entries with `quoteMaxToken` for equality |

## Three common errors

- Symptom: The names, quantities, and dates of the same record do not match between the leave/resumption of studies application and the graduation review checklist. Cause: The two materials were entered separately, without field-level comparison and receipt verification.
- Symptom: The major transfer application has been updated, but the citation still points to the old version fragment. Cause: The version was not synchronized, the old version was not marked invalid, and the citation was not refreshed with the current version.
- Symptom: The leave/resumption of studies application lacks an approval signature or receipt, and the cited fragment cannot point back to the complete original text. Cause: The material archive is incomplete, and the retrieval hit fragment lacks the signature page or receipt page.

## How to verify the setup

Acceptance for this feature: ask a question with original text support, check whether the cited content array and citation markers can point back to the original passage, and record the array length; then ask a question with no matching materials, and confirm that the array is empty while the output pipeline runs through. Check whether the citation array in `responseData` (non-streaming module results returned with detailed output enabled) corresponds to the source identifiers in `quoteList`; the citation limit only checks the tokens of the cited text, and the number of array entries is recorded separately, not compared with `quoteMaxToken` for equality.

Business test: change one piece of content, see whether the version number and citation are updated synchronously, and check whether the fields, dates, and signatures of the leave/resumption of studies application, major transfer application, and graduation review checklist are consistent.

- In the node, check the selected knowledge base collections and their vector models, open the search parameter panel, and verify the values item by item
- In the conversation, open the citation markers, compare them with the source documents, and confirm that each citation can point back to the original passage

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
