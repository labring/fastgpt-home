---
title: Citations and Source Traceability for Research Outcome Registration and Intellectual Property: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c061-f010
page_type: 行业问题页
application_area: education
meta_title: Research IP | Citations | Multilingual
meta_description: Research IP: review citations for multilingual work. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Research Outcome Registration and Intellectual Property: Handle Multilingual Materials and Terminology

## What this category's data looks like

This category's data covers three types of materials: research achievement registration forms, patent disclosure documents, and software copyright materials, all of which contain name, quantity, date, and signature fields. Achievement registration forms are filled in by the project team and submitted to the research management department for retention; patent disclosure documents are submitted by the inventor and transcribed by the agent; software copyright materials are compiled by the development team, with source code and a specification attached. During multilingual materials and terminology processing, each of the three types of materials plays its own role as a terminology source: the registration form provides achievement names and completers, the disclosure document provides technical terms and embodiments, and the copyright materials provide software names and module terms. The materials are updated as versions iterate, and signature and receipt pages often lag behind. The field characteristics are multilingual alignment, a high terminology repetition rate, and dates and numbers referenced across tables.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing an original text snippet and a source identifier, and the length may be 0. The unified terminology glossary and aligned draft are completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Achievement registration form | The name, quantity, date, and signature must be consistent with the patent disclosure document and software copyright materials, and the translated name must be traceable back to the original text | In the citation array, compare item by item the achievement name, number of completers, and application date between the registration form and the disclosure document, and check the signature field and receipt |
| Patent disclosure document | The translated technical terms must be consistent throughout the entire document, the same term must be written consistently across different paragraphs, and it must be traceable back to the original paragraph | Open the citation superscript and check the technical terms against the source document; use `quoteList` to view the matched snippet and confirm that the citation corresponds to the original text |
| Software copyright materials | The software name, module terms, version number, and date must match the registration form and disclosure document, and any missing signature or receipt must be flagged | Check whether the software name and version number are in sync; use `responseData` (non-streaming module results returned with detailed output enabled) to view the citation output structure and confirm that the number of array entries matches the matched materials |
| Cited content output | The number of returned entries must match the matched materials; being empty is also normal, and the cited snippets must be traceable back to the original text | Run a test with a question that matches no materials and see that the output is empty while the chain continues; when the citation limit is involved, check the tokens of the cited text; `quoteMaxToken` is the content budget, and the number of array entries is recorded separately |

## Three common errors

- Symptom: The name, number of completers, and date of the same achievement do not match between the registration form and the disclosure document. Cause: The two materials are filled in separately, no cross-table field comparison is performed, and versions are not synchronized.
- Symptom: The software name in the software copyright materials is inconsistent with the registration form, and the translated module terms differ from beginning to end. Cause: The terminology glossary is not unified, and the multilingual aligned draft is not traceable back to the original text.
- Symptom: The disclosure document lacks the inventor's signature, the registration form lacks a receipt, and the citation array is empty but an answer is still generated. Cause: The signature and receipt pages lag behind, and an empty array is mistakenly judged as a retrieval failure.

## How to verify the setup

Acceptance of this feature: ask a terminology question that has a basis in the original text, check whether the citation array and superscripts can be traced back to the original text, and confirm that the cited snippets in `quoteList` and `responseData` correspond to the source document; then ask a question that matches no materials and confirm that the array is empty while the chain runs through.

Business test: sample three terms and check whether their writing is consistent throughout the entire document, verify that the translated names can be traced back to the original text, and record the number of array entries and the `quoteMaxToken` budget, without comparing the two for equality.

- In the node, check the selected knowledge base collections and their vector models, and confirm that the selected knowledge bases use the same vector model.
- Open the search parameter panel and check the values item by item against the knowledge base retrieval section, then run a test with a question that matches no materials and see that the output is empty while the chain continues.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
