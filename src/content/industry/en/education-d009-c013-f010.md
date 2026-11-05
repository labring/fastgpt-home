---
title: Citations and Source Traceability for School Teacher Training Credits: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c013-f010
page_type: 行业问题页
application_area: education
meta_title: Teacher Credits | Citations | Multilingual
meta_description: Teacher Credits: review citations for multilingual work. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for School Teacher Training Credits: Handle Multilingual Materials and Terminology

## What this category's data looks like

This page addresses the scenario of primary and secondary school teacher training credit management. Materials include training notices, credit recognition forms, and participant lists. Training notices provide the training name, start and end dates, hour and credit criteria, multilingual material attachments, and terminology sources; credit recognition forms carry the teacher's name, ID document number, training program, recognized credits, recognition date, and signature field; participant lists record registration, sign-in, completion, and receipt status. After these three types of materials enter the knowledge base retrieval node, they serve respectively as terminology sources, field sources, and personnel fact sources, and cited snippets must be able to point back to their respective original paragraphs. The update cadence rolls with training batches and recognition cycles, with common versions being notice revisions, list supplements, and signed recognition form returns. Field characteristics are the coexistence of multilingual names, the need to cross-reference translated names with original terminology, and dates and quantities appearing across notices, lists, and recognition forms, while signatures and receipts are mandatory traces before release.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original snippet and a source identifier, and the length may be 0. The unified terminology glossary and comparison draft are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Training notice | Check whether the training name, start and end dates, hour and credit criteria, multilingual material attachments, and terminology sources are consistent with the recognition form | Open the citation marker to point back to the original paragraph of the notice, and compare the name, dates, and credit criteria item by item |
| Credit recognition form | Check whether the teacher's name, ID document number, training program, recognized credits, recognition date, and signature field are complete | Retrieve the cited snippet to compare against the original text of the recognition form, and check the signature and receipt traces |
| Participant list | Check registration, sign-in, completion, and receipt status, as well as whether the name, quantity, and date of the same record match across the two materials | Use the citation array to point back to the original text of the list item by item, and check the number of records separately from the `quoteMaxToken` budget |
| Citation output | Check whether each citation can point back to the original paragraph, whether the array length matches the hit materials, and whether being empty is also normal | Open the citation marker in the conversation to compare against the source document, and view the cited snippets in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` |

## Three common errors

- Phenomenon: The same teacher's name or ID number is written differently in the notice and the recognition form. Cause: Multilingual material translated names are not unified, and the original terminology was not referenced during entry.
- Phenomenon: The credit recognition form lacks a signature or receipt. Cause: Versions are not synchronized, and the signature page was not returned and archived together with the revised version.
- Phenomenon: The dates and quantities in the participant list and the recognition form do not match. Cause: After the list was supplemented, it was not synchronized to the recognition form, and the two places were updated separately.

## How to verify the setup

Acceptance of this feature: ask a terminology question with an original-text basis, and check whether the citation array and markers can point back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the pipeline still runs through.

Business test: sample three terms and check whether their spelling is consistent throughout the entire text

- In the node, check whether the selected knowledge base collections and their vector models are consistent
- Open the search parameter panel and check the values item by item, and view the cited snippets in `quoteList` within `responseData`

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
