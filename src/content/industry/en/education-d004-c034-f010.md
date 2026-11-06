---
title: Citations and Source Traceability for Public Vocational Skills Level Assessment: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c034-f010
page_type: 行业问题页
application_area: education
meta_title: Skills Certification | Citations | Handover
meta_description: Skills Certification: review citations for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Public Vocational Skills Level Assessment: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page addresses the scenario of material drafting and responsibility handover in social assessment for occupational skill level certification. Category materials include three types: assessment implementation plans, candidate registration forms, and assessor dispatch forms. The assessment implementation plan carries the certification occupation, level, assessment method, and schedule, and is the programmatic document for the entire batch of business; the candidate registration form records candidate identity, application conditions, and contact information, and is the basis for per-person verification; the assessor dispatch form specifies assessor division of labor, arrival time, and signature confirmation, and is the responsibility voucher for on-site execution. During the drafting stage, the three types of materials enter the knowledge base retrieval node. The node returns an array of cited content based on the knowledge base collection of the same vector model, for subsequent steps to compare fields. In terms of update cadence, the implementation plan is adjusted with the certification batch, the registration form is updated on a rolling basis as candidates are added or information is corrected, and the dispatch form is finalized before the assessment with a receipt retained. Field characteristics center on name, occupation name, level, number of people, date, signature, and version number. If any field is inconsistent between two materials, it will form a missing item at handover acceptance.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each containing the original text fragment and source identifier, and the length can be 0. The "signable material drafts and handover records" are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Assessment implementation plan | Verify whether the certification occupation, level, assessment method, batch date, and version number are consistent with the registration form and dispatch form, and whether the signature fields are complete | Open the search parameter panel to check the values, view the number of citations and the matched plan paragraphs in `responseData` (non-streaming module results returned with detailed output enabled), and trace each item back to the original text |
| Candidate registration form | Verify whether the candidate name, declared occupation and level, number of people, and registration date match between the two materials, and whether missing signatures or receipts are blocked | Run a test with a question that has no matching materials, confirm that the citation array is empty while the chain continues, and then compare against the original paragraphs of the registration form |
| Assessor dispatch form | Verify whether the assessor name, division of labor, arrival date, receipt signature, and version are synchronized, and whether the name, quantity, and date of the same record are consistent | Open the citation markers in the conversation, compare against the source document of the dispatch form, separately record the number of array items, and check the `quoteMaxToken` budget of the cited text |

## Three common errors

- Phenomenon: The same candidate name or number of assessors does not match between the registration form and the dispatch form. Cause: During drafting, different versions were cited separately, and field comparison was not performed before handover.
- Phenomenon: The implementation plan has already changed versions, but the registration form and dispatch form still use the old date and old level. Cause: The version was not synchronized, and the handover record did not register the version number and effective date.
- Phenomenon: The dispatch form lacks an assessor signature or the candidate registration form lacks a receipt. Cause: The handover step only checks content and not signature fields, so missing items are not blocked before entering the next step.

## How to verify the setup

Acceptance of this function: ask a question with original text support, and check whether the citation array and markers can trace back to the original paragraphs; then ask a question with no matching materials, confirm that the citation array is empty while the chain runs through, and view the number of array items in `quoteList` and `responseData`; do not compare the number of items for equality with `quoteMaxToken`.

Business test: draft one copy according to the template and complete one handover, and see whether missing items are blocked.

- In the node, check whether the selected knowledge base collections and their vector models are consistent, and open the search parameter panel to check the values item by item.
- Run a test with a question that has no matching materials, see that the output is empty while the chain continues, and separately record the number of citation array items and the tokens budget of the cited text.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
