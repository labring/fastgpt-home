---
title: Citations and Source Traceability for Graduate Employment Contracts and Destination Statistics: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c027-f010
page_type: 行业问题页
application_area: education
meta_title: Graduate Destinations | Citations | Multilingual
meta_description: Graduate Destinations: review citations for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Graduate Employment Contracts and Destination Statistics: Handle Multilingual Materials and Terminology

## What this category's data looks like

This page addresses the scenario of university employment contract signing and graduation destination statistics. Materials include employment agreements, graduation destination registration forms, employer certificates, as well as multilingual terminology explanations and historical versions. Employment agreements carry the signing parties, position, and date; graduation destination registration forms record the destination category, employer name, and reporting time; employer certificates provide the fact of hiring and a signed receipt. The fields of the three types of materials intersect, and names, quantities, dates, and signature items must be aligned item by item. Materials enter the knowledge base retrieval node in batches, and the terminology list and parallel texts serve as the basis for back-referencing translated names. The update cadence advances with signing batches and statistical cycles, and old versions retain source identifiers to facilitate traceability to specific paragraphs. When entering this feature, each material participates in citation output as original text fragments and source identifiers, and does not undertake difference determination.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content, each containing an original text fragment and a source identifier, and the length may be 0. "Unified terminology list and parallel texts" is subsequently completed by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Employment agreement | The signing parties, position name, signing date, and signature field must be consistent with the registration form | Retrieve the original text fragment, compare names, quantities, dates, and signatures item by item, and record the source identifier |
| Graduation destination registration form | The destination category, employer name, reporting time, and agreement record must be able to back-reference each other | Search both materials by the same record, check the fields and dates, and mark inconsistencies |
| Employer certificate | The fact of hiring, number of people, date, and signed receipt must align with the agreement and registration form | Check the quantity and date in the certificate, and confirm whether the signature or receipt is complete |
| Terminology list and parallel texts | The same term is written consistently throughout, and the translated name can back-reference the original paragraph | Sample three terms to check their spelling throughout, and verify that the translated names correspond to the original source identifiers |

## Three common errors

- Phenomenon: For the same record, the employer name, quantity, and date in the agreement and the registration form do not match. Cause: The two materials were entered separately, and field-level comparison was not performed for the same record.
- Phenomenon: After the terminology list is updated, the parallel texts still use the old translated names, and the same term is written inconsistently throughout. Cause: The versions were not synchronized, and the old version was not marked with a source identifier.
- Phenomenon: The employer certificate lacks a signature or receipt, and the cited fragment cannot back-reference the complete original text. Cause: The signature item was not checked when the material was archived, and the retrieval hit an incomplete paragraph.

## How to verify the setup

Acceptance for this feature: ask a question with original text support, and check whether the citation array and superscripts can back-reference the original text; then ask a question with no matching materials, and confirm that the array is empty while the pipeline runs through. The number of citations is the array length, and `quoteMaxToken` is the citation content budget; the two are not compared for equality. When citation limits are involved, check the tokens of the cited text, and record the array count separately.

Business test: sample three terms to check whether their spelling is consistent throughout.

- In the node, check the selected knowledge base collections and their vector models, and confirm that they belong to the same vector model.
- Open the search parameter panel and check the values item by item, and use `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` to view the cited fragments and source identifiers.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
