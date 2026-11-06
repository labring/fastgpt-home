---
title: Citations and Source Traceability for Academic Journal Business Partnerships: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c070-f010
page_type: 行业问题页
application_area: education
meta_title: Journal Partnerships | Citations | Handover
meta_description: Journal Partnerships: review citations for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Academic Journal Business Partnerships: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page addresses material drafting and responsibility handover in academic journal business cooperation management, covering three types of materials: business cooperation agreements, advertising review forms, and distribution cooperation materials. Business cooperation agreements carry fields for cooperation scope, revenue sharing, and term; advertising review forms carry fields for advertising content, review conclusion, and signature; distribution cooperation materials carry fields for distribution channel, quantity, and date. When each type of material enters the knowledge base retrieval node, it is cited in the form of an original text snippet, and the source identifier points back to the specific document and paragraph. In terms of update cadence, agreement revisions, changes in review conclusions, and adjustments to distribution quantities all generate new versions, and old versions must retain their sources for traceability. Field characteristics are concentrated in five categories: name, quantity, date, signature, and receipt. If the name, quantity, or date of the same record does not match across two materials, the versions are not synchronized, or a signature or receipt is missing, the handover record cannot be signed off. When materials enter this feature, each is retrieved as an independent source, and the number of citations is counted by hit material, without changing the output structure due to different material categories.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing an original text snippet and a source identifier, and the length can be 0. The "signable material drafts and handover records" are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Business cooperation agreement | Whether the name, quantity, date, and signature fields are consistent with another material, and whether the versions are synchronized | Open the citation marker, compare field by field against the source document, and record the number of citations and the source identifier in `responseData` (non-streaming module results returned with detailed output enabled) |
| Advertising review form | Whether the review conclusion, signature, and receipt are complete, and whether the date is consistent with the agreement | Bring up the cited snippet in the conversation, and check the original text paragraph in `quoteList` against the advertising review form fields |
| Distribution cooperation materials | Whether the distribution channel, quantity, and date match the agreement, and whether the versions are synchronized | Run a test with a question that has no matching materials to confirm the citation array is empty while the chain continues, then switch to a question with supporting evidence to check the citations |
| Cited content output | The number of returned entries is consistent with the hit materials, and being empty is also normal | Check `quoteMaxToken` as the content budget, record the number of citations separately, and do not perform an equality comparison |

## Three common errors

- Symptom: The name and quantity of the same record do not match between the agreement and the distribution materials. Cause: During drafting, the source document was not referenced back, and the fields were filled in separately.
- Symptom: The version of the advertising review form is not synchronized, and the old conclusion is still cited. Cause: The knowledge base was not updated, and the cited snippet points to the old paragraph.
- Symptom: The handover record lacks a signature or receipt and cannot be signed off. Cause: During material drafting, the signature field and receipt source were not checked.

## How to verify the setup

Feature acceptance: Ask a question with original text support, and check whether the citation array and marker can point back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through.

Business test: Draft one according to the template and complete one handover, and see whether missing items are blocked.

- Open the citation marker, and check the name, quantity, date, signature, and receipt fields against the source document.
- Check `quoteMaxToken` and `responseData`, record the number of citations, and confirm that the array length is consistent with the hit materials.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
