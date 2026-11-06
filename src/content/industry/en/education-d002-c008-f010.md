---
title: Citations and Source Traceability for School Admissions and Enrollment Organization: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c008-f010
page_type: 行业问题页
application_area: education
meta_title: School Admissions | Citations | Checks
meta_description: School Admissions: review citations for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for School Admissions and Enrollment Organization: Compare Documents and Locate Differences

## What this category's data looks like

The data for this category, material verification and discrepancy localization for primary and secondary school enrollment organizations, revolves around three types of materials: enrollment plans, application material checklists, and admission lists. The enrollment plan provides the enrollment targets, planned numbers, time nodes, and signature fields; the application material checklist lists required items such as household registration, property, and student status, along with receipt requirements; the admission list carries student names, ID numbers, admission batches, and dates. The three types of materials update at different rhythms: the plan is finalized before the enrollment season, the checklist is slightly adjusted with policy changes, and the list is generated in batches during the admission stage. After the materials enter the knowledge base retrieval node, each serves as a traceable original-text source, providing the basis for comparing the names, quantities, and dates of the same object across two materials, and supporting verification of whether signatures and receipts are complete.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing an original-text snippet and a source identifier, and the length may be 0. The "discrepancy list" is completed afterward by a subsequent AI node, code node, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Enrollment plan | Whether the enrollment targets, planned numbers, time nodes, and signature fields are consistent with the application material checklist and admission list | Open the citation marker in the retrieval results to trace back to the original plan text, verify the fields and dates, record inconsistent items, and hand them to the reviewer |
| Application material checklist | Whether the names, quantities, and dates of the same record match the admission list, and whether receipts and signatures are complete | Compare field by field against the original checklist text and the original list text, and use `quoteList` to record discrepant fields and source identifiers |
| Admission list | Whether student names, ID numbers, admission batches, and dates are consistent with the plan and checklist | Use the original list text as the baseline to trace back to the plan and checklist, and flag records whose versions are not synchronized or whose fields do not match |
| Knowledge base retrieval node | Whether the cited content array is consistent with the matched materials; being empty is also normal | Run a test with a question that matches no materials, check that the array length is 0 while the chain continues, and verify `responseData` (non-streaming module results returned with detailed output enabled) and `quoteMaxToken` |

## Three common errors

- Symptom: the name or ID number of the same student does not match between the list and the checklist. Cause: the two materials were entered at different times, and no field-level comparison was performed.
- Symptom: the policy versions cited by the plan and the checklist are inconsistent. Cause: the versions were not synchronized, and old-version materials remain in the knowledge base and are hit by retrieval.
- Symptom: the application material checklist lacks signatures or receipts. Cause: the signature fields were not checked during the material archiving step, and there are no corresponding original-text snippets in the retrieval results.

## How to verify the setup

Acceptance for this feature: ask a question that has original-text support, and check whether the citation array and citation markers can trace back to the original text; then ask a question that matches no materials, and confirm that the array is empty while the chain still runs through.

Business test: use one real record to find fields inconsistent with the ledger, record the name, quantity, or date discrepancies, and hand them to the reviewer for confirmation.

- In the node, check the selected knowledge bases and their vector models, and confirm that the selected knowledge bases use the same vector model.
- Open the search parameter panel and verify the values item by item, and record the number of citations and the `quoteMaxToken` budget; do not compare the two for equality.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
