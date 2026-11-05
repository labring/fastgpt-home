---
title: Citations and Source Traceability for School Moral Education and Class Teacher Work: Track Progress and Check Statistics
slug: /en/industry/education-d006-c014-f010
page_type: 行业问题页
application_area: education
meta_title: Pastoral Education | Citations | Progress
meta_description: Pastoral Education: review citations for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for School Moral Education and Class Teacher Work: Track Progress and Check Statistics

## What this category's data looks like

This page addresses school moral education and homeroom teacher work; the materials include themed class meeting plans, student comprehensive quality records, and home visit records. A themed class meeting plan contains the activity theme, time, location, host, process, and signature; a student comprehensive quality record contains evaluation dimensions, grade, date, and homeroom teacher signature; a home visit record contains the student visited, time, location, purpose, process, and parent receipt. When these three types of materials enter the knowledge base retrieval node, each serves as a citable original source, used to refer back to fields, dates, and signatures in the progress table and statistical scope description. The update cadence is weekly or monthly aggregation, and the version is based on the latest archived item. The field characteristic is that the four items—name, quantity, date, and signature—must match between the two materials, and the scope is written in the table header.

## Configuration and implementation checks

This part is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text snippet and a source identifier, and the length can be 0. Even if no content is found, the output chain still runs through. The "progress table and statistical scope description" is completed subsequently by an AI node, code node, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Themed class meeting plan | Whether the theme, date, host, and signature in the plan are consistent with those recorded in the progress table | Refer back to the original paragraph at the citation marker, check the fields, date, and signature item by item, and record the length of the citation array |
| Student comprehensive quality record | Whether the record's name, quantity, date, and homeroom teacher signature match the statistical scope description | Open the cited source document, compare the name, quantity, and date of the same record in the two materials, and confirm there is no missing signature |
| Home visit record | Whether the student visited, time, location, receipt, and progress table entries are consistent | Verify that the cited snippet corresponds to the original text, and check whether the version is synchronized and the receipt is complete |
| Knowledge base retrieval node | The associated knowledge base uses the same vector model, and the cited content is output as an array whose length can be 0 | Check the selected collection and vector model, run a test with a question that has no matching material, and see that the array is empty while the chain continues; record the number of citations as the array length, `quoteMaxToken` is only the citation content budget, and `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` are used to view return details |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the two materials. Cause: The scope was not unified during aggregation, and the table header did not clearly state the statistical range and exceptions, making alignment impossible during verification.
- Symptom: Versions are not synchronized, and old plans coexist with new semester records. Cause: Archiving did not use the latest item as the standard, retrieval hit a historical version, and the cited snippet is inconsistent with the current progress table.
- Symptom: Signatures or receipts are missing, but the statistical count is still included in the total. Cause: The signature column and receipt were not included as verification items, exceptions were not listed separately in the scope description, and the total deviates from the record count.

## How to verify the setup

Acceptance for this feature: ask a question with original-text support, check whether the citation array and markers can refer back to the original text, and confirm that each citation can refer back to a source document paragraph; then ask a question with no matching material, and confirm that the array is empty while the chain runs through.

Business test: use one week of records to verify the total, check whether the scope and exceptions are clearly stated, and whether the record count matches the statistical count.

- Open the search parameter panel and check the values item by item, confirming they are consistent with the settings in the knowledge base retrieval section; record the number of citations separately, and do not compare the array length with `quoteMaxToken` for equality.
- Open the citation markers in the conversation, check the fields, dates, and signatures against the source documents; for a question with no match, confirm the output is empty and the chain continues.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
