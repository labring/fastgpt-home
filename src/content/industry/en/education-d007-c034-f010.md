---
title: Citations and Source Traceability for Public Vocational Skills Level Assessment: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c034-f010
page_type: 行业问题页
application_area: education
meta_title: Skills Certification | Citations | Review
meta_description: Skills Certification: review citations for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Public Vocational Skills Level Assessment: Trace Exceptions and Review Results

## What this category's data looks like

The category materials for social evaluation of vocational skill level certification include three types: the evaluation implementation plan, the candidate registration form, and the assessor dispatch form, all of which are original records of the certification process. The evaluation implementation plan states the occupational direction, level, assessment modules, and date arrangements; the candidate registration form records the candidate's identity, declared occupation, and contact information; the assessor dispatch form registers the assessor's name, certificate number, and dispatch date. The three types of materials are updated on a rolling basis with the certification batch, and their fields include text, dates, and signature columns; signatures and receipts are validity requirements. When entering this function, the three types of materials are retrieved as knowledge base documents, each serving a source identification role: the implementation plan provides the assessment basis, the registration form provides the candidate's identity, and the dispatch form provides the assessor's qualifications. The citation output is returned as an array, each entry containing the original text snippet and source identifier, for subsequent nodes to compare fields, write ledgers, and generate reports.

## Configuration and implementation checks

The citation output of the knowledge base retrieval node outputs only an array of cited content, each entry containing the original text snippet and source identifier, and its length can be 0; the exception list and review conclusions must be handled subsequently by AI nodes, code nodes, or humans. The cited content is output as an array, and its length can be 0; even if no content is found, the output chain will still run through.

| Object | Check | Verification action |
| --- | --- | --- |
| Evaluation implementation plan | Check its occupational direction, level, assessment modules, and date fields, as well as whether signatures or receipts are complete | Retrieve the original passage, compare the dates and signature columns in the plan field by field, and confirm that the version matches the batch |
| Candidate registration form | Check the candidate's name, declared occupation, date, and signature column, and confirm that it corresponds to the batch of the implementation plan | Open the citation marker to refer back to the original registration form, and compare whether the name, quantity, and date are consistent with the plan |
| Assessor dispatch form | Check the assessor's name, certificate number, dispatch date, and signature column, and confirm that it matches the modules of the plan | Open the citation marker in the conversation, compare it against the source document of the dispatch form, and record the source identifier in the `quoteList` field |
| Cited content output | Check that the number of returned entries matches the materials hit; being empty is also normal | Run a test with a question that matches no materials, observe that the output is empty while the chain continues, and record the array length and the `quoteMaxToken` budget |

## Three common errors

- Symptom: the same candidate's name is written inconsistently in the registration form and the implementation plan. Cause: the unified field specification was not followed during entry, and the versions of the two materials were not synchronized.
- Symptom: the assessor dispatch date is later than the assessment date in the plan. Cause: after the dispatch form was updated, it was not written back to the plan, the dates do not match, and the receipt is missing.
- Symptom: the cited snippet does not match the original text. Cause: first check whether this round hit anything and which material was hit, then check `quoteMaxToken` trimming, and do not directly attribute it to length.

## How to verify the setup

Acceptance of this function: ask a question with original-text support, and check whether the citation array and markers can refer back to the original text; then ask a question with no matching materials, confirm that the array is empty while the chain runs through, and record the number of array entries in `responseData` (non-streaming module results returned with detailed output enabled) and the `quoteMaxToken` budget.

Business test: create an exception record, see whether it can be traced back to the source material, confirm that the exception is supported by original records and has the reviewer's signature, and then hand it over to the person in charge for handling.

- In the node, check the selected knowledge base collections and their vector models, and confirm that the selected knowledge bases use the same vector model.
- Open the search parameter panel and check each item, confirming that the values are consistent with those set in the knowledge base retrieval section.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
