---
title: Citations and Source Traceability for College Admissions and Application Placement: Find Supporting Evidence
slug: /en/industry/education-d001-c052-f010
page_type: 行业问题页
application_area: education
meta_title: College Admissions | Citations | Evidence
meta_description: College Admissions: review citations for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for College Admissions and Application Placement: Find Supporting Evidence

## What this category's data looks like

In the business of general higher education admission and enrollment filing, enrollment plans, filing rules, and admission rosters are the three core types of materials. Enrollment plans include institution-major groups, planned numbers, selected examination subjects, and batches, along with dates and signed confirmation versions; filing rules include filing ratios, tie-breaking ranking, and volunteer retrieval order, and must correspond to the document version of the current year; admission rosters include candidate numbers, names, scores, admitted majors, and receipt signatures. The three types of materials update at different rhythms: plans adjust with batches, rules are released annually, and rosters are returned by round. When entering the knowledge base retrieval node, enrollment plans, filing rules, and admission rosters are each associated as independent sources, participate in vector search under the same vector model, and output an array of cited content for subsequent field comparison, ledger writing, and report generation.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and source identifier, and the length may be 0. "Basis items that can be traced back to the original text" are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Enrollment plan | Fields include institution-major groups, planned numbers, selected examination subjects, and batches; dates and signed confirmation are the current version; names and quantities must match the filing rules and admission roster | In the node, check the selected collection and vector model; open the citation marker to compare against the source document, and compare names, quantities, dates, and signatures field by field |
| Filing rules | Fields include filing ratios, tie-breaking ranking, and volunteer retrieval order; the version must be the current year's document; clause numbers and signatures or issuance receipts are complete | Open the search parameter panel and check the values item by item; run a trial cross-material question, verify that the number of items in the citation array matches the hit rule materials, and that the cited fragments trace back to the original paragraphs |
| Admission roster | Fields include candidate numbers, names, scores, admitted majors, and receipt signatures; the names, quantities, and dates of the same record in the two materials must be consistent | In the conversation, open the citation marker and compare the source document against `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList`; run a trial question with no matching material and see that the output is empty while the chain continues |
| Cited content output | The number of returned items matches the hit materials, and being empty is also normal; the number of items is the array length, `quoteMaxToken` is the citation content budget, and the two are not compared for equality | Record the number of array items and separately check the tokens of the cited text; if the citation limit is involved, check the tokens of the cited text rather than comparing the number of items |

## Three common errors

- Phenomenon: the names and quantities of the same candidate record in the enrollment plan and admission roster do not match. Cause: the two materials were entered at different times, no field-by-field comparison was performed, and the discrepancy was carried into the cited fragments.
- Phenomenon: the cited filing rule clauses are from an old annual version. Cause: multiple versions coexist in the knowledge base, the current version was not checked during association, and the version was not synchronized, causing the citation to trace back to the old document.
- Phenomenon: the admission roster lacks a signature or receipt, but the cited fragment is still used. Cause: the signature and receipt fields were not checked when the material was ingested, the citation output does not validate completeness, and the missing item is only discovered during later comparison.

## How to verify the setup

Acceptance of this feature: ask a question with an original-text basis, and check whether the citation array and citation markers can trace back to the original text; then ask a question with no matching material, and confirm that the array is empty while the chain runs through. At the same time, check whether `quoteList` within `responseData` are returned with the citation output; `quoteMaxToken` is only the citation content budget, and the number of array items is recorded separately.

Business test: ask a cross-material basis question and see whether the answer gives a traceable source.

- In the node, check the selected knowledge base collections and their vector models, and confirm that the selected knowledge bases use the same vector model.
- Open the search parameter panel and check the values item by item, ensuring they are consistent with the values set in the knowledge base retrieval section.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
