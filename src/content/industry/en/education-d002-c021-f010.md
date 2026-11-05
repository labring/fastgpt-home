---
title: Citations and Source Traceability for Enrollment Changes and Graduation Eligibility: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c021-f010
page_type: 行业问题页
application_area: education
meta_title: Graduation Eligibility | Citations | Checks
meta_description: Graduation Eligibility: review citations for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Enrollment Changes and Graduation Eligibility: Compare Documents and Locate Differences

## What this category's data looks like

This page focuses on student status changes and graduation eligibility review, covering three types of materials: suspension/resumption applications, major transfer applications, and graduation review checklists. Suspension/resumption applications record the start and end dates of a student's suspension or resumption of status along with approval signatures; major transfer applications record the names of the transferring-in and transferring-out majors, the effective semester, and signatures at two levels; graduation review checklists record course names, credit amounts, graduation conclusions, and review receipts. Materials are updated by semester batches, with historical versions coexisting, and fields are mainly names, quantities, dates, and signatures. After materials enter the knowledge base retrieval node, they are retrieved and traced as citation sources: each citation carries the original text snippet and source identifier, for subsequent nodes to compare fields and locate discrepancies.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation contents, each containing the original text snippet and source identifier, and the length can be 0. The "discrepancy list" is completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Suspension/resumption application | Names, dates, and signatures are consistent in the two materials | Compare field by field against the original text snippet and source identifier, and record inconsistencies |
| Major transfer application | The names of the transferring-in and transferring-out majors, the effective semester, and signatures are consistent in the two materials | Check the number of entries in the citation array and the matched materials, and view citation details in `responseData` (non-streaming module results returned with detailed output enabled) |
| Graduation review checklist | Course names, credit amounts, graduation conclusions, and receipts are consistent in the two materials | Open the citation marker to point back to the original paragraph, and compare the contents of the `quoteList` field |
| Knowledge base retrieval node | The number of entries in the citation array is consistent with the matched materials; being empty is also normal | Run a trial with a question that has no matching materials, confirm that the array is empty while the pipeline runs through, and record the `quoteMaxToken` budget |

## Three common errors

- Symptom: The names, quantities, and dates of the same record do not match in the two materials. Cause: Material versions are not synchronized or field mapping is misaligned during entry; first verify the matched materials before comparing.
- Symptom: The graduation review checklist lacks signatures or receipts. Cause: The approval process has not been completed or scanned copies are missing, and there is no corresponding signature field in the citation snippet.
- Symptom: There is no citation marker in the answer. Cause: No materials were matched in this round or the citation snippet does not match the original text; first check the matching status, then check trimming.

## How to verify the setup

Acceptance of this feature: Ask a question with original text evidence, and check whether the citation array and markers can point back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the pipeline runs through.

Business test: Use a real record to find fields inconsistent with the ledger, and record the field names, values in the two materials, and source identifiers.

- Open the search parameter panel and check item by item, confirm that the selected knowledge base uses the same vector model, and record the number of citations and the `quoteMaxToken` budget.
- Check against the source document whether the citation snippet can point back to the original paragraph, write inconsistent fields into the discrepancy list for the reviewer to confirm and write back.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
