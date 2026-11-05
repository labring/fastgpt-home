---
title: Citations and Source Traceability for Vocational College Program Registration: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c028-f010
page_type: 行业问题页
application_area: education
meta_title: Vocational Programs | Citations | Handover
meta_description: Vocational Programs: review citations for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Vocational College Program Registration: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

Vocational college program setup filing revolves around three types of materials: the program setup filing form, the talent demand justification, and the faculty and equipment list. The material sources are academic affairs, secondary schools/departments, human resources, and equipment management departments, and the update rhythm advances on a rolling basis with application batches and internal review milestones. The program setup filing form carries fields such as program name, code, program length, and enrollment scale; the talent demand justification carries industry research data, job correspondence relationships, and conclusion dates; the faculty and equipment list carries the number of teachers, title structure, equipment names, and quantities. When the three types of materials enter the knowledge base retrieval node, each serves as a citable source of original text fragments, and the citation output returns fragments and source identifiers for subsequent steps to compare fields, write ledgers, and generate reports. Field characteristics are concentrated in names, quantities, dates, and signature receipts. The same record is prone to mismatch across two materials, and versions and dates also need to be checked item by item.

## Configuration and implementation checks

The citation output of the knowledge base retrieval node outputs only an array of cited content, each entry containing an original text fragment and a source identifier. Its length can be 0. The material drafts and handover records that can be issued must be handled by subsequent AI nodes, code nodes, or manual work. This step does not produce a discrepancy list, ledger, or report; it only provides citation fragments that can be traced back to the original text.

| Object | Check | Verification action |
| --- | --- | --- |
| Program setup filing form | Whether the program name, code, program length, enrollment scale, and signature date are complete, and whether the program name is consistent with that in the talent demand justification | Check the filing form and justification materials field by field, open the citation marker to trace back to the original paragraph, and record the number of array entries and the `quoteMaxToken` budget |
| Talent demand justification | Whether the industry research data, job correspondence relationships, conclusion date, and responsible person's signature are complete, and whether the quantities match those in the filing form | Verify the citation fragments against the source documents, check whether the date and version are synchronized, and block the process from entering the next step when signatures or receipts are missing |
| Faculty and equipment list | Whether the number of teachers, title structure, equipment names, and quantities are consistent with the filing form and justification materials, and whether signatures and receipts are complete | Compare the names, quantities, and dates in the three materials item by item, and verify the citation source identifiers in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` |
| Handover record | Whether the responsible person, version, date, and receipt status are clear, and whether missing items are blocked | Draft one according to the template and complete one handover, then run a trial query with no matching materials to see whether the citation array is empty while the chain continues |

## Three common errors

- Phenomenon: The same program name is written differently in the filing form and the justification materials. Cause: The naming convention was not unified during drafting, and the original text was not compared field by field before handover.
- Phenomenon: The number of teachers or equipment does not match across the two materials. Cause: The list was updated but not synchronized to the filing form, and the version and date were not checked together.
- Phenomenon: Materials missing signatures or receipts are still circulated. Cause: The handover record did not list the responsible person and receipt status as required fields, and missing-item blocking did not take effect.

## How to verify the setup

Acceptance of this feature: ask a question with documentary evidence and check whether the citation array and markers can trace back to the original text; then ask a question with no matching materials and confirm that the array is empty while the chain runs through.

Business test: draft one according to the template and complete one handover to see whether missing items are blocked.

- In the node, check the selected knowledge base collections and their vector models, open the search parameter panel, and verify the values item by item.
- Run a trial query with a question that has no matching materials, record the number of citation array entries, and separately verify the tokens of the citation text and the `quoteMaxToken` budget.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
