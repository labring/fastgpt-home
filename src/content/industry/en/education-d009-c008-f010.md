---
title: Citations and Source Traceability for School Admissions and Enrollment Organization: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c008-f010
page_type: 行业问题页
application_area: education
meta_title: School Admissions | Citations | Multilingual
meta_description: School Admissions: review citations for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for School Admissions and Enrollment Organization: Handle Multilingual Materials and Terminology

## What this category's data looks like

This page is intended for primary and secondary school admissions organizations and covers multilingual materials and terminology processing around three types of materials: admission plans, application material checklists, and admission lists. Admission plans contain application conditions, time nodes, and signature fields; application material checklists contain material names, number of copies, submission dates, and receipts; admission lists contain names, admission batches, publicity dates, and review signatures. These materials often exist in parallel in different language versions, and the names, quantities, and dates of the same record may not match across two materials, versions may not be synchronized, and signatures or receipts may be missing. When materials enter this feature, each serves as an independent source in the knowledge base, and the retrieval node outputs only an array of quoted content, each item containing an original text snippet and a source identifier, and the length may be 0; the unified terminology glossary and comparison draft are completed afterward by subsequent AI nodes, code nodes, or manual work. The update cadence rolls with the admissions season, and before each release the fields and signatures need to be checked to ensure terminology is consistent throughout and translated names can point back to the original text.

## Configuration and implementation checks

This step is executed by the quoted output of the knowledge base retrieval node, which outputs an array of quoted content, each item containing an original text snippet and a source identifier, and the length may be 0. The unified terminology glossary and comparison draft are completed afterward by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Admission plan | Whether the application conditions, time nodes, and signature fields are consistent with the application material checklist and admission list | In the node, check the selected knowledge base collections and their vector models, open the citation markers to compare against the source documents, and compare conditions, dates, and signatures item by item; record the number of citations in `responseData` (non-streaming module results returned with detailed output enabled) |
| Application material checklist | Whether the material names, number of copies, submission dates, and receipts match the admission plan and admission list | Run a test with a question that has no matching materials and see whether the output is empty while the chain continues; then sample three terms to check whether their spelling is consistent throughout; check the matched materials in `quoteList` |
| Admission list | Whether the names, admission batches, publicity dates, and review signatures are consistent with the admission plan and application material checklist | Open the search parameter panel and check item by item, confirming that the values are consistent with those set in the knowledge base retrieval section; record the number of citations and the `quoteMaxToken` budget |
| Quoted content output | The number of returned items is consistent with the matched materials, and being empty is also normal | Open the citation markers in the conversation, compare against the source documents, and confirm that each citation can point back to the original paragraph |

## Three common errors

- Symptom: the names, quantities, and dates of the same record do not match between the admission plan and the application material checklist. Cause: multilingual versions are maintained separately, fields are not compared in a unified way, and versions are not synchronized.
- Symptom: the admission list lacks signatures or receipts, and the review step cannot be traced after publication. Cause: when materials enter the knowledge base, the signature fields and receipt fields are not checked, and retrieval citations only present original text snippets.
- Symptom: there are no citation markers in the answer, or the cited snippets do not match the original text. Cause: first check whether this round had a match and which material was matched, then look at trimming; an empty citation array does not mean retrieval failed.

## How to verify the setup

Feature acceptance: ask a question that has supporting original text, check whether the citation array and markers can point back to the original text, and check the number of citations in `quoteList` within `responseData`; then ask a question with no matching materials and confirm that the array is empty while the chain still runs through.

Business test: sample three terms to check whether their spelling is consistent throughout, and confirm that the same term is consistent throughout and that translated names can point back to the original text.

- In the node, check the selected knowledge base collections and their vector models, and confirm that the selected knowledge bases use the same vector model.
- Open the search parameter panel and check item by item, confirming that the values are consistent with those set in the knowledge base retrieval section; the number of citations is the array length, `quoteMaxToken` is the quoted content budget, the two are not compared for equality, and when citation limits are involved, check the tokens of the quoted text while recording the array item count separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
