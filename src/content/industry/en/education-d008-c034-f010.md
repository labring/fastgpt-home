---
title: Citations and Source Traceability for Public Vocational Skills Level Assessment: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c034-f010
page_type: 行业问题页
application_area: education
meta_title: Skills Certification | Citations | Access
meta_description: Skills Certification: review citations for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Public Vocational Skills Level Assessment: Manage Authorized Access and External Services

## What this category's data looks like

Materials for external services of social evaluation of vocational skill level certification consist mainly of evaluation implementation plans, candidate registration forms, and assessor dispatch forms. The evaluation implementation plan contains the certification occupation, level, assessment method, time and location, and signatures/seals; the candidate registration form contains identity information, application conditions, a materials checklist, and signed confirmation; the assessor dispatch form contains the assessor's name, qualification certificate number, dispatch date, and institutional receipt. When these three types of materials enter this feature, their roles differ: the evaluation implementation plan and the assessor dispatch form serve as the source basis for authorized access and external services, while the candidate registration form serves as the comparison draft for the visible scope of restricted identities. The material update cadence rolls with batches, and it is common for the same candidate's name to be written inconsistently in the registration form and the dispatch form receipt, for certification dates to be misaligned between the plan and the dispatch form, and for versions not to be synchronized or signed receipts to be missing. Field characteristics use dates, quantities, signatures, and receipts as verification anchors, and citation sources and traceability require that each citation can point back to the original paragraph, for subsequent nodes to compare fields, write ledgers, and generate reports.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text snippet and a source identifier, and the length may be 0. The externally available entry points and authorization scope are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Associated knowledge base | The selected knowledge base is one with the same vector model, corresponding to the source documents of the evaluation implementation plan, candidate registration form, and assessor dispatch form | In the node, check the selected collections and their vector models, and view the citation array returned in `responseData` (non-streaming module results returned with detailed output enabled) |
| Cited content output | The number of returned items matches the hit materials; being empty is also normal, and an empty array should not be treated as a retrieval failure | Run a test with a question that has no matching materials, see that the output is empty while the chain continues, and record the array length |
| Citations correspond to the original text | Each citation can point back to the original paragraph and matches the fields, dates, and signatures of the evaluation implementation plan, candidate registration form, and assessor dispatch form | In the conversation, open the citation markers, compare against the source documents, and view the cited snippets in `quoteList` |
| Search parameters | They are consistent with the values set in the knowledge base retrieval section; `quoteMaxToken` is the cited content budget, and the number of array items is recorded separately | Open the search parameters panel and check item by item, confirming the relationship between the tokens of the cited text and the budget |

## Three common errors

- Symptom: the same candidate's name is written inconsistently in the candidate registration form and the assessor dispatch form receipt. Cause: the two materials are entered separately, without field comparison and version synchronization.
- Symptom: the certification date is misaligned between the evaluation implementation plan and the assessor dispatch form, and the quantities do not match. Cause: after a batch adjustment, only one material was changed, and the other was not updated in sync.
- Symptom: there are no citation markers in the answer, or the cited snippets do not match the original text. Cause: first check whether this round hit anything and which material was hit, then look at trimming, and do not directly attribute it to length trimming.

## How to verify the setup

Feature acceptance: ask a question with an original-text basis, check whether the citation array and markers can point back to the original text, and view the array length in `responseData`; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through.

Business test: access once with a restricted identity and see whether the visible scope matches the setting.

- Check whether the number of items in the citation array matches the hit materials, record the array length, and separately check the tokens of the cited text against the `quoteMaxToken` budget; do not compare the two for equality.
- Open the citation markers to compare against the source documents, compare item by item the fields, dates, and signatures of the evaluation implementation plan, candidate registration form, and assessor dispatch form, and when inconsistencies are found, record the material name and the location of the difference.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
