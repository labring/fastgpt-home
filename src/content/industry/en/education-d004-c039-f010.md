---
title: Citations and Source Traceability for Exam Organization and Misconduct Handling: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c039-f010
page_type: 行业问题页
application_area: education
meta_title: Exam Administration | Citations | Handover
meta_description: Exam Administration: review citations for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Exam Organization and Misconduct Handling: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page focuses on the examination organization and violation handling category. Materials include three types: examination manuals, examination room record sheets, and violation fact records. The examination manual is the draft for organizational processes and division of responsibilities, the examination room record sheet is the original voucher for the time, place, and number of people on the spot, and the violation fact record is the specialized material for behavior descriptions and evidence pointers. When the three enter the citation output function, each assumes a different role: the examination manual provides the rule basis, the examination room record sheet provides process fields, and the violation fact record provides facts and signature clues. The update rhythm advances by session; after each session the record sheet is backfilled, violation materials are synchronized with the handling nodes, and the manual is revised by semester or batch. Field characteristics center on names, quantities, dates, signatures, and receipts. The same record must be consistent across two materials, versions and dates must be aligned, and a missing signature or receipt is regarded as an incomplete handover.

## Configuration and implementation checks

This link is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and source identifier, and the length may be 0. The signable material drafts and handover records are completed afterward by subsequent AI nodes, code nodes, or manual work. The citation array is only responsible for handing over the matched original text paragraphs and source identifiers.

| Object | Check | Verification action |
| --- | --- | --- |
| Examination manual | Check whether the version number, effective date, and signature field are consistent with the current batch | Open the citation corner mark to point back to the original manual paragraph, and record the version and date; the number of citations is recorded separately by array length, and `quoteMaxToken` serves only as the citation content budget |
| Examination room record sheet | Check whether the name, quantity, date, and invigilator signature are consistent with the corresponding clauses in the examination manual | Compare item by item against another material from the same session for name, quantity, and date; when the hit is empty, confirm that the array length is 0 and the link is working |
| Violation fact record | Check whether the behavior description, evidence pointer, party signature, and receipt are complete | Open the citation corner mark to point back to the original record, and check the signature and receipt fields; if the cited fragment does not match the original text, first check the hit material, then check the trimming |
| Handover record | Check whether the responsible person, version, and date are consistent with the materials being handed over | Draft one according to the template and complete one handover, and see whether missing items are blocked; an empty citation array is not regarded as a retrieval failure |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record do not match across two materials. Cause: During drafting, the original paragraph was not pointed back to, and the field sources were not unified.
- Phenomenon: Versions are not synchronized, and an old manual and a new record sheet circulate at the same time. Cause: During handover, the version number and effective date were not checked.
- Phenomenon: A signature or receipt is missing, and the material cannot be issued. Cause: During the handover step, the responsible person field was not checked item by item according to the template.

## How to verify the setup

This function's acceptance: ask a question with an original text basis, and check whether the citation array and corner marks can point back to the original text; then ask a question with no matching material, confirm that the array is empty while the link works, and check that the cited fragments of `quoteList` in `responseData` (non-streaming module results returned with detailed output enabled) correspond to the original text.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- In the node, check the selected knowledge base collections and their vector models, open the search parameter panel, and check the values item by item.
- Run a trial with a question that has no matching material, and record that the array length is 0 while the link continues; the number of citations is recorded by array length, and `quoteMaxToken` is checked separately as the content budget.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
