---
title: Citations and Source Traceability for Vocational College Program Registration: Find Supporting Evidence
slug: /en/industry/education-d001-c028-f010
page_type: 行业问题页
application_area: education
meta_title: Vocational Programs | Citations | Evidence
meta_description: Vocational Programs: review citations for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Vocational College Program Registration: Find Supporting Evidence

## What this category's data looks like

This category's data typically includes the specialty setup filing form, talent demand justification, and faculty and equipment list. The filing form records the specialty name, code, program length, enrollment scale, signatures, and receipt; the justification materials record industry job demand, survey date, and justification conclusion; the faculty and equipment list sets out the number of teachers, title structure, equipment names, number of units/sets, and date. When these three types of materials enter the knowledge base retrieval node, the filing form serves as the source of the main fields, the justification materials serve as the source of the demand basis, and the faculty and equipment list serves as the source of the conditions basis, each being cited as original text fragments. Materials are updated by academic year or batch, and versions and signed receipts need to be kept in sync. The field characteristics are four types: name, quantity, date, and signature. When comparing across materials, inconsistency in the same record is most likely to occur.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text fragment and a source identifier, and the length can be 0. The "basis items that can be traced back to the original text" are completed subsequently by the AI node, code node, or manually. The cited content is output as an array; even if no content is found, the output chain still runs through.

| Object | Check | Verification action |
| --- | --- | --- |
| Specialty setup filing form | Whether the fields include specialty name, code, program length, and enrollment scale; whether the date and signature are complete; whether it can be traced back to the original text paragraph | Open the citation marker in the conversation, check the fields and signature against the original filing form; record the length of the citation array, and do not compare the number of items with `quoteMaxToken` for equality |
| Talent demand justification | Whether the justification conclusion and survey date match the specialty name in the filing form; whether the version is current; whether it can be traced back to the original text paragraph | Check whether the justification conclusion is consistent with the name in the filing form, and check the version date; use `quoteList` to view the cited fragment and source identifier |
| Faculty and equipment list | Whether the number of teachers, title structure, equipment units/sets, and date are consistent with the filing form; whether missing signatures or receipts can be pointed out | Compare the list with the filing form item by item for quantity and date; open the search parameter panel to check the value of `quoteMaxToken`, and record the number of array items separately |
| Cited content output | Whether the number of returned items is consistent with the materials hit; empty is also normal, and the chain continues to run through | Run a test with a question that has no matching materials, and see that the output is empty while the chain continues; then use a question with original text basis to check the citation marker |

## Three common errors

- Phenomenon: the same specialty name is written differently in the filing form and the justification materials, and the quantity or date does not match. Cause: the two materials are filed separately, no cross-material field comparison is done, and the cited fragments are independent of each other.
- Phenomenon: the faculty and equipment list has been updated, but the filing form is still the old version, and the citation marker points to the old paragraph. Cause: versions are not synchronized, and the old version of the materials in the knowledge base has not been removed or marked as the current version.
- Phenomenon: the filing form lacks a signature or receipt, but the cited fragment is still output as a basis. Cause: the completeness of signatures and receipts was not checked when the materials were ingested into the knowledge base, and no missing item was flagged after retrieval hit.

## How to verify the setup

Acceptance of this feature: ask a question with original text basis, and check whether the citation array and citation marker can be traced back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through. The number of citations is the array length, and `quoteMaxToken` is the citation content budget; the two are not compared for equality.

Business test: ask a cross-material basis question, see whether the answer gives a traceable source, and check whether the name, quantity, date, and signature match the original text.

- In the node, check whether the selected knowledge base collections and their vector models are consistent, and open the search parameter panel to check values such as `quoteMaxToken` item by item.
- Run one test each with two types of questions: one with original text basis and one with no matching materials, open the citation marker to compare with the source document, and record the citation array length and the cited fragments in `responseData` (non-streaming module results returned with detailed output enabled).

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
