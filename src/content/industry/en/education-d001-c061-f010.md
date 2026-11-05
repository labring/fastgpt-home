---
title: Citations and Source Traceability for Research Outcome Registration and Intellectual Property: Find Supporting Evidence
slug: /en/industry/education-d001-c061-f010
page_type: 行业问题页
application_area: education
meta_title: Research IP | Citations | Evidence
meta_description: Research IP: review citations for evidence lookup. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Research Outcome Registration and Intellectual Property: Find Supporting Evidence

## What this category's data looks like

This category's data typically involves three types of materials: achievement registration forms, patent disclosure documents, and software copyright materials. Achievement registration forms record the achievement name, contributors, date, and signature, and are used for internal archiving and subsequent applications; patent disclosure documents carry the technical solution, inventors, filing date, and department receipt; software copyright materials include the software name, version number, development completion date, and signature/seal page. The three types of materials are maintained by different handlers, with different update rhythms: registration forms are filled in immediately as achievements arise, disclosure documents are finalized before filing, and software copyright materials are consolidated during the registration stage. After entering the knowledge base retrieval node, each material participates in vector search as an independent source, and the citation output returns source identifiers based on the hit snippets, for subsequent use in comparing fields, writing ledgers, or generating reports.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text snippet and a source identifier, and the length can be 0. The basis entries that can be traced back to the original text are completed by subsequent AI nodes, code nodes, or manually. Even if no content is found, the output chain will still run through.

| Object | Check | Verification action |
| --- | --- | --- |
| Achievement registration form | The name, contributors, date, and signature fields are complete, and the records for the same achievement are consistent with the disclosure document and software copyright materials | Open the citation marker to compare against the original text, and check the name, quantity, date, and signature column field by field; use `quoteList` to view the source to which the hit snippet belongs |
| Patent disclosure document | The technical solution, inventors, filing date, and department receipt can be traced back to the original text, and the version is the current version | Check whether the disclosure document version number and the registration form date are synchronized; check whether the receipt signature page is missing; record the number of entries in the citation array separately |
| Software copyright materials | The software name, version number, development completion date, and signature/seal page are consistent with the registration form | Compare the name, version number, and date of the software copyright materials and the registration form; use `responseData` (non-streaming module results returned with detailed output enabled) to view the length of the citation array, and when it is not zero, trace each entry back to the original text |
| Associated knowledge base | The selected knowledge base is one with the same vector model, and the search parameters are consistent with the values in the knowledge base retrieval section | Check the selected collection and vector model in the node; open the search parameter panel and check each item, and when the citation limit is involved, check the tokens of the cited text, where `quoteMaxToken` is the content budget |

## Three common errors

- Symptom: The name, quantity, or date of the same achievement does not match between the registration form and the disclosure document. Cause: The two materials are filled in by different handlers, no field-level comparison was made, and the cited snippets each trace back to different original texts.
- Symptom: The version of the software copyright materials is not synchronized; the registration form has been updated while the software copyright materials are still the old version. Cause: The update rhythms differ, there is no version verification step, and the citation hits the old version of the original text.
- Symptom: The disclosure document lacks the department receipt or the registration form lacks a signature. Cause: The signature and receipt pages were not checked when the materials were archived, and although the citation array returns snippets, the signature information cannot be completed.

## How to verify the setup

Acceptance of this feature: ask a question with an original-text basis, and check whether the citation array and markers can trace back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain still runs through. Use `quoteList` to view the hit snippets, and use `responseData` to view the array length; do not compare the number of entries and `quoteMaxToken` for equality.

Business test: ask a cross-material basis question, see whether the answer gives traceable sources, and compare field by field against the achievement registration form, patent disclosure document, and software copyright materials for fields, dates, and signatures.

- Open the citation markers in the conversation, trace each entry back to the original text against the source documents, and check the name, quantity, date, and signature; use `quoteList` to view the source to which the hit snippet belongs, and use `responseData` to record the length of the citation array.
- Run a trial with a question that has no matching materials, and confirm that the citation array is empty while the output chain continues; then open the search parameter panel and check each value, and when the citation limit is involved, check the tokens of the cited text, recording `quoteMaxToken` separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
