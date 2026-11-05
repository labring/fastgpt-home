---
title: Citations and Source Traceability for School Moral Education and Class Teacher Work: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c014-f010
page_type: 行业问题页
application_area: education
meta_title: Pastoral Education | Citations | Handover
meta_description: Pastoral Education: review citations for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for School Moral Education and Class Teacher Work: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page focuses on material drafting and responsibility handover in school moral education and homeroom teacher work. Common materials include themed class meeting plans, student comprehensive quality records, home visit records, as well as draft materials that can be issued and handover records. When these materials enter the knowledge base retrieval node, each plays a citable source role: themed class meeting plans provide the activity theme, date, and signature field; student comprehensive quality records provide student names, evaluation items, and quantities; home visit records provide the home visit time, subject, and receipt. Materials are usually updated weekly or per semester. The same record often has inconsistent names, quantities, and dates across two materials, versions are not synchronized, and signatures or receipts are missing. The citation output is only responsible for providing the original text snippet and source identifier. Subsequent nodes or humans then compare fields, write ledgers, generate reports, and hand off to the next stage for sign-off.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text snippet and source identifier, and the length can be 0. Draft materials that can be issued and handover records are completed by subsequent AI nodes, code nodes, or humans. Even if no content is found, the output chain still runs through.

| Object | Check | Verification action |
| --- | --- | --- |
| Themed class meeting plan | Fields include theme, date, responsible person, and signature field; the date and signature must be consistent with the handover record | In the node, check the selected knowledge base and vector model, open the citation marker to trace back to the original paragraph, and record the number of citations and the `quoteMaxToken` budget |
| Student comprehensive quality record | Fields include student name, evaluation item, quantity, and version date; names and quantities must match between the two materials | Run a test with a question that has no matching material, see whether the citation array is empty while the chain continues, and check the number of citations in `responseData` (non-streaming module results returned with detailed output enabled) |
| Home visit record | Fields include home visit time, subject, and receipt signature; the version and date must be synchronized with the handover record | Open the search parameter panel and check the values item by item, and compare the source document to check whether the cited snippet is consistent with the original text |
| Draft materials that can be issued and handover records | Fields are complete, the responsible person is clear, the version and date are consistent, and missing signatures or receipts must be blocked | Draft one according to the template and complete one handover, then check whether missing items are blocked in `quoteList` |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match across two materials. Cause: During drafting, the original text was not traced back, the cited snippet is inconsistent with the source document, and field comparison lacks a basis.
- Symptom: Versions are not synchronized, and an old class meeting plan is mixed with a new handover record. Cause: The knowledge base was not updated in time, citations still hit old paragraphs, and dates and responsible persons are misaligned.
- Symptom: Signatures or receipts are missing, but the material still enters the next stage. Cause: Before handover, items were not checked one by one according to the template, missing items were not blocked, and responsibility attribution is unclear.

## How to verify the setup

This feature acceptance: Ask a question with an original-text basis and check whether the citation array and citation markers can trace back to the original text; then ask a question with no matching material and confirm that the array is empty while the chain runs through.

Business test: Draft one according to the template and complete one handover, then see whether missing items are blocked.

- Open the search parameter panel and check the values item by item to confirm they are consistent with the settings in the knowledge base retrieval section.
- In the conversation, open the citation markers and compare with the source document to check whether each citation can trace back to the original paragraph.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
