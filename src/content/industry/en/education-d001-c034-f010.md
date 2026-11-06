---
title: Citations and Source Traceability for Public Vocational Skills Level Assessment: Find Supporting Evidence
slug: /en/industry/education-d001-c034-f010
page_type: 行业问题页
application_area: education
meta_title: Skills Certification | Citations | Evidence
meta_description: Skills Certification: review citations for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Public Vocational Skills Level Assessment: Find Supporting Evidence

## What this category's data looks like

This page focuses on the business basis query for social evaluation of vocational skill level certification. The materials include the evaluation implementation plan, candidate registration form, and assessor dispatch form. The evaluation implementation plan carries the certification occupation, level, evaluation method, and basis clauses, and serves as the benchmark for cross-material comparison; the candidate registration form records the candidate's identity, application conditions, and signed receipt, and its name, ID number, and declared level must correspond to the application conditions in the implementation plan; the assessor dispatch form records the assessor's name, qualification certificate number, dispatch date, and signature, and its number of assessors and professional direction must be consistent with the evaluation arrangements in the implementation plan. When the three types of materials enter the knowledge base retrieval node, each is cited as an independent source. The cited content array returns the original text fragments and source identifiers for subsequent field comparison, date and signature verification, ledger writing, or report generation. The update rhythm rolls with certification batches. The version is based on the currently effective text, and historical versions must be marked as abolished to avoid mixing different versions of materials with the same name.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs a cited content array, each entry containing an original text fragment and a source identifier, and the length can be 0. "Basis items that can be traced back to the original text" are completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Evaluation implementation plan | The occupation name, level, application conditions, evaluation method, current version number, issuance date, and stamped signature in the plan must be matched item by item against the original text | Open the citation corner mark, check against the original plan text whether the occupation name, level, application condition fields, issuance date, and stamped signature are complete, and confirm the version is currently effective |
| Candidate registration form | The name, ID number, declared level, years of work experience, and signed receipt in the registration form must be consistent with the application conditions and batch date in the implementation plan | Check whether the name, declared level, and date of the same candidate in the registration form and implementation plan are consistent, and check whether the signature and receipt fields are fully filled in |
| Assessor dispatch form | The assessor name, qualification certificate number, dispatch date, and signature in the dispatch form must be consistent with the evaluation arrangements and number of assessors in the implementation plan | Compare the number of assessors, professional direction, and dispatch date in the dispatch form and implementation plan, check the qualification certificate number and signature fields, and confirm there are no missing items |
| Knowledge base retrieval node citation output | The number of entries in the cited content array matches the hit materials, each citation can be traced back to the original paragraph, and being empty is also a normal output | Check the number of entries and source identifiers in the citation array in `responseData` (non-streaming module results returned with detailed output enabled), verify the original text fragments and source documents in `quoteList`, confirm that `quoteMaxToken` is the citation content budget, and record the number of array entries separately |

## Three common errors

- Phenomenon: The same candidate's name is written differently in the registration form and implementation plan, and the declared level also does not match. Cause: The two materials were filled in at different stages, and no cross-material field comparison and unification were performed.
- Phenomenon: The number of assessors and dispatch date in the assessor dispatch form and implementation plan are inconsistent. Cause: The versions were not synchronized; the dispatch form was generated according to an old batch and was not updated with the plan.
- Phenomenon: The registration form or dispatch form lacks signatures or receipts, and the cited fragments cannot be traced back to the complete original text. Cause: Signatures were not fully collected during material circulation, and missing pages in scanned copies led to missing cited paragraphs.

## How to verify the setup

This function's acceptance: ask a question with an original text basis, and check whether the citation array and corner marks can be traced back to the original text; then ask a question with no matching materials, and confirm the array is empty while the pipeline still runs through.

Business test: ask a cross-material basis question and see whether the answer gives traceable sources.

- Open the search parameter panel and check item by item, confirm that the associated knowledge base uses the same vector model, view the number of entries in the citation array and the original text fragments in `quoteList` in `responseData`, verify that `quoteMaxToken` is the citation content budget, record the number of array entries separately, and do not perform equality comparison
- Run a test with a query that has no matching materials, see that the output is empty while the pipeline continues, and then check against the source documents whether each citation can be traced back to the original paragraph

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
