---
title: Citations and Source Traceability for College Admissions Health Examination Organization: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c053-f010
page_type: 行业问题页
application_area: education
meta_title: Admissions Health Exams | Citations | Multilingual
meta_description: Admissions Health Exams: review citations for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for College Admissions Health Examination Organization: Handle Multilingual Materials and Terminology

## What this category's data looks like

Before releasing information externally, a university admissions physical examination organization needs to organize three types of materials—physical examination forms, re-examination applications, and restricted-major notifications—into a unified terminology glossary and a comparison draft. The physical examination form carries fields such as height, weight, past medical history, and color vision; the re-examination application records the application date and signature; the restricted-major notification states the restricted major name and the receipt. The materials mostly come from various departments and examination stations submitting in batches, and versions are updated with each batch; the fields include three types: date, quantity, and signature. After the three types of materials enter the knowledge base retrieval node, each is recalled as a citation source: the physical examination form provides the conclusion field, the re-examination application provides the process field, and the restricted-major notification provides the major name field. The comparison draft requires the same term to be consistent throughout the entire text, and the translated name to be able to point back to the original paragraph, so that names, quantities, and dates can be checked against each other later.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content, each item containing the original text fragment and source identifier, and the length can be 0. The unified terminology glossary and comparison draft are then completed by subsequent AI nodes, code nodes, or manual work. The number of citations is the array length, and `quoteMaxToken` is the citation content budget; the two are not compared for equality.

| Object | Check | Verification action |
| --- | --- | --- |
| Physical examination form | Whether the fields, date, and signature match the re-examination application and restricted-major notification | Point back to the original paragraph in the citation superscript, check the color vision and past medical history fields and the signature date; view the citation fragment in `responseData` (non-streaming module results returned with detailed output enabled) |
| Re-examination application | Whether the application date, signature, and receipt are complete, and whether the version is synchronized | Check the application date and signature item by item against the source document; open `quoteList` to view the original text fragment of the matched material |
| Restricted-major notification | Whether the restricted major name, quantity, and receipt are consistent with the physical examination form | Sample three terms to check whether the wording is consistent throughout the entire text, and point back to the original text; record the number of items in the citation array, and separately check the citation text tokens and the `quoteMaxToken` budget |
| Unified terminology glossary and comparison draft | Whether the same term is consistent throughout the entire text, and whether the translated name can point back to the original text | Run a test with a question that has no matching material, and see whether the citation array is empty while the chain continues; then check whether the selected knowledge base uses the same vector model |

## Three common errors

- Symptom: The name and date of the same student do not match between the physical examination form and the re-examination application. Cause: The two materials were submitted in batches, the versions were not synchronized, and the citation fragments were taken from different batches.
- Symptom: The restricted-major notification is missing a signature or receipt. Cause: Fields were missing when the material entered the retrieval node, the citation array still returned normally, and completion was not triggered.
- Symptom: The answer has content but the citation array is empty. Cause: No material was matched in this round; an empty array is normal output and does not mean retrieval failed; if citations do not match the original text, first check the matched material and then look at trimming.

## How to verify the setup

Acceptance of this feature: ask a question with an original-text basis, and check whether the citation array and superscript can point back to the original paragraph; then ask a question with no matching material, and confirm that the array is empty while the chain runs through.

Business test: sample three terms to check whether the wording is consistent throughout the entire text, and check whether the translated names can point back to the original text.

- Open the search parameter panel and check the values item by item, and confirm that the selected knowledge base uses the same vector model.
- Open the citation superscript in the conversation and compare it with the source document; record the number of items in the citation array, and separately check the citation text tokens and the `quoteMaxToken` budget.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
