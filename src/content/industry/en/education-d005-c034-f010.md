---
title: Citations and Source Traceability for Public Vocational Skills Level Assessment: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c034-f010
page_type: 行业问题页
application_area: education
meta_title: Skills Certification | Citations | Versions
meta_description: Skills Certification: review citations for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Public Vocational Skills Level Assessment: Maintain Document Versions and Changes

## What this category's data looks like

The materials for social evaluation of vocational skill level certification mainly consist of the evaluation implementation plan, the candidate registration form, and the assessor dispatch form. These three materials respectively play the roles of rule basis, candidate identity and qualifications, and assessor arrangement. The evaluation implementation plan contains the occupation direction, level, assessment method, time nodes, and signatures/seals; the candidate registration form contains name, ID number, declared level, years of work experience, and the candidate's own signature; the assessor dispatch form contains the assessor's name, certificate number, dispatch date, and the institution's receipt. The materials are mostly circulated among three parties: the evaluation institution, the employer, and the assessor, and versions are updated with policy adjustments, batch changes, and personnel replacements. When entering the knowledge base retrieval node, the three materials are cited and output as original text fragments from the associated knowledge base, for subsequent use in comparing fields, writing ledgers, and generating reports.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text fragment and a source identifier, and the length can be 0. The version ledger and change records are then completed by subsequent AI nodes, code nodes, or manual work. The cited content is output as an array; even if no content is found, the output chain will still run through.

| Object | Check | Verification action |
| --- | --- | --- |
| Evaluation implementation plan | Check whether the occupation direction, level, assessment method, date, and signatures/seals are consistent with the current version | In the node, check whether the vector models of the selected knowledge bases are the same, and open the citation marker to trace back to the original text paragraph |
| Candidate registration form | Check whether the name, ID number, declared level, years of work experience, and the candidate's own signature are complete | Run a test with a question that has no matching materials, and see whether the citation array is empty while the chain continues |
| Assessor dispatch form | Check whether the assessor's name, certificate number, dispatch date, and institution receipt match the implementation plan | Open the search parameter panel and check the values item by item, record the number of array items, and separately inspect the tokens of the cited text |
| Cited content output | The number of returned items matches the matched materials; being empty is also normal | Check whether the cited fragments in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` can trace back to the original text; `quoteMaxToken` is only used as a content budget |

## Three common errors

- Symptom: the same candidate's name is written differently in the registration form and the dispatch form. Cause: the two materials were entered by different handlers, and no field-level comparison was performed.
- Symptom: the evaluation implementation plan has already changed versions, but the registration form still cites the old version number. Cause: the version was not synchronized, and the old version was not marked as invalid.
- Symptom: the assessor dispatch form lacks the institution receipt or the candidate registration form lacks a signature. Cause: the receipt was not collected during the circulation step, and item-by-item verification was not performed before archiving.

## How to verify the setup

Acceptance of this function: ask a question with original text support, and check whether the citation array and markers can trace back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through.

Business test: change one piece of content and see whether the version number and citations are updated synchronously.

- In the node, check whether the selected knowledge base collections and their vector models are consistent.
- Open the search parameter panel and check the values item by item, and inspect the correspondence between the cited fragments in `quoteList` within `responseData` and the original text.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
