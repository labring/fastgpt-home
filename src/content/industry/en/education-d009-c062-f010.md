---
title: Citations and Source Traceability for Research Ethics Review: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c062-f010
page_type: 行业问题页
application_area: education
meta_title: Research Ethics | Citations | Multilingual
meta_description: Research Ethics: review citations for multilingual work. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Research Ethics Review: Handle Multilingual Materials and Terminology

## What this category's data looks like

Research ethics review scenarios primarily involve ethics review applications, informed consent form templates, and risk assessment forms, often in multilingual versions and terminology comparison drafts. When these materials enter the knowledge base retrieval node, each plays a different role: the ethics review application provides the research purpose, protocol number, submission date, and signature fields; the informed consent form template provides the subject notification items, version number, signature block, and receipt; the risk assessment form provides the risk level, handling measures, assessor, and review date. Multilingual materials and terminology handling require that the same term be consistent throughout the entire text and that translated names can refer back to the original text, so a unified terminology glossary and comparison draft are the core deliverables. The update pace of materials varies with version revisions and review rounds, and field characteristics are concentrated in names, quantities, dates, signatures, and version numbers. The same record across different materials is prone to mismatches in names, quantities, and dates, unsynchronized versions, and missing signatures or receipts, which need to be compared item by item in the citation sources and traceability step.

## Configuration and implementation checks

The citation output of the knowledge base retrieval node only outputs an array of citation content, each containing an original text snippet and a source identifier, and the length can be 0. The unified terminology glossary and comparison draft must be handled subsequently by AI nodes, code nodes, or manual work. The citation content is output as an array, and the length can be 0; even if no content is found, the output chain will still run through.

| Object | Check | Verification action |
| --- | --- | --- |
| Ethics review application | Check whether the research name, protocol number, submission date, and signature block are consistent across multilingual versions, and whether the translated names can refer back to the original text | In the node, check the selected collections and their vector models, open the citation markers to compare against the source documents, and record the values of the number of citations in `responseData` (non-streaming module results returned with detailed output enabled) and the `quoteMaxToken` budget separately |
| Informed consent form template | Check whether the subject notification items, version number, signature block, and receipt are complete, and whether the name and date of the same record match across the two materials | Run a test with a question that has no matching materials, see whether the citation array is empty while the chain continues, and then check the values in the search parameter panel item by item |
| Risk assessment form | Check whether the risk level, handling measures, assessor, and review date are consistent with the application materials, and whether the versions are synchronized | Open the citation markers against the source documents, view the original text snippets and source identifiers in `quoteList`, and confirm that each citation can refer back to the original paragraph |
| Unified terminology glossary and comparison draft | Check whether the same term is written consistently throughout the entire text and whether the translated names can refer back to the original text; sample three terms to check their wording throughout the entire text | Open the citation markers in the conversation, compare item by item against the source documents, and record the number of citations and the content budget without making an equality comparison |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the ethics review application and the informed consent form template. Cause: The multilingual materials are revised separately, and the terminology comparison draft has not been updated in sync.
- Symptom: The versions are not synchronized, and the version number of the risk assessment form is inconsistent with that of the application materials. Cause: The materials have different update paces, and the citation sources do not indicate the version.
- Symptom: Missing signatures or receipts, and the signature block of the informed consent form template is empty. Cause: The template circulation step has not been closed out, and the citation snippets only cover part of the fields.

## How to verify the setup

Acceptance of this feature: Ask a question with textual support, check whether the citation array and markers can refer back to the original text, and confirm that the number of citations in `responseData` and the `quoteMaxToken` budget are recorded separately without making an equality comparison; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through.

Business test: Sample three terms to check whether their wording is consistent throughout the entire text

- Open the search parameter panel and check item by item, confirm that the values are consistent with those set in the knowledge base retrieval section, and view the citation snippets and source identifiers in `quoteList`.
- Run a test with a question that has no matching materials, see whether the output is empty while the chain continues, and then verify the citation markers item by item against the source documents.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
