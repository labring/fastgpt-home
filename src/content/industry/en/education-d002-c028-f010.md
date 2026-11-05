---
title: Citations and Source Traceability for Vocational College Program Registration: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c028-f010
page_type: 行业问题页
application_area: education
meta_title: Vocational Programs | Citations | Checks
meta_description: Vocational Programs: review citations for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Vocational College Program Registration: Compare Documents and Locate Differences

## What this category's data looks like

The materials for vocational college program establishment filing typically include three types: the program establishment filing form, the talent demand justification, and the faculty and equipment list. The filing form records the program name, code, length of schooling, enrollment number, filing date, and signature; the talent demand justification records the industry position, demand quantity, survey date, and signature of the justifier; the faculty and equipment list records the number of full-time teachers, the number of equipment sets, and the inventory date. When these three types of materials enter the knowledge base retrieval node, each is cited as an independent source, and the cited snippets retain the original paragraph and source identifier. The update rhythm rolls forward by academic year or application batch, and old and new versions may coexist. Field characteristics are concentrated in four categories: name, quantity, date, and signature, and the same record is prone to mismatch across two materials.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original snippet and source identifier, and the length can be 0. The discrepancy list is then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Program establishment filing form | The four fields of name, quantity, date, and signature are compared item by item with the ledger | Open the citation corner mark to trace back to the original paragraph, and verify the program name, enrollment number, filing date, and signature field in the filing form |
| Talent demand justification | The position name, demand quantity, survey date, and signature of the justifier are consistent with the filing form | Bring up the cited snippet in the conversation, and compare the position name, demand quantity, and survey date in the justification material |
| Faculty and equipment list | The number of full-time teachers, number of equipment sets, inventory date, and signature receipt correspond to the filing form | Verify the cited sources one by one, and check whether the teacher count, equipment set count, and inventory date in the list are missing signatures or receipts |
| Cited content array | The number of returned entries matches the hit materials, and being empty is also normal | Run a test with a question that has no matching material, and see that the array is empty while the chain continues; record the array length separately, the tokens of the cited text are controlled by `quoteMaxToken`, and do not perform equality comparison |

## Three common errors

- Phenomenon: The name of the same program does not match across two materials. Cause: The versions are not synchronized, the old filing form and the new justification material are cited at the same time, and the hit materials were not checked first.
- Phenomenon: The number of teachers or equipment sets is inconsistent across two materials. Cause: The ledger was not written back after the list was updated, and the cited snippet still comes from the old list.
- Phenomenon: The filing form is missing a signature or receipt. Cause: The signature page was omitted when the material was archived, the cited snippet only covers the main text, and the signature field was not checked.

## How to verify the setup

Acceptance of this feature: ask a question with textual support, and check whether the citation array can trace back to the original paragraph and corner mark; then ask a question with no matching material, confirm that the array is empty while the chain runs through, and check the citation array in `responseData` (non-streaming module results returned with detailed output enabled) and the source identifier in `quoteList`.

Business test: use a real record to find a field inconsistent with the ledger, record which item does not match among name, quantity, date, or signature, and submit it to the reviewer for confirmation and write-back.

- In the node, check whether the selected knowledge base collections and their vector models are consistent, and open the search parameter panel to verify the values item by item.
- Run a test with a question that has no matching material, confirm that the citation array is empty while the chain continues; record the array length separately, the tokens of the cited text are controlled by `quoteMaxToken`.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
