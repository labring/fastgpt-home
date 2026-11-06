---
title: Citations and Source Traceability for Student Discipline and Appeals: Track Progress and Check Statistics
slug: /en/industry/education-d006-c023-f010
page_type: 行业问题页
application_area: education
meta_title: Student Appeals | Citations | Progress
meta_description: Student Appeals: review citations for progress tracking. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Student Discipline and Appeals: Track Progress and Check Statistics

## What this category's data looks like

This page focuses on progress records and statistical verification in student disciplinary actions and appeal handling. The materials include three types: disciplinary fact materials, disciplinary decision documents, and appeal statements. Disciplinary fact materials record the behavior name, quantity, date, and handler signature; disciplinary decision documents state the disciplinary type, effective date, and delivery receipt; appeal statements contain the appeal request, reasons, submission date, and receiving signature. After these three types of materials enter the knowledge base retrieval node, each serves as a retrievable source for citation output to point back to the original passage. The update cadence is weekly archiving, and the version is based on the latest signed document. Field characteristics: the name, quantity, and date of the same record must be consistent across materials; missing signatures or receipts are treated as pending supplementation.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and source identifier, and the length may be 0. The progress table and statistical scope description are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Disciplinary fact materials | The name, quantity, date, and signature must correspond to the disciplinary decision document, and the same record must not be inconsistent in two places | Take records within one week and compare the name, quantity, date, and signature fields of the two materials one by one |
| Disciplinary decision document | The disciplinary type, effective date, and delivery receipt must connect with the acceptance date of the appeal statement; if the receipt is missing, mark it as pending supplementation | Check the order of the receipt date on the decision document and the submission date of the appeal statement, and inspect whether the signatures are complete |
| Appeal statement | The appeal request, reasons, and submission date must be synchronized with the version of the decision document; if the version is not synchronized, mark it as pending verification | Compare against the latest version number of the decision document, and check whether the cited date and reasons in the appeal statement are consistent |
| Citation content output | The number of returned items is consistent with the matched materials; being empty is also normal, and the pipeline continues | Run a test with a question that has no matching materials, and see whether the output is empty while the pipeline still runs; open the citation markers to compare against the source documents |

## Three common errors

- Phenomenon: the name and quantity of the same record do not match between the disciplinary fact materials and the disciplinary decision document. Cause: the two materials were entered separately, and no cross-material field comparison was performed.
- Phenomenon: the version of the disciplinary decision document is not synchronized, and the appeal statement cites an old date. Cause: the old version was not replaced after the update, and the receipt was not archived with the new version.
- Phenomenon: the appeal statement lacks a receiving signature or the decision document lacks a delivery receipt. Cause: signatures were not fully collected during the circulation step, and the signature fields were not checked during archiving.

## How to verify the setup

Acceptance of this feature: ask a question with original-text support, and check whether the citation array and citation markers can point back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the pipeline still runs.

Business test: use one week of records to verify the totals, and see whether the scope and exceptions are clearly stated; the number of citations is the array length, `quoteMaxToken` is the citation content budget, and the two are not compared for equality. When citation limits are involved, check the tokens of the cited text, and record the array item count separately.

- Open the search parameter panel and check the values item by item, and confirm that the selected knowledge base uses the same vector model; view the citation array and source identifiers in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList`.
- Use one week of records to compare the name, quantity, date, and signature of the three types of materials one by one, write the scope and exceptions into the header, and then verify the totals.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
