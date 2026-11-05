---
title: Citations and Source Traceability for Pre-Departure Training and Overseas Safety: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c047-f010
page_type: 行业问题页
application_area: education
meta_title: Study Abroad Safety | Citations | Handover
meta_description: Study Abroad Safety: review citations for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Pre-Departure Training and Overseas Safety: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

For the pre-departure training and overseas safety reminders category, materials include pre-departure training courseware, safety reminder checklists, and accommodation contact forms. The courseware carries the training topic, class hours, and instructor signature; the reminder checklist lists risk items, emergency phone numbers, and confirmation receipts; the contact form records the accommodation address, local contact, arrival date, and acknowledgment field. Material sources are the institution's international office, embassy and consulate reminders, and accommodation provider confirmation letters, with updates rolling by batch and departure date, and versions and dates within the same batch must be consistent. When entering the knowledge base retrieval node, the three types of materials each serve as citable original text passages for subsequent field comparison, ledger writing, and report generation. Field characteristics center on names, quantities, dates, signatures, and receipts, and any inconsistency will be exposed at handover acknowledgment.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text snippet and a source identifier, and the length may be 0. The signable material drafts and handover records are completed subsequently by AI nodes, code nodes, or humans, and the citation array itself is not a discrepancy list, ledger, report, or authorization scope.

| Object | Check | Verification action |
| --- | --- | --- |
| Pre-departure training courseware | The courseware fields include the training topic, class hours, instructor signature, and version date, and must be consistent with the batch date of the safety reminder checklist | Open the citation marker to point back to the original courseware passage, check the topic, class hours, signature, and version date item by item, and record the source identifier in `quoteList` |
| Safety reminder checklist | The checklist items include risk names, emergency phone numbers, and confirmation receipts, and the number of items must match the number of people and dates listed in the accommodation contact form | Compare the original checklist text with the original contact form text, and check names, quantities, and dates; record the number of citation items separately, and do not compare it for equality with `quoteMaxToken` |
| Accommodation contact form | The contact form includes the accommodation address, local contact, arrival date, and acknowledgment field; a missing signature or receipt is regarded as an incomplete handover | Open the citation marker in the conversation to point back to the original contact form text, check the signature field and receipt field; use `responseData` (non-streaming module results returned with detailed output enabled) to view the structure of this round's citation array |

## Three common errors

- Symptom: The names, quantities, and dates in the courseware and checklist for the same batch do not match. Cause: The two materials were drafted separately and their fields were not synchronized to the same version date.
- Symptom: The materials have been updated, but the handover record still cites the old version. Cause: The version was not synchronized, and the cited snippet still points back to the original passage of the previous version.
- Symptom: The contact form has an address and date, but the signature field or receipt field is empty. Cause: The handover step was not completed with acknowledgment, and the responsible person and date are missing.

## How to verify the setup

Acceptance for this feature: ask a question with original-text support, and check whether the citation array and markers can point back to the original passages of the courseware, checklist, or contact form; then ask a question with no matching materials, and confirm that the array is empty while the pipeline still runs through. An empty array is a normal output and does not mean retrieval failed.

Business test: draft one copy according to the template and complete one handover, and see whether missing items are blocked; only when the fields are complete, the responsible person is clear, and the version and date are consistent may it be handed to the next step for acknowledgment.

- In the node, check the selected knowledge base collections and their vector models, and confirm that the selected knowledge bases use the same vector model.
- Open the search parameter panel and check the values item by item; when the citation limit is involved, check the tokens of the cited text, and record the number of array items separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
