---
title: Citations and Source Traceability for National Key Research and Development Applications: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c057-f010
page_type: 行业问题页
application_area: education
meta_title: National R&D Grants | Citations | Checks
meta_description: National R&D Grants: review citations for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for National Key Research and Development Applications: Compare Documents and Locate Differences

## What this category's data looks like

National Key R&D Program project applications involve three types of materials: the project application, the budget application, and the cooperation agreement. When these materials enter the knowledge base retrieval node, each plays its own role as a field source: the project application provides names, quantities, dates, and task indicators; the budget application provides funding subjects, amounts, and dates; the cooperation agreement provides signing parties, quantities, dates, and signed receipts. The material update cadence is driven by application milestones, and unsynchronized versions, missing signatures, or missing receipts are common. Field characteristics are a mix of structured tables and body paragraphs, and the name, quantity, and date of the same record may not match across different materials. The knowledge base retrieval node returns an array of cited content based on the knowledge base selected by the vector model, each entry containing the original text snippet and source identifier, and the length can be 0, for subsequent nodes to compare fields, write ledgers, and generate discrepancy lists.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text snippet and source identifier, and the length can be 0. The discrepancy list is then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Associated knowledge bases | The selected knowledge bases must use the same vector model, otherwise citation sources cannot be compared uniformly | In the node, check the selected collections and their vector models, and confirm that the vector models of the three knowledge bases—project application, budget application, and cooperation agreement—are consistent |
| Project application and budget application | The name, quantity, and date of the same record must be consistent in the two materials, and signatures and receipts must be complete | Compare the name, quantity, and date field by field across the two materials, mark entries missing signatures or receipts, and record the cited snippets in `responseData` (non-streaming module results returned with detailed output enabled) |
| Citation content output | The number of returned entries matches the materials hit; being empty is also normal, and the output chain must run through | Run a test with a question that has no matching materials, and see that the output is empty while the chain continues; record the array entry count separately, and `quoteMaxToken` is only the content budget |
| Citation-to-original correspondence | Each citation can point back to the original paragraph, and the source identifier corresponds to the material version | In the conversation, open the citation superscript, compare against the source document, and check the original text snippet and source identifier in `quoteList` |

## Three common errors

- Symptom: the name, quantity, and date of the same record do not match between the project application and the budget application. Cause: the two material versions are not synchronized, or the field entry standards were not aligned.
- Symptom: the cooperation agreement is missing signatures or receipts, and the cited snippet cannot point back to the complete original text. Cause: the signing process was not closed-loop, and the signature pages and receipts were not completed when the materials were archived.
- Symptom: there is no citation superscript in the answer, or the cited snippet does not match the original text. Cause: no materials were hit in this round, or the materials hit are inconsistent with the question object; do not directly attribute this to length truncation.

## How to verify the setup

This feature's acceptance: ask a question with original-text support and check whether the citation array and superscripts can point back to the original text; then ask a question with no matching materials and confirm that the array is empty while the chain runs through. The citation count is the array length, and `quoteMaxToken` is the citation content budget; do not compare the two for equality; if a citation upper limit is involved, check the tokens of the cited text and record the array entry count separately.

Business test: use a real record to find fields inconsistent with the ledger, compare the names, quantities, dates, and signed receipts in the project application, budget application, and cooperation agreement, mark discrepancies, and write them back after confirmation by the reviewer.

- Open the search parameter panel and check item by item, confirming that the values are consistent with those set in the knowledge base retrieval section, and check the vector models of the selected knowledge bases.
- Run a test with a question that has no matching materials, confirm that the citation array is empty while the output chain continues, and at the same time check the cited snippets and source identifiers in `quoteList` within `responseData`.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
