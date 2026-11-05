---
title: Citations and Source Traceability for Public Vocational Skills Level Assessment: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c034-f010
page_type: 行业问题页
application_area: education
meta_title: Skills Certification | Citations | Multilingual
meta_description: Skills Certification: review citations for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Public Vocational Skills Level Assessment: Handle Multilingual Materials and Terminology

## What this category's data looks like

The externally published materials for social evaluation of vocational skill level certification usually consist of three types: the evaluation implementation plan, the candidate registration form, and the assessor dispatch form, and they often exist in parallel in multiple language versions. The evaluation implementation plan carries the certification occupation, level, assessment method, and schedule; the candidate registration form carries personal information, the declared occupation and level, and the materials checklist; the assessor dispatch form carries the assessor's name, affiliated unit, dispatch session, and signature field. When these materials enter the knowledge base retrieval node, each is associated as an independent source; the node is only responsible for returning the matched original text fragments and source identifiers as an array, and is not responsible for comparing fields. The key to multilingual materials and terminology handling is that the same term must be written consistently in the implementation plan, registration form, and dispatch form, and the translated name can point back to the original paragraph. The material update rhythm usually rolls with batches, and old and new versions may exist simultaneously in the knowledge base, so source identifiers and original text fragments must be able to distinguish versions. In terms of field characteristics, dates, quantities, names, and signature fields are the positions most prone to inconsistency between two materials; after entering the retrieval step, these fields are cited in the form of original text fragments for subsequent comparison.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing an original text fragment and a source identifier, and the length can be 0. Even if no content is found, the output chain still runs through. The "unified terminology glossary and comparison draft" is completed next by subsequent AI nodes, code nodes, or manual work; the retrieval node itself does not produce a difference list or ledger.

| Object | Check | Verification action |
| --- | --- | --- |
| Evaluation implementation plan | Check whether the certification occupation, level, assessment method, date, and signature field match those in the registration form and dispatch form | In the knowledge base retrieval node, view the matched original text fragments and source identifiers, point back to the implementation plan paragraphs one by one, and record the number of entries in the citation array in `responseData` (non-streaming module results returned with detailed output enabled) |
| Candidate registration form | Check whether the declared occupation, level, personal information, materials checklist, and date are consistent with the implementation plan | Use the same term to search separately between the registration form and the implementation plan, compare the names, quantities, and date formats in the cited fragments, and confirm that they can point back to the original text |
| Assessor dispatch form | Check whether the assessor's name, affiliated unit, dispatch session, signature, and receipt are consistent with the implementation plan | Open the citation superscript to compare against the source document, check the date and signature field in the dispatch form fragments, and if necessary view the hit information in `quoteList` |
| Associated knowledge base | Confirm that the selected knowledge bases use the same vector model, and that the search parameters are consistent with the values in the knowledge base retrieval section | In the node, check the selected collections and their vector models, open the search parameter panel and check each item, and record the tokens of the cited text and the number of array entries separately |

## Three common errors

- Symptom: the name, quantity, or date of the same record does not match between the implementation plan and the registration form. Cause: when multiple language versions exist in parallel, fields are not synchronized, and old-version materials are still left in the knowledge base and get matched.
- Symptom: the dispatch form lacks a signature or receipt, and the corresponding field cannot be seen in the cited fragment. Cause: it was omitted during material scanning or entry; retrieval can only return existing original text and cannot fill in missing fields.
- Symptom: there is no citation superscript in the answer, or the cited fragment does not match the original text. Cause: the corresponding material was not matched in this round, or a different version was matched; you need to first check the matched material and then look at the truncation.

## How to verify the setup

Acceptance of this feature: ask a question that has original-text support, and check whether the citation array and superscripts can point back to the original text; then ask a question with no matching material, and confirm that the array is empty while the chain still runs through. The number of citations is the array length, and `quoteMaxToken` is the citation content budget; the two are not compared for equality.

Business test: sample three terms and check whether their spelling is consistent throughout the whole document, and confirm that the translated names can point back to the original paragraphs.

- In the knowledge base retrieval node, check the selected knowledge bases and their vector models, and confirm that the search parameters are consistent with the values in the knowledge base retrieval section.
- Run a trial with a query that has no matching material, see that the output is empty while the chain continues, and separately record the number of entries in the citation array and the tokens of the cited text.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
