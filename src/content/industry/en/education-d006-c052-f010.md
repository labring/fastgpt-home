---
title: Citations and Source Traceability for College Admissions and Application Placement: Track Progress and Check Statistics
slug: /en/industry/education-d006-c052-f010
page_type: 行业问题页
application_area: education
meta_title: College Admissions | Citations | Progress
meta_description: College Admissions: review citations for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for College Admissions and Application Placement: Track Progress and Check Statistics

## What this category's data looks like

The materials for progress records and statistical verification of general higher education institution admissions enrollment and filing come from three categories: enrollment plans, filing rules, and admission rosters. Enrollment plans provide institution-major groups and planned numbers; filing rules provide the filing ratio, tie-breaking ranking, and batch timing; admission rosters provide the candidate number, name, score, admitted major, and signature field. These materials are updated by batch and round, and the same record often appears in three places: the plan adjustment table, the filing slip, and the admission roster. When entering the knowledge base retrieval node, enrollment plans and filing rules serve as the rule basis, while admission rosters and progress tables serve as the record basis; each is cited as an original text fragment for subsequent field comparison, ledger writing, and report generation. Field characteristics center on dates, names, quantities, signatures, and receipts, while version numbers and batch numbers determine which version prevails.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text fragment and a source identifier, and the length may be 0. The "progress table and statistical scope description" is then completed by a subsequent AI node, code node, or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Enrollment plan | Check the planned number against the major group name, batch date, and plan adjustment signature field, and determine whether the name, quantity, and date of the same record are consistent between the plan table and the filing slip | Open the citation marker to trace back to the original text and compare field by field; record the number of array items, and separately record the `quoteMaxToken` budget |
| Filing rules | Check the filing ratio, tie-breaking ranking, batch timing, and applicable version, and determine whether the rule version is synchronized with the current round's progress table | Check the values in the search parameter panel and confirm that the current round's version is matched; when there is no match, check the `responseData` (non-streaming module results returned with detailed output enabled) field to confirm the pipeline is working |
| Admission roster | Check the candidate number, name, score, admitted major, signature, and receipt, and determine whether the roster and the filing slip match in name, quantity, and date | Open the citation marker to compare against the source document, and check the source identifier and original text paragraph in the `quoteList` field |

## Three common errors

- Symptom: the name or major name of the same candidate does not match between the filing slip and the admission roster. Cause: the two materials are filled in by different stages, and field alignment and version synchronization were not performed.
- Symptom: the progress table total is inconsistent with the number of roster records. Cause: the statistical scope was not updated after a plan adjustment, or exceptions were not stated in the header.
- Symptom: the roster lacks a signature or receipt. Cause: the circulation stage was not closed-loop, paper copies were not returned, and electronic copies did not include a signature page.

## How to verify the setup

Acceptance of this feature: ask a question with an original-text basis and check whether the citation array and markers can trace back to the original text; then ask a question with no matching material and confirm that the array is empty while the pipeline still works.

Business test: use one week of records to verify the total and see whether the scope and exceptions are clearly stated.

- In the node, check whether the selected knowledge base uses the same vector model, and open the search parameter panel to verify the values item by item.
- Run a trial with a query that has no matching material, observe that the output is empty while the pipeline continues, and record the number of array items and the `quoteMaxToken` budget.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
