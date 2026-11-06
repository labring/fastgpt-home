---
title: Citations and Source Traceability for Kindergarten Safety and Emergency Drills: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c005-f010
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Safety | Citations | Intake
meta_description: Kindergarten Safety: review citations for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Kindergarten Safety and Emergency Drills: Handle Questions and Collect Missing Information

## What this category's data looks like

Materials in the kindergarten safety protection and emergency drill category enter Q&A intake along four lines: hazard rectification, drill organization, access control and school bus inspection, and responsible-person signatures. The hazard item and rectification deadline table, the drill headcount and sign-in records, the access control and school bus inspection table, and the responsible-person signature page each play a different role: the hazard table provides the basis for closure, the sign-in table verifies consistency between headcount and plan, the access control and school bus inspection table exposes missing items, and the signature page confirms attribution of responsibility. Materials enter the knowledge base retrieval node in a mixed document-and-table format, and fields often carry dates, locations, classes, inspection items, and signature columns. The update cadence rolls with semesters, drill batches, and rectification follow-ups; when an old plan and a new sign-in table coexist, drill records inconsistent with the plan easily arise. Intake records and the completed follow-up questions are then used by subsequent AI nodes, code nodes, or humans to compare fields, write ledgers, and generate reports.

## Configuration and implementation checks

This link is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing an original text snippet and a source identifier, and the length may be 0. Intake records and the completed follow-up questions are then completed by subsequent AI nodes, code nodes, or humans.

| Object | Check | Verification action |
| --- | --- | --- |
| Hazard item and rectification deadline materials | Whether the hazard is closed and whether the deadline can be traced back to the original text | Open the citation superscript and check the hazard item and rectification deadline against the source document; record the number of citations by the array length, and check the tokens of the cited text separately via `quoteMaxToken` |
| Drill headcount and sign-in materials | Whether the sign-in headcount is consistent with the drill plan | Compare the headcount and batch using the sign-in table and the plan document, and check whether the cited snippets in `responseData` (non-streaming module results returned with detailed output enabled) can be traced back to the corresponding paragraphs |
| Access control and school bus inspection item materials | Whether inspection items are missing and whether responsible-person signatures are complete | Compare the inspection table and signature page item by item, and open `quoteList` to check the citation source identifier and the original text paragraph |
| Responsible-person signature materials | Whether the signature column covers the three types of records: hazard, drill, and access control | Open the citation superscript in the conversation and check the correspondence between the signature page and each record entry |

## Three common errors

- Symptom: a hazard record has a rectification item but no re-inspection signature. Cause: the hazard is not closed; the materials only reach the rectification deadline and not the acceptance step, so the cited snippet cannot be traced back to the closure basis.
- Symptom: the drill sign-in headcount does not match the classes listed in the plan. Cause: the drill record is inconsistent with the plan; an old plan and a new sign-in table coexist, and the material version was not checked first after retrieval matched.
- Symptom: the access control and school bus inspection table lacks a certain inspection item. Cause: an inspection item is missing; the table template does not cover all entries, and although the citation array is non-empty, its content is incomplete.

## How to verify the setup

Acceptance of this feature: ask a hazard rectification question that has an original-text basis, and check whether the citation array and superscript can be traced back to the original text paragraph; then ask a question with no matching materials, and confirm that the array is empty while the pipeline still runs through.

Business test: raise a question that lacks key information, and see whether it asks a follow-up question first before answering.

- In the node, check the selected knowledge base collections and their vector models, and confirm that the selected knowledge bases use the same vector model.
- Open the search parameter panel and check the values item by item; run a trial with a question that has no matching materials, and see whether the output is empty while the pipeline continues.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
