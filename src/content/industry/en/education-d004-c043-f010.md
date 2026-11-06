---
title: Citations and Source Traceability for Training Provider Admissions and Inquiry Follow-Up: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c043-f010
page_type: 行业问题页
application_area: education
meta_title: Training Admissions | Citations | Handover
meta_description: Training Admissions: review citations for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Training Provider Admissions and Inquiry Follow-Up: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This category's data revolves around three types of materials: enrollment brochures, consultation records, and trial class arrangements. The enrollment brochure carries the course name, number of class hours, start date, refund terms, and the signer's signature; the consultation record carries the visit date, consultant, intended course, commitments made, and the receipt; the trial class arrangement carries the trial time, instructor, venue, confirmation signature, and attendance receipt. When these three types of materials enter the knowledge base retrieval node, each serves as a citable source document: the brochure provides the external messaging, the consultation record provides the process facts, and the trial arrangement provides the evidence of performance. In terms of update cadence, the brochure is adjusted with course versions, consultation records are generated per session, and trial arrangements are generated per class session, and version numbers and dates must be kept in sync. The field characteristic is that the same record appears repeatedly across multiple materials; names, quantities, and dates must be consistent, and signatures and receipts must not be missing, otherwise it will be stopped at handover.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text snippet and a source identifier, and the length can be 0. The "signable material drafts and handover records" are then completed by subsequent AI nodes, code nodes, or humans, based on which fields are compared, ledgers are written, and reports are generated.

| Object | Check | Verification action |
| --- | --- | --- |
| Enrollment brochure | Whether the course name, number of class hours, start date, refund terms, and signer's signature are complete, and consistent with the corresponding fields in the consultation record | In the retrieval node, associate the knowledge base of the same vector model, open the citation marker to point back to the original brochure paragraph, and compare the name, quantity, date, and signature item by item |
| Consultation record | Whether the visit date, consultant, intended course, commitments made, and receipt are complete, and whether the version number and date are in sync | Run a test query with a question that has no matching materials, and see whether the citation array is empty while the chain continues; then for a question with original text support, check the number of citations in `responseData` (non-streaming module results returned with detailed output enabled) and the source identifier in `quoteList` |
| Trial class arrangement | Whether the trial time, instructor, venue, confirmation signature, and attendance receipt are complete, and whether they match the same record in the brochure and consultation record | Open the search parameter panel and check the values item by item, confirm that the tokens of the cited text are within the `quoteMaxToken` budget, and record the array length separately without doing an equality comparison |

## Three common errors

- Symptom: The course name and number of class hours for the same record do not match between the brochure and the consultation record. Cause: During drafting, different version sources were cited, and fields were not compared against the same original text snippet.
- Symptom: The version number and date of the trial class arrangement are inconsistent with the brochure, and this is only discovered at handover. Cause: The version was not synced, the update cadence was not aligned, and the citation source identifier points to an old paragraph.
- Symptom: The material draft is missing a signature or receipt, and the next step cannot sign off. Cause: The field checklist did not cover the signature item, and the handover record did not verify the responsible person item by item.

## How to verify the setup

Acceptance of this feature: ask a question with original text support, and check whether the citation array and citation markers can point back to the original paragraph; then ask a question with no matching materials, and confirm that the array is empty while the chain still runs through.

Business test: draft one according to the template and complete one handover, and see whether missing items are stopped.

- In the retrieval node, check the selected knowledge base collections and their vector models, and confirm that the selected knowledge bases use the same vector model.
- Open the search parameter panel and check the values item by item, confirm that the tokens of the cited text are within the `quoteMaxToken` budget, and record the array length separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
