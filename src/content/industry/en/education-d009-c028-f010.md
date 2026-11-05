---
title: Citations and Source Traceability for Vocational College Program Registration: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c028-f010
page_type: 行业问题页
application_area: education
meta_title: Vocational Programs | Citations | Multilingual
meta_description: Vocational Programs: review citations for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Vocational College Program Registration: Handle Multilingual Materials and Terminology

## What this category's data looks like

Program setup filing materials for vocational colleges typically include three types: the program setup filing form, talent demand justification, and faculty and equipment inventory. The filing form states the program name, code, program length, enrollment date, and signature fields; the justification materials give industry positions, talent gaps, and survey dates; the faculty and equipment inventory lists the number of teachers, professional titles, equipment units and sets, and procurement dates. When these materials enter the knowledge base retrieval node, the node outputs only an array of cited content, each item containing an original text snippet and a source identifier, and the length may be 0; the filing form, justification materials, and faculty and equipment inventory each serve as citable source materials for subsequent use in comparing fields, writing ledgers, and generating reports. Materials are often updated by academic year or batch, and the name, quantity, and dates of the same program may change between batches, so version synchronization and signed receipts must be confirmed one by one.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text snippet and a source identifier, and the length may be 0. The unified terminology glossary and comparison draft are completed next by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Program setup filing form | Whether the program name, code, program length, enrollment date, and signature fields are consistent with other materials in the same batch | Use `quoteList` to open the citation markers, trace each item back to the original paragraph in the filing form, and verify the name and dates |
| Talent demand justification | Whether the position names, talent gap quantities, and survey dates are consistent with the filing form's definitions | Compare the justification paragraphs with the filing form fields in the citation array, and record the number of items and the source identifiers in `responseData` (non-streaming module results returned with detailed output enabled) |
| Faculty and equipment inventory | Whether the number of teachers, professional titles, equipment units and sets, and procurement dates match the filing form and justification materials | Verify whether each citation can be traced back to the original inventory text, check whether signatures and receipts are complete, and record the array length |
| Cited content output | The number of returned items is consistent with the materials hit, and being empty is also normal | Run a test with a question that has no matching materials, see whether the output is empty while the chain continues, and separately record the number of array items |

## Three common errors

- Phenomenon: The name or code of the same program is written differently in the filing form and the justification materials. Cause: The two materials were filled out by different personnel without terminology unification, so citations each trace back to different original texts.
- Phenomenon: The number of teachers or equipment units and sets for the same batch does not match between the inventory and the filing form. Cause: Versions were not synchronized, the old inventory is still hit by retrieval, and the cited snippets come from outdated materials.
- Phenomenon: The filing form or receipt lacks signature field content, and the cited snippets cannot prove that the materials have been confirmed. Cause: Signatures or receipts were omitted during material circulation, and citations cover only the body text but not the signature page.

## How to verify the setup

This feature's acceptance: first ask a question with original-text support, and check whether the citation array and citation markers can trace back to the original paragraphs; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through. The number of citations is the array length, and `quoteMaxToken` is the citation content budget; the two are not compared for equality; if a citation upper limit is involved, check the tokens of the cited text, and record the number of array items separately.

Business testing: sample three terms and check whether their wording is consistent throughout the entire text, and confirm that each translated name can be traced back to the original text; only when the same term is consistent throughout the entire text and the translated name can be traced back to the original text may it be released externally.

- In the node, check whether the selected knowledge base uses the same vector model, and open the search parameter panel to verify the values item by item
- Run a test with a question that has no matching materials, see whether the output is empty while the chain continues, and separately record the number of array items and the tokens of the cited text

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
