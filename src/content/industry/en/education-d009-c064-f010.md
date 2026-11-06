---
title: Citations and Source Traceability for University Laboratory Safety Classification: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c064-f010
page_type: 行业问题页
application_area: education
meta_title: Lab Safety Categories | Citations | Multilingual
meta_description: Lab Safety Categories: review citations for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for University Laboratory Safety Classification: Handle Multilingual Materials and Terminology

## What this category's data looks like

This category's data looks like this: University laboratory safety grading and classification involves three types of materials: laboratory grading and classification tables, hazard source lists, and safety responsibility statements. The grading and classification table registers item by item according to room number, hazard source category, level, responsible person, date, and signature; the hazard source list is written by name, quantity, storage location, risk level, and update date; the safety responsibility statement is signed off by responsible entity, responsibility clauses, signature, and receipt. The three types of materials often come from different departments and annual versions, and names, quantities, and dates easily fail to match, with versions not synchronized or signatures and receipts missing. When the materials enter the knowledge base retrieval node, the grading and classification table and the hazard source list are retrieved as citation sources, and the safety responsibility statement serves as the traceability basis for responsibility and signature fields; the output is an array of cited content, each item containing the original text fragment and source identifier, for subsequent nodes to compare fields, write ledgers, and generate reports.

## Configuration and implementation checks

Configuration and implementation checks: The citation output of the knowledge base retrieval node only outputs an array of cited content, each item containing the original text fragment and source identifier, and the length can be 0. The unified terminology table and comparison draft must be continued by subsequent AI nodes, code nodes, or manual work. The cited content is output as an array, and the length can be 0; even if no content is found, the output chain will still run through.

| Object | Check | Verification action |
| --- | --- | --- |
| Laboratory grading and classification table | Whether the fields, dates, and signatures match the hazard source list and safety responsibility statement; whether the name, quantity, and date for the same room are consistent | Open the citation marker, check `quoteList` and the original paragraph against the source document, and record the number of entries and field differences |
| Hazard source list | Whether the hazard source name, quantity, storage location, risk level, and update date are consistent with the grading and classification table; whether the versions are synchronized | Run a trial with the same question, check whether the number of citation array entries matches the hit materials, and separately record the array length and `quoteMaxToken` budget |
| Safety responsibility statement | Whether the responsible entity, responsibility clauses, signature, and receipt are complete; whether the date matches the grading and classification table | Check the signature and receipt fields against the source document, and check whether the cited fragments in `responseData` (non-streaming module results returned with detailed output enabled) can point back to the original text |
| Unified terminology table and comparison draft | Whether the same term is written consistently throughout, and whether the translated name can point back to the original text | Sample three terms to check whether the writing is consistent throughout, and check the citation source identifier and original paragraph |

## Three common errors

- Phenomenon: The name, quantity, and date of the same laboratory do not match between the grading and classification table and the hazard source list. Cause: The two materials were reported separately by different departments, without field-level comparison and version synchronization.
- Phenomenon: The safety responsibility statement lacks a signature or receipt, and the cited fragment cannot point back to the responsibility clauses. Cause: When the materials were archived, the signature and receipt fields were not checked, the versions were not synchronized, and the citation source identifier was disconnected from the original paragraph.
- Phenomenon: The citation array is empty but the answer still has content, and the citation marker is missing. Cause: No materials were hit in this round, and an empty array is a normal output; when citations do not match the original text, first check the hit materials, then look at trimming.

## How to verify the setup

Acceptance of this feature: ask a question with original-text support, and check whether the citation array and marker can point back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through.

Business test: sample three terms to check whether the writing is consistent throughout, check whether the translated name can point back to the original text, and record the number of array entries and the `quoteMaxToken` budget, without comparing the two for equality.

- In the node, check the selected knowledge base collections and their vector models, open the search parameter panel, and check the values item by item.
- Run a trial with a question that has no matching materials, see that the output is empty while the chain continues, and record the number of citation array entries.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
