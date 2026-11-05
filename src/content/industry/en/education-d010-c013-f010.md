---
title: Citations and Source Traceability for School Teacher Training Credits: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c013-f010
page_type: 行业问题页
application_area: education
meta_title: Teacher Credits | Citations | Operations
meta_description: Teacher Credits: review citations for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for School Teacher Training Credits: Coordinate Operations and Application Handover

## What this category's data looks like

This page addresses credit management for primary and secondary school teacher training. Materials include training notices, credit recognition forms, and participant rosters. A training notice provides the training program, credit hours, start and end dates, and assessment requirements; a credit recognition form records the teacher's name, ID number, training name, recognized credit hours, recognition date, and signature field; a participant roster records the teacher's name, unit, participation date, and sign-in receipt. When the materials enter the citation output of the knowledge base retrieval node, each is split and identified as a cited source, and citation snippets can point back to the original paragraphs. The update rhythm advances by training batch: the notice is published first, the roster is supplemented during the training, and the credit recognition form is summarized after assessment and signatures are added. Field characteristics center on names, quantities, dates, and signature receipts. For the same record across the notice, roster, and recognition form, names must remain consistent, quantities must remain consistent, dates must correspond, and signatures or receipts must not be missing.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text snippet and a source identifier, and the length can be 0. The handover-ready deployment status and operation records are completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Training notice | Fields include the training program, credit hours, start and end dates, and assessment requirements; dates can correspond to the subsequent roster and recognition form | Open the citation marker, compare it with the original paragraph of the notice, check whether the program name and credit hours are consistent with the recognition form, and record the number of citations and source identifiers |
| Credit recognition form | Fields include the teacher's name, training name, recognized credit hours, recognition date, and signature field; signatures and receipts must not be missing | Check the name, training name, recognized credit hours, and recognition date item by item, check whether the signature field and receipt are complete, and record missing items in the operation record |
| Participant roster | Fields include the teacher's name, unit, participation date, and sign-in receipt; quantities can correspond to the recognition form | Check whether the number of people on the roster is consistent with the number of entries in the recognition form, whether the participation dates fall within the start and end dates of the notice, and whether receipts correspond to each person |
| Knowledge base retrieval node | The associated knowledge base uses the same vector model, the cited content is output as an array, the length can be 0, and the chain is connected | Check the selected collection and vector model, verify the search parameter values, check whether the citation array in `responseData` (non-streaming module results returned with detailed output enabled) and the citation markers in `quoteList` point back to the original text, and separately record the array length and the `quoteMaxToken` budget |

## Three common errors

- Symptom: For the same record, the name, quantity, and date in the training notice and the credit recognition form do not match. Cause: The notice is registered by program name, the recognition form is filled in by training name, and the roster is supplemented by participation date; the three materials have not undergone field alignment and date mapping.
- Symptom: Citation snippets do not match the original text, and there are no citation markers in the answer. Cause: First check whether this round had a hit and which material was hit, then check trimming; do not directly attribute it to length trimming.
- Symptom: The credit recognition form lacks a signature or receipt, and the participant roster has no sign-in record. Cause: The recognition form was not supplemented with signatures when summarized after assessment, the roster receipts were not checked person by person, and missing items were exposed during the item-by-item check of the handover form.

## How to verify the setup

This feature's acceptance: ask a question with an original-text basis and check whether the citation array and markers can point back to the original text; then ask a question with no matching material and confirm that the array is empty while the chain is connected. Check the number of citations in the array in `responseData` and the markers in `quoteList`, separately record the `quoteMaxToken` budget, and do not compare the two for equality.

Business test: perform an item-by-item check according to the handover form once and see which record is missing. Check that the version, connection, and task record are consistent, and check whether the fields, dates, and signatures of the training notice, credit recognition form, and participant roster are complete.

- Open the citation markers, point back to the original paragraphs item by item against the source documents, record the number of citations in the array and the source identifiers, and record an empty array as normal output as well.
- Open the search parameter panel and verify the values item by item, check whether the selected knowledge bases use the same vector model, and check the correspondence between citations and original text in `quoteList` within `responseData`.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
