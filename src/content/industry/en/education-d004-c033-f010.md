---
title: Citations and Source Traceability for Vocational College Skills Competition Organization: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c033-f010
page_type: 行业问题页
application_area: education
meta_title: Skills Competitions | Citations | Handover
meta_description: Skills Competitions: review citations for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Vocational College Skills Competition Organization: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This category's data looks like this: Material drafting and responsibility handover in vocational college skills competition organization involves three types of materials: competition regulations, registration forms, and training plans. Competition regulations provide the event name, group, time and location, scoring criteria, and signature fields; registration forms carry the contestant's and instructor's names, identity information, competition event, date, and seal position; training plans record stage goals, class hour arrangements, equipment lists, responsible persons, and review comments. When these three types of materials enter the knowledge base retrieval node, each serves as a citable original source: regulations are used to verify the event and scoring criteria, registration forms are used to verify the correspondence between personnel and events, and training plans are used to verify training arrangements and responsibility division. The update rhythm advances according to pre-competition preparation, registration deadline, training stage, and pre-competition review; each revision produces a new version and retains the date and signature. Field characteristics are concentrated in names, quantities, dates, version numbers, signatures, and receipts. When the same record appears across materials, the criteria must remain consistent to facilitate subsequent comparison and handover receipt.

## Configuration and implementation checks

Configuration and implementation checks: This link is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing an original text fragment and a source identifier, and the length can be 0. The signable material drafts and handover records are completed subsequently by AI nodes, code nodes, or manual work; the citation array itself is not a difference list, ledger, report, or authorization scope.

| Object | Check | Verification action |
| --- | --- | --- |
| Competition regulations | Whether the event name, group, time and location, scoring criteria, and signature fields are complete, and whether the version and date are consistent | In the node, check the selected knowledge base collection and vector model, open the citation marker to compare against the original regulation paragraphs, and compare the name, date, and signature position item by item |
| Registration form | Whether the contestant's and instructor's names, identity information, competition event, date, and seal position are complete, and whether they are consistent with the regulation criteria | Use the same record's names and quantities in the two materials for cross-checking, open the search parameter panel to check the values item by item, and record the number of citations |
| Training plan | Whether the stage goals, class hour arrangements, equipment list, responsible persons, and review comments are complete, and whether the version is synchronized | In the conversation, open the citation marker to refer back to the original training plan text, check the source identifiers in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList`, and confirm the signature and receipt positions |
| Citation content output | Whether the number of returned entries matches the hit materials; empty is also normal, and the output chain continues to run through | Run a test with a question that has no matching materials, and see whether the array is empty while the chain continues; when the citation limit is involved, check the tokens of the cited text, record the array entry count separately, and `quoteMaxToken` is the content budget |

## Three common errors

- Symptom: The same record's name, quantity, and date do not match between the regulations and the registration form, and it is returned during handover. Cause: The two materials were revised separately, no field cross-comparison was done during drafting, and the version and date were not synchronized.
- Symptom: The training plan has been updated to a new version, but the handover record still cites the old version, and the signature field is blank. Cause: The version was not synchronized, the version number and date were not checked before handover, and missing signatures or receipts were not blocked.
- Symptom: There is no citation marker in the answer, or the cited fragment does not match the original text. Cause: First check whether this round hit anything and which material was hit, then look at trimming; an empty citation array does not mean retrieval failed, an empty array is a normal output.

## How to verify the setup

Acceptance of this feature: ask a question with original text support, and check whether the citation array and markers can refer back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- In the node, check the selected knowledge base collections and their vector models, and confirm they belong to the same vector model.
- Open the search parameter panel to check the values item by item, and keep them consistent with the values set in the knowledge base retrieval section.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
